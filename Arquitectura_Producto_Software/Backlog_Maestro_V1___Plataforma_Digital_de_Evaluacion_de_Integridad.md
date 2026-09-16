# BACKLOG MAESTRO V1
## Plataforma Digital de Evaluación de Integridad

## 1. Objetivo

Este backlog convierte el PRD y el plan de construcción en unidades de trabajo ejecutables.

Cada historia incluye:

- ID;
- épica;
- prioridad;
- dependencia;
- criterio de aceptación.

Prioridades:

**MUST** = indispensable para MVP.  
**SHOULD** = muy importante, pero no bloquea primera salida.  
**COULD** = puede entrar posteriormente.  
**FUTURE** = fase posterior al MVP.

---

# ÉPICA EP-01
# FUNDACIONES E INFRAESTRUCTURA

## INF-001 – Crear repositorio principal

**Prioridad:** MUST

### Descripción

Crear estructura inicial del proyecto para frontend, backend, workers y paquetes compartidos.

### Criterios de aceptación

- Existe repositorio versionado.
- Existe rama principal protegida.
- Pull Request obligatorio.
- Linting configurado.
- Tests ejecutables.

---

## INF-002 – Crear ambientes

**Prioridad:** MUST

### Dependencias

INF-001.

### Criterios

Existen:

- development;
- staging;
- production.

Configuraciones independientes.

---

## INF-003 – Configurar PostgreSQL

**Prioridad:** MUST

### Criterios

- conexión segura;
- migrations;
- backup habilitado;
- staging separado de production.

---

## INF-004 – Configurar Redis

**Prioridad:** MUST

Usos iniciales:

- OTP;
- rate limits;
- sesiones temporales.

---

## INF-005 – Configurar Object Storage

**Prioridad:** MUST

Debe permitir:

- fotos;
- PDFs;
- archivos.

Buckets privados.

---

## INF-006 – Configurar sistema de colas

**Prioridad:** MUST

Debe soportar:

- retries;
- dead-letter;
- jobs asincrónicos.

---

## INF-007 – CI/CD

**Prioridad:** MUST

Pipeline:

- lint;
- test;
- build;
- security checks;
- deploy staging.

---

## INF-008 – Observabilidad básica

**Prioridad:** MUST

Implementar:

- logs estructurados;
- error monitoring;
- request ID;
- health checks.

---

# ÉPICA EP-02
# AUTENTICACIÓN E IDENTIDAD

## AUTH-001 – Registro de candidato

**Prioridad:** MUST

### Campos

- nombre;
- apellido;
- email;
- teléfono.

### Criterios

- validaciones;
- candidate_id generado;
- duplicados básicos detectados.

---

## AUTH-002 – OTP por correo

**Prioridad:** MUST

### Criterios

- código temporal;
- expiración;
- reenvío;
- límite de intentos;
- código almacenado de forma segura.

---

## AUTH-003 – Perfil existente

**Prioridad:** MUST

### Criterios

Si existe usuario:

- no duplicar;
- ofrecer recuperación;
- validar acceso.

---

## AUTH-004 – Login empresarial

**Prioridad:** MUST

### Criterios

- email;
- contraseña segura;
- recuperación;
- sesiones protegidas.

---

## AUTH-005 – Roles empresariales

**Prioridad:** MUST

Roles mínimos:

- Admin;
- Profesional;
- Viewer.

---

## AUTH-006 – MFA empresarial

**Prioridad:** SHOULD

---

## AUTH-007 – SSO

**Prioridad:** FUTURE

---

# ÉPICA EP-03
# PRIVACIDAD Y CONSENTIMIENTOS

## PRI-001 – Confirmar país

**Prioridad:** MUST

### Criterios

- detectar país;
- candidato puede corregir;
- guardar detectado y declarado.

---

## PRI-002 – Mostrar política

**Prioridad:** MUST

### Criterios

- política versionada;
- link al documento completo;
- checkbox obligatorio.

---

## PRI-003 – Registrar consentimiento

**Prioridad:** MUST

Guardar:

- candidato;
- versión;
- fecha;
- IP;
- país;
- tipo.

---

## PRI-004 – Consentimiento de cámara

**Prioridad:** MUST

Separado cuando corresponda.

---

## PRI-005 – Solicitud de eliminación

**Prioridad:** SHOULD

---

## PRI-006 – Exportación de datos personales

**Prioridad:** SHOULD

---

# ÉPICA EP-04
# PERFIL DEL CANDIDATO

## CAN-001 – Crear perfil

**Prioridad:** MUST

---

## CAN-002 – Editar datos básicos

**Prioridad:** SHOULD

---

## CAN-003 – Perfil laboral

**Prioridad:** COULD

Campos:

- cargo;
- experiencia;
- industria;
- modalidad;
- salario.

---

## CAN-004 – Dashboard personal

**Prioridad:** SHOULD

Mostrar:

- arquetipo;
- vigencia;
- verificación;
- evaluaciones.

---

## CAN-005 – Historial de evaluaciones

**Prioridad:** SHOULD

---

# ÉPICA EP-05
# INSTRUMENTO PSICOMÉTRICO

## PSY-001 – Crear instrumento

**Prioridad:** MUST

---

## PSY-002 – Versionar instrumento

**Prioridad:** MUST

---

## PSY-003 – Crear dimensión

**Prioridad:** MUST

Inicialmente:

- Robo;
- Mentira;
- Fraude;
- Irresponsabilidad;
- Soborno.

---

## PSY-004 – Versionar dimensión

**Prioridad:** MUST

---

## PSY-005 – Cargar banco de reactivos

**Prioridad:** MUST

El contenido psicométrico (los textos de los reactivos) **ya está escrito, cerrado y validado** por el equipo de diseño del instrumento — ver DECISIONS.md — y no es trabajo pendiente de esta épica ni de ningún sprint de software:

- 210 reactivos sustantivos (21 dimensiones × 10) × 5 variantes de redacción = 1,050 textos;
- 63 reactivos alternativos de opciones concretas (`_alt`, mecanismo de "slots duales" con pool de 13 candidatos por dimensión, siempre se administran 10) × 5 variantes = 315 textos;
- 8 reactivos de Deseabilidad Social, 6 de control de Azarosidad (CTRL01-06), 6 de bio-data (BIO01-06).

Lo que sí es trabajo de esta épica es construir el modelo de datos y el proceso de importación/carga para administrar ese banco ya existente. Cada reactivo debe persistirse con:

- texto (y sus 5 variantes);
- dimensión;
- versión;
- formato;
- dirección;
- peso;
- opciones (incluyendo el pool de alternativos `_alt`).

---

## PSY-006 – Estados de reactivo

**Prioridad:** MUST

Estados:

- Draft;
- Pilot;
- Active;
- Suspended;
- Retired.

---

## PSY-007 – Reactivos transversales

**Prioridad:** MUST

Controles:

- consistencia;
- atención;
- deseabilidad.

---

## PSY-008 – Reactivos críticos

**Prioridad:** SHOULD

---

## PSY-009 – Equivalencias multicanal

**Prioridad:** FUTURE

---

# ÉPICA EP-06
# MOTOR DE EVALUACIÓN

## ASM-001 – Crear evaluación

**Prioridad:** MUST

### Input

- candidato;
- tipo;
- proceso;
- idioma.

---

## ASM-002 – Resolver dimensiones

**Prioridad:** MUST

Debe identificar:

- aplicar;
- reutilizar;
- repetir;
- vencido.

---

## ASM-003 – Seleccionar reactivos

**Prioridad:** MUST

---

## ASM-004 – Randomizar

**Prioridad:** MUST

### Reglas

- evitar concentración;
- separar equivalentes;
- distribuir controles.

---

## ASM-005 – Guardar semilla

**Prioridad:** MUST

Para reproducibilidad.

---

## ASM-006 – Mostrar reactivo individual

**Prioridad:** MUST

No exponer:

- dimensión;
- score;
- claves.

---

## ASM-007 – Registrar respuesta

**Prioridad:** MUST

### Regla crítica

Persistir antes de avanzar.

---

## ASM-008 – Idempotencia

**Prioridad:** MUST

Evitar respuesta duplicada.

---

## ASM-009 – No permitir retroceso

**Prioridad:** MUST

---

## ASM-010 – Barra de progreso

**Prioridad:** MUST

---

## ASM-011 – Tiempo por reactivo

**Prioridad:** MUST

---

## ASM-012 – Recuperación de sesión

**Prioridad:** MUST

Ventana inicial:

24 horas.

---

## ASM-013 – Pérdida de conexión

**Prioridad:** MUST

---

## ASM-014 – Cambio de pestaña

**Prioridad:** SHOULD

---

## ASM-015 – Advertencia por velocidad

**Prioridad:** SHOULD

---

## ASM-016 – Reportar pregunta

**Prioridad:** SHOULD

---

# ÉPICA EP-07
# VERIFICACIÓN DE IDENTIDAD

## VER-001 – Cámara opcional personal

**Prioridad:** MUST

---

## VER-002 – Cámara obligatoria empresarial

**Prioridad:** MUST

---

## VER-003 – Captura inicial

**Prioridad:** MUST

---

## VER-004 – Capturas distribuidas

**Prioridad:** SHOULD

Objetivo:

aproximadamente 8.

---

## VER-005 – Pérdida de cámara

**Prioridad:** MUST

Debe pausar.

---

## VER-006 – Revalidación

**Prioridad:** MUST

---

## VER-007 – Evidencia fotográfica

**Prioridad:** SHOULD

---

## VER-008 – Retención de imágenes

**Prioridad:** MUST

Configurable.

---

## VER-009 – Detección de anomalías

**Prioridad:** COULD

Permitido:

- rostro ausente;
- múltiples personas;
- posible cambio de identidad.

Prohibido:

- detectar mentira;
- emoción;
- personalidad.

---

# ÉPICA EP-08
# QUALITY ENGINE

## QLT-001 – Completitud

**Prioridad:** MUST

100% obligatorio.

---

## QLT-002 – Consistencia

**Prioridad:** MUST

---

## QLT-003 – Contradicciones

**Prioridad:** MUST

---

## QLT-004 – Velocidad

**Prioridad:** SHOULD

---

## QLT-005 – Deseabilidad

**Prioridad:** MUST

Indicador independiente. Corresponde a "Deseabilidad Social", uno de los 5 indicadores de validez oficiales del instrumento (los otros 4 son Azarosidad, Omisión, Aquiescencia y Contradicción — no existen solo 4 indicadores en total, son 5). QLT-004 (Velocidad) alimenta Azarosidad, QLT-001 (Completitud) alimenta Omisión, y QLT-002 (Consistencia) alimenta Aquiescencia; esta épica debe dejar los 5 indicadores explícitamente nombrados e independientes entre sí, no solo como chequeos genéricos.

---

## QLT-006 – Atención

**Prioridad:** MUST

---

## QLT-007 – Quality Status

**Prioridad:** MUST

Estados:

- Adequate;
- With Observations;
- Non-Interpretable.

---

## QLT-008 – Bloquear resultado no interpretable

**Prioridad:** MUST

---

# ÉPICA EP-09
# SCORING

## SCO-001 – Calcular score bruto

**Prioridad:** MUST

---

## SCO-002 – Reactivos invertidos

**Prioridad:** MUST

---

## SCO-003 – Pesos configurables

**Prioridad:** MUST

Inicial:

1.00.

---

## SCO-004 – Normalización 0–95

**Prioridad:** MUST

---

## SCO-005 – Seis risk bands

**Prioridad:** MUST

Thresholds parametrizados.

---

## SCO-006 – IGI (Índice General de Integridad)

**Prioridad:** MUST

Cálculo: Puntaje de Riesgo Base (PRB) → multiplicador de nivel de puesto (6 niveles, 0.70–1.50, +0.15 si tiene personal a cargo) → riesgo ajustado → IGI = (1 − riesgo_ajustado) × 100 × 0.95 (tope 95, nunca 100). No es un promedio ponderado simple.

---

## SCO-007 – AlgorithmVersion

**Prioridad:** MUST

---

## SCO-008 – Audit trail de scoring

**Prioridad:** MUST

Debe explicar cómo se llegó al resultado.

---

## SCO-009 – Golden test cases

**Prioridad:** MUST

---

## SCO-010 – Índice ampliado

**Prioridad:** FUTURE

---

# ÉPICA EP-10
# ARQUETIPOS

## ARQ-001 – Crear catálogo de arquetipos

**Prioridad:** MUST

---

## ARQ-002 – Versionar arquetipos

**Prioridad:** MUST

---

## ARQ-003 – Motor rule-based inicial

**Prioridad:** MUST

---

## ARQ-004 – Fit score

**Prioridad:** SHOULD

---

## ARQ-005 – Revelación del arquetipo

**Prioridad:** MUST

---

## ARQ-006 – Descripción completa

**Prioridad:** MUST

---

## ARQ-007 – Fortalezas

**Prioridad:** MUST

---

## ARQ-008 – Áreas de atención

**Prioridad:** MUST

---

## ARQ-009 – Bajo presión

**Prioridad:** MUST

---

## ARQ-010 – Relación con normas

**Prioridad:** MUST

---

# ÉPICA EP-11
# COMPARTIR Y VIRALIDAD

## SHR-001 – Copiar enlace

**Prioridad:** SHOULD

---

## SHR-002 – Web Share API

**Prioridad:** SHOULD

---

## SHR-003 – WhatsApp share

**Prioridad:** SHOULD

---

## SHR-004 – QR

**Prioridad:** SHOULD

---

## SHR-005 – Tarjeta descargable

**Prioridad:** SHOULD

---

## SHR-006 – Activar/desactivar link

**Prioridad:** SHOULD

---

## SHR-007 – Incentivo de contenido adicional

**Prioridad:** COULD

---

# ÉPICA EP-12
# VIGENCIA Y REUTILIZACIÓN

## VAL-001 – Vigencia base 180 días

**Prioridad:** MUST

---

## VAL-002 – Vigencia por dimensión

**Prioridad:** MUST

---

## VAL-003 – Resultado actual/histórico

**Prioridad:** MUST

---

## VAL-004 – Reutilizar dimensión vigente

**Prioridad:** MUST

---

## VAL-005 – Repetir dimensión vigente

**Prioridad:** MUST

---

## VAL-006 – Detectar dimensión vencida

**Prioridad:** MUST

---

## VAL-007 – Aceptar vencida con advertencia

**Prioridad:** MUST

---

## VAL-008 – Nueva base actualiza arquetipo

**Prioridad:** MUST

---

# ÉPICA EP-13
# EMPRESA

## ORG-001 – Registrar organización

**Prioridad:** MUST

---

## ORG-002 – Verificar organización

**Prioridad:** MUST

---

## ORG-003 – Organización matriz/unidades

**Prioridad:** SHOULD

---

## ORG-004 – Gestión de usuarios

**Prioridad:** SHOULD

---

## ORG-005 – Permisos

**Prioridad:** MUST

---

# ÉPICA EP-14
# PERFILES DE CARGO

## JOB-001 – Crear cargo

**Prioridad:** MUST

---

## JOB-002 – Seleccionar plantilla

**Prioridad:** MUST

---

## JOB-003 – Pegar descripción

**Prioridad:** SHOULD

---

## JOB-004 – Recomendar dimensiones

**Prioridad:** MUST

Motor inicial basado en reglas.

---

## JOB-005 – Exigencia 1–6

**Prioridad:** MUST

---

## JOB-006 – Advertencia al eliminar dimensión crítica

**Prioridad:** MUST

---

## JOB-007 – Guardar plantilla

**Prioridad:** SHOULD

---

## JOB-008 – Duplicar plantilla

**Prioridad:** SHOULD

---

## JOB-009 – IA de recomendación

**Prioridad:** FUTURE

---

# ÉPICA EP-15
# PROCESOS DE SELECCIÓN

## PRO-001 – Crear proceso

**Prioridad:** MUST

---

## PRO-002 – Asociar cargo

**Prioridad:** MUST

---

## PRO-003 – Agregar candidato manual

**Prioridad:** MUST

---

## PRO-004 – Invitación por email

**Prioridad:** MUST

---

## PRO-005 – Enlace seguro

**Prioridad:** MUST

---

## PRO-006 – QR de proceso

**Prioridad:** SHOULD

---

## PRO-007 – Carga CSV

**Prioridad:** SHOULD

---

## PRO-008 – Estados de candidato

**Prioridad:** MUST

Estados:

- Invitado;
- Iniciado;
- Completado;
- No interpretable;
- Cancelado.

---

## PRO-009 – Reenviar invitación

**Prioridad:** SHOULD

---

## PRO-010 – Cancelar evaluación

**Prioridad:** SHOULD

---

# ÉPICA EP-16
# PERFIL GRATUITO EMPRESARIAL

## FREE-001 – Mostrar arquetipo

**Prioridad:** MUST

---

## FREE-002 – Mostrar verificación

**Prioridad:** MUST

---

## FREE-003 – Mostrar vigencia

**Prioridad:** MUST

---

## FREE-004 – Mostrar dimensiones disponibles

**Prioridad:** MUST

Sin score.

---

## FREE-005 – CTA reporte profesional

**Prioridad:** MUST

---

# ÉPICA EP-17
# REPORTE PROFESIONAL

## REP-001 – Crear reporte

**Prioridad:** MUST

---

## REP-002 – Snapshot inmutable

**Prioridad:** MUST

---

## REP-003 – Resumen ejecutivo

**Prioridad:** MUST

---

## REP-004 – IGI (Índice General de Integridad)

**Prioridad:** MUST

---

## REP-005 – Dimensiones base

**Prioridad:** MUST

---

## REP-006 – Dimensiones adicionales

**Prioridad:** SHOULD

---

## REP-007 – Nivel de riesgo

**Prioridad:** MUST

---

## REP-008 – Interpretación textual

**Prioridad:** MUST

---

## REP-009 – Alertas

**Prioridad:** MUST

---

## REP-010 – Factores detectados

**Prioridad:** SHOULD

---

## REP-011 – Reactivos representativos

**Prioridad:** SHOULD

Máximo aproximado:

3.

---

## REP-012 – Preguntas de entrevista

**Prioridad:** MUST

---

## REP-013 – Calidad de aplicación

**Prioridad:** MUST

---

## REP-014 – Vigencia

**Prioridad:** MUST

---

## REP-015 – Recomendación general

**Prioridad:** MUST

No contratar/no contratar.

Usar:

- Favorable;
- Revisar;
- Profundizar.

---

# ÉPICA EP-18
# PDF

## PDF-001 – Generar PDF

**Prioridad:** MUST

---

## PDF-002 – Generación asincrónica

**Prioridad:** MUST

---

## PDF-003 – Guardar en Object Storage

**Prioridad:** MUST

---

## PDF-004 – URL firmada

**Prioridad:** MUST

---

## PDF-005 – Hash de integridad

**Prioridad:** SHOULD

---

## PDF-006 – Versionar template

**Prioridad:** MUST

---

# ÉPICA EP-19
# MONETIZACIÓN

## PAY-001 – Wallet de créditos

**Prioridad:** MUST

---

## PAY-002 – Ledger de transacciones

**Prioridad:** MUST

---

## PAY-003 – Créditos promocionales

**Prioridad:** SHOULD

---

## PAY-004 – Desbloquear reporte

**Prioridad:** MUST

---

## PAY-005 – Evitar doble cobro

**Prioridad:** MUST

---

## PAY-006 – Plan pay-as-you-go

**Prioridad:** MUST

---

## PAY-007 – Plan mensual

**Prioridad:** SHOULD

---

## PAY-008 – Plan corporativo

**Prioridad:** SHOULD

---

## PAY-009 – Integrar proveedor de pago

**Prioridad:** MUST

---

# ÉPICA EP-20
# AUDITORÍA

## AUD-001 – Log de login

**Prioridad:** MUST

---

## AUD-002 – Log de consentimiento

**Prioridad:** MUST

---

## AUD-003 – Log de reporte abierto

**Prioridad:** MUST

---

## AUD-004 – Log de PDF descargado

**Prioridad:** MUST

---

## AUD-005 – Log de cambios psicométricos

**Prioridad:** MUST

---

## AUD-006 – Log de acceso sensible

**Prioridad:** MUST

---

## AUD-007 – Log de créditos

**Prioridad:** MUST

---

# ÉPICA EP-21
# BACKOFFICE

## ADM-001 – Lista de candidatos

**Prioridad:** MUST

---

## ADM-002 – Lista de empresas

**Prioridad:** MUST

---

## ADM-003 – Lista de evaluaciones

**Prioridad:** MUST

---

## ADM-004 – Buscar evaluación

**Prioridad:** MUST

---

## ADM-005 – Ver incidencias

**Prioridad:** MUST

---

## ADM-006 – Reiniciar evaluación

**Prioridad:** MUST

Con trazabilidad.

---

## ADM-007 – Anular evaluación

**Prioridad:** MUST

---

## ADM-008 – Consultar scoring interno

**Prioridad:** SHOULD

Solo rol autorizado.

---

# ÉPICA EP-22
# GOBERNANZA PSICOMÉTRICA

## GOV-001 – Crear versión draft

**Prioridad:** MUST

---

## GOV-002 – Revisión técnica

**Prioridad:** MUST

---

## GOV-003 – Revisión psicométrica

**Prioridad:** MUST

---

## GOV-004 – Publicar en staging

**Prioridad:** MUST

---

## GOV-005 – Aprobar producción

**Prioridad:** MUST

---

## GOV-006 – Rollback psicométrico

**Prioridad:** MUST

---

## GOV-007 – Change request

**Prioridad:** SHOULD

---

## GOV-008 – Historial de cambios

**Prioridad:** MUST

---

# ÉPICA EP-23
# SOPORTE

## SUP-001 – Crear caso

**Prioridad:** SHOULD

---

## SUP-002 – Categorías

**Prioridad:** SHOULD

Ejemplos:

- cámara;
- conexión;
- OTP;
- reactivo;
- resultado.

---

## SUP-003 – Asignar responsable

**Prioridad:** SHOULD

---

## SUP-004 – Resolución

**Prioridad:** SHOULD

---

## SUP-005 – Historial de caso

**Prioridad:** SHOULD

---

## SUP-006 – Centro de ayuda

**Prioridad:** COULD

---

## SUP-007 – Chat IA

**Prioridad:** FUTURE

---

# ÉPICA EP-24
# NOTIFICACIONES

## NOT-001 – Invitación

**Prioridad:** MUST

---

## NOT-002 – OTP

**Prioridad:** MUST

---

## NOT-003 – Recordatorio

**Prioridad:** SHOULD

---

## NOT-004 – Evaluación completada

**Prioridad:** SHOULD

---

## NOT-005 – Resultado disponible

**Prioridad:** SHOULD

---

## NOT-006 – Vencimiento

**Prioridad:** SHOULD

Solo candidato para base, según decisión actual.

---

## NOT-007 – Preferencia de canal

**Prioridad:** SHOULD

---

# ÉPICA EP-25
# ANALYTICS

## ANA-001 – Funnel candidato

**Prioridad:** MUST

Eventos:

- landing;
- registro;
- OTP;
- cámara;
- inicio;
- completado;
- resultado;
- share.

---

## ANA-002 – Funnel empresa

**Prioridad:** MUST

Eventos:

- registro;
- proceso;
- invitación;
- profile view;
- unlock;
- report view.

---

## ANA-003 – Métricas por reactivo

**Prioridad:** SHOULD

---

## ANA-004 – Share attribution

**Prioridad:** SHOULD

---

## ANA-005 – Cohortes por canal

**Prioridad:** SHOULD

---

## ANA-006 – Analytics empresarial

**Prioridad:** FUTURE

---

# ÉPICA EP-26
# SEGURIDAD

## SEC-001 – TLS

**Prioridad:** MUST

---

## SEC-002 – Secure headers

**Prioridad:** MUST

---

## SEC-003 – Rate limiting

**Prioridad:** MUST

---

## SEC-004 – Secret Manager

**Prioridad:** MUST

---

## SEC-005 – Signed URLs

**Prioridad:** MUST

---

## SEC-006 – Tenant isolation

**Prioridad:** MUST

---

## SEC-007 – Protección CSRF

**Prioridad:** MUST cuando aplique.

---

## SEC-008 – CORS restrictivo

**Prioridad:** MUST

---

## SEC-009 – Dependency scanning

**Prioridad:** MUST

---

## SEC-010 – Secret scanning

**Prioridad:** MUST

---

## SEC-011 – Penetration test

**Prioridad:** SHOULD antes de escala corporativa.

---

# ÉPICA EP-27
# RESILIENCIA

## RES-001 – Backup automático

**Prioridad:** MUST

---

## RES-002 – Restore test

**Prioridad:** MUST

---

## RES-003 – Retry de jobs

**Prioridad:** MUST

---

## RES-004 – Dead-letter queue

**Prioridad:** MUST

---

## RES-005 – Rollback app

**Prioridad:** MUST

---

## RES-006 – Rollback algoritmo

**Prioridad:** MUST

---

# ÉPICA EP-28
# TESTING

## TST-001 – Unit tests scoring

**Prioridad:** MUST

---

## TST-002 – Unit tests permisos

**Prioridad:** MUST

---

## TST-003 – Unit tests créditos

**Prioridad:** MUST

---

## TST-004 – Integration assessment

**Prioridad:** MUST

---

## TST-005 – E2E candidato

**Prioridad:** MUST

---

## TST-006 – E2E empresa

**Prioridad:** MUST

---

## TST-007 – Golden psychometric tests

**Prioridad:** MUST

---

## TST-008 – Performance test

**Prioridad:** SHOULD

---

## TST-009 – Security test

**Prioridad:** MUST

---

# ÉPICA EP-29
# DIMENSIONES ADICIONALES Y CONTEXTUALES

**Nota importante de arquitectura:** esta épica agrupa dos tipos de dimensión con reglas de cálculo distintas y no deben tratarse igual en el motor de scoring:

- **MOD-002 a MOD-008 (7 dimensiones Adicionales)** — Deslealtad, Favoritismo, Abuso de Recursos, Acoso Sexual, Maltrato Laboral, Discriminación, Asociación Criminal — son configurables por puesto y **sí entran al cálculo del IGI** cuando el puesto las activa.
- **MOD-009 a MOD-017 (9 dimensiones Contextuales)** — Sustancias Lícitas, Sustancias Ilícitas, Incumplimiento de Normas, Deudas, Impulsividad, Violencia, Ludopatía, Egoísmo, Impunidad — son puramente informativas y **JAMÁS deben entrar al cálculo del IGI**, sin excepción, aunque estén activas en la batería.

## MOD-001 – Soportar módulo adicional

**Prioridad:** SHOULD

---

## MOD-002 – Activar Deslealtad

**Prioridad:** SHOULD

---

## MOD-003 – Activar Favoritismo

**Prioridad:** SHOULD

---

## MOD-004 – Activar Abuso de Recursos

**Prioridad:** SHOULD

---

## MOD-005 – Activar Acoso Sexual

**Prioridad:** SHOULD

---

## MOD-006 – Activar Maltrato Laboral

**Prioridad:** SHOULD

---

## MOD-007 – Activar Discriminación

**Prioridad:** SHOULD

---

## MOD-008 – Activar Asociación Criminal

**Prioridad:** SHOULD

---

## MOD-009 – Activar Sustancias Lícitas

**Prioridad:** SHOULD

---

## MOD-010 – Activar Sustancias Ilícitas

**Prioridad:** SHOULD

---

## MOD-011 – Activar Incumplimiento de Normas

**Prioridad:** SHOULD

---

## MOD-012 – Activar Deudas

**Prioridad:** SHOULD

---

## MOD-013 – Activar Impulsividad

**Prioridad:** SHOULD

---

## MOD-014 – Activar Violencia

**Prioridad:** SHOULD

---

## MOD-015 – Activar Ludopatía

**Prioridad:** SHOULD

---

## MOD-016 – Activar Egoísmo

**Prioridad:** SHOULD

---

## MOD-017 – Activar Impunidad

**Prioridad:** SHOULD

---

# ÉPICA EP-30
# COMPARACIÓN DE CANDIDATOS

## CMP-001 – Seleccionar candidatos

**Prioridad:** SHOULD

---

## CMP-002 – Validar comparabilidad

**Prioridad:** MUST si se habilita comparación.

---

## CMP-003 – Tabla comparativa

**Prioridad:** SHOULD

---

## CMP-004 – Seleccionar dimensiones

**Prioridad:** SHOULD

---

## CMP-005 – Registrar filtros

**Prioridad:** MUST si se habilita comparación.

---

## CMP-006 – Ordenar resultados

**Prioridad:** SHOULD

Nunca producir recomendación automática de contratación.

---

# ÉPICA EP-31
# WHATSAPP

## WA-001 – Invitación WhatsApp

**Prioridad:** SHOULD

---

## WA-002 – Recordatorio WhatsApp

**Prioridad:** SHOULD

---

## WA-003 – Resultado disponible

**Prioridad:** SHOULD

---

## WA-004 – Evaluación completa vía WhatsApp

**Prioridad:** FUTURE

---

## WA-005 – Fotos durante WhatsApp

**Prioridad:** FUTURE

---

## WA-006 – Equivalencia psicométrica

**Prioridad:** FUTURE

---

# ÉPICA EP-32
# BUSCADOR DE TALENTO

## TAL-001 – Opt-in/participación

**Prioridad:** FUTURE

---

## TAL-002 – Perfil anonimizado

**Prioridad:** FUTURE

---

## TAL-003 – Filtros

**Prioridad:** FUTURE

---

## TAL-004 – Desbloquear contacto

**Prioridad:** FUTURE

---

## TAL-005 – Consumir créditos

**Prioridad:** FUTURE

---

## TAL-006 – Reporte profesional separado

**Prioridad:** FUTURE

---

# ÉPICA EP-33
# API E INTEGRACIONES

## API-001 – API versionada

**Prioridad:** FUTURE

---

## API-002 – Crear candidato

**Prioridad:** FUTURE

---

## API-003 – Crear evaluación

**Prioridad:** FUTURE

---

## API-004 – Consultar estado

**Prioridad:** FUTURE

---

## API-005 – Obtener reporte

**Prioridad:** FUTURE

---

## API-006 – Webhooks

**Prioridad:** FUTURE

---

## API-007 – Scopes

**Prioridad:** FUTURE

---

# ÉPICA EP-34
# OUTCOMES Y VALIDACIÓN PREDICTIVA

## OUT-001 – Registrar contratado/no contratado

**Prioridad:** COULD

---

## OUT-002 – Registrar renuncia

**Prioridad:** FUTURE

---

## OUT-003 – Registrar incidentes

**Prioridad:** FUTURE

---

## OUT-004 – Registrar desempeño

**Prioridad:** FUTURE

---

## OUT-005 – Dataset de investigación

**Prioridad:** SHOULD

---

## OUT-006 – Pseudonimización

**Prioridad:** MUST antes de investigación a escala.

---

# ÉPICA EP-35
# NORMAS

## NOR-001 – Norma global provisional

**Prioridad:** MUST

---

## NOR-002 – Norma país

**Prioridad:** FUTURE

---

## NOR-003 – Norma ciudad

**Prioridad:** FUTURE

---

## NOR-004 – Norma cargo

**Prioridad:** FUTURE

---

## NOR-005 – Regla de muestra mínima

**Prioridad:** SHOULD

Meta psicométrica vigente (DECISIONS.md): 400-800 casos combinados antes del primer análisis (Baremo General); ≥300 casos por país para activar un baremo propio de ese país. Cualquier otra meta de muestra mencionada en otros documentos de producto/negocio (p. ej. alcance de piloto comercial) es una meta distinta y no debe confundirse con este umbral psicométrico.

---

## NOR-006 – Versionar norma

**Prioridad:** MUST

---

# 36. BACKLOG MVP ESTRICTO

Si necesitamos reducir el producto a la ruta mínima de lanzamiento, el MVP estricto incluye solo estas áreas:

### Fundaciones

INF-001 a INF-008.

### Identidad

AUTH-001 a AUTH-005.

### Privacidad

PRI-001 a PRI-004.

### Instrumento

PSY-001 a PSY-007.

### Assessment

ASM-001 a ASM-013.

### Verificación

VER-001 a VER-006.

### Quality

QLT-001 a QLT-008.

### Scoring

SCO-001 a SCO-009.

### Arquetipos

ARQ-001 a ARQ-010.

### Vigencia

VAL-001 a VAL-008.

### Empresa

ORG-001, ORG-002, ORG-005.

### Cargos

JOB-001, JOB-002, JOB-004, JOB-005, JOB-006.

### Procesos

PRO-001 a PRO-005, PRO-008.

### Perfil gratuito

FREE-001 a FREE-005.

### Reporte

REP-001 a REP-015.

### PDF

PDF-001 a PDF-006.

### Monetización

PAY-001, PAY-002, PAY-004, PAY-005, PAY-006, PAY-009.

### Auditoría

AUD-001 a AUD-007.

### Backoffice

ADM-001 a ADM-007.

### Gobernanza

GOV-001 a GOV-006, GOV-008.

### Seguridad

SEC-001 a SEC-010.

### Testing

TST-001 a TST-007 y TST-009.

---

# 37. ORDEN DE PRIORIDAD GLOBAL

## PRIORIDAD P0 – BLOQUEA EL PRODUCTO

1. Instrumento.
2. Assessment Engine.
3. Persistencia de respuestas.
4. Scoring.
5. Quality Engine.
6. Arquetipo.
7. Reporte.
8. Versionamiento.
9. Seguridad.
10. Auditoría.

## PRIORIDAD P1 – BLOQUEA PILOTO EMPRESARIAL

11. Cámara.
12. Empresa.
13. Procesos.
14. Cargos.
15. Créditos.
16. PDF.
17. Backoffice.

## PRIORIDAD P2 – MEJORA PRODUCTO

18. Compartir.
19. Comparación.
20. Carga masiva.
21. Analytics avanzado.
22. Módulos adicionales.

## PRIORIDAD P3 – ESCALA

23. WhatsApp completo.
24. API.
25. ATS/HRIS.
26. Talent Search.
27. SSO.
28. White-label.

---

# 38. DEPENDENCIAS MAESTRAS

```text id="44motz"
INF
 ↓
AUTH + PRIVACY
 ↓
PSY
 ↓
ASSESSMENT
 ↓
QUALITY
 ↓
SCORING
 ↓
ARCHETYPE
 ↓
CANDIDATE RESULT
 ↓
ENTERPRISE
 ↓
REPORT
 ↓
COMMERCE
 ↓
PILOT
```

---

# 39. BLOQUEOS PRINCIPALES NO TÉCNICOS

Ingeniería no puede completar correctamente el MVP sin recibir:

### De psicometría

- 50 reactivos base;
- controles;
- claves;
- direcciones;
- scoring provisional;
- cortes;
- reglas de calidad;
- arquetipos.

### De UX

- candidate prototype;
- enterprise report;
- design system.

### De legal

- privacidad;
- cámara;
- términos.

### De negocio

- créditos;
- precio inicial;
- reglas promocionales.

---

# 40. FORMATO RECOMENDADO PARA JIRA

Cada historia debe crearse así:

**Summary**

`[ASM-007] Registrar respuesta del candidato`

**Epic**

Assessment Engine.

**Priority**

Highest / High / Medium.

**Description**

Objetivo y comportamiento esperado.

**Acceptance Criteria**

Given / When / Then.

**Dependencies**

IDs relacionadas.

**Labels**

```text id="qhe962"
mvp
candidate
backend
assessment
security
psychometrics
```

---

# 41. EJEMPLO EN FORMATO GIVEN / WHEN / THEN

## ASM-007

**Given**

El candidato tiene una evaluación activa y un reactivo pendiente.

**When**

Selecciona una respuesta válida.

**Then**

El backend debe:

1. validar sesión;
2. validar reactivo;
3. persistir respuesta;
4. registrar tiempo;
5. confirmar almacenamiento;
6. marcar reactivo respondido;
7. devolver siguiente reactivo.

**And**

Si la misma petición se repite con el mismo idempotency key:

no debe crearse una segunda respuesta.

---

# 42. EJEMPLO DE SEGURIDAD

## REP-001

**Given**

Usuario empresarial A solicita Report X.

**When**

Report X pertenece a empresa B y A no tiene entitlement.

**Then**

API debe responder acceso denegado.

**And**

No debe revelar:

- nombre;
- score;
- existencia detallada del reporte.

**And**

Se debe registrar intento según política de seguridad.

---

# 43. EJEMPLO PSICOMÉTRICO

## SCO-009

**Given**

Perfil sintético GoldenTest-001.

**When**

Se ejecuta AlgorithmVersion 1.0.

**Then**

Los cinco scores deben coincidir exactamente con valores esperados.

**And**

El arquetipo debe coincidir con el resultado esperado.

Cualquier diferencia bloquea deployment del algoritmo.

---

# 44. DEFINITION OF READY DEL BACKLOG

Una historia puede entrar a sprint si:

- tiene ID;
- objetivo;
- alcance;
- criterios;
- dependencia resuelta;
- UX disponible si aplica;
- datos disponibles si aplica.

---

# 45. DEFINITION OF DONE

Debe cumplir:

- desarrollo;
- review;
- tests;
- QA;
- permissions;
- logging;
- analytics cuando aplique;
- documentación;
- staging aprobado.

---

# 46. MÉTRICA DE PROGRESO DEL PROYECTO

No medir únicamente:

> 80% de historias completas.

Medir por capacidades.

### Capacidad 1

¿Puede un candidato terminar?

### Capacidad 2

¿Puede calcularse correctamente?

### Capacidad 3

¿Puede verse el arquetipo?

### Capacidad 4

¿Puede una empresa recibir un candidato?

### Capacidad 5

¿Puede comprar un reporte?

### Capacidad 6

¿Puede auditarse todo?

El producto está realmente avanzando cuando estas capacidades se cierran de extremo a extremo.

---

# 47. PRIMER RELEASE DE DESARROLLO

Recomiendo que el equipo se comprometa primero con:

**Release 0.1 – Vertical Slice**

Incluye únicamente:

- candidato ficticio;
- registro;
- 5 preguntas demo;
- persistencia;
- score demo;
- arquetipo demo;
- reporte demo.

Luego:

**Release 0.2 – Base Real**

- 5 dimensiones;
- 50 reactivos;
- controles;
- scoring provisional.

Luego:

**Release 0.3 – Empresa**

- proceso;
- invitación;
- reporte.

Luego:

**Release 0.4 – Comercial**

- créditos;
- PDF;
- auditoría.

Luego:

**Release 0.5 – Pilot Ready**

- cámara;
- seguridad;
- QA;
- analytics.

---

# 48. RESULTADO

Este backlog maestro convierte el producto en un conjunto estructurado de trabajo gestionable.

A partir de aquí, el proyecto ya puede administrarse profesionalmente mediante:

**Epics → Stories → Tasks → Sprints → Releases**

sin volver a discutir el concepto fundamental en cada reunión.

El backlog deberá evolucionar durante desarrollo, pero cualquier cambio que afecte:

- scoring;
- privacidad;
- arquitectura;
- modelo comercial;
- arquetipos;
- reutilización;
- vigencia;

deberá tratarse como cambio formal de producto, no como decisión improvisada dentro de un sprint.

---

**Nota de reconciliación (2026-09-16):** ajustado para coincidir con el banco de reactivos y el modelo de cálculo vigentes (DECISIONS.md).