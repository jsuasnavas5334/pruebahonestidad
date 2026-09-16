# ARQUITECTURA DE DATOS V1
## Modelo de Base de Datos, Versionamiento y Trazabilidad

## 1. Objetivo

Este documento define cómo debe almacenarse la información de la plataforma para soportar:

- candidatos;
- empresas;
- procesos;
- evaluaciones;
- reactivos;
- respuestas;
- scoring;
- arquetipos;
- reportes;
- vigencias;
- pagos;
- permisos;
- auditoría;
- incidencias;
- analytics;
- versiones psicométricas.

La arquitectura debe permitir que una evaluación realizada hoy pueda reconstruirse técnicamente años después, aun cuando el instrumento haya cambiado.

---

# 2. Principios de arquitectura

La base de datos deberá cumplir seis principios.

### 1. Nunca sobrescribir información histórica crítica

Las nuevas versiones crean nuevos registros.

### 2. Separar datos operativos de datos psicométricos

Una respuesta no es lo mismo que su interpretación.

### 3. Separar resultado del candidato de interpretación empresarial

El score pertenece al resultado de la dimensión.

La exigencia pertenece al cargo/proceso.

### 4. Todo resultado debe tener versión

Debe conocerse:

- qué reactivos;
- qué algoritmo;
- qué normas;
- qué cortes;
- qué arquetipo;
- qué interpretación.

### 5. Los reportes emitidos son snapshots

Nunca deben reconstruirse silenciosamente con datos actuales.

### 6. Los datos sensibles requieren control específico

Especialmente:

- fotografías;
- documento;
- datos biométricos;
- sustancias;
- deudas;
- violencia;
- acoso.

---

# 3. Tecnología recomendada

Para el núcleo transaccional:

**PostgreSQL** resulta una opción adecuada.

Motivos:

- integridad relacional;
- transacciones;
- JSONB cuando sea necesario;
- versionamiento estructurado;
- consultas complejas;
- buen soporte para auditoría;
- escalabilidad suficiente para las primeras etapas.

Complementos futuros:

### Object Storage

Para:

- fotografías;
- PDFs;
- documentos;
- archivos.

No guardar archivos binarios pesados directamente en tablas principales.

### Redis

Para:

- sesiones;
- caché;
- OTP;
- rate limits;
- colas temporales.

### Data Warehouse futuro

Para:

- analytics;
- psicometría;
- cohortes;
- outcomes;
- normas.

El sistema transaccional no debe convertirse en warehouse.

---

# 4. Dominios principales

La arquitectura se divide en 12 dominios:

1. Identity
2. Candidate
3. Organization
4. Recruitment
5. Assessment
6. Psychometrics
7. Results
8. Reporting
9. Commerce
10. Support
11. Audit
12. Analytics

---

# 5. Identificadores

Todas las entidades principales deben utilizar IDs internos no secuenciales.

Recomendación:

**UUID**

Ejemplo:

```text
candidate_id
assessment_id
organization_id
report_id
```

No utilizar el email como primary key.

No utilizar documento nacional como primary key.

---

# 6. Candidate

Tabla:

```text
candidate
```

Campos:

```text
candidate_id UUID PK

first_name
last_name

primary_email
primary_phone

birth_date NULLABLE

declared_country_code
city NULLABLE

status

created_at
updated_at
deleted_at NULLABLE
```

Estados:

```text
NEW
ACTIVE
INACTIVE
DELETION_REQUESTED
DELETED
```

---

# 7. CandidateIdentity

Separar identidad de perfil general.

Tabla:

```text
candidate_identity
```

Campos:

```text
candidate_identity_id
candidate_id FK

identity_type
identity_value_encrypted

country_code

verification_status
verified_at

created_at
```

Tipos:

```text
NATIONAL_ID
PASSPORT
FOREIGN_ID
OTHER
```

Nunca guardar identificaciones sensibles sin cifrado adecuado.

---

# 8. CandidateEmail

Permitir historial y múltiples emails.

```text
candidate_email
```

Campos:

```text
candidate_email_id
candidate_id

email
is_primary
is_verified

verified_at
created_at
disabled_at
```

Índice único sobre emails activos cuando corresponda.

---

# 9. CandidatePhone

```text
candidate_phone
```

Campos:

```text
candidate_phone_id
candidate_id

country_prefix
phone_number

is_primary
is_verified

verification_channel

verified_at
created_at
```

---

# 10. CandidateConsent

Cada aceptación debe registrarse como evento histórico.

```text
candidate_consent
```

Campos:

```text
candidate_consent_id

candidate_id
assessment_id NULLABLE

policy_version_id

consent_type

accepted
accepted_at

ip_address
user_agent
declared_country
detected_country
```

Tipos:

```text
PRIVACY
TERMS
CAMERA
IDENTITY_VERIFICATION
SENSITIVE_DATA
TALENT_SEARCH
MARKETING
```

No actualizar un consentimiento anterior.

Crear nuevo registro.

---

# 11. PolicyVersion

```text
policy_version
```

Campos:

```text
policy_version_id
policy_type

version
country_scope

content_hash
effective_from
effective_until NULLABLE

status
```

Esto permite demostrar exactamente qué texto aceptó el candidato.

---

# 12. CandidateProfile

Datos no estrictamente identificativos.

```text
candidate_profile
```

Campos:

```text
candidate_id PK/FK

current_job_title NULLABLE
experience_years NULLABLE
industry NULLABLE
education_level NULLABLE
gender NULLABLE

preferred_work_mode
salary_expectation NULLABLE

talent_search_status
share_profile_enabled

updated_at
```

Campos demográficos (edad vía `candidate.birth_date`, género, educación, industria) son opcionales (`NULLABLE`) — a diferencia de `assessment.application_country_code`, que es un campo técnico obligatorio (`NOT NULL`).

---

# 13. CandidateJobPreference

Para soportar múltiples preferencias.

```text
candidate_job_preference
```

Campos:

```text
candidate_job_preference_id
candidate_id

job_family
job_title
industry
country
city
work_mode

active
```

---

# 14. Organization

Tabla:

```text
organization
```

Campos:

```text
organization_id

parent_organization_id NULLABLE

legal_name
commercial_name

tax_id_encrypted
country_code

industry
company_size

status
plan_id NULLABLE

created_at
```

Estados:

```text
PENDING_VERIFICATION
VERIFIED
UNDER_REVIEW
SUSPENDED
CLOSED
```

---

# 15. OrganizationUnit

Permite:

empresa matriz → país → filial → unidad.

```text
organization_unit
```

Campos:

```text
unit_id
organization_id

parent_unit_id NULLABLE

name
unit_type
country_code NULLABLE

active
```

Tipos:

```text
COUNTRY
SUBSIDIARY
DIVISION
DEPARTMENT
BRANCH
OTHER
```

---

# 16. EnterpriseUser

```text
enterprise_user
```

Campos:

```text
enterprise_user_id

organization_id
unit_id NULLABLE

email
name

status
last_login_at

created_at
```

---

# 17. Role

```text
role
```

Ejemplos:

```text
ORG_ADMIN
HR_MANAGER
RECRUITER
PROFESSIONAL
VIEWER
BILLING
```

---

# 18. Permission

```text
permission
```

Ejemplos:

```text
PROCESS_CREATE
PROCESS_EDIT

CANDIDATE_INVITE

REPORT_VIEW
REPORT_DOWNLOAD
REPORT_PURCHASE

CREDIT_PURCHASE

USER_MANAGE

SENSITIVE_DIMENSION_VIEW
VERIFICATION_MEDIA_VIEW
```

---

# 19. UserRole

Muchos-a-muchos.

```text
enterprise_user_role
```

Campos:

```text
enterprise_user_id
role_id
unit_scope_id NULLABLE
```

---

# 20. RecruitmentProcess

```text
recruitment_process
```

Campos:

```text
process_id

organization_id
unit_id

name
job_profile_version_id

country_code
status

owner_user_id

created_at
closed_at NULLABLE
```

Estados:

```text
DRAFT
ACTIVE
PAUSED
CLOSED
ARCHIVED
```

---

# 21. JobProfile

Concepto reutilizable.

```text
job_profile
```

Campos:

```text
job_profile_id

organization_id NULLABLE

name
job_family
description

created_by
created_at
```

Puede haber perfiles globales del producto con:

```text
organization_id = NULL
```

---

# 22. JobProfileVersion

No modificar un perfil ya utilizado.

Crear versión.

```text
job_profile_version
```

Campos:

```text
job_profile_version_id
job_profile_id

version_number

job_title
description

job_level                 -- 1 a 6 (niveles universales de puesto;
                              determina Multiplicador_nivel_de_puesto,
                              0.70–1.50)
has_direct_reports         -- BOOLEAN, campo independiente de job_level
                              (+0.15 al Multiplicador_final cuando es TRUE)

status

created_at
published_at
```

Restricción:

```text
job_level BETWEEN 1 AND 6
```

`job_level` y `has_direct_reports` son dos campos separados en la configuración de batería por puesto (no un único campo combinado).

---

# 23. JobProfileDimension

Relaciona cargo con dimensiones.

```text
job_profile_dimension
```

Campos:

```text
job_profile_version_id
dimension_id

required BOOLEAN

requirement_level INTEGER

recommendation_source
recommendation_reason

display_order
```

Restricción:

```text
requirement_level BETWEEN 1 AND 6
```

---

# 24. ProcessCandidate

Tabla que relaciona candidato y proceso.

```text
process_candidate
```

Campos:

```text
process_candidate_id

process_id
candidate_id

status
invited_at
started_at NULLABLE
completed_at NULLABLE

current_assessment_id NULLABLE
```

Estados:

```text
INVITED
REGISTERED
STARTED
COMPLETED
CANCELLED
WITHDRAWN
```

---

# 25. Instrument

Representa el instrumento global.

```text
instrument
```

Campos:

```text
instrument_id
name
```

---

# 26. InstrumentVersion

```text
instrument_version
```

Campos:

```text
instrument_version_id
instrument_id

version

status

effective_from
effective_until NULLABLE

notes
```

Estados:

```text
DRAFT
PILOT
ACTIVE
RETIRED
```

---

# 27. Dimension

```text
dimension
```

Campos:

```text
dimension_id

code
name

dimension_group

sensitivity_class
```

Ejemplo:

```text
ROB
MEN
FRA
IRR
SOB
```

Grupos (21 dimensiones exactas — este catálogo está cerrado):

```text
BASE (5 — SIEMPRE en toda batería):
  Robo, Mentira, Fraude, Irresponsabilidad, Soborno

ADDITIONAL (7 — configurables por puesto):
  Deslealtad, Favoritismo, Abuso de Recursos, Acoso Sexual,
  Maltrato Laboral, Discriminación, Asociación Criminal

CONTEXTUAL (9 — JAMÁS entran al IGI/PRB; se reportan aparte):
  Sustancias Lícitas, Sustancias Ilícitas, Incumplimiento de Normas,
  Deudas, Impulsividad, Violencia, Ludopatía, Egoísmo, Impunidad
```

Restricción de negocio: ninguna consulta ni tabla de resultado agregado (PRB, Multiplicador, IGI) debe incluir dimensiones con `dimension_group = 'CONTEXTUAL'`. Estas se calculan y presentan en un bloque de reporte separado.

---

# 28. DimensionVersion

```text
dimension_version
```

Campos:

```text
dimension_version_id
dimension_id

version

status

validity_days

created_at
effective_from
```

Ejemplo:

```text
validity_days = 180
```

---

# 29. Item

Identidad conceptual del reactivo. El banco es real y está cerrado: 210 reactivos sustantivos (21 dimensiones × 10 slots), más los reactivos transversales que no pertenecen a ninguna dimensión.

```text
item
```

Campos:

```text
item_id

dimension_id NULLABLE   -- NULL para reactivos transversales (Deseabilidad
                            Social, control de Azarosidad, bio-data)

item_purpose             -- SUBSTANTIVE | SOCIAL_DESIRABILITY |
                            RANDOMNESS_CONTROL | BIODATA

indicator_code NULLABLE -- subdimensión/indicador (1 de 4 por dimensión);
                            solo aplica cuando item_purpose = SUBSTANTIVE

mirror_pair_code NULLABLE -- rol de par espejo (1 de 5 pares por dimensión);
                              solo aplica cuando item_purpose = SUBSTANTIVE

slot_number NULLABLE    -- posición 1–10 dentro de la dimensión (solo
                            SUBSTANTIVE); slots op1, op2 y perc1 son los
                            3 slots duales (clásico/alternativo)

item_family
```

Reactivos transversales (`item_purpose ≠ SUBSTANTIVE`), sin variantes de redacción y sin puntaje propio en ningún Puntaje_dimensión:

```text
8  Deseabilidad Social
6  control de Azarosidad (CTRL01–CTRL06, 2 mecanismos distintos)
6  bio-data (BIO01–BIO06, sin variantes, sin puntaje)
```

---

# 30. ItemVersion

El scoring y la configuración viven aquí. El texto exacto mostrado vive en `item_wording_variant` (ver 30.1), porque cada reactivo tiene 5 variantes de redacción que comparten indicador/dirección/par espejo pero difieren en el texto exacto mostrado (relevante para equating al migrar a TRI/IRT y para el análisis de equivalencia de variantes, Fase 9).

```text
item_version
```

Campos:

```text
item_version_id
item_id

version

dimension_version_id

language_code
country_adaptation NULLABLE
channel

item_type            -- 1 de 5: OPINION_ACTITUD | PERCEPCION_TERCEROS |
                         INVOLUCRAMIENTO_PASADO | ESCENARIO_DILEMA |
                         INTENCION_FUTURA

scoring_direction     -- DIRECTO | INVERSO
weight

slot_alternative_type NULLABLE  -- CLASSIC | ALTERNATIVE; solo para los
                                    3 slots duales (op1, op2, perc1) por
                                    dimensión; NULL para los demás 7 slots
                                    fijos y para reactivos transversales

critical_flag

status

created_at
```

Para los 3 slots duales por dimensión existen dos `item_version` distintas (una `CLASSIC` y una `_alt` `ALTERNATIVE`) que apuntan al mismo `dimension_id`, `indicator_code` y `mirror_pair_code` — nunca ambas se administran en la misma aplicación; el motor de aleatorización elige una por slot por aplicación (ver Arquitectura Técnica, sección 22).

---

# 30.1 ItemWordingVariant

Almacena las 5 variantes de redacción por reactivo (1,050 textos en total: 210 reactivos sustantivos × 5). El motor elige, por aplicación, exactamente 1 variante por reactivo administrado.

```text
item_wording_variant
```

Campos:

```text
item_wording_variant_id
item_version_id

variant_number         -- 1 a 5

text

status

created_at
```

Restricción:

```text
UNIQUE(item_version_id, variant_number)
```

---

# 31. ItemOption

```text
item_option
```

Campos:

```text
item_option_id
item_version_id

option_code
display_text
raw_value
scored_value

display_order
```

El frontend puede recibir:

- option_code;
- display_text.

No debe recibir necesariamente scored_value.

---

# 32. ItemEquivalenceGroup

Para versiones web/WhatsApp o formas paralelas.

```text
item_equivalence_group
```

Campos:

```text
equivalence_group_id
construct_reference
```

Tabla:

```text
item_equivalence_member
```

Relaciona:

```text
equivalence_group_id
item_version_id
```

Nota: este mecanismo es distinto de `item_wording_variant` (5 variantes de redacción de un mismo reactivo) y del par `CLASSIC`/`ALTERNATIVE` de los 3 slots duales (30). `ItemEquivalenceGroup` es para formas paralelas entre canales (web/WhatsApp), no para el banco base de 210 reactivos.

---

# 33. QualityRule

Reglas de consistencia y calidad.

```text
quality_rule
```

Campos:

```text
quality_rule_id
rule_type

version
severity

configuration_json

status
```

Los 5 indicadores de validez oficiales (independientes entre sí, cada uno con su propio estado; ninguno modifica el score almacenado, solo el flag de presentación/color):

```text
AZAROSIDAD
OMISION
AQUIESCENCIA
CONTRADICCION
DESEABILIDAD_SOCIAL
```

Adicionalmente pueden existir reglas técnicas/de comportamiento que alimentan el cálculo de esos indicadores pero no son indicadores adicionales en sí mismos (p. ej. `SPEED` y `TAB_CHANGE` como insumo de `AZAROSIDAD`; `CAMERA` como control de verificación, no de validez psicométrica):

```text
SPEED
TAB_CHANGE
CAMERA
```

`[PENDIENTE DE CONFIRMACIÓN DE GEORGE]`: mapeo exacto de qué eventos técnicos alimentan cada uno de los 5 indicadores.

---

# 34. AlgorithmVersion

Tabla crítica.

```text
algorithm_version
```

Campos:

```text
algorithm_version_id

version
status

description

effective_from

code_hash
configuration_hash
```

Debe poder identificarse exactamente qué lógica estaba activa.

---

# 35. ScoringConfiguration

```text
scoring_configuration
```

Campos:

```text
scoring_configuration_id

algorithm_version_id
dimension_version_id

normalization_method

minimum_score
maximum_score

configuration_json
```

Inicialmente:

```text
minimum_score = 0
maximum_score = 95
```

---

# 36. RiskBandVersion

```text
risk_band_version
```

Campos:

```text
risk_band_version_id

dimension_version_id
norm_group_id NULLABLE

algorithm_version_id

version
status
```

---

# 37. RiskBand

```text
risk_band
```

Campos:

```text
risk_band_version_id

level
min_score
max_score

traffic_light_color   -- derivado de level: ROJO (niveles 1–2), AMARILLO
                          (niveles 3–4), VERDE (niveles 5–6)

interpretation_key
```

Restricción:

```text
level BETWEEN 1 AND 6
```

Cada `risk_band_version_id` debe tener exactamente 6 filas (una por nivel), nunca 3, 4 o 5.

---

# 38. NormGroup

```text
norm_group
```

Campos:

```text
norm_group_id

scope_type
country_code NULLABLE
region NULLABLE
city NULLABLE
job_family NULLABLE
industry NULLABLE

sample_size

status
effective_from
```

Scopes:

```text
GLOBAL
COUNTRY
REGION
CITY
ROLE
INDUSTRY
```

`GLOBAL` = Baremo General (por defecto para todo país). Un `norm_group` con `scope_type = COUNTRY` (Baremo por país) solo debe activarse automáticamente cuando ese país acumula `sample_size ≥ 300` casos; antes de ese umbral, `assessment.application_country_code` sigue resolviendo contra el Baremo General.

---

# 39. ArchetypeModelVersion

```text
archetype_model_version
```

Campos:

```text
archetype_model_version_id

version
model_type

configuration_json

status
effective_from
```

model_type:

```text
RULE_BASED
CLUSTER_BASED
HYBRID
```

---

# 40. Archetype

```text
archetype
```

Campos:

```text
archetype_id
code
```

---

# 41. ArchetypeVersion

```text
archetype_version
```

Campos:

```text
archetype_version_id
archetype_id
archetype_model_version_id

language_code

name
short_description
full_description

strengths_json
attention_areas_json
pressure_text
rules_text

visual_asset_id
```

---

# 42. Assessment

Entidad central.

```text
assessment
```

Campos:

```text
assessment_id

candidate_id
organization_id NULLABLE
process_id NULLABLE

assessment_type

application_country_code   -- OBLIGATORIO (NOT NULL); campo técnico, no
                               demográfico, requerido para activar el
                               Baremo por país (≥300 casos acumulados) y
                               distinguirlo del Baremo General; a
                               diferencia de edad/género/educación/
                               industria del candidato, que son NULLABLE

instrument_version_id
algorithm_version_id
archetype_model_version_id

language_code
channel

status

verification_required
verification_status

created_at
started_at
completed_at NULLABLE

expires_resume_at NULLABLE
```

Tipos:

```text
PERSONAL
ENTERPRISE
REASSESSMENT
ADDITIONAL_MODULE
```

`assessment_type` distingue B2C (PERSONAL, batería fija de 50 reactivos, orientada a arquetipo) de B2B (ENTERPRISE, batería configurable por cargo, orientada a reporte de riesgo). Ambos comparten el mismo motor y la misma sesión de scoring.

No permitir agregar `assessment_item` ni `response` a un `assessment` con `status = COMPLETED` (o equivalente cerrado). Cualquier reporte adicional requiere crear un `assessment` nuevo y completo, servido con variantes de redacción y, si aplica, versiones de slot dual distintas — nunca "reabrir" ni "completar" uno ya cerrado.

---

# 43. AssessmentDimension

Congela qué dimensiones se aplicaron o reutilizaron.

```text
assessment_dimension
```

Campos:

```text
assessment_dimension_id

assessment_id
dimension_version_id

source_type

source_dimension_result_id NULLABLE

required
status
```

source_type:

```text
NEW
REUSED_VALID
REUSED_EXPIRED
RETESTED
```

---

# 44. AssessmentItem

Instancia del reactivo dentro de una evaluación.

```text
assessment_item
```

Campos:

```text
assessment_item_id

assessment_id
item_version_id

wording_variant_id            -- FK a item_wording_variant; qué variante
                                  de redacción (1 de 5) se mostró en esta
                                  aplicación
slot_alternative_type_served NULLABLE  -- CLASSIC | ALTERNATIVE; copia
                                  inmutable de item_version.slot_alternative_type
                                  en el momento de servir, para los 3
                                  slots duales; NULL para los demás slots

sequence_number

randomization_seed_component

required

served_at NULLABLE
answered_at NULLABLE
```

Estos dos campos son el requisito de trazabilidad para re-calibración (equating) futura a TRI/IRT y para el análisis de equivalencia de variantes/slots duales (Fase 9): toda respuesta cruda es recuperable vía `response.assessment_item_id → assessment_item`, que registra exactamente qué reactivo, qué variante de redacción y qué versión del slot dual se administró.

El frontend trabaja con:

```text
assessment_item_id
```

No necesita conocer el item_id maestro.

---

# 45. AssessmentSession

Una evaluación puede tener varias sesiones.

```text
assessment_session
```

Campos:

```text
session_id

assessment_id

started_at
ended_at

device_id NULLABLE
ip_address

user_agent

resume_reason NULLABLE
```

---

# 46. Response

```text
response
```

Campos:

```text
response_id

assessment_item_id
assessment_id
candidate_id

item_option_id

raw_response_json NULLABLE

response_time_ms

submitted_at

session_id

idempotency_key
```

Restricción única:

```text
UNIQUE(assessment_item_id)
```

Una respuesta final por reactivo.

---

# 47. ResponseAudit

Si ocurre corrección excepcional del sistema:

```text
response_audit
```

No modificar silenciosamente.

Campos:

```text
response_audit_id

response_id

action
old_value
new_value

reason
performed_by
performed_at
```

Idealmente casi nunca utilizado.

---

# 48. AssessmentEvent

Tabla de eventos técnicos.

```text
assessment_event
```

Campos:

```text
assessment_event_id

assessment_id
session_id

event_type

event_timestamp

metadata_json
```

Tipos:

```text
TAB_BLUR
TAB_FOCUS
CONNECTION_LOST
CONNECTION_RESTORED
CAMERA_LOST
CAMERA_RESTORED
SPEED_WARNING
QUESTION_REPORTED
SESSION_RESUMED
```

---

# 49. VerificationSession

```text
verification_session
```

Campos:

```text
verification_session_id

assessment_id

verification_type
status

started_at
completed_at

provider NULLABLE
```

---

# 50. VerificationMedia

Metadatos de fotografías.

```text
verification_media
```

Campos:

```text
verification_media_id

verification_session_id

media_type

object_storage_key

captured_at

status

retention_until
deleted_at NULLABLE
```

No almacenar la fotografía directamente en PostgreSQL.

---

# 51. VerificationFinding

Resultados de verificación.

```text
verification_finding
```

Campos:

```text
verification_finding_id

verification_session_id

finding_type
severity

confidence NULLABLE

review_status

created_at
```

Ejemplos:

```text
NO_FACE
MULTIPLE_PERSONS
POSSIBLE_IDENTITY_CHANGE
CAMERA_BLOCKED
```

No incluir:

```text
LYING
DISHONEST
EMOTION
```

---

# 52. QualityAssessment

Resultado del Quality Engine.

```text
quality_assessment
```

Campos:

```text
quality_assessment_id

assessment_id

quality_status

-- 5 indicadores de validez independientes; cada uno con su propio
-- estado, y ninguno modifica dimension_result.raw_score/normalized_score
-- (solo determina el flag/color de presentación del reporte)
azarosidad_status
omision_status
aquiescencia_status
contradiccion_status
deseabilidad_social_status

azarosidad_metric NULLABLE
omision_metric NULLABLE
aquiescencia_metric NULLABLE
contradiccion_metric NULLABLE
deseabilidad_social_metric NULLABLE

verification_status

configuration_version

created_at
```

Estados:

```text
ADEQUATE
WITH_OBSERVATIONS
NON_INTERPRETABLE
```

---

# 53. QualityFinding

```text
quality_finding
```

Campos:

```text
quality_finding_id

quality_assessment_id
quality_rule_id

severity
finding_code

metadata_json
```

---

# 54. DimensionResult

Uno de los registros más importantes.

```text
dimension_result
```

Campos:

```text
dimension_result_id

candidate_id
dimension_id
dimension_version_id

source_assessment_id

items_administered_count   -- normalmente 10 (fijo por diseño de batería)
items_answered_count       -- EFECTIVAMENTE respondidos; denominador real
                               usado en Puntaje_dimensión; nunca fijo en
                               10, nunca imputado; puede ser < items_administered_count

raw_score                  -- Puntaje_dimensión = promedio de
                               items_answered_count reactivos
normalized_score

risk_level

norm_group_id NULLABLE
risk_band_version_id

result_status

valid_from
valid_until

is_current

created_at
```

Estados:

```text
VALID
EXPIRED
HISTORICAL
NON_INTERPRETABLE
VOIDED
```

---

# 55. Un candidato puede tener múltiples DimensionResult

Ejemplo:

```text
Soborno
2026-01 → histórico

Soborno
2026-09 → actual
```

Nunca actualizar el primero con el nuevo score.

---

# 56. CandidateCurrentDimension

Opcionalmente puede existir una vista materializada o tabla de resolución rápida.

No es fuente primaria.

Solo facilita consultar:

> ¿Cuál es el resultado actual de Soborno?

La verdad histórica permanece en:

```text
dimension_result
```

---

# 57. BaseIntegrityResult

Almacena el IGI (Índice General de Integridad) y, por requisito de auditoría, cada paso intermedio del cálculo por separado — no solo el resultado final.

```text
base_integrity_result
```

Campos:

```text
base_integrity_result_id

candidate_id
source_assessment_id

prb_score                        -- PRB: promedio ponderado de riesgo de
                                     dimensiones Núcleo/Base, pesos
                                     re-parametrizados a 100% entre las
                                     dimensiones incluidas en la batería

job_level_used                   -- 1–6, snapshot del nivel de puesto usado
has_direct_reports_used           -- snapshot del campo binario "personal a
                                     cargo" usado
multiplier_applied                -- Multiplicador_final = Multiplicador_
                                     nivel_de_puesto (0.70–1.50) + (0.15 si
                                     has_direct_reports_used)

risk_adjusted                     -- MIN(1, prb_score × multiplier_applied)

score                             -- IGI_reportado = (1 − risk_adjusted) ×
                                     100 × 0.95 (tope estructural 95, nunca
                                     100)

sem NULLABLE                      -- [PENDIENTE DE DATO PILOTO]
confidence_interval_low NULLABLE  -- [PENDIENTE DE DATO PILOTO]
confidence_interval_high NULLABLE -- [PENDIENTE DE DATO PILOTO]

algorithm_version_id
norm_group_id NULLABLE

valid_from
valid_until

is_current
```

`score` (IGI) nunca se recalcula fuera de este pipeline versionado; para reproducir un IGI histórico deben conservarse `prb_score`, `multiplier_applied` y `risk_adjusted` junto con `algorithm_version_id`.

---

# 58. ExpandedRiskResult

Preparado para futuro.

```text
expanded_risk_result
```

Campos similares.

Puede permanecer deshabilitado inicialmente.

---

# 59. ArchetypeResult

```text
archetype_result
```

Campos:

```text
archetype_result_id

candidate_id
assessment_id

archetype_version_id

fit_score NULLABLE

valid_from
valid_until

is_current
```

---

# 60. Alert

```text
result_alert
```

Campos:

```text
alert_id

candidate_id
assessment_id

dimension_result_id NULLABLE

alert_type
severity

rule_version
interpretation_key

created_at
```

---

# 61. InterpretationTemplate

Evitar textos hardcodeados.

```text
interpretation_template
```

Campos:

```text
interpretation_template_id

entity_type
dimension_id NULLABLE

risk_level NULLABLE
requirement_level NULLABLE

language_code

version

title
body

status
```

---

# 62. InterviewQuestion

```text
interview_question
```

Campos:

```text
interview_question_id

dimension_id

risk_level_min
risk_level_max

factor_code NULLABLE

language_code
version

question_text

status
```

---

# 63. ProfessionalReport

```text
professional_report
```

Campos:

```text
report_id

candidate_id
organization_id
process_id NULLABLE

job_profile_version_id NULLABLE

status

generated_at
valid_until

snapshot_version

pdf_asset_id NULLABLE
```

---

# 64. ReportSnapshot

Debe contener todo lo necesario para reproducir visualmente el reporte.

```text
report_snapshot
```

Campos:

```text
report_id PK/FK

snapshot_json

content_hash

instrument_version
algorithm_version
archetype_model_version
norm_version

created_at
```

El JSON puede incluir:

- score;
- niveles;
- textos;
- exigencias;
- alertas;
- vigencias.

Este snapshot es inmutable.

---

# 65. ReportAccess

Controla quién puede abrir.

```text
report_access
```

Campos:

```text
report_access_id

report_id
organization_id

entitlement_id

granted_at
expires_at NULLABLE
revoked_at NULLABLE
```

---

# 66. ReportActivity

```text
report_activity
```

Campos:

```text
report_activity_id

report_id
enterprise_user_id

action

timestamp
ip_address
```

Acciones:

```text
VIEW
DOWNLOAD_PDF
OPEN_DIMENSION
COMPARE
```

---

# 67. ReportCorrection

Si existe error posterior.

```text
report_correction
```

Campos:

```text
report_correction_id

original_report_id
corrected_report_id

reason
impact_level

created_at
```

El original no se elimina.

---

# 68. CreditWallet

```text
credit_wallet
```

Campos:

```text
wallet_id
organization_id

current_balance

updated_at
```

---

# 69. CreditTransaction

Nunca modificar saldo sin transacción.

```text
credit_transaction
```

Campos:

```text
credit_transaction_id

wallet_id

transaction_type

amount

balance_after

reference_type
reference_id

expires_at NULLABLE

created_at
```

Tipos:

```text
PURCHASE
PROMOTION
REPORT_USE
TALENT_UNLOCK
ADJUSTMENT
EXPIRATION
REFUND
```

---

# 70. Plan

```text
plan
```

Campos:

```text
plan_id
name
billing_type
status
```

---

# 71. OrganizationSubscription

```text
organization_subscription
```

Campos:

```text
subscription_id

organization_id
plan_id

status

started_at
renews_at NULLABLE
ends_at NULLABLE
```

---

# 72. ReportEntitlement

Representa el derecho comercial de acceso.

```text
report_entitlement
```

Campos:

```text
entitlement_id

organization_id
candidate_id
report_id

source_type
credit_transaction_id NULLABLE

created_at
```

source_type:

```text
PAID
PLAN_INCLUDED
PROMOTIONAL
MANUAL
```

---

# 73. Invitation

```text
invitation
```

Campos:

```text
invitation_id

organization_id
process_id
candidate_id NULLABLE

email NULLABLE
phone NULLABLE

channel

token_hash

status

sent_at
opened_at NULLABLE
accepted_at NULLABLE
expires_at
```

---

# 74. Notification

```text
notification
```

Campos:

```text
notification_id

recipient_type
recipient_id

channel
template_id

status

scheduled_at
sent_at NULLABLE
delivered_at NULLABLE

metadata_json
```

---

# 75. NotificationPreference

```text
notification_preference
```

Candidate:

- email;
- WhatsApp;
- ambos.

---

# 76. SupportCase

```text
support_case
```

Campos:

```text
support_case_id

candidate_id NULLABLE
organization_id NULLABLE
assessment_id NULLABLE

category
priority
status

description

assigned_to NULLABLE

created_at
resolved_at NULLABLE
```

---

# 77. SupportCaseEvent

```text
support_case_event
```

Registra:

- comentarios;
- cambios de estado;
- reinicios;
- resolución.

---

# 78. AssessmentReset

No reiniciar silenciosamente.

```text
assessment_reset
```

Campos:

```text
assessment_reset_id

old_assessment_id
new_assessment_id

reason

authorized_by

created_at
```

El anterior queda:

```text
VOIDED
```

---

# 79. AuditLog

Tabla transversal.

```text
audit_log
```

Campos:

```text
audit_id

actor_type
actor_id

action

entity_type
entity_id

old_value_json NULLABLE
new_value_json NULLABLE

ip_address
user_agent

timestamp
```

---

# 80. Eventos de auditoría obligatorios

Registrar al menos:

- consentimiento;
- login;
- cambio de email;
- cambio de teléfono;
- creación de proceso;
- cambio de perfil;
- compra;
- apertura de reporte;
- descarga;
- reinicio;
- modificación de algoritmo;
- publicación de reactivo;
- modificación de cortes;
- corrección de reporte.

---

# 81. PsychometricChangeRequest

Gobernanza de cambios.

```text
psychometric_change_request
```

Campos:

```text
change_request_id

change_type
description

requested_by

status

evidence_reference

created_at
```

---

# 82. PsychometricApproval

```text
psychometric_approval
```

Campos:

```text
approval_id

change_request_id

approver_id
approver_role

decision
comments

decided_at
```

Puede requerirse aprobación de:

- psicometría;
- producto;
- tecnología.

---

# 83. Release

```text
release
```

Agrupa versiones publicadas.

Campos:

```text
release_id
version

instrument_version_id
algorithm_version_id
archetype_model_version_id

status

published_at
```

---

# 84. Outcome

Para validación predictiva futura.

```text
candidate_outcome
```

Campos:

```text
outcome_id

candidate_id
organization_id
process_id

outcome_type

event_date

metadata_json

created_at
```

Tipos:

```text
HIRED
NOT_HIRED
WITHDREW
RESIGNED
TERMINATED
INCIDENT
PERFORMANCE_REVIEW
```

---

# 85. OutcomePrivacy

Debe definirse qué outcomes pueden utilizarse para:

- operación;
- investigación;
- validación.

No asumir automáticamente que todo dato puede utilizarse para cualquier finalidad.

---

# 86. AnalyticsEvent

Para telemetría de producto.

```text
analytics_event
```

Campos:

```text
event_id

anonymous_or_user_id

event_name

event_timestamp

properties_json

session_id
```

No mezclar necesariamente analytics con auditoría.

Son propósitos distintos.

---

# 87. Diferencia Audit vs Analytics

### Audit

Pregunta:

> ¿Quién hizo qué y cuándo?

Debe ser confiable y de seguridad.

### Analytics

Pregunta:

> ¿Cómo utilizan el producto?

Puede agregarse y anonimizarse.

No utilizar Google Analytics como sistema de auditoría.

---

# 88. Assets

Tabla para referencias de archivos.

```text
asset
```

Campos:

```text
asset_id

asset_type
storage_provider
storage_key

mime_type
size_bytes

encryption_status

created_at
retention_until NULLABLE
deleted_at NULLABLE
```

---

# 89. Datos que NO deberían almacenarse en una sola tabla gigante

Evitar una tabla:

```text
candidate_everything
```

con:

- identidad;
- pruebas;
- resultados;
- fotos;
- pagos;
- reportes.

La separación de dominios facilita:

- seguridad;
- mantenimiento;
- eliminación;
- cumplimiento;
- permisos.

---

# 90. Diagrama conceptual principal

```text
ORGANIZATION
    │
    ├── USERS
    │
    ├── JOB PROFILES
    │       │
    │       └── JOB PROFILE DIMENSIONS
    │
    └── RECRUITMENT PROCESSES
            │
            └── PROCESS CANDIDATES
                     │
                     ▼

CANDIDATE ─────── ASSESSMENT
    │               │
    │               ├── ASSESSMENT DIMENSIONS
    │               ├── ASSESSMENT ITEMS
    │               │       │
    │               │       └── RESPONSES
    │               │
    │               ├── EVENTS
    │               ├── VERIFICATION
    │               └── QUALITY
    │
    ├── DIMENSION RESULTS
    ├── BASE INTEGRITY RESULT
    └── ARCHETYPE RESULT
              │
              ▼
       PROFESSIONAL REPORT
              │
              ├── SNAPSHOT
              ├── ACCESS
              └── ACTIVITY
```

---

# 91. Relación psicométrica

```text
INSTRUMENT VERSION
       │
       ├── DIMENSION VERSION
       │       │
       │       └── ITEM VERSION
       │
       ├── ALGORITHM VERSION
       │
       ├── RISK BAND VERSION
       │
       ├── NORM GROUP
       │
       └── ARCHETYPE MODEL VERSION
```

---

# 92. Reglas de integridad referencial

No permitir eliminar físicamente:

- evaluación con respuestas;
- reportes emitidos;
- algoritmo utilizado;
- item version utilizado;
- dimensión usada en un reporte.

En su lugar:

```text
status = RETIRED
```

---

# 93. Soft delete

Usar donde corresponda:

```text
deleted_at
```

Pero no confundir soft delete con requerimientos legales reales de eliminación.

Cuando deba eliminarse un dato sensible:

debe eliminarse del storage o anonimizarse según política.

---

# 94. Retención diferenciada

No aplicar una única retención a todo.

Ejemplo conceptual:

### Fotos

Período corto definido por política.

### Documentos

Solo cuando necesarios.

### Logs de seguridad

Período específico.

### Reportes

Histórico contractual.

### Datos psicométricos

Según finalidad, consentimiento y legislación.

Todo configurable por jurisdicción.

---

# 95. DataRetentionPolicy

Tabla recomendada:

```text
data_retention_policy
```

Campos:

```text
policy_id

data_category
country_code NULLABLE

retention_days

action_on_expiry

version
effective_from
```

Acciones:

```text
DELETE
ANONYMIZE
ARCHIVE
REVIEW
```

---

# 96. Índices esenciales

Candidate:

```text
INDEX(primary_email)
INDEX(primary_phone)
```

Assessment:

```text
INDEX(candidate_id)
INDEX(process_id)
INDEX(status)
INDEX(created_at)
```

Response:

```text
UNIQUE(assessment_item_id)
INDEX(assessment_id)
```

DimensionResult:

```text
INDEX(candidate_id, dimension_id)
INDEX(valid_until)
INDEX(is_current)
```

Reports:

```text
INDEX(candidate_id)
INDEX(organization_id)
INDEX(status)
```

---

# 97. Índice parcial de resultado actual

Ejemplo PostgreSQL:

```text
UNIQUE(candidate_id, dimension_id)
WHERE is_current = TRUE
```

Garantiza que no existan dos resultados actuales de la misma dimensión simultáneamente.

---

# 98. Particionamiento futuro

Tablas con crecimiento alto:

- analytics_event;
- audit_log;
- assessment_event;
- response;
- notification.

Pueden particionarse por:

**mes / trimestre**

cuando el volumen lo justifique.

No es obligatorio en el primer MVP.

---

# 99. Snapshots e inmutabilidad

Después de emitido:

```text
report_snapshot
```

debe tratarse como inmutable.

Para cambiar:

crear:

```text
new_report
```

y relacionarlo mediante:

```text
report_correction
```

---

# 100. Reproducción de scoring

Para reconstruir un resultado deben estar disponibles:

- assessment;
- item versions;
- responses;
- scoring configuration;
- algorithm version;
- risk bands;
- norm;
- quality rules.

Si cualquiera de esos componentes se pierde:

se pierde auditabilidad.

---

# 101. Versionado de configuración

No guardar solamente:

```text
algorithm_version = "1.2"
```

Debe existir registro real de qué configuración corresponde a 1.2.

Ideal:

```text
configuration_json
configuration_hash
code_hash
```

---

# 102. Hashes

Usar hashes para detectar modificaciones no autorizadas en:

- configuración;
- snapshots;
- PDFs;
- políticas;
- algoritmos desplegados.

No sustituyen firma digital, pero fortalecen trazabilidad.

---

# 103. Cifrado

### En tránsito

TLS.

### En reposo

Cifrado del proveedor + cifrado adicional para campos críticos cuando proceda.

Campos especialmente sensibles:

- documentos;
- identificadores;
- posiblemente teléfono/email según arquitectura;
- tokens;
- secretos.

---

# 104. Secretos

Nunca guardar en tablas generales:

- contraseñas sin hash;
- claves API en texto plano;
- tokens OTP completos;
- claves de cifrado.

Utilizar Secret Manager/KMS.

---

# 105. Passwords

Si existe autenticación propia:

guardar:

```text
password_hash
```

con algoritmo moderno.

Nunca:

```text
password
```

en texto.

---

# 106. OTP

Guardar:

- hash del código;
- vencimiento;
- intentos;
- estado.

No conservar indefinidamente códigos utilizados.

---

# 107. API Credentials

Tabla:

```text
api_client
```

Campos:

```text
api_client_id
organization_id

client_name
status

permissions

created_at
```

Secret almacenado en sistema seguro.

---

# 108. Webhooks

Tabla:

```text
webhook_subscription
```

y

```text
webhook_delivery
```

Registrar:

- evento;
- intento;
- status;
- respuesta;
- reintentos.

---

# 109. Multi-tenancy

Toda entidad empresarial debe tener:

```text
organization_id
```

cuando corresponda.

El backend debe filtrar siempre por tenant.

No confiar en filtros del frontend.

---

# 110. Row Level Security

PostgreSQL permite considerar:

**Row Level Security**

para reforzar separación empresarial.

Puede utilizarse además de autorización de aplicación.

---

# 111. Datos globales vs privados

### Globales

- dimensiones;
- instrumentos;
- reactivos maestros;
- arquetipos;
- configuraciones psicométricas.

### Privados por empresa

- procesos;
- usuarios;
- créditos;
- reportes comprados;
- configuraciones de cargos propias.

### Propios del candidato

- identidad;
- perfil;
- evaluaciones;
- resultados.

---

# 112. Reutilización interempresa

El esquema debe evitar guardar el resultado dimensional dentro de:

```text
organization_candidate_result
```

como única fuente.

Debe existir:

```text
candidate → dimension_result
```

independiente de la empresa.

La empresa obtiene acceso mediante:

```text
report_access
```

Esto implementa correctamente la portabilidad definida.

---

# 113. Empresa que originó una evaluación

DimensionResult debe conservar:

```text
source_assessment_id
```

y Assessment puede indicar:

```text
organization_id
```

Por tanto siempre se conoce el origen.

Pero el resultado actual pertenece funcionalmente al perfil.

---

# 114. Aceptación de resultado vencido

Debe existir registro específico.

```text
expired_result_acceptance
```

Campos:

```text
acceptance_id

organization_id
process_id
dimension_result_id

accepted_by
accepted_at

reason NULLABLE
```

Nunca simplemente quitar la etiqueta “vencido”.

---

# 115. Reaplicación

Cuando llega nuevo DimensionResult:

Transacción:

```text
BEGIN

old.is_current = false
new.is_current = true

COMMIT
```

Evitar intervalos donde existan dos resultados actuales.

---

# 116. Reaplicación de base

Nueva evaluación base genera:

- cinco nuevos DimensionResult;
- nuevo BaseIntegrityResult;
- nuevo ArchetypeResult.

Los anteriores:

```text
is_current = false
```

---

# 117. CandidateProfileSummary

Puede existir una vista para rendimiento.

Ejemplo:

```text
candidate_profile_summary_view
```

contiene:

- arquetipo actual;
- base vigente;
- verificación;
- número de dimensiones vigentes.

No es la fuente primaria.

---

# 118. Consultas críticas a optimizar

El sistema debe responder rápidamente:

### Consulta 1

¿Qué resultados vigentes tiene este candidato?

### Consulta 2

¿Qué necesita responder para este cargo?

### Consulta 3

¿Qué reportes compró esta empresa?

### Consulta 4

¿Qué versión produjo este resultado?

### Consulta 5

¿Qué candidatos tienen evaluaciones próximas a vencer?

### Consulta 6

¿Qué evaluaciones fueron afectadas por AlgorithmVersion X?

---

# 119. Impact analysis

Gracias a las relaciones de versión debe poder ejecutarse:

```text
SELECT assessments
WHERE algorithm_version_id = X
```

y después:

```text
SELECT reports
FROM affected_assessments
```

Esto es crítico ante errores.

---

# 120. Exportación para psicometría

No entregar acceso directo de científicos/analistas a producción.

Crear pipelines hacia dataset controlado.

Ejemplo:

```text
psychometric_dataset
```

con:

- pseudónimo de candidato;
- item;
- response;
- timing;
- dimension;
- version;
- country;
- role;
- outcome.

Eliminar datos identificativos innecesarios.

---

# 121. IDs pseudonimizados

Para investigación:

usar:

```text
research_subject_id
```

distinto de:

```text
candidate_id
```

Reduce exposición.

---

# 122. Warehouse futuro

Esquema analítico posible:

### FactAssessment

### FactResponse

### FactReport

### FactOutcome

### DimCandidateAnonymous

### DimOrganization

### DimJob

### DimDimension

### DimTime

No construir obligatoriamente para MVP.

---

# 123. Backup

Debe existir:

- backup automático;
- backup cifrado;
- prueba periódica de restauración.

Tener backup sin probar restauración no es suficiente.

---

# 124. Recovery

Definir posteriormente:

- RPO;
- RTO.

Para MVP ya debe existir procedimiento documentado.

---

# 125. Entornos

Bases separadas:

```text
development
staging
production
```

Nunca utilizar datos personales reales de producción libremente en desarrollo.

---

# 126. Datos para QA

Crear candidatos sintéticos.

Ejemplo:

```text
TEST-CANDIDATE-001
```

No copiar bases productivas completas.

---

# 127. Migraciones

Toda modificación de esquema debe realizarse mediante:

**versioned database migrations**

Ejemplo:

```text
001_create_candidate
002_create_assessment
003_add_algorithm_version
```

No cambios manuales directos sin registro.

---

# 128. Seed psicométrico

Configuraciones como:

- dimensiones;
- cortes;
- arquetipos;

no deberían ser seeds irreversibles sin versión.

Deben administrarse mediante sistema de configuración gobernado.

---

# 129. Auditoría de administradores

Especial vigilancia sobre:

- acceso a fotografía;
- documento;
- resultados sensibles;
- scoring;
- cambios de versión.

Todo acceso privilegiado debe registrarse.

---

# 130. Capa de autorización

Antes de acceder a un reporte:

```text
user
↓
organization
↓
permission
↓
report entitlement
↓
sensitivity restriction
↓
allow / deny
```

No basta con conocer el report_id.

---

# 131. URLs

No utilizar URLs predecibles:

```text
/report/1234
```

sin controles robustos.

Usar IDs no secuenciales y autorización del servidor.

---

# 132. Descarga de archivos

PDFs y fotografías:

utilizar URLs firmadas con expiración corta.

No enlaces públicos permanentes.

---

# 133. Fotografía eliminada

Cuando vence retención:

```text
storage object = deleted
verification_media.deleted_at = timestamp
```

Puede conservarse:

```text
verification_status = VERIFIED
```

cuando legalmente proceda.

---

# 134. Eliminación de cuenta

La eliminación debe ser un workflow.

No:

```text
DELETE FROM candidate
```

sin análisis.

Flujo:

1. solicitud;
2. verificar identidad;
3. identificar obligaciones;
4. eliminar lo eliminable;
5. anonimizar lo necesario;
6. preservar lo legalmente justificable;
7. registrar ejecución.

---

# 135. DataDeletionRequest

```text
data_deletion_request
```

Campos:

```text
request_id
candidate_id
status
requested_at
completed_at
execution_summary
```

---

# 136. Acceso/exportación de datos

Preparar:

```text
data_subject_request
```

Tipos:

- ACCESS
- EXPORT
- RECTIFICATION
- DELETION

según jurisdicción.

---

# 137. Logs inmutables

Para eventos de alta sensibilidad puede contemplarse almacenamiento append-only o sistema de logs inmutables.

Especialmente:

- scoring changes;
- privileged access;
- report corrections.

---

# 138. Arquitectura lógica final

```text
                    ┌─────────────────┐
                    │   CANDIDATE     │
                    └────────┬────────┘
                             │
                ┌────────────┼─────────────┐
                │            │             │
                ▼            ▼             ▼
           IDENTITY       PROFILE      CONSENTS
                │
                ▼
          ASSESSMENTS
                │
        ┌───────┼──────────┐
        ▼       ▼          ▼
      ITEMS  RESPONSES   EVENTS
                │
                ▼
             QUALITY
                │
                ▼
      DIMENSION RESULTS
                │
        ┌───────┴────────┐
        ▼                ▼
   BASE INDEX        ARCHETYPE
        │                │
        └───────┬────────┘
                ▼
       PROFESSIONAL REPORT
                │
        ┌───────┼─────────┐
        ▼       ▼         ▼
    SNAPSHOT  ACCESS   AUDIT
```

---

# 139. Modelo empresarial final

```text
ORGANIZATION
     │
     ├── UNITS
     │
     ├── USERS
     │
     ├── ROLES
     │
     ├── WALLET
     │
     └── PROCESSES
             │
             ├── JOB PROFILE VERSION
             │
             └── PROCESS CANDIDATES
                       │
                       └── ASSESSMENTS / REPORTS
```

---

# 140. MVP – tablas mínimas obligatorias

Para no sobredesarrollar inicialmente, el MVP puede comenzar con:

1. candidate
2. candidate_email
3. candidate_phone
4. candidate_consent
5. organization
6. enterprise_user
7. role / permission
8. recruitment_process
9. job_profile
10. job_profile_version
11. job_profile_dimension
12. process_candidate
13. instrument_version
14. dimension
15. dimension_version
16. item
17. item_version
17b. item_wording_variant   -- las 5 variantes de redacción; el banco
                                real y cerrado (210 reactivos + variantes
                                + alternativos + transversales) no es
                                simplificable ni en el MVP
18. item_option
19. algorithm_version
20. risk_band
21. archetype
22. archetype_version
23. assessment
24. assessment_dimension
25. assessment_item
26. response
27. assessment_event
28. verification_session
29. verification_media
30. quality_assessment
31. dimension_result
32. base_integrity_result
33. archetype_result
34. result_alert
35. professional_report
36. report_snapshot
37. report_access
38. credit_wallet
39. credit_transaction
40. audit_log

El resto puede incorporarse progresivamente.

---

# 141. Entidades que NO deben simplificarse en MVP

Aunque parezca más rápido, no recomiendo eliminar:

### Versiones de reactivos

Necesarias desde el primer día.

### AlgorithmVersion

Necesario desde el primer día.

### ReportSnapshot

Necesario desde el primer día.

### DimensionResult independiente de empresa

Necesario para la portabilidad.

### AuditLog

Necesario para producto sensible.

### Variantes de redacción y slots duales (item_wording_variant, slot_alternative_type)

Necesarios desde el primer día: sin registrar qué variante y qué versión de slot se administró, no hay equating posible al migrar a TRI/IRT ni análisis de equivalencia (Fase 9).

### country_code obligatorio en Assessment + activación de Baremo por país

Necesario desde el primer día: sin país registrado no puede resolverse Baremo General vs. Baremo por país (umbral ≥300 casos).

### PRB / Multiplicador_final / Riesgo_ajustado / IGI_reportado como campos separados

Necesario desde el primer día en `base_integrity_result`: guardar solo el IGI final impide auditar el cálculo.

### 5 indicadores de validez independientes (quality_assessment)

Necesario desde el primer día: Azarosidad, Omisión, Aquiescencia, Contradicción y Deseabilidad Social deben tener estado propio, sin colapsarse en un único flag genérico.

---

# 142. Condición de aceptación de arquitectura

La arquitectura estará correctamente diseñada si puede responder sin ambigüedad:

### A.

¿Qué respondió exactamente este candidato?

### B.

¿Qué versión del reactivo respondió?

### C.

¿Qué algoritmo calculó el score?

### D.

¿Qué puntos de corte se aplicaron?

### E.

¿Qué norma se utilizó?

### F.

¿Qué arquetipo estaba vigente?

### G.

¿Qué reporte vio la empresa?

### H.

¿Qué versión histórica compró?

### I.

¿Quién accedió a ese reporte?

### J.

¿De dónde nació cada resultado reutilizado?

Si cualquiera de estas preguntas no puede responderse, falta trazabilidad.

---

# 143. Resultado de esta arquitectura

Esta estructura permite construir un sistema donde:

**el candidato es persistente;**

**las evaluaciones son eventos;**

**las dimensiones producen resultados reutilizables;**

**las empresas compran acceso profesional;**

**los algoritmos evolucionan;**

**los históricos permanecen;**

**y cada decisión técnica puede ser auditada.**

Ese es el modelo de datos necesario para soportar correctamente el producto que hemos diseñado.

---

**Nota de reconciliación (2026-09-16):** modelo ajustado para coincidir con las reglas de negocio y el modelo de cálculo vigentes (DECISIONS.md).