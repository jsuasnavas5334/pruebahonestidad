# PLAN DE CONSTRUCCIÓN MVP V1
## De cero a piloto funcional

## 1. Objetivo

Construir una primera versión funcional, segura y testeable de la plataforma que permita ejecutar de extremo a extremo el ciclo:

**Candidato → Evaluación → Scoring → Arquetipo → Empresa → Reporte profesional → PDF → Auditoría**

El objetivo del MVP no es construir todas las capacidades futuras.

Debe demostrar:

1. que el candidato completa la evaluación;
2. que el scoring funciona y es reproducible;
3. que el arquetipo genera valor;
4. que la empresa entiende el reporte;
5. que existe disposición de pago;
6. que la arquitectura soporta evolución posterior.

---

# 2. Principio de ejecución

No desarrollar módulo por módulo de forma aislada.

Se utilizará estrategia de:

**vertical slices**

Es decir:

cada etapa debe dejar un flujo utilizable de principio a fin.

---

# 3. Fases generales

## Fase 0

Preparación.

## Fase 1

Vertical Slice técnico.

## Fase 2

Experiencia real del candidato.

## Fase 3

Motor psicométrico.

## Fase 4

Verificación.

## Fase 5

Empresa.

## Fase 6

Reporte y monetización.

## Fase 7

Operación y seguridad.

## Fase 8

Piloto.

---

# 4. EPIC 0 – Fundaciones

Objetivo:

crear la infraestructura mínima para construir correctamente.

Incluye:

- repositorios;
- ambientes;
- CI/CD;
- PostgreSQL;
- Redis;
- Object Storage;
- estructura backend;
- estructura frontend;
- autenticación base;
- observabilidad;
- migrations;
- logging;
- secrets.

---

# 5. Sprint 0 – Setup técnico

## Backend

Crear:

```text
/apps
/packages
/services
```

Configurar:

- API;
- PostgreSQL;
- ORM/data layer;
- Redis;
- migrations.

## Frontend

Crear:

- Candidate Web;
- Enterprise Web;
- Admin Web o shell inicial.

## Infraestructura

Ambientes:

- development;
- staging;
- production skeleton.

## CI/CD

Pipeline:

```text
lint
test
build
security scan
deploy staging
```

## Seguridad

Configurar:

- Secret Manager;
- TLS;
- headers;
- rate limiting básico.

### Entregable

Sistema vacío desplegado y accesible.

### Done

Frontend puede llamar backend.

Backend puede leer/escribir DB.

---

# 6. EPIC 1 – Identidad del candidato

Objetivo:

permitir crear y recuperar candidatos.

---

# 7. Sprint 1 – Registro y autenticación

Construir:

### Landing

- CTA;
- tracking fuente.

### País

- detección;
- confirmación.

### Privacidad

- versión;
- aceptación;
- registro.

### Registro

- nombre;
- apellido;
- correo;
- teléfono.

### OTP

- envío;
- validación;
- expiración;
- reenvío;
- intentos.

### Candidate Profile

Crear entidades:

- candidate;
- candidate_email;
- candidate_phone;
- candidate_consent.

### Recuperación

Detectar perfil existente.

### Entregable

Usuario puede:

```text
Landing
→ Registro
→ OTP
→ Perfil creado
```

### Métricas

Registrar:

- signup_started;
- signup_completed;
- otp_sent;
- otp_verified.

---

# 8. EPIC 2 – Motor mínimo de evaluación

Objetivo:

crear la columna vertebral del producto antes de trabajar scoring real.

---

# 9. Sprint 2 – Evaluación demo

Inicialmente utilizar:

**5–10 reactivos ficticios.**

Construir:

- Assessment;
- AssessmentItem;
- Response;
- secuencia;
- progreso;
- no retroceso;
- persistencia;
- cierre.

Endpoint:

```text
create assessment
get next item
submit answer
complete
```

### Reglas

Respuesta confirmada:

**debe estar persistida.**

### Idempotencia

Implementada.

### Entregable

Candidato responde una evaluación ficticia completa.

---

# 10. Sprint 3 – Recuperación y resiliencia

Construir:

- autosave;
- session recovery;
- interrupción;
- reconexión;
- expiración de sesión;
- eventos.

Registrar:

- connection_lost;
- connection_restored;
- tab_blur;
- tab_focus;
- session_resumed.

### Pruebas

Simular:

- cerrar navegador;
- apagar internet;
- refrescar;
- doble click.

### Entregable

Ninguna respuesta confirmada se pierde.

---

# 11. EPIC 3 – Instrumento psicométrico

Objetivo:

incorporar el banco base real.

---

# 12. Sprint 4 – Banco y versionamiento

Construir:

- Instrument;
- InstrumentVersion;
- Dimension;
- DimensionVersion;
- Item;
- ItemVersion;
- ItemOption.

Carga inicial:

5 dimensiones base.

Inicialmente:

10 reactivos productivos por dimensión (subconjunto ya escrito y validado del banco cerrado de 210 reactivos × 5 variantes — ver DECISIONS.md; esta épica carga contenido existente, no lo crea).

Agregar:

controles transversales disponibles.

### Backoffice mínimo

Debe permitir:

- consultar reactivos;
- revisar versiones;
- activar/desactivar.

No necesita todavía edición visual avanzada.

### Entregable

El backend puede construir una evaluación de aproximadamente 55–60 reactivos.

---

# 13. Sprint 5 – Randomización

Implementar:

- mezcla de dimensiones;
- separación de pares;
- distribución de controles;
- seed;
- reproducibilidad.

Reglas iniciales:

- evitar concentración;
- evitar patrones evidentes;
- mezclar formatos.

### Testing

Dada la misma seed:

mismo orden.

### Entregable

Evaluación real construida dinámicamente.

---

# 14. EPIC 4 – Scoring

Objetivo:

convertir respuestas en resultados reproducibles.

---

# 15. Sprint 6 – Scoring dimensional

Implementar:

- claves;
- directos;
- invertidos;
- pesos;
- raw score;
- normalización 0–95.

Primera configuración:

```text
peso = 1
```

Scoring server-side.

### Golden Tests

Crear perfiles artificiales.

### Entregable

Cinco scores:

- Robo;
- Mentira;
- Fraude;
- Irresponsabilidad;
- Soborno.

---

# 16. Sprint 7 – Risk bands e índice base

Implementar:

- seis niveles;
- thresholds parametrizados;
- IGI (Índice General de Integridad) — cálculo: PRB → multiplicador de nivel de puesto (6 niveles, 0.70–1.50, +0.15 si tiene personal a cargo) → riesgo ajustado → IGI = (1 − riesgo_ajustado) × 100 × 0.95, tope 95, nunca 100. No es un promedio ponderado simple;
- AlgorithmVersion;
- ScoringConfiguration.

Cortes de las 6 bandas: provisionales hasta calibrar con datos del piloto (la fórmula del IGI en sí ya está definida y no es provisional).

No hardcode.

### Entregable

Ejemplo:

```text
Robo 84/95 – Nivel 1
Mentira 68/95 – Nivel 3
...
IGI 77/95
```

---

# 17. EPIC 5 – Quality Engine

Objetivo:

evitar emitir conclusiones con aplicaciones deficientes.

---

# 18. Sprint 8 – Calidad básica

Implementar:

### Completitud

100%.

### Tiempo

- response_time;
- speed flags.

### Cambios de pestaña

contador.

### Contradicciones

primer conjunto de reglas.

### Atención

primeras reglas.

### Resultado

- ADEQUATE;
- WITH_OBSERVATIONS;
- NON_INTERPRETABLE.

### Entregable

Motor puede bloquear interpretación.

---

# 19. Sprint 9 – Deseabilidad y consistencia

Agregar:

- Impression Management Index;
- Consistency Index;
- contradicciones agregadas.

Todo parametrizado.

No alterar automáticamente scores.

### Entregable

QualityReport auditable.

---

# 20. EPIC 6 – Arquetipo

Objetivo:

crear el producto gratuito.

---

# 21. Sprint 10 – Archetype Engine

Construir:

- Archetype;
- ArchetypeVersion;
- ArchetypeModelVersion.

Primera versión:

**rule-based provisional.**

Input:

cinco scores base.

Output:

- archetype;
- fit score opcional.

### Contenido

Para cada arquetipo:

- nombre;
- frase;
- descripción;
- fortalezas;
- áreas de atención;
- presión;
- normas.

### Entregable

Candidato obtiene arquetipo.

---

# 22. Sprint 11 – Resultado candidato

Diseñar:

- revelación;
- perfil;
- vigencia;
- verificación;
- compartir.

Implementar:

- tarjeta;
- link;
- QR;
- Web Share API.

### Entregable

Experiencia gratuita completa.

---

# 23. EPIC 7 – Cámara y verificación

Objetivo:

crear aplicaciones profesionales verificadas.

---

# 24. Sprint 12 – Cámara básica

Frontend:

- permiso;
- preview;
- captura inicial;
- error;
- reactivación.

Backend:

- VerificationSession;
- VerificationMedia.

Object Storage:

- signed upload.

### Entregable

Candidato puede completar evaluación verificada.

---

# 25. Sprint 13 – Capturas distribuidas

Implementar:

aproximadamente 8 capturas.

Eventos:

- capture_requested;
- upload_completed;
- camera_lost.

Agregar:

retention metadata.

### Entregable

Sesión con evidencia completa.

---

# 26. EPIC 8 – Empresa

Objetivo:

crear primer flujo comercial B2B.

---

# 27. Sprint 14 – Organización y usuarios

Construir:

- organization;
- enterprise_user;
- role;
- permissions;
- login empresarial.

Roles MVP:

- ADMIN;
- PROFESSIONAL;
- VIEWER.

### Entregable

Una empresa puede registrarse y entrar.

---

# 28. Sprint 15 – Procesos y cargos

Construir:

- recruitment_process;
- job_profile;
- job_profile_version;
- job_profile_dimension.

Configuración:

- dimensiones;
- exigencia 1–6.

MVP:

recomendaciones basadas en reglas.

### Entregable

Empresa crea un cargo y proceso.

---

# 29. Sprint 16 – Invitaciones

Construir:

- invitation;
- email;
- link seguro.

Estados:

- sent;
- opened;
- started;
- completed.

### Entregable

Empresa invita candidato.

Candidato entra por enlace empresarial.

---

# 30. EPIC 9 – Portabilidad y reutilización

Objetivo:

implementar una de las ventajas centrales del producto.

---

# 31. Sprint 17 – DimensionResult

Construir:

- DimensionResult;
- valid_from;
- valid_until;
- current/historical.

Regla inicial:

180 días.

### Entregable

Resultados quedan en perfil.

---

# 32. Sprint 18 – Reutilización

Al crear evaluación empresarial:

consultar:

- vigente;
- vencido;
- inexistente.

Reglas:

```text
vigente → reutilizar
vencido → recomendar repetir
faltante → aplicar
```

### Entregable

Candidato no repite automáticamente dimensiones vigentes.

---

# 33. EPIC 10 – Reporte empresarial

Objetivo:

construir el producto pagado.

---

# 34. Sprint 19 – Resumen ejecutivo

Construir:

- ProfessionalReport;
- ReportSnapshot;
- reporte web.

Mostrar:

- arquetipo;
- IGI (Índice General de Integridad);
- cinco dimensiones;
- nivel;
- calidad;
- vigencia.

### Entregable

Primer reporte profesional funcional.

---

# 35. Sprint 20 – Interpretaciones

Construir:

- InterpretationTemplate;
- InterviewQuestion;
- Alert.

Cada dimensión:

- score;
- nivel;
- interpretación;
- factores;
- preguntas.

### Entregable

Reporte accionable.

---

# 36. Sprint 21 – PDF

Construir:

- HTML template;
- worker;
- queue;
- PDF;
- storage;
- signed download.

### Entregable

PDF histórico inmutable.

---

# 37. EPIC 11 – Monetización

Objetivo:

probar disposición de pago.

---

# 38. Sprint 22 – Wallet y créditos

Construir:

- CreditWallet;
- CreditTransaction;
- ReportEntitlement.

Flujos:

- promoción;
- consumo;
- desbloqueo.

### Entregable

Empresa usa créditos para desbloquear reporte.

---

# 39. Sprint 23 – Pago

Integrar proveedor de pago cuando corresponda.

Soportar:

- compra de créditos;
- confirmación;
- webhook;
- factura/comprobante según operación comercial.

### Regla

Idempotencia obligatoria.

### Entregable

Empresa puede pagar.

---

# 40. EPIC 12 – Backoffice

Objetivo:

operar el producto sin depender de desarrolladores.

---

# 41. Sprint 24 – Administración

Construir vistas:

- candidatos;
- empresas;
- evaluaciones;
- reportes;
- créditos;
- incidencias.

Acciones:

- consultar;
- suspender;
- reiniciar autorizado;
- revisar estado.

---

# 42. Sprint 25 – Psicometría

Backoffice restringido:

- dimensiones;
- reactivos;
- versiones;
- algoritmos;
- risk bands;
- arquetipos.

Inicialmente:

lectura + publicación controlada.

No necesita editor perfecto.

---

# 43. EPIC 13 – Soporte

---

# 44. Sprint 26 – Incidencias

Construir:

- SupportCase;
- categoría;
- prioridad;
- estado;
- responsable;
- resolución.

Integrar:

“Reportar pregunta”.

### Entregable

Incidencia rastreable.

---

# 45. EPIC 14 – Auditoría y seguridad

---

# 46. Sprint 27 – AuditLog

Registrar:

- login;
- consentimiento;
- reporte;
- descarga;
- cambios;
- scoring versions;
- créditos;
- acceso sensible.

### Entregable

Trazabilidad de acciones críticas.

---

# 47. Sprint 28 – Hardening

Ejecutar:

- permisos;
- tenant isolation;
- rate limits;
- security headers;
- signed URLs;
- secret rotation;
- dependency scan;
- backups;
- restore test.

### Entregable

Versión lista para piloto controlado.

---

# 48. EPIC 15 – Analytics MVP

---

# 49. Sprint 29 – Funnel candidato

Eventos:

```text
landing_view
start
register
otp
camera
assessment_start
assessment_complete
archetype_view
share
```

Dashboard interno básico.

---

# 50. Sprint 30 – Funnel empresa

Eventos:

```text
org_created
process_created
candidate_invited
profile_viewed
unlock_started
report_unlocked
report_viewed
pdf_downloaded
```

### Entregable

Primer funnel comercial medible.

---

# 51. EPIC 16 – QA integral

---

# 52. Sprint 31 – E2E

Test completo candidato.

Test completo empresa.

Pruebas:

- refresh;
- caída internet;
- doble submit;
- expiración;
- vigencia;
- permisos.

---

# 53. Sprint 32 – Golden Tests

Psicometría entrega perfiles sintéticos.

Validar:

- scores;
- bandas;
- calidad;
- arquetipos.

Cada resultado esperado debe ser reproducible.

---

# 54. Sprint 33 – Performance

Pruebas:

- candidatos concurrentes;
- respuestas/segundo;
- PDFs;
- fotos;
- email.

Optimizar cuellos de botella.

---

# 55. EPIC 17 – Piloto interno

---

# 56. Sprint 34 – Alpha

Usuarios:

equipo interno + grupo pequeño.

Objetivos:

- bugs;
- comprensión;
- cámara;
- duración;
- scoring técnico;
- reporte.

No validar todavía comercialmente a escala.

---

# 57. Sprint 35 – Beta controlada

Grupo real de candidatos.

Empresas piloto limitadas.

Medir:

- completion;
- camera acceptance;
- tiempo;
- no interpretable;
- reporte;
- intención de compra.

---

# 58. EPIC 18 – Piloto psicométrico

No debe confundirse con QA técnico.

Objetivos:

- confiabilidad;
- discriminación;
- reactivos;
- distribución;
- consistencia;
- arquetipos.

### Meta de muestra (DECISIONS.md — no confundir con el alcance del piloto comercial de la Sección 96)

- 400-800 casos combinados antes del primer análisis (Baremo General);
- ≥300 casos por país para activar un baremo propio de ese país.

### Prerrequisitos que siguen pendientes antes del Go/No-Go de este piloto

Actualmente no existe evidencia empírica real de confiabilidad ni validez del instrumento. El Go/No-Go de este piloto (y de la Release Candidate, Sección 64) debe estar condicionado a completar, además de lo ya listado en este documento:

- panel de jueces (CVR) — `[PENDIENTE DE CONFIRMACIÓN DE GEORGE: si este panel ya se ejecutó fuera de este roadmap de software o si sigue pendiente]`;
- cognitive interviewing — `[PENDIENTE DE CONFIRMACIÓN DE GEORGE: idem]`;
- el piloto real con el tamaño de muestra indicado arriba;
- análisis de ítem con los criterios de aceptación definidos: Omega ≥.70/.80/.85 según el tipo de dimensión, correlación ítem-total ≥.30, y regla DIF 4/5.

Ninguno de estos criterios debe darse por cumplido de antemano en la planificación del roadmap.

---

# 59. Dataset mínimo del piloto

Por participante:

- respuestas;
- tiempos;
- dimensión;
- score;
- calidad;
- arquetipo;
- país;
- cargo si existe.

Cuando sea posible:

- outcome posterior.

---

# 60. Análisis inicial

Por dimensión:

### Distribución

¿Hay efecto techo/piso?

### Item-total

¿Cada reactivo discrimina? Criterio de aceptación vigente: correlación ítem-total ≥.30; DIF regla 4/5.

### Consistencia

¿Los reactivos funcionan juntos? Criterio de aceptación vigente: Omega ≥.70/.80/.85 según el tipo de dimensión.

### Tiempo

¿Hay reactivos problemáticos?

### Missing/reportes

¿Hay preguntas incomprensibles?

---

# 61. Reactivos deficientes

Clasificar:

- mantener;
- revisar;
- reemplazar;
- eliminar.

El objetivo final continúa siendo:

**10 buenos reactivos por dimensión.**

---

# 62. Pilot archetypes

Analizar:

- distribución;
- claridad;
- perfiles dominantes;
- casos ambiguos;
- fit.

No forzar 12 arquetipos.

---

# 63. EPIC 19 – Ajustes post-piloto

Después del piloto:

- reemplazar reactivos;
- recalibrar scoring;
- ajustar thresholds;
- modificar arquetipos;
- mejorar textos;
- corregir UX.

Generar nueva versión.

---

# 64. Release Candidate

Ejemplo:

```text
Instrument 1.0
Algorithm 1.0
Archetype Model 1.0
Report Template 1.0
```

Solo cuando el comité correspondiente apruebe, y solo después de completar los prerrequisitos psicométricos listados en la Sección 58 (panel de jueces CVR, cognitive interviewing, piloto real con la muestra mínima, y análisis de ítem según los criterios de aceptación definidos). Hoy no existe evidencia empírica real de confiabilidad ni validez; esta sección no debe leerse como si esa evidencia ya existiera.

---

# 65. Dependencias críticas

## UX depende de:

- flujo definido;
- textos;
- privacidad.

## Assessment Engine depende de:

- banco de reactivos.

## Scoring depende de:

- claves;
- dirección;
- fórmula provisional.

## Arquetipos dependen de:

- reglas iniciales;
- contenido.

## Reporte depende de:

- scoring;
- interpretación;
- risk bands.

## Empresa depende de:

- perfil candidato;
- evaluación.

## Monetización depende de:

- reporte funcional.

---

# 66. Ruta crítica

La ruta crítica real es:

```text
BANCO
↓
ASSESSMENT ENGINE
↓
SCORING
↓
QUALITY
↓
ARCHETYPE
↓
REPORT
↓
PILOT
```

Si esta cadena se retrasa, el producto se retrasa.

---

# 67. Trabajo paralelo

Mientras ingeniería construye:

## Psicometría

- depura reactivos;
- define claves;
- crea controles;
- define cortes piloto;
- arquetipos.

## UX

- prototipo;
- design system;
- tests.

## Legal

- privacidad;
- cámara;
- términos;
- tratamiento internacional.

## Comercial

- paquetes;
- precio;
- pilotos empresariales.

---

# 68. Equipo de producto recomendado

### Product Owner

Decisiones funcionales.

### Tech Lead

Arquitectura.

### Backend 1

Assessment/scoring/data.

### Backend/Full-stack 2

Empresa/reporting/commerce.

### Frontend

Candidate + enterprise.

### UX/UI

Interfaces.

### QA

Testing.

### Psicometrista

Instrumento.

### Apoyos parciales

- seguridad;
- DevOps;
- legal/privacy.

---

# 69. Cadencia recomendada

Sprints:

**2 semanas**

No recomiendo planear todos los 35 sprints como calendario rígido.

Los números representan orden lógico.

Varias tareas pueden ejecutarse simultáneamente.

---

# 70. Workstreams paralelos

Separar el proyecto en cuatro streams.

## Stream A – Producto/UX

Diseño y pruebas.

## Stream B – Ingeniería

Plataforma.

## Stream C – Psicometría

Instrumento/scoring.

## Stream D – Negocio/Legal

Comercial, privacidad, pilotos.

---

# 71. Milestone 1 – Technical Skeleton

Se considera alcanzado cuando:

- auth funciona;
- DB funciona;
- candidato existe;
- evaluación demo funciona.

---

# 72. Milestone 2 – Candidate Alpha

Cuando:

- registro;
- OTP;
- 50+ reactivos;
- persistencia;
- resultado demo.

---

# 73. Milestone 3 – Psychometric Alpha

Cuando:

- scoring;
- seis bandas;
- quality;
- arquetipo.

---

# 74. Milestone 4 – Enterprise Alpha

Cuando:

- empresa;
- proceso;
- candidato;
- reporte.

---

# 75. Milestone 5 – Commercial Alpha

Cuando:

- créditos;
- desbloqueo;
- PDF.

---

# 76. Milestone 6 – Pilot Ready

Cuando:

- seguridad;
- auditoría;
- backoffice;
- QA;
- analytics.

---

# 77. MVP no debe esperar módulos adicionales

La primera prueba comercial puede funcionar únicamente con:

**cinco dimensiones base.**

No esperar a tener las 21 completamente validadas.

Arquitectura soporta todas.

Producto inicial valida primero el núcleo.

---

# 78. Dimensiones adicionales

Después del flujo base estable:

incorporar progresivamente:

- las 7 dimensiones Adicionales (Deslealtad, Favoritismo, Abuso de Recursos, Acoso Sexual, Maltrato Laboral, Discriminación, Asociación Criminal), configurables por puesto y que sí entran al cálculo del IGI cuando el puesto las activa;
- las 9 dimensiones Contextuales (Sustancias Lícitas, Sustancias Ilícitas, Incumplimiento de Normas, Deudas, Impulsividad, Violencia, Ludopatía, Egoísmo, Impunidad), puramente informativas, que **jamás** deben entrar al cálculo del IGI aunque estén activas en la batería.

Cada una podrá entrar como:

**PILOT**

antes de convertirse en:

**ACTIVE / VALIDATED**

---

# 79. WhatsApp

No incluir como requisito bloqueante del MVP inicial.

Primera versión:

WhatsApp puede servir únicamente para:

- invitación;
- recordatorio;
- enlace.

Evaluación completa dentro de WhatsApp:

fase posterior.

---

# 80. Buscador de talento

No desarrollar antes de validar:

- candidato;
- empresa;
- pago;
- reutilización.

El buscador depende de tener suficiente masa de candidatos.

---

# 81. API pública

Tampoco bloquea piloto.

Arquitectura debe estar preparada.

API pública se incorpora después de validar clientes empresariales.

---

# 82. Criterios Go/No-Go para piloto

Antes de abrir usuarios reales:

### GO si:

- respuestas no se pierden;
- scoring reproducible;
- reportes congelados;
- tenants aislados;
- consentimientos registrados;
- cámara funciona;
- soporte puede intervenir;
- auditoría funciona.

### NO-GO si:

- scores varían sin razón;
- existe pérdida de respuestas;
- empresa puede acceder a otro tenant;
- PDF no coincide con reporte;
- resultados no pueden reconstruirse;
- datos sensibles están expuestos.

---

# 83. Criterios Go/No-Go comerciales

Después de primeros pilotos:

### Señales positivas

- empresa entiende reporte;
- utiliza preguntas de entrevista;
- solicita nuevos candidatos;
- compra más de un reporte;
- candidato completa sin fricción excesiva.

### Señales negativas

- reportes no generan acción;
- empresa necesita explicación constante;
- candidato abandona masivamente;
- cámara destruye conversión;
- arquetipo no genera interés.

---

# 84. KPIs de piloto candidato

Medir:

- start rate;
- signup completion;
- OTP success;
- camera acceptance;
- assessment completion;
- median duration;
- noninterpretable rate;
- archetype view;
- share rate.

---

# 85. KPIs piloto empresa

Medir:

- process creation;
- invitation rate;
- completed candidates;
- profile-to-report conversion;
- report view;
- PDF downloads;
- repeat reports;
- feedback utility.

---

# 86. KPIs técnicos

- API p95;
- error rate;
- answer save failures;
- session recovery;
- camera upload failures;
- scoring errors;
- PDF failures;
- queue failures.

---

# 87. KPIs psicométricos

- distribución por dimensión;
- reliability;
- item-total correlation;
- contradiction rates;
- social desirability;
- completion;
- item response time;
- archetype distribution.

---

# 88. Registro de decisiones

Durante construcción mantener:

**Architecture Decision Records – ADRs**

Ejemplo:

```text
ADR-001
Use PostgreSQL

ADR-002
Monolith Modular

ADR-003
Server-side Scoring
```

Esto evita rediscutir decisiones meses después.

---

# 89. Definition of Ready

Una historia entra a desarrollo cuando:

- objetivo claro;
- UX definido;
- reglas claras;
- dependencias disponibles;
- criterios de aceptación escritos.

---

# 90. Definition of Done

Una historia está terminada cuando:

- código completo;
- test unitario;
- test integración cuando aplica;
- QA aprobado;
- analytics agregado;
- permisos revisados;
- documentación actualizada;
- staging funcionando.

---

# 91. Riesgos críticos del proyecto

## Riesgo 1

Querer desarrollar las 21 dimensiones antes de validar núcleo.

**Mitigación:** comenzar base.

## Riesgo 2

Crear scoring antes de cerrar estructura de reactivos.

**Mitigación:** scoring configurable.

## Riesgo 3

Sobrecargar MVP con IA.

**Mitigación:** reglas primero.

## Riesgo 4

Construir demasiados microservicios.

**Mitigación:** monolito modular.

## Riesgo 5

No versionar desde día uno.

**Mitigación:** versiones obligatorias.

## Riesgo 6

Confundir prototipo comercial con validación psicométrica.

**Mitigación:** dos procesos paralelos.

---

# 92. Riesgo de producto

El mayor riesgo no es tecnológico.

Es demostrar que:

**la empresa percibe suficiente valor en el reporte profesional como para pagar recurrentemente.**

Por eso la experiencia empresarial debe probarse temprano.

---

# 93. Riesgo psicométrico

No asumir que:

- los cortes son correctos;
- 10 reactivos son suficientes;
- los arquetipos existen estadísticamente;
- el 5% tiene significado demostrado.

Todo debe validarse.

---

# 94. Primer piloto recomendado

Realizar inicialmente:

### Etapa A

Candidatos voluntarios.

Objetivo:

UX + datos psicométricos.

### Etapa B

1–3 empresas piloto.

Objetivo:

reporte + operación.

### Etapa C

Empresas pagadas.

Objetivo:

validación comercial.

---

# 95. Empresa piloto

Idealmente seleccionar organizaciones con:

- varios procesos;
- disposición a dar feedback;
- diferentes cargos;
- contacto directo con RR. HH.

No buscar únicamente empresas enormes al comienzo.

---

# 96. Alcance del piloto empresarial

Ejemplo:

```text
3 empresas
5 cargos
50–150 candidatos
```

Cantidad definitiva dependerá de capacidad y objetivo estadístico.

Esto no reemplaza una muestra formal de validación psicométrica.

---

# 97. Lanzamiento progresivo

No abrir inmediatamente a todo LATAM.

Primero:

**mercado controlado**

↓

mejoras

↓

más empresas

↓

más países

↓

más dimensiones.

---

# 98. Roadmap posterior al MVP

## Release 1.1

- dimensiones adicionales;
- comparación.

## Release 1.2

- WhatsApp mejorado;
- carga masiva.

## Release 1.3

- analytics empresarial.

## Release 1.4

- API inicial.

## Release 2.0

- buscador de talento.

## Release 2.x

- SSO;
- ATS;
- HRIS;
- white-label.

---

# 99. Entregables antes de iniciar código

Deben existir como mínimo:

1. Figma flujo candidato.
2. Figma reporte empresa.
3. Banco base revisado.
4. Claves base.
5. Scoring provisional.
6. Cortes provisionales.
7. Primeros arquetipos.
8. Textos del reporte.
9. Políticas legales iniciales.
10. arquitectura aprobada.

---

# 100. Entregable final de MVP

El sistema debe permitir demostrar en vivo:

```text
Empresa crea proceso
↓
Invita candidato
↓
Candidato se registra
↓
Verifica correo
↓
Activa cámara
↓
Realiza evaluación
↓
Sistema calcula
↓
Candidato obtiene arquetipo
↓
Empresa ve arquetipo
↓
Empresa desbloquea
↓
Ve reporte profesional
↓
Descarga PDF
↓
Todo queda auditado
```

---

# 101. Definición de éxito

El MVP habrá cumplido su función si permite responder con datos reales:

### Producto

¿La gente termina la prueba?

### Candidato

¿El arquetipo genera interés?

### Empresa

¿El reporte ayuda?

### Comercial

¿Pagan?

### Psicometría

¿Los reactivos funcionan?

### Tecnología

¿El sistema es estable?

Si esas seis respuestas son positivas, el siguiente paso ya no será construir un MVP.

Será construir una empresa escalable alrededor del producto.

---

**Nota de reconciliación (2026-09-16):** ajustado para coincidir con el banco de reactivos y el modelo de cálculo vigentes (DECISIONS.md).