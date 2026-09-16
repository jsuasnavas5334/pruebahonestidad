# ARQUITECTURA TÉCNICA V1
## Plataforma Digital de Evaluación de Integridad

## 1. Objetivo

Definir la arquitectura tecnológica necesaria para soportar de forma segura, escalable y auditable:

- experiencia del candidato;
- portal empresarial;
- backoffice;
- motor de evaluaciones;
- scoring psicométrico;
- verificación de identidad;
- almacenamiento de evidencias;
- reportes;
- créditos y monetización;
- notificaciones;
- integraciones;
- analytics;
- auditoría;
- evolución futura del producto.

La arquitectura debe permitir comenzar con un MVP sin crear una infraestructura innecesariamente compleja, pero evitando decisiones que obliguen a reconstruir el producto cuando escale.

---

# 2. Principio arquitectónico principal

No recomiendo iniciar con microservicios independientes para cada módulo.

Para el MVP recomiendo:

**Monolito modular + servicios especializados desacoplados**

Esto significa:

```text
Frontend
   ↓
API principal
   ↓
Backend modular
   ├── Candidate
   ├── Organization
   ├── Recruitment
   ├── Assessment
   ├── Results
   ├── Reporting
   ├── Commerce
   └── Administration

Servicios especializados
   ├── Scoring Engine
   ├── Verification Service
   ├── Notification Worker
   ├── PDF Worker
   └── Analytics Pipeline
```

Ventajas:

- menor complejidad inicial;
- desarrollo más rápido;
- transacciones más sencillas;
- auditoría consistente;
- menor costo de infraestructura;
- posibilidad de separar servicios posteriormente.

---

# 3. Arquitectura general

```text
                        INTERNET
                            │
                            ▼
                  ┌───────────────────┐
                  │ CDN / WAF / Edge  │
                  └─────────┬─────────┘
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
     CANDIDATE WEB APP              ENTERPRISE WEB APP
     Mobile-first                   Desktop-first
             │                             │
             └──────────────┬──────────────┘
                            ▼
                    API GATEWAY / BFF
                            │
                            ▼
                 ┌─────────────────────┐
                 │ APPLICATION BACKEND │
                 │   Modular Core      │
                 └──────────┬──────────┘
                            │
       ┌────────────────────┼──────────────────────┐
       ▼                    ▼                      ▼
 ASSESSMENT ENGINE     BUSINESS LOGIC        AUTH / RBAC
       │
       ▼
 SCORING ENGINE
       │
       ▼
 RESULTS / ARCHETYPES
       │
       ▼
 REPORT ENGINE
                            │
           ┌────────────────┼─────────────────┐
           ▼                ▼                 ▼
      PostgreSQL          Redis          Object Storage
           │
           ▼
      Event / Queue
           │
       ┌───┼───────────────┐
       ▼   ▼               ▼
 Notifications        PDF Worker      Analytics Pipeline
```

---

# 4. Frontend del candidato

Debe ser:

**mobile-first**

Tecnología conceptual:

- SPA/PWA moderna;
- renderizado web responsivo;
- soporte cámara;
- recuperación de sesiones;
- funcionamiento adecuado en Chrome, Safari y navegadores móviles modernos.

Principales módulos:

```text
/auth
/privacy
/profile
/verification
/assessment
/results
/share
/account
```

---

# 5. Frontend empresarial

Orientado principalmente a desktop.

Módulos:

```text
/dashboard
/processes
/candidates
/reports
/comparison
/talent
/analytics
/billing
/users
/settings
```

Puede compartir componentes y autenticación con el frontend del candidato, pero la experiencia debe mantenerse diferenciada.

---

# 6. Design System

Debe existir desde el inicio.

Componentes comunes:

```text
Button
Input
Select
Modal
Alert
Badge
Card
ProgressBar
ScoreBar
RiskLevel
Avatar
ArchetypeCard
StatusChip
DataTable
Drawer
Tabs
Tooltip
```

Esto permite mantener consistencia entre:

- candidato;
- empresa;
- backoffice.

---

# 7. Backend principal

Recomiendo arquitectura modular por dominio.

```text
/modules

identity
candidate
organization
recruitment
assessment
psychometrics
results
reporting
commerce
notifications
support
audit
analytics
```

Cada módulo tendrá:

```text
controller
service
repository
domain
events
tests
```

---

# 8. API

API externa:

```text
HTTPS
REST inicialmente
```

No es necesario comenzar con GraphQL.

REST simplifica:

- permisos;
- trazabilidad;
- caching;
- integraciones futuras.

Ejemplo:

```text
POST /v1/candidates
POST /v1/assessments
GET  /v1/assessments/{id}
POST /v1/assessments/{id}/responses
GET  /v1/candidates/{id}/results
POST /v1/reports/{id}/unlock
```

---

# 9. Versionamiento de API

Desde el primer día:

```text
/api/v1/
```

No crear endpoints sin versión pública.

---

# 10. Backend for Frontend

Puede utilizarse una capa BFF para simplificar las interfaces.

Ejemplo:

El reporte empresarial necesita combinar:

- candidato;
- arquetipo;
- scores;
- alertas;
- vigencia;
- calidad.

En vez de cinco peticiones:

```text
GET /enterprise/reports/{id}/summary
```

devuelve una vista preparada para frontend.

---

# 11. Authentication Service

Debe soportar inicialmente:

### Candidato

- email + OTP;
- recuperación;
- sesión persistente segura.

### Empresa

- email/password seguro;
- MFA posteriormente;
- SSO en planes corporativos.

---

# 12. Sesiones

Usar:

- cookies seguras HttpOnly cuando corresponda;
- tokens cortos;
- refresh controlado.

Evitar almacenar tokens sensibles en:

```text
localStorage
```

si existe alternativa más segura para la arquitectura utilizada.

---

# 13. Autorización

No basta con autenticación.

Cada petición empresarial debe pasar por:

```text
usuario
↓
organización
↓
unidad
↓
rol
↓
permiso
↓
recurso
↓
sensibilidad
↓
ALLOW / DENY
```

---

# 14. RBAC

Modelo inicial:

```text
ORG_ADMIN
HR_MANAGER
RECRUITER
PROFESSIONAL
VIEWER
BILLING
```

Posteriormente puede evolucionar hacia:

**RBAC + atributos**

para restricciones más específicas.

---

# 15. Multi-tenancy

El producto será multiempresa.

Modelo:

```text
shared application
shared database
tenant separation
```

Cada entidad empresarial llevará:

```text
organization_id
```

Las consultas del backend siempre deben estar limitadas al tenant.

---

# 16. Base de datos principal

**PostgreSQL**

Será fuente de verdad para:

- usuarios;
- empresas;
- procesos;
- evaluaciones;
- respuestas;
- resultados;
- scoring versions;
- reportes;
- créditos;
- auditoría.

---

# 17. Redis

Usos:

- OTP;
- sesiones temporales;
- rate limits;
- locks;
- caché;
- recuperación temporal de evaluación;
- coordinación de workers.

Redis no será fuente definitiva de respuestas psicométricas.

---

# 18. Object Storage

Guardar:

- fotografías;
- documentos;
- PDFs;
- imágenes de arquetipos;
- exportaciones.

Estructura conceptual:

```text
/verification/
/documents/
/reports/
/archetypes/
/exports/
```

Nunca exponer el bucket públicamente.

---

# 19. URLs firmadas

Toda descarga sensible utilizará:

**signed URL temporal**

Ejemplo:

```text
valididad 5 minutos
```

La URL desaparece después.

---

# 20. Assessment Service

Responsable de:

- crear evaluación;
- resolver dimensiones;
- reutilizar resultados;
- seleccionar reactivos;
- randomizar;
- entregar siguiente pregunta;
- registrar progreso;
- finalizar.

---

# 21. Creación de evaluación

Request:

```text
candidate_id
process_id
language
channel
country_code (obligatorio — campo técnico requerido para baremos,
               nunca opcional; distinto de datos demográficos como
               edad/género/educación/industria, que sí son opcionales)
```

Assessment Service consulta:

```text
Job Profile
Candidate Results
Validity
Instrument Version
```

Y genera:

```text
Assessment
AssessmentDimension
AssessmentItems
```

---

# 22. Motor de randomización

Debe ejecutarse en backend.

No en frontend.

Input:

```text
selected_items
constraints
seed
```

Debe resolver, por dimensión, la selección de exactamente 10 reactivos administrados a partir del pool real cerrado:

```text
banco real: 21 dimensiones × 10 reactivos sustantivos = 210 reactivos
            + 5 variantes de redacción por reactivo (1,050 textos)
            + 63 reactivos alternativos (_alt) en 3 de los 10 slots
              por dimensión (op1, op2, perc1) → pool de 13 candidatos
              por dimensión (10 fijos + 3 pares clásico/alternativo)
            + 8 Deseabilidad Social, 6 control de Azarosidad (CTRL01-06),
              6 bio-data (BIO01-06) — transversales, no pertenecen a
              ninguna de las 21 dimensiones
```

Por cada uno de los 3 slots duales (op1, op2, perc1) el motor elige al azar, por aplicación, exactamente 1 versión (clásica o alternativa) — siempre resultan 10 reactivos administrados y puntuados por dimensión, nunca 13, nunca variable. Por cada reactivo elegido, el motor también selecciona 1 de las 5 variantes de redacción a mostrar.

Output:

```text
ordered_assessment_items
```

Guardar:

```text
randomization_seed
```

para reproducibilidad, y registrar por cada reactivo administrado qué variante de redacción específica se mostró y, si aplica, qué versión del slot dual (clásica o alternativa) — requisito explícito para re-calibración (equating) futura a TRI/IRT y para el análisis de equivalencia de variantes/slots duales (Fase 9).

---

# 23. Entrega de reactivos

Endpoint conceptual:

```text
GET /v1/assessments/{id}/next-item
```

Respuesta:

```json
{
  "assessment_item_id": "...",
  "type": "scale",
  "text": "...",
  "options": [...]
}
```

Nunca enviar:

```text
dimension
weight
scoring_key
critical_flag
```

---

# 24. Registro de respuesta

```text
POST /v1/assessments/{id}/responses
```

Input:

```text
assessment_item_id
selected_option
idempotency_key
client_timestamp
```

Backend:

```text
validar
↓
guardar
↓
registrar tiempo
↓
confirmar
↓
entregar siguiente
```

---

# 25. Idempotencia

Es fundamental en móviles.

Si una petición se repite por mala conexión:

```text
same idempotency_key
```

no genera dos respuestas.

---

# 26. Guardado

Cada respuesta se guarda inmediatamente en PostgreSQL.

No esperar al final para enviar todas las respuestas.

---

# 27. Recovery Service

Si usuario regresa:

```text
assessment_id
↓
status
↓
last answered item
↓
resume validity
↓
identity recheck
```

y continúa.

---

# 28. Quality Engine

Puede vivir inicialmente dentro del backend como módulo especializado.

Input:

- respuestas;
- tiempos;
- eventos;
- cámara;
- consistencia.

Output:

```text
ADEQUATE
WITH_OBSERVATIONS
NON_INTERPRETABLE
```

Más findings.

---

# 29. Scoring Engine

Debe estar lógicamente aislado del resto.

Interfaz:

```text
scoreAssessment(assessmentId, algorithmVersion)
```

Output — cada paso del cálculo debe registrarse por separado (no solo el resultado final), para permitir auditoría completa:

```text
Puntaje_dimensión        (por dimensión, promedio de reactivos EFECTIVAMENTE
                           respondidos; denominador variable, nunca fijo en 10,
                           nunca imputado)
PRB                       (promedio ponderado de riesgo de dimensiones Núcleo/Base,
                           pesos re-parametrizados a 100% entre las dimensiones
                           incluidas en la batería)
Multiplicador_final       (Multiplicador_nivel_de_puesto [6 niveles, 0.70–1.50]
                           + 0.15 si tiene personal a cargo)
Riesgo_ajustado           (MIN(1, PRB × Multiplicador_final))
IGI_reportado             ((1 − Riesgo_ajustado) × 100 × 0.95; tope estructural 95)
Alerts                    (5 indicadores de validez independientes: Azarosidad,
                           Omisión, Aquiescencia, Contradicción, Deseabilidad
                           Social — cada uno solo afecta presentación/color, no
                           el score almacenado)
ArchetypeInput
```

Nota: las dimensiones Contextuales (9) nunca entran a este cálculo; se calculan y reportan aparte.

---

# 30. Separación de código

Idealmente:

```text
/scoring-core
```

como paquete independiente.

No mezclar fórmulas en:

```text
controllers
frontend
report templates
```

---

# 31. Configuración psicométrica

Scoring Engine obtiene:

- pesos;
- claves;
- transformaciones;
- thresholds;
- normas;

desde configuración versionada.

No mediante constantes dispersas en código.

---

# 32. Reproducibilidad

La llamada:

```text
score(
 responses,
 algorithm=1.3,
 instrument=2.1
)
```

debe producir siempre exactamente el mismo resultado.

---

# 33. Archetype Engine

Servicio lógico independiente.

Input:

```text
5 base scores (dimensiones Núcleo/Base: Robo, Mentira, Fraude,
               Irresponsabilidad, Soborno)
IGI (Índice General de Integridad; antes referido como BaseIntegrityIndex)
model version
```

Output:

```text
archetype_id
fit_score
```

No utilizar datos demográficos sensibles para asignar arquetipo.

---

# 34. Interpretation Engine

Recibe:

```text
dimension score
risk level
requirement level
language
version
```

y selecciona:

- interpretación;
- factores;
- preguntas;
- recomendaciones.

En MVP:

**reglas y textos controlados.**

No depender de un LLM para producir la interpretación oficial.

---

# 35. Uso futuro de IA

IA puede utilizarse para:

- sugerir dimensiones por cargo;
- resumir información empresarial;
- apoyar soporte;
- ayudar a analizar descripciones de puesto.

No debería ser autoridad única para:

- scoring;
- cambiar score;
- decidir contratación;
- invalidar persona;
- diagnosticar mentira.

---

# 36. Verification Service

Responsable de:

- solicitar fotografías;
- almacenar evidencias;
- controlar cámara;
- recibir findings;
- administrar estado de verificación.

---

# 37. Cámara web

Frontend utiliza API del navegador para:

```text
camera permission
video preview
capture frame
```

No grabar video continuo como arquitectura base.

---

# 38. Capturas

El backend configura:

```text
capture_count
capture_distribution
```

Ejemplo:

8.

Frontend recibe únicamente la señal de captura cuando corresponde.

---

# 39. Upload de fotografía

Ideal:

```text
frontend
↓
signed upload URL
↓
object storage
↓
backend receives confirmation
```

Evita transportar archivos pesados repetidamente por el backend principal.

---

# 40. Procesamiento de evidencia

Worker asíncrono:

```text
photo uploaded
↓
queue
↓
verification worker
↓
basic analysis
↓
finding
```

La evaluación no necesita bloquearse por todos los análisis salvo controles esenciales.

---

# 41. Evidencia facial

El sistema debe limitarse técnicamente a controles relevantes como:

- imagen existente;
- rostro visible;
- número de personas;
- consistencia de identidad si jurídicamente habilitada.

No analizar:

- emoción;
- honestidad;
- personalidad;
- microexpresiones.

---

# 42. Queue System

Necesario para operaciones que no deben bloquear petición HTTP.

Trabajos:

```text
send_email
send_whatsapp
generate_pdf
process_photo
calculate_analytics
expire_results
send_reminders
generate_export
```

---

# 43. Arquitectura de cola

Conceptualmente:

```text
Backend
  ↓
Queue
  ↓
Workers
```

Debe soportar:

- retries;
- dead-letter queue;
- idempotencia;
- observabilidad.

---

# 44. Eventos internos

El producto debería operar progresivamente con eventos.

Ejemplo:

```text
AssessmentCompleted
```

puede disparar:

```text
ScoreAssessment
GenerateArchetype
NotifyCandidate
NotifyEnterprise
UpdateAnalytics
```

Esto desacopla procesos.

---

# 45. Event Outbox Pattern

Para evitar:

> evaluación se completó en DB pero el evento nunca se publicó.

Usar patrón conceptual:

```text
DB transaction
├── assessment = completed
└── outbox_event = AssessmentCompleted
```

Worker publica después.

---

# 46. Notification Service

Canales:

- email;
- WhatsApp;
- SMS futuro;
- notificación interna.

Interfaz:

```text
send(template, recipient, variables)
```

---

# 47. Templates

Nunca hardcodear textos en backend.

Tabla/config:

```text
template_code
channel
language
version
content
```

Ejemplo:

```text
ASSESSMENT_INVITATION
ASSESSMENT_REMINDER
RESULT_AVAILABLE
RESULT_EXPIRING
```

---

# 48. WhatsApp

Debe tratarse como canal independiente.

Arquitectura:

```text
Messaging Provider
       ↓
Webhook Receiver
       ↓
Messaging Service
       ↓
Assessment API
```

---

# 49. Webhooks externos

Endpoint:

```text
/webhooks/provider/whatsapp
```

Debe validar:

- firma;
- timestamp;
- replay protection.

---

# 50. PDF Service

No generar PDFs dentro de la petición principal.

Proceso:

```text
report unlocked
↓
report snapshot
↓
queue
↓
PDF worker
↓
object storage
↓
pdf_asset_id
```

---

# 51. Generación PDF

Usar HTML/CSS versionado como fuente.

Ventajas:

- mismo diseño web/PDF;
- mayor mantenimiento;
- fácil versionamiento.

---

# 52. PDF inmutable

Después de generado:

```text
hash
timestamp
report_id
snapshot_version
```

El archivo representa esa versión histórica.

---

# 53. Commerce Service

Responsable de:

- créditos;
- consumos;
- promociones;
- suscripciones;
- report unlock;
- refunds.

---

# 54. Ledger de créditos

No hacer:

```text
wallet.balance -= 10
```

sin registrar transacción.

Siempre:

```text
CreditTransaction
↓
Wallet update
```

dentro de transacción.

---

# 55. Desbloqueo de reporte

Flujo:

```text
User requests report
↓
check permission
↓
check entitlement
↓
check wallet/plan
↓
create transaction
↓
create entitlement
↓
create report access
↓
return report
```

---

# 56. Concurrencia comercial

Si usuario presiona dos veces:

**idempotency_key**

debe evitar dos cobros.

---

# 57. Report Service

Nunca calcula scores.

Consume:

```text
DimensionResults
ArchetypeResult
QualityResult
Alerts
Job Requirements
```

y genera:

```text
ReportSnapshot
```

---

# 58. Snapshot

Después de crear:

```text
immutable
```

El frontend consume el snapshot.

No consulta dinámicamente scoring actual para un reporte histórico.

---

# 59. Search Service

No obligatorio para MVP.

Cuando se implemente buscador de talento convendrá separar:

```text
transactional DB
```

de:

```text
search index
```

para búsquedas rápidas.

---

# 60. Search Index

Podrá contener perfil anonimizado:

- cargo;
- ubicación;
- experiencia;
- arquetipo;
- vigencia;
- dimensiones disponibles.

No debería contener datos sensibles innecesarios.

---

# 61. Analytics Pipeline

Eventos frontend/backend:

```text
event
↓
collector
↓
queue
↓
analytics storage
```

Separado de AuditLog.

---

# 62. Analytics

Producto:

- conversiones;
- abandono;
- cámara;
- share;
- compras.

Psicometría:

- tiempos;
- distribución;
- items;
- scores;
- arquetipos.

No deben ser necesariamente el mismo dataset físico.

---

# 63. Psychometric Research Pipeline

Pipeline controlado:

```text
Production DB
↓
ETL
↓
Pseudonymization
↓
Research Dataset
↓
Psychometric Analysis
```

No analizar directamente contra datos identificativos cuando no sea necesario.

---

# 64. Backoffice

Aplicación separada o ruta restringida:

```text
/admin
```

Módulos:

```text
companies
candidates
assessments
support
psychometrics
reports
billing
security
audit
```

---

# 65. Backoffice psicométrico

Especialmente restringido.

Permite:

- crear versión;
- cargar reactivos;
- publicar;
- modificar thresholds;
- administrar arquetipos;
- visualizar estadísticas.

Cambios requieren workflow.

---

# 66. Workflow de publicación

```text
DRAFT
 ↓
TECHNICAL_REVIEW
 ↓
PSYCHOMETRIC_REVIEW
 ↓
STAGING
 ↓
QA
 ↓
APPROVED
 ↓
PRODUCTION
```

No permitir:

```text
DRAFT → PRODUCTION
```

directamente.

---

# 67. Feature Flags

Debe implementarse mecanismo para activar/desactivar:

- nueva dimensión;
- nuevo arquetipo;
- nuevo motor;
- WhatsApp;
- buscador;
- nuevo reporte.

Permite pilotos sin afectar a todos.

---

# 68. Pilot Cohorts

Feature flags pueden aplicarse por:

- empresa;
- país;
- porcentaje;
- candidato;
- proceso.

Ejemplo:

```text
new_scoring_model
enabled only for pilot_orgs
```

---

# 69. Observabilidad

Tres pilares:

### Logs

Qué ocurrió.

### Metrics

Cuánto ocurre.

### Traces

Por dónde pasó una petición.

---

# 70. Logs estructurados

Ejemplo:

```json
{
  "event": "assessment_completed",
  "assessment_id": "...",
  "candidate_id": "...",
  "algorithm_version": "1.3"
}
```

Evitar datos sensibles completos en logs.

---

# 71. Correlation ID

Cada petición:

```text
request_id
```

Eventos relacionados:

```text
correlation_id
```

Esto permite rastrear:

```text
invitation
→ assessment
→ scoring
→ report
```

---

# 72. Métricas técnicas

Monitorear:

- API latency;
- API error rate;
- DB connections;
- queue depth;
- failed jobs;
- scoring duration;
- PDF duration;
- OTP failures;
- camera upload failures;
- webhook failures.

---

# 73. Métricas de negocio críticas

También pueden generar alertas:

```text
completion rate collapsed
report conversion collapsed
same archetype unusually frequent
noninterpretable rate increased
```

---

# 74. Error monitoring

Integrar plataforma de error tracking.

Debe capturar:

- stack;
- release;
- endpoint;
- request ID.

No incluir:

- respuestas completas;
- documentos;
- fotografías.

---

# 75. Health Checks

Endpoints internos:

```text
/health/live
/health/ready
```

Verificar:

- aplicación;
- DB;
- Redis;
- queues.

---

# 76. Seguridad perimetral

Capa edge:

```text
DNS
↓
CDN
↓
WAF
↓
Load Balancer
↓
Application
```

WAF protege contra patrones comunes.

---

# 77. Rate Limiting

Especialmente:

- login;
- OTP;
- password recovery;
- invitations;
- report download;
- APIs públicas.

---

# 78. Bot protection

Importante para:

- evaluaciones gratuitas;
- creación masiva de cuentas;
- abuso promocional.

Puede activarse dinámicamente.

---

# 79. CORS

Lista explícita de dominios permitidos.

No:

```text
Access-Control-Allow-Origin: *
```

en endpoints sensibles.

---

# 80. CSRF

Si se utilizan cookies de sesión:

aplicar protección CSRF donde corresponda.

---

# 81. Headers

Configurar:

- CSP;
- HSTS;
- frame restrictions;
- MIME protections;
- Referrer Policy.

---

# 82. Content Security Policy

Particularmente importante porque la plataforma utilizará:

- cámara;
- scripts;
- posiblemente proveedores externos.

Debe existir allowlist estricta.

---

# 83. Encryption

### En tránsito

TLS.

### En almacenamiento

Cifrado del proveedor.

### Datos críticos

Puede añadirse cifrado por campo mediante KMS.

---

# 84. KMS / Secret Manager

Guardar:

- claves;
- secretos;
- API credentials;
- claves de proveedores.

Nunca en:

- repositorio;
- variables expuestas en frontend.

---

# 85. Access to Production

Principio:

**least privilege**

Developers no deberían utilizar cuentas de administrador general para operar producción.

---

# 86. Break Glass

Para accesos excepcionales:

```text
break-glass account
```

con:

- MFA;
- logging;
- alerta;
- revisión posterior.

---

# 87. Ambientes

Mínimo:

```text
development
staging
production
```

Opcional:

```text
psychometric-pilot
```

---

# 88. Staging

Debe ser funcionalmente equivalente a producción.

Pero con:

- datos sintéticos;
- proveedores sandbox;
- pagos de prueba.

---

# 89. CI/CD

Flujo:

```text
commit
↓
automated tests
↓
security checks
↓
build
↓
staging deploy
↓
QA
↓
approval
↓
production
```

---

# 90. Branch Strategy

No es necesario un modelo excesivamente complejo.

Puede utilizarse:

```text
main
feature branches
pull requests
```

Producción siempre desde versión identificable.

---

# 91. Releases

Cada despliegue debe incluir:

```text
application_version
git_commit
database_migration
deployment_timestamp
```

---

# 92. Database Migrations

Automatizadas y versionadas.

Nunca modificar producción manualmente como mecanismo normal.

---

# 93. Rollback

Hay dos tipos.

### Application rollback

Regresar código.

### Psychometric rollback

Regresar:

- algoritmo;
- instrumento;
- thresholds;
- arquetipo.

Son conceptos diferentes.

---

# 94. Backup

PostgreSQL:

- backups automáticos;
- point-in-time recovery cuando infraestructura lo permita.

Object storage:

- versioning/configuración de recuperación según sensibilidad.

---

# 95. Disaster Recovery

Debe existir procedimiento para:

- caída de DB;
- corrupción;
- pérdida de región;
- error humano.

MVP puede tener un DR sencillo, pero documentado.

---

# 96. Escalabilidad inicial

La aplicación debe poder escalar horizontalmente.

```text
Load Balancer
     │
 ┌───┼───┐
 ▼   ▼   ▼
App App App
```

Las instancias no guardan estado de sesión exclusivamente en memoria local.

---

# 97. Stateless backend

Backend debería ser en gran parte stateless.

Estado permanente:

```text
PostgreSQL
Object Storage
Redis
```

Esto permite añadir instancias.

---

# 98. Escalabilidad de scoring

Scoring puede ejecutarse:

- síncrono si demora milisegundos;
- asíncrono si evoluciona a modelos pesados.

Interfaz debe permitir ambas modalidades.

---

# 99. Escalabilidad de PDFs

Siempre worker asíncrono.

Si 5.000 reportes se solicitan simultáneamente:

la cola absorbe demanda.

---

# 100. Escalabilidad de fotografías

Upload directo a object storage evita cargar servidores de aplicación.

---

# 101. Escalabilidad internacional

Desde el inicio almacenar:

```text
UTC timestamps
```

Mostrar en zona horaria del usuario.

No guardar únicamente:

```text
"08:30"
```

sin timezone.

---

# 102. Localización

Sistema debe utilizar:

```text
i18n keys
```

No textos hardcodeados en UI.

Ejemplo:

```text
assessment.start.title
```

Versiones:

```text
es
en
pt
```

---

# 103. Monedas

Montos:

```text
amount_minor_units
currency
```

Ejemplo:

```text
2500
USD
```

= USD 25.00.

No asumir que todos los países usan dos decimales eternamente.

---

# 104. Impuestos

Commerce Service debe separar:

```text
subtotal
tax
total
currency
```

y configuración fiscal por país.

---

# 105. Fecha de vigencia

No calcular constantemente:

```text
assessment_date + 180
```

a mano desde frontend.

Guardar:

```text
valid_from
valid_until
```

según política versionada.

---

# 106. Scheduled Jobs

Scheduler ejecutará:

- vencimientos;
- recordatorios;
- limpieza de tokens;
- retención de fotos;
- expiración de créditos;
- reintentos.

---

# 107. Retención automática

Ejemplo:

```text
verification media reached retention_until
↓
queue deletion
↓
object deleted
↓
metadata updated
↓
audit recorded
```

---

# 108. Webhooks empresariales futuros

Eventos:

```text
assessment.invited
assessment.started
assessment.completed
assessment.non_interpretable
report.ready
result.expired
verification.failed
```

---

# 109. Seguridad de webhooks

Cada webhook saliente:

- signature;
- timestamp;
- unique event ID.

Cliente puede detectar replay.

---

# 110. API empresarial futura

Separarla de endpoints frontend.

Ejemplo:

```text
/api/v1/enterprise/
```

Autenticación:

```text
OAuth/client credentials
```

o mecanismo equivalente seguro.

---

# 111. API scopes

Ejemplo:

```text
candidates:write
assessments:write
assessments:read
reports:read
```

Una integración no obtiene todos los permisos automáticamente.

---

# 112. Protección del scoring

No exponer API:

```text
/scoring-formula
```

ni claves.

Los integradores reciben resultado autorizado, no propiedad intelectual del instrumento.

---

# 113. Arquitectura de repositorios

Estructura conceptual:

```text
/apps
    candidate-web
    enterprise-web
    admin-web

/services
    api
    workers

/packages
    scoring-core
    shared-types
    ui
    validation
    observability
```

Puede implementarse inicialmente como monorepo.

---

# 114. Ventajas del monorepo inicial

- tipos compartidos;
- componentes compartidos;
- cambios coordinados;
- CI más sencillo;
- menor duplicación.

No es obligatorio técnicamente, pero resulta conveniente para un producto todavía en construcción.

---

# 115. Testing

Niveles:

```text
Unit
Integration
Contract
E2E
Security
Psychometric Golden Tests
```

---

# 116. Tests unitarios

Especialmente:

- scoring;
- risk bands;
- validity;
- wallet;
- permissions.

---

# 117. Integration tests

Ejemplo:

```text
Create Assessment
↓
Answer
↓
Complete
↓
Score
↓
Generate Result
```

---

# 118. E2E candidato

Caso mínimo:

```text
Register
→ OTP
→ Privacy
→ Camera
→ Assessment
→ Complete
→ Archetype
```

---

# 119. E2E empresa

```text
Login
→ Create Process
→ Invite
→ Candidate Completes
→ Unlock Report
→ View
→ PDF
```

---

# 120. Golden Psychometric Tests

No dependen de UI.

Input fijo.

Output exacto.

Cada release que altere scoring debe ejecutarlos.

---

# 121. Performance testing

Simular:

- cientos de candidatos simultáneos;
- respuestas concurrentes;
- múltiples reportes;
- uploads.

El punto más sensible no debería ser scoring, sino:

- DB writes;
- cámara;
- PDFs;
- notificaciones.

---

# 122. Security testing

Antes de piloto empresarial:

- dependency scanning;
- secret scanning;
- SAST;
- DAST;
- permission tests.

Antes de escala corporativa:

**penetration test externo.**

---

# 123. Privacidad por arquitectura

Minimizar exposición.

Ejemplo:

Candidate Service conoce identidad.

Psychometric analysis puede operar con:

```text
candidate_id
```

sin necesitar nombre.

---

# 124. Separación lógica de identidad

A futuro, si sensibilidad aumenta:

```text
PII store
```

puede desacoplarse del núcleo psicométrico.

No obligatorio en MVP, pero el modelo de datos ya lo permite.

---

# 125. Modelo de amenazas prioritarias

Amenazas principales:

- robo de cuentas;
- acceso empresarial cruzado;
- exposición de reportes;
- fuga de fotografías;
- scraping del banco;
- manipulación de respuestas;
- abuso promocional;
- alteración del scoring;
- insiders.

Cada una requiere controles.

---

# 126. Protección del banco de reactivos

Medidas:

```text
one item at a time
ephemeral IDs
no scoring metadata
rate limits
session-bound access
server-side item selection
```

No evita totalmente filtraciones, pero dificulta extracción masiva.

---

# 127. Prevención de descarga del banco

No endpoint:

```text
GET /items/all
```

para candidatos.

Assessment Service solo entrega el reactivo permitido en ese momento.

---

# 128. Manipulación del frontend

Nunca confiar en:

```text
score calculado por JavaScript
```

Todo scoring se realiza server-side.

---

# 129. Manipulación de estados

Cliente no envía:

```text
assessment_status = COMPLETED
```

El backend determina si realmente está completo.

---

# 130. Datos de verificación

Empresa solo ve fotografías si:

- tiene permiso;
- proceso lo permite;
- jurisdicción lo permite;
- retención sigue activa.

---

# 131. Reportes sensibles

Report Service debe aplicar:

```text
authorization
entitlement
jurisdiction
sensitivity
```

antes de responder.

---

# 132. Arquitectura futura de buscador

```text
Candidate Profile DB
↓
Anonymization
↓
Search Projection
↓
Search Index
↓
Enterprise Talent Search
```

Nombre/contacto no entra en resultados públicos.

---

# 133. Arquitectura futura de IA de cargos

```text
Job Description
↓
Preprocessing
↓
Recommendation Model
↓
Dimension Suggestions
↓
Technical Rules
↓
Professional Confirmation
```

La IA recomienda.

No configura silenciosamente el test.

---

# 134. Analytics empresarial

No ejecutar consultas pesadas directamente contra tablas transaccionales durante horario productivo cuando escale.

Crear:

- materialized views;
- replicas;
- warehouse.

---

# 135. Arquitectura MVP recomendada

Primera versión puede desplegar:

```text
1 Candidate Web
1 Enterprise/Admin Web

1 Backend Application

1 Worker Application

1 PostgreSQL

1 Redis

1 Object Storage

1 Queue

1 Email Provider

1 Verification Integration

1 Monitoring Stack
```

Esto es suficiente para el piloto.

---

# 136. Qué NO necesita el MVP

No necesita de inicio:

- Kubernetes;
- 20 microservicios;
- Kafka;
- múltiples bases regionales;
- machine learning infrastructure;
- data lake complejo;
- service mesh.

Estas tecnologías pueden incorporarse cuando exista una necesidad real.

---

# 137. Evolución prevista

## Etapa 1 – MVP

Monolito modular.

## Etapa 2 – Crecimiento

Separar workers y scoring.

## Etapa 3 – Regional

Separar:

- notifications;
- reporting;
- search;
- integrations.

## Etapa 4 – Escala

Servicios independientes donde el volumen lo justifique.

---

# 138. Primer servicio candidato a separarse

Probablemente:

**Verification / Media**

porque:

- maneja archivos;
- tiene carga distinta;
- puede utilizar proveedores externos;
- tiene reglas de privacidad especiales.

---

# 139. Segundo candidato

**Reporting / PDF**

por carga asíncrona.

---

# 140. Tercer candidato

**Scoring Engine**

cuando existan:

- múltiples versiones;
- varios canales;
- mayor volumen;
- investigación continua.

---

# 141. Cuarto candidato

**Search**

cuando el buscador de talento tenga volumen significativo.

---

# 142. Diagrama lógico MVP

```text
┌─────────────────────┐
│   Candidate Web     │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  Enterprise Web     │
└──────────┬──────────┘
           │
           ▼
┌───────────────────────────────────┐
│          Backend API              │
│                                   │
│ Auth                              │
│ Candidate                         │
│ Organization                      │
│ Recruitment                       │
│ Assessment                        │
│ Psychometrics                     │
│ Results                           │
│ Reports                           │
│ Commerce                          │
└─────────┬───────────────┬─────────┘
          │               │
          ▼               ▼
     PostgreSQL          Redis
          │
          │
          ▼
         Queue
          │
   ┌──────┼──────────┐
   ▼      ▼          ▼
 Email   PDF     Verification
Worker  Worker        Worker
   │      │           │
   └──────┼───────────┘
          ▼
    Object Storage
```

---

# 143. Diagrama lógico futuro

```text
Clients
   │
API Gateway
   │
   ├── Identity Service
   ├── Candidate Service
   ├── Organization Service
   ├── Assessment Service
   ├── Scoring Service
   ├── Report Service
   ├── Verification Service
   ├── Commerce Service
   ├── Search Service
   ├── Notification Service
   └── Integration Service
                │
              Events
                │
       Analytics / Warehouse
```

La arquitectura inicial no necesita implementar esta separación física.

---

# 144. SLO iniciales

Objetivos razonables:

### API general

p95 inferior a ~500 ms para operaciones normales.

### Guardar respuesta

respuesta percibida prácticamente inmediata.

### Availability

≥99.5% inicialmente.

### Scoring

segundos como máximo; preferiblemente muy inferior.

### Recuperación

ninguna respuesta confirmada debería perderse por refresh o caída de conexión.

---

# 145. Integridad de respuesta como requisito crítico

La prioridad técnica máxima del flujo candidato es:

```text
RESPUESTA CONFIRMADA
=
RESPUESTA PERSISTIDA
```

Nunca mostrar siguiente reactivo si el backend no confirmó almacenamiento.

---

# 146. Requisito crítico de scoring

```text
MISMAS RESPUESTAS
+
MISMA VERSIÓN
=
MISMO RESULTADO
```

Siempre.

---

# 147. Requisito crítico de históricos

```text
REPORTE EMITIDO
=
SNAPSHOT INMUTABLE
```

Siempre.

---

# 148. Requisito crítico de tenants

```text
EMPRESA A
≠
DATOS EMPRESA B
```

Una falla aquí se considera incidente crítico de seguridad.

---

# 149. Requisito crítico de candidato

Los resultados reutilizables deben estar asociados a:

```text
candidate
```

y no exclusivamente a:

```text
organization
```

Esto habilita el modelo comercial y de portabilidad definido.

---

# 150. Requisito crítico de privacidad

El sistema deberá ser capaz de identificar dónde está almacenada cada categoría de dato:

```text
PII
responses
results
photos
documents
reports
audit
analytics
```

para ejecutar políticas de retención y derechos del usuario.

---

# 151. Roadmap técnico recomendado

### Fundaciones

Infraestructura, auth, DB, CI/CD.

### Candidate Core

Registro, OTP, privacidad.

### Assessment Core

Reactivos, respuestas, recuperación.

### Psychometric Core

Scoring, quality, arquetipo.

### Verification

Cámara y evidencias.

### Enterprise Core

Empresa, procesos, cargos.

### Reporting

Reporte, PDF, snapshots.

### Commerce

Créditos y planes.

### Operations

Backoffice, soporte, auditoría.

### Integrations

WhatsApp, APIs, ATS.

### Data

Analytics y psicometría avanzada.

---

# 152. Equipo técnico mínimo recomendado para construir el MVP

La estructura funcional debería cubrir:

**Tech Lead / Software Architect**

responsable de arquitectura y decisiones transversales.

**Frontend Engineer**

candidato y empresa.

**Backend Engineer**

API, evaluación, datos.

**Segundo Full-stack/Backend Engineer**

workers, reportes, comercio e integraciones.

**UX/UI Designer**

prototipos y design system.

**QA**

automatización y pruebas.

Con apoyo especializado de:

- psicometría;
- seguridad;
- DevOps/cloud;
- privacidad/legal.

No todos necesariamente como posiciones full-time desde el primer día.

---

# 153. Orden de construcción

No recomiendo comenzar haciendo el dashboard empresarial completo.

Construir primero el núcleo técnico:

```text
Candidate
↓
Assessment
↓
Responses
↓
Scoring
↓
Archetype
↓
Report
```

Si ese flujo funciona, el resto de la plataforma se construye alrededor.

---

# 154. Vertical Slice inicial

Primera demostración técnica completa:

```text
Usuario ficticio
↓
Registro
↓
5 reactivos demo
↓
Respuestas persistidas
↓
Scoring
↓
Arquetipo ficticio
↓
Reporte empresarial demo
```

Sin pagos, sin 210 reactivos y sin WhatsApp.

Objetivo:

validar arquitectura end-to-end.

---

# 155. Segundo vertical slice

Incorporar:

```text
50 reactivos base
↓
Quality Engine
↓
0–95
↓
6 niveles
↓
Arquetipo real provisional
```

---

# 156. Tercer vertical slice

Incorporar:

- cámara;
- vigencia;
- portabilidad;
- empresa;
- desbloqueo.

---

# 157. Cuarto vertical slice

Incorporar:

- módulos adicionales;
- comparación;
- créditos;
- PDF.

---

# 158. Definición de arquitectura lista para MVP

La arquitectura estará preparada cuando pueda demostrarse:

1. candidato autenticado;
2. empresa aislada por tenant;
3. evaluación creada;
4. reactivos servidos uno a uno;
5. respuestas persistidas;
6. sesión recuperable;
7. scoring reproducible;
8. arquetipo versionado;
9. evidencia de cámara almacenada con seguridad;
10. resultados reutilizables;
11. reporte congelado;
12. empresa autorizada puede desbloquearlo;
13. PDF puede generarse;
14. créditos pueden consumirse;
15. accesos quedan auditados;
16. versiones pueden coexistir;
17. una versión puede revertirse;
18. datos sensibles tienen política de acceso.

---

# 159. Arquitectura objetivo resumida

El producto se construirá sobre cinco capas:

```text
EXPERIENCE
Candidate / Enterprise / Admin

APPLICATION
Business Logic / Recruitment / Commerce

ASSESSMENT INTELLIGENCE
Assessment / Quality / Scoring / Archetypes

DATA
PostgreSQL / Redis / Storage / Analytics

PLATFORM
Security / Observability / CI-CD / Queue
```

La capa psicométrica permanece separada conceptualmente de la experiencia y de la comercial.

Esto es fundamental.

---

# 160. Decisión arquitectónica final

Para la primera versión:

**No microservicios prematuros.**

**Sí monolito modular.**

**Sí scoring aislado.**

**Sí versionamiento desde el primer día.**

**Sí colas para procesos pesados.**

**Sí PostgreSQL como fuente principal.**

**Sí Object Storage para evidencias.**

**Sí auditoría completa.**

**Sí diseño preparado para multiempresa, multidioma y múltiples países.**

Con esta arquitectura puede construirse el MVP sin comprometer la evolución hacia una plataforma regional de mayor escala.

---

**Nota de reconciliación (2026-09-16):** modelo ajustado para coincidir con las reglas de negocio y el modelo de cálculo vigentes (DECISIONS.md).