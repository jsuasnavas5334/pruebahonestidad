# PRD FUNCIONAL V1
## Plataforma Digital de Evaluación de Integridad

## 1. Propósito del documento

Este PRD define los requerimientos funcionales del producto para convertir el diseño conceptual, blueprint y wireframes en una base ejecutable por:

- Producto.
- UX/UI.
- Desarrollo frontend.
- Desarrollo backend.
- DevOps.
- Seguridad.
- Psicometría.
- QA.
- Operaciones.
- Comercial.

El documento prioriza lo necesario para construir una primera versión funcional sin intentar desarrollar desde el inicio todas las capacidades futuras del producto.

## 2. Objetivo del producto

Construir una plataforma digital de evaluación de integridad laboral que permita:

### Al candidato

- registrarse;
- verificar su identidad;
- realizar una evaluación;
- obtener un arquetipo;
- conservar un perfil reutilizable;
- compartirlo;
- reutilizar resultados vigentes en futuros procesos.

### A la empresa

- crear procesos;
- configurar riesgos por cargo;
- invitar candidatos;
- reutilizar evaluaciones vigentes;
- comprar reportes profesionales;
- visualizar riesgos;
- profundizar mediante preguntas de entrevista;
- comparar candidatos;
- conservar historial.

## 3. Propuesta central de valor

El sistema tendrá dos productos diferenciados.

### Producto gratuito

**Reporte de Arquetipo**

Dirigido al candidato.

### Producto profesional

**Reporte Profesional de Riesgos**

Dirigido a organizaciones.

La empresa paga para acceder al análisis técnico.

## 4. Principios funcionales

El sistema deberá cumplir permanentemente estas reglas:

1. El candidato no ve niveles técnicos de riesgo.
2. La empresa no ve riesgos sin desbloquear el reporte profesional.
3. La evaluación base contiene siempre las cinco dimensiones Núcleo Base (Robo, Mentira, Fraude, Irresponsabilidad, Soborno).
4. Los resultados vigentes se reutilizan.
5. Las dimensiones adicionales quedan asociadas al perfil del candidato.
6. La empresa puede activar, según el riesgo del puesto, dimensiones del catálogo cerrado de 21 (hasta 7 Núcleo Adicionales, que entran al IGI, y hasta 9 Factores Contextuales, que son siempre informativos y nunca entran al IGI). No se crean dimensiones nuevas fuera de este catálogo.
7. Una evaluación empresarial requiere verificación mediante cámara.
8. Una evaluación incompleta no genera resultados.
9. Una evaluación no interpretable no genera conclusiones de riesgo.
10. El profesional decide; el sistema recomienda.
11. Los reportes históricos nunca se sobrescriben.
12. Todo cambio psicométrico relevante debe estar versionado.

# PARTE I
# ALCANCE DEL MVP

## 5. MVP 1

El MVP debe demostrar tres hipótesis:

### Hipótesis 1

El candidato completa una evaluación digital de integridad de aproximadamente 10–15 minutos (70 reactivos: 50 sustantivos + 20 de controles transversales — este tiempo estimado con el banco ya cerrado queda `[PENDIENTE DE CONFIRMACIÓN DE GEORGE]`, a validar en piloto).

### Hipótesis 2

El arquetipo genera suficiente interés para que el candidato valore y comparta su resultado.

### Hipótesis 3

Una empresa está dispuesta a pagar para convertir ese perfil en un reporte profesional de riesgos.

## 6. Incluido en MVP 1

### Candidato

- landing;
- identificación de país;
- privacidad;
- registro;
- validación de correo;
- cámara;
- cinco dimensiones base;
- controles transversales;
- guardado automático;
- scoring;
- arquetipo;
- resultado gratuito;
- perfil;
- compartir;
- vigencia.

### Empresa

- registro empresarial;
- dashboard básico;
- procesos;
- perfiles de cargo básicos;
- invitaciones;
- visualización de perfil gratuito;
- desbloqueo de reporte;
- reporte profesional;
- descarga PDF;
- historial.

### Administración

- candidatos;
- empresas;
- evaluaciones;
- reactivos;
- scoring;
- reportes;
- incidencias;
- auditoría básica.

## 7. No obligatorio para MVP 1

Quedan preparados arquitectónicamente, pero no necesariamente implementados:

- WhatsApp como canal completo de evaluación;
- buscador de talento;
- SSO;
- ATS;
- HRIS;
- API pública;
- bancos adaptativos;
- normas por ciudad;
- white-label;
- IA avanzada de recomendación;
- comparación avanzada;
- analítica predictiva.

# PARTE II
# ROLES DE USUARIO

## 8. Rol Candidato

Puede:

- registrarse;
- validar datos;
- aceptar políticas;
- realizar evaluación;
- ver arquetipo;
- consultar vigencia;
- compartir;
- ver historial;
- modificar datos básicos;
- eliminar cuenta.

No puede:

- ver claves;
- ver scoring interno;
- alterar respuestas;
- modificar resultados.

## 9. Rol Administrador Empresa

Puede:

- crear procesos;
- configurar perfiles;
- agregar candidatos;
- comprar/desbloquear reportes;
- ver reportes;
- descargar PDF;
- gestionar usuarios;
- gestionar créditos.

## 10. Rol Profesional Empresa

Puede según permisos:

- crear procesos;
- invitar;
- consultar reportes;
- configurar nivel de puesto, personal a cargo y dimensiones adicionales/contextuales del perfil de cargo (ver Historias EMP-004/EMP-005/EMP-006);
- comparar candidatos.

## 11. Rol Solo Lectura

Puede:

- consultar procesos;
- consultar reportes autorizados.

No puede:

- comprar;
- modificar;
- invitar;
- cambiar configuraciones.

## 12. Rol Administrador Plataforma

Puede:

- gestionar cuentas;
- incidencias;
- estados;
- procesos internos.

## 13. Rol Psicometría

Puede:

- administrar reactivos;
- versiones;
- dimensiones;
- scoring;
- cortes;
- normas;
- arquetipos.

Todo cambio debe quedar auditado.

# PARTE III
# MÓDULO CANDIDATO

## 14. Historia C-001 – Iniciar evaluación

**Como candidato quiero iniciar fácilmente la evaluación para conocer mi perfil.**

### Criterios de aceptación

- Existe CTA visible "Comenzar evaluación".
- Se registra fuente de tráfico.
- Se registra tipo de evaluación: personal o empresarial.
- El sistema genera identificador de sesión.

Prioridad:

**MUST**

## 15. Historia C-002 – Confirmar país

**Como candidato quiero confirmar mi país para recibir las condiciones correctas.**

### Criterios

- Sistema detecta país por IP.
- Usuario puede corregirlo.
- Se guardan país detectado y declarado.
- Cambio no bloquea aplicación.
- El país es un **campo técnico obligatorio** para iniciar cualquier evaluación (no es una pregunta demográfica opcional): se usa para asignar el baremo aplicable.
- El baremo General (Global) aplica desde el inicio para todos los países. El baremo específico por país se activa automáticamente cuando ese país acumula ≥300 casos válidos; hasta entonces se sigue usando el Global.
- Otras variables demográficas del perfil (ver Historia C-004 y modelo de datos) son opcionales y no bloquean el inicio de la evaluación.

Prioridad:

**MUST**

## 16. Historia C-003 – Aceptar privacidad

### Criterios

- Política visible.
- Versión identificada.
- Checkbox obligatorio.
- Sin aceptación no continúa.
- Registrar fecha, hora, IP y versión.

Prioridad:

**MUST**

## 17. Historia C-004 – Crear perfil

Campos MVP:

- nombre;
- apellido;
- correo;
- teléfono.

### Criterios

- validar formatos;
- impedir correo inválido;
- generar ID único;
- verificar duplicados básicos.

Prioridad:

**MUST**

## 18. Historia C-005 – Verificar correo

### Criterios

- enviar OTP;
- código tiene vencimiento;
- permitir reenvío;
- bloquear inicio sin verificación;
- registrar intentos.

Prioridad:

**MUST**

## 19. Historia C-006 – Detectar perfil existente

### Criterios

- buscar coincidencia por correo;
- teléfono;
- identificadores disponibles.

Si existe coincidencia:

- no crear nuevo perfil automáticamente;
- ofrecer recuperación.

Prioridad:

**MUST**

## 20. Historia C-007 – Elegir verificación por cámara

Aplica a evaluación personal.

### Criterios

Mostrar:

**Verificar mi evaluación**

o

**Continuar sin cámara**

Debe explicarse la consecuencia de ambas opciones.

Prioridad:

**MUST**

## 21. Historia C-008 – Cámara obligatoria empresarial

### Criterios

- no existe opción de continuar sin cámara;
- rechazo termina proceso;
- registrar rechazo.

Prioridad:

**MUST**

## 22. Historia C-009 – Captura inicial

### Criterios

- solicitar permiso;
- mostrar preview;
- realizar captura;
- validar que existe imagen;
- permitir reintento.

Prioridad:

**MUST**

## 23. Historia C-010 – Ver instrucciones

### Criterios

Mostrar:

- tiempo estimado;
- responder naturalmente;
- no existe retroceso;
- evitar interrupciones;
- cámara activa cuando corresponda.

Prioridad:

**MUST**

# PARTE IV
# MOTOR DE EVALUACIÓN

## 24. Historia EVAL-001 – Construir sesión

El motor debe determinar:

- dimensiones necesarias: las 5 Núcleo Base (siempre) + las Núcleo Adicionales que correspondan según el riesgo del puesto (hasta 7) + los Factores Contextuales opcionales activados (hasta 9, informativos, nunca entran al IGI); en la capa B2C solo aplican las 5 Base;
- dimensiones reutilizadas (de resultados vigentes de una evaluación previa);
- reactivos transversales (controles de validez y bio-data);
- versión;
- orden.

### Criterios

Nunca presentar una dimensión vigente nuevamente salvo solicitud expresa.

Prioridad:

**MUST**

## 25. Historia EVAL-002 – Ensamblar batería de reactivos

El banco de reactivos ya está cerrado y no se genera ni se cura en producción: 210 reactivos sustantivos (21 dimensiones × 10, con 5 variantes de redacción cada uno) más 63 reactivos alternativos (`_alt`) para 3 de los 10 slots por dimensión. El motor **no elige "los mejores reactivos entre 15–20 candidatos"**; solo ensambla la batería fija y resuelve el mecanismo de slots duales.

Por cada dimensión activa en la batería:

- se administran y puntúan siempre exactamente 10 reactivos (2 de cada uno de los 5 tipos: Opinión/Actitud, Percepción de terceros, Involucramiento pasado, Escenario/dilema, Intención futura);
- de esos 10 slots, hasta 3 (op1, op2, perc1) se resuelven al azar entre el reactivo clásico y su variante `_alt` (pool de hasta 13 candidatos por dimensión para esos slots) — el resultado administrado y puntuado sigue siendo siempre 10 por dimensión;
- cada reactivo (clásico o `_alt`) tiene 5 variantes de redacción; el motor elige una al azar en cada presentación.

Controles transversales fijos, iguales para toda evaluación, que **nunca entran al IGI**:

- 8 reactivos de Deseabilidad Social;
- 6 reactivos de control de Azarosidad (CTRL01–06);
- 6 reactivos de bio-data (BIO01–06).

### Criterios

- versión identificada;
- clave asociada;
- orden controlado (entrelazado entre dimensiones, no en bloques);
- no exponer dimensión, tipo de reactivo ni si es clásico/alternativo al frontend.

Prioridad:

**MUST**

## 26. Historia EVAL-003 – Mostrar un reactivo

### Criterios

- un reactivo principal por pantalla;
- opciones visibles;
- barra de progreso;
- sin nombre de dimensión;
- sin score;
- sin cronómetro.

Prioridad:

**MUST**

## 27. Historia EVAL-004 – Guardar respuesta

Cada respuesta debe registrar:

- candidato;
- evaluación;
- reactivo;
- versión;
- opción;
- valor;
- timestamp;
- tiempo;
- dispositivo;
- sesión.

### Criterio crítico

La respuesta debe persistirse antes de mostrar la siguiente.

Prioridad:

**MUST**

## 28. Historia EVAL-005 – No permitir retroceso

### Criterios

- navegación atrás no permite editar respuestas;
- refresh recupera última posición;
- historial del navegador no altera datos.

Prioridad:

**MUST**

## 29. Historia EVAL-006 – Progreso visual

### Criterios

- barra;
- sin tiempo;
- no obligatorio porcentaje exacto.

Prioridad:

**MUST**

## 30. Historia EVAL-007 – Medir tiempo

Registrar:

- inicio del reactivo;
- respuesta;
- delta;
- pausas.

No usar inicialmente para scoring principal.

Prioridad:

**MUST**

## 31. Historia EVAL-008 – Respuestas muy rápidas

### Regla

Cuando un patrón supere umbral configurado:

mostrar:

**"Lee cada situación con atención antes de responder."**

Registrar evento.

No invalidar automáticamente.

Prioridad:

**SHOULD**

## 32. Historia EVAL-009 – Guardado automático

### Criterios

- guardar cada respuesta;
- reanudar;
- soportar interrupción de red;
- evitar duplicación.

Prioridad:

**MUST**

## 33. Historia EVAL-010 – Pérdida de conexión

### Criterios

- mostrar estado;
- no perder respuestas;
- reintentar;
- recuperar sesión.

Prioridad:

**MUST**

## 34. Historia EVAL-011 – Reanudar sesión

### Criterios

- máximo inicial 24 horas;
- requiere autenticación;
- requiere reactivar cámara si aplica.

Prioridad:

**MUST**

## 35. Historia EVAL-012 – Cámara perdida

### Criterios

- pausar reactivos;
- solicitar reactivación;
- registrar evento;
- continuar después de validar.

Prioridad:

**MUST**

## 36. Historia EVAL-013 – Capturas periódicas

MVP:

aproximadamente 8 capturas configurables.

### Criterios

- timestamps;
- asociadas a sesión;
- acceso restringido;
- almacenamiento seguro.

Prioridad:

**SHOULD**

## 37. Historia EVAL-014 – Cambio de pestaña

### Criterios

- registrar blur/focus;
- contador de eventos;
- generar observación según reglas;
- posible advertencia.

Prioridad:

**SHOULD**

## 38. Historia EVAL-015 – Reportar reactivo

### Criterios

Candidato puede seleccionar:

- no entiendo;
- posible error;
- inapropiado;
- otro.

No salta el reactivo.

Prioridad:

**SHOULD**

# PARTE V
# FINALIZACIÓN

## 39. Historia RES-001 – Completar evaluación

Una evaluación se completa cuando:

- todos los reactivos obligatorios tienen respuesta;
- sesión está cerrada;
- no existen transacciones pendientes.

Prioridad:

**MUST**

## 40. Historia RES-002 – Evaluación incompleta

No genera:

- score;
- arquetipo;
- reporte.

Estado:

**INCOMPLETA**

Prioridad:

**MUST**

## 41. Historia RES-003 – Calidad de aplicación

El sistema produce:

- ADECUADA;
- CON_OBSERVACIONES;
- NO_INTERPRETABLE.

Esta clasificación se alimenta de los **5 indicadores de validez del protocolo**: Azarosidad, Omisión, Aquiescencia, Contradicción y Deseabilidad Social (no 4). Además de estos, contribuyen:

- completitud;
- tiempos;
- incidencias;
- verificación (cámara).

### Regla crítica

Ningún indicador de validez, ni la clasificación de calidad resultante, modifica nunca el Puntaje_dimensión ni el IGI ya calculados. Su único efecto es sobre cómo se presenta el resultado (color gris + advertencia visible), nunca sobre el número reportado.

Prioridad:

**MUST**

## 42. Historia RES-004 – No interpretable

### Criterios

- no mostrar arquetipo;
- no generar riesgo;
- mostrar mensaje neutral;
- permitir reaplicación según política.

Prioridad:

**MUST**

# PARTE VI
# SCORING

## 43. Historia SC-001 – Calcular dimensión (Puntaje_dimensión)

Input:

10 reactivos correspondientes (fijos: 2 de cada uno de los 5 tipos; hasta 3 de los 10 slots pueden resolverse con el reactivo clásico o su variante `_alt` — siempre se administran y puntúan exactamente 10, ver Historia EVAL-002).

Output:

**Puntaje_dimensión, escala 0–100** (mayor puntaje = mayor integridad en esa dimensión).

### Regla

El tope de 95 puntos aplica **únicamente al IGI final** (Historia SC-004), nunca al Puntaje_dimensión individual. No confundir ambas escalas.

Prioridad:

**MUST**

## 44. Historia SC-002 – Factor de distorsión (0.95) dentro del IGI

El factor de distorsión/margen de error de 0.95 **ya está definido** como parte fija de la fórmula del IGI (no es un parámetro pendiente de validación ni "reservado para el futuro"): forma parte de `IGI = (1 − Riesgo_ajustado) × 100 × 0.95`, con tope reportado de 95 puntos, nunca 100 (ver Historia SC-004). El sistema debe implementar esta fórmula completa; puede mantenerse configurable a nivel de constante técnica, pero no como "fórmula por definir".

Prioridad:

**MUST**

## 45. Historia SC-003 – Seis niveles de resultado

Cada resultado (IGI, y opcionalmente cada Puntaje_dimensión) debe mapear a:

**Nivel 1 (Integridad Muy Baja) … Nivel 6 (Integridad Muy Alta).**

Sobre estos 6 niveles se aplica una capa de semáforo de 3 colores: Rojo = niveles 1–2, Amarillo = niveles 3–4, Verde = niveles 5–6.

Los cortes exactos (thresholds) están **`[PENDIENTE DE DATO PILOTO]`**: deben estar parametrizados y nunca hardcodeados, para poder cargarse cuando la Fase 8 (recolección de normas) entregue los valores reales.

Prioridad:

**MUST**

## 46. Historia SC-004 – PRB e IGI (antes "Índice Base")

El cálculo del índice reportado (IGI, el único número que se muestra tanto en la capa gratuita como en la de pago) debe seguir este orden exacto — nunca un promedio directo de dimensiones:

1. **Puntaje_dimensión** de cada dimensión Núcleo activa en la batería (las 5 Base, siempre presentes, más las Adicionales que correspondan según el riesgo del puesto, hasta 7 más).
2. **PRB (Puntaje de Riesgo Base)** = promedio ponderado de riesgo de esas dimensiones Núcleo, escala 0–1 (alto = más riesgo).
3. **Multiplicador_final** = Multiplicador_nivel_de_puesto (0.70–1.50, según los 6 niveles de puesto, ver Historia SC-005/EMP-004) + 0.15 si el candidato evaluado tiene personal a cargo.
4. **Riesgo_ajustado** = MIN(1, PRB × Multiplicador_final).
5. **IGI** = (1 − Riesgo_ajustado) × 100 × 0.95 (tope reportado: 95 puntos, nunca 100).

Los Factores Contextuales (9) son siempre informativos y **jamás** entran en el PRB ni en el IGI, sin excepción.

Los pesos de ponderación internos del PRB entre dimensiones Núcleo son parametrizables técnicamente; sus valores exactos, si no vienen ya fijados desde la Fase 6 (Matriz de Scoring), quedan **`[PENDIENTE DE CONFIRMACIÓN DE GEORGE]`**.

Prioridad:

**MUST**

## 47. Historia SC-005 – Nivel de puesto y personal a cargo (antes "Peso de exigencia")

Cada perfil de cargo debe capturar, como **dos campos independientes** (no un único campo de "peso 1–6 por dimensión"):

- **Nivel de puesto**: escala de 6 niveles, cada uno con su multiplicador asociado (0.70–1.50) según Historia SC-004.
- **¿Tiene personal a cargo?**: pregunta binaria (sí/no), independiente del nivel de puesto, que suma +0.15 al multiplicador cuando la respuesta es "sí".

Estos dos campos alimentan el Multiplicador_final del IGI (Historia SC-004) y deben quedar separados del Puntaje_dimensión psicométrico, que no es editable desde el módulo empresarial. Ver también Historia EMP-004.

Prioridad:

**MUST**

## 48. Historia SC-006 – Alertas críticas

Debe existir motor configurable de reglas.

Ejemplo conceptual:

SI:
nivel dimensión >= X

Y:
reactivo crítico = condición

ENTONCES:
crear alerta.

Prioridad:

**SHOULD**

## 49. Historia SC-007 – Arquetipo

Input:

- las cinco dimensiones Núcleo Base (Robo, Mentira, Fraude, Irresponsabilidad, Soborno) — 50 reactivos, capa B2C;
- reglas de asignación.

Output:

- arquetipo asignado, de un catálogo cerrado de **11 arquetipos agrupados en 4 familias**;
- ID arquetipo;
- versión.

### Nota

El arquetipo es la salida del producto gratuito (B2C, misma sesión, solo las 5 dimensiones Base). El IGI es la salida del producto profesional (B2B, misma sesión, batería ampliada según el puesto). No se calcula ni se muestra un "índice" numérico para el arquetipo; el candidato nunca ve el IGI.

Prioridad:

**MUST**

# PARTE VII
# RESULTADO DEL CANDIDATO

## 50. Historia ARQ-001 – Mostrar arquetipo

Mostrar:

- nombre;
- personaje;
- frase.

No mostrar scores técnicos.

Prioridad:

**MUST**

## 51. Historia ARQ-002 – Perfil gratuito

Mostrar:

- descripción;
- 3 fortalezas;
- 2 áreas de atención;
- presión;
- normas.

Prioridad:

**MUST**

## 52. Historia ARQ-003 – Estado de verificación

Estados:

- VERIFICADO;
- PERSONAL_NO_VERIFICADO.

Prioridad:

**MUST**

## 53. Historia ARQ-004 – Vigencia

Mostrar:

- fecha aplicación;
- fecha vencimiento.

Regla inicial:

**180 días.**

Prioridad:

**MUST**

## 54. Historia ARQ-005 – Compartir

Canales MVP:

- copiar enlace;
- WhatsApp;
- Web Share API;
- QR;
- descargar tarjeta.

Prioridad:

**SHOULD**

## 55. Historia ARQ-006 – Controlar enlace

Candidato puede:

- activar;
- desactivar.

Prioridad:

**SHOULD**

# PARTE VIII
# MÓDULO EMPRESARIAL

## 56. Historia EMP-001 – Registrar empresa

Campos:

- razón social;
- país;
- identificación;
- sector;
- tamaño;
- contacto.

Prioridad:

**MUST**

## 57. Historia EMP-002 – Verificar empresa

Estados:

- pendiente;
- verificada;
- revisión.

Prioridad:

**MUST**

## 58. Historia EMP-003 – Crear proceso

Campos:

- nombre;
- cargo;
- país;
- unidad;
- responsable.

Prioridad:

**MUST**

## 59. Historia EMP-004 – Crear perfil de cargo

Permitir:

- seleccionar plantilla;
- escribir cargo;
- pegar descripción.

Debe capturar además, como **dos campos obligatorios e independientes** (ver Historia SC-005):

- Nivel de puesto (escala de 6 niveles);
- ¿Tiene personal a cargo? (binario, sí/no).

Prioridad:

**MUST**

## 60. Historia EMP-005 – Recomendar dimensiones

MVP puede utilizar reglas preconfiguradas.

IA puede añadirse después.

Debe recomendar:

- cuáles de las 7 dimensiones Núcleo Adicionales agregar a las 5 Núcleo Base (estas últimas siempre presentes, nunca se quitan), según el riesgo del puesto;
- cuáles de los 9 Factores Contextuales opcionales activar (siempre informativos, jamás entran al IGI);
- el nivel de puesto sugerido (1–6) y si aplica personal a cargo.

Prioridad:

**MUST con motor de reglas.**

## 61. Historia EMP-006 – Modificar configuración

Profesional puede:

- agregar/quitar dimensiones Núcleo Adicionales y Factores Contextuales opcionales (las 5 dimensiones Núcleo Base nunca pueden quitarse);
- modificar el nivel de puesto y el indicador de personal a cargo (Historia SC-005).

Si elimina una dimensión Adicional marcada como crítica:

mostrar advertencia.

Prioridad:

**MUST**

## 62. Historia EMP-007 – Guardar plantilla

Permitir:

- guardar;
- duplicar;
- editar.

Prioridad:

**SHOULD**

## 63. Historia EMP-008 – Agregar candidato

MVP:

- manual;
- enlace;
- email.

Posteriormente:

- CSV;
- API;
- WhatsApp.

Prioridad:

**MUST**

# PARTE IX
# REUTILIZACIÓN DEL PERFIL

## 64. Historia PERF-001 – Detectar candidato existente

Buscar por:

- correo;
- teléfono;
- ID.

Prioridad:

**MUST**

## 65. Historia PERF-002 – Mostrar disponibilidad

Antes de pago, mostrar únicamente:

- dimensiones vigentes;
- vencidas;
- inexistentes;
- arquetipo;
- verificación.

No riesgos.

Prioridad:

**MUST**

## 66. Historia PERF-003 – Reutilizar dimensión

Si vigente:

por defecto:

**REUTILIZAR.**

Profesional puede:

**REPETIR.**

Prioridad:

**MUST**

## 67. Historia PERF-004 – Dimensión vencida

Mostrar:

- fecha;
- recomendación de actualizar.

Profesional puede:

- reutilizar vencida;
- repetir.

Debe registrarse decisión.

Prioridad:

**MUST**

# PARTE X
# MONETIZACIÓN

## 68. Historia PAY-001 – Perfil gratuito

Empresa puede ver arquetipo sin pagar.

Prioridad:

**MUST**

## 69. Historia PAY-002 – Bloquear riesgos

Sin transacción activa:

no mostrar:

- IGI ni Puntaje_dimensión;
- niveles (1–6) ni semáforo;
- SEM/IC 95%;
- alertas;
- interpretación.

Prioridad:

**MUST**

## 70. Historia PAY-003 – Desbloquear reporte

Validar:

- permisos;
- saldo;
- plan.

Después:

crear entitlement de acceso.

Prioridad:

**MUST**

## 71. Historia PAY-004 – Créditos

Sistema debe soportar:

- saldo;
- consumo;
- promoción;
- vencimiento;
- historial.

Prioridad:

**MUST**

## 72. Historia PAY-005 – Planes

Modelo de datos debe soportar:

- pay-as-you-go;
- mensual;
- corporativo.

Prioridad:

**MUST arquitectónicamente.**

# PARTE XI
# REPORTE PROFESIONAL

## 73. Historia REP-001 – Resumen ejecutivo

Mostrar:

- candidato;
- cargo;
- arquetipo (referencia informativa);
- **IGI** (0–95, nunca 100), junto con su **SEM (error estándar de medición) e Intervalo de Confianza 95%** — mientras no existan datos piloto, mostrar como `[PENDIENTE DE DATO PILOTO]` en vez de omitirlo;
- **Nivel de integridad (1–6)** con capa de semáforo (Rojo = 1–2, Amarillo = 3–4, Verde = 5–6);
- gráfica;
- alertas;
- calidad de aplicación (incluye los 5 indicadores de validez);
- verificación;
- vigencia.

Prioridad:

**MUST**

## 74. Historia REP-002 – Dimensiones Núcleo

Para cada dimensión Núcleo (Base y Adicionales activas):

- Puntaje_dimensión (0–100);
- nivel 1–6 con semáforo;
- barra;
- texto.

Prioridad:

**MUST**

## 75. Historia REP-003 – Dimensiones Adicionales y Factores Contextuales

Mostrar las dimensiones Núcleo Adicionales activas en sección separada (entran al IGI).

Mostrar los Factores Contextuales activados en una sección informativa aparte, dejando explícito que **nunca entran al IGI ni al PRB**, son solo de valor cualitativo/informativo para el profesional.

Prioridad:

**MUST cuando módulos estén activos.**

## 76. Historia REP-004 – Alertas

Mostrar:

- motivo;
- interpretación;
- recomendación.

Prioridad:

**SHOULD**

## 77. Historia REP-005 – Reactivos representativos

Mostrar hasta 3 cuando reglas lo determinen.

No exponer banco completo.

Prioridad:

**SHOULD**

## 78. Historia REP-006 – Preguntas para entrevista

Por dimensión relevante.

Prioridad:

**MUST**

## 79. Historia REP-007 – Recomendación global

Nunca:

**Contratar / No contratar.**

Usar categorías configurables como:

- Favorable;
- Revisar;
- Profundizar.

Prioridad:

**MUST**

## 80. Historia REP-008 – PDF

Generar versión congelada.

Debe incluir:

- IDs;
- versión;
- fecha;
- empresa;
- candidato.

Prioridad:

**MUST**

# PARTE XII
# HISTORIAL Y VERSIONAMIENTO

## 81. Historia VER-001 – Congelar reporte

Cada reporte debe guardar snapshot de:

- scores;
- textos;
- versiones;
- arquetipo;
- fecha.

No reconstruir históricos con reglas nuevas.

Prioridad:

**MUST**

## 82. Historia VER-002 – Versionar instrumento

Guardar:

- versión global;
- dimensión;
- algoritmo;
- idioma.

Prioridad:

**MUST**

## 83. Historia VER-003 – Nuevo resultado

Cuando candidato repite:

- nuevo resultado vigente;
- anterior pasa a histórico.

Prioridad:

**MUST**

# PARTE XIII
# SOPORTE

## 84. Historia SUP-001 – Crear incidencia

Datos:

- candidato;
- empresa;
- evaluación;
- categoría;
- descripción;
- estado.

Prioridad:

**SHOULD**

## 85. Historia SUP-002 – Reiniciar evaluación

Solo rol autorizado.

Debe registrar:

- motivo;
- usuario;
- fecha.

Intento anterior:

**ANULADO.**

Prioridad:

**MUST**

## 86. Historia SUP-003 – Error masivo

Debe permitir:

- identificar evaluaciones afectadas;
- bloquear reportes;
- marcarlas;
- generar reaplicaciones.

Prioridad:

**SHOULD**

# PARTE XIV
# AUDITORÍA

## 87. Eventos mínimos

Registrar:

- login;
- consentimientos;
- evaluación iniciada;
- cámara;
- evaluación completada;
- reporte abierto;
- reporte descargado;
- configuración modificada;
- scoring/versiones modificados;
- reportes desbloqueados.

Prioridad:

**MUST**

# PARTE XV
# MODELO DE ESTADOS

## 88. CandidateStatus

- NEW
- VERIFIED
- ACTIVE
- DELETED

## 89. AssessmentStatus

- CREATED
- INVITED
- STARTED
- PAUSED
- COMPLETED
- WITH_OBSERVATIONS
- NON_INTERPRETABLE
- CANCELLED
- EXPIRED
- VOIDED

## 90. DimensionResultStatus

- PENDING
- VALID
- EXPIRED
- NON_INTERPRETABLE

## 91. ReportStatus

- LOCKED
- AVAILABLE
- UNLOCKED
- HISTORICAL
- EXPIRED
- CORRECTED

# PARTE XVI
# MODELO DE DATOS CONCEPTUAL

## 92. Candidate

Campos principales:

- candidate_id;
- first_name;
- last_name;
- email;
- phone;
- birth_date;
- country;
- city;
- status;
- created_at.

## 93. Organization

- organization_id;
- parent_id;
- name;
- country;
- tax_id;
- plan;
- status.

## 94. User

- user_id;
- organization_id;
- role;
- permissions.

## 95. Assessment

- assessment_id;
- candidate_id;
- organization_id;
- process_id;
- status;
- verification_status;
- started_at;
- completed_at;
- instrument_version.

## 96. Dimension

- dimension_id;
- name;
- group;
- version;
- status.

## 97. Item

- item_id;
- dimension_id;
- version;
- format;
- scoring_key;
- status.

## 98. Response

- response_id;
- assessment_id;
- item_id;
- answer;
- scored_value;
- response_time;
- timestamp.

## 99. DimensionResult

- candidate_id;
- dimension_id;
- score;
- risk_level;
- valid_from;
- valid_until;
- source_assessment;
- version.

## 100. Archetype

- archetype_id;
- version;
- name;
- description;
- visual_asset_reference.

## 101. ProfessionalReport

- report_id;
- candidate_id;
- organization_id;
- process_id;
- created_at;
- snapshot;
- version;
- status.

# PARTE XVII
# SEGURIDAD

## 102. Requerimientos mínimos

- cifrado en tránsito;
- cifrado de datos sensibles;
- control de roles;
- auditoría;
- backups;
- secretos fuera de código;
- rate limiting;
- protección OTP;
- expiración de sesiones;
- registros de acceso.

## 103. Datos de alto riesgo

Tratamiento reforzado:

- documento;
- fotografías;
- biometría;
- sustancias;
- deudas;
- violencia;
- acoso.

Acceso restringido.

# PARTE XVIII
# REQUERIMIENTOS NO FUNCIONALES

## 104. Mobile first

Candidato debe funcionar prioritariamente en:

- Android;
- iPhone;
- navegador móvil.

## 105. Desktop empresarial

Dashboard optimizado para:

- Chrome;
- Edge;
- Safari actuales.

## 106. Performance

Objetivos iniciales:

- carga principal <3 segundos en conexión razonable;
- transición entre reactivos prácticamente inmediata;
- guardado de respuesta <1 segundo percibido.

## 107. Disponibilidad

Objetivo inicial:

**99.5% o superior**, sujeto a infraestructura.

## 108. Accesibilidad

Considerar:

- WCAG;
- contraste;
- teclado;
- tamaños táctiles;
- textos claros.

# PARTE XIX
# ANALYTICS DEL MVP

## 109. Eventos mínimos candidato

- landing_view;
- start_clicked;
- privacy_accepted;
- signup_completed;
- email_verified;
- camera_accepted;
- camera_declined;
- assessment_started;
- assessment_abandoned;
- assessment_completed;
- archetype_viewed;
- profile_shared.

## 110. Eventos empresa

- company_registered;
- process_created;
- candidate_invited;
- profile_viewed;
- report_unlock_started;
- report_unlocked;
- report_viewed;
- pdf_downloaded.

# PARTE XX
# PRIORIZACIÓN MOSCOW

## MUST

- candidato;
- registro;
- OTP;
- privacidad;
- cámara;
- evaluación;
- scoring;
- arquetipo;
- empresa;
- procesos;
- reporte profesional;
- pagos/créditos;
- vigencia;
- versionamiento;
- auditoría mínima.

## SHOULD

- QR;
- compartir social;
- comparación;
- reactivos críticos;
- analytics avanzado;
- capturas múltiples;
- carga masiva.

## COULD

- WhatsApp completo;
- buscador;
- IA para cargos;
- API externa;
- SSO;
- white-label.

## WON'T en MVP 1

- evaluación adaptativa;
- machine learning automático;
- ranking autónomo;
- decisión contratar/no contratar;
- detección de mentira facial.

# PARTE XXI
# CRITERIOS DE ÉXITO DEL MVP

## Candidato

Objetivos iniciales a medir:

- finalización >80%;
- tiempo medio base ≤15 min;
- validación de correo exitosa >90%;
- aceptación de cámara a medir;
- porcentaje de compartir a medir.

## Empresa

Medir:

- creación de primer proceso;
- invitación;
- desbloqueo de reporte;
- repetición de uso;
- valoración del reporte.

No fijar todavía metas comerciales definitivas sin piloto.

# PARTE XXII
# DEPENDENCIAS CRÍTICAS

El desarrollo no puede cerrarse correctamente sin:

1. Banco definitivo de reactivos base — **ya entregado y cerrado** (210 reactivos sustantivos + 63 alternativos + 5 variantes de redacción cada uno, Fases 3/4/5); lo pendiente es solo la integración técnica, no el diseño.
2. Claves de puntuación — **ya definidas** (Fase 6, Matriz de Scoring).
3. Fórmula de scoring (PRB → IGI) — **ya definida** (Fase 6, `IGI = (1 − Riesgo_ajustado) × 100 × 0.95`); pendiente solo programarla como backend, no diseñarla.
4. Seis cortes de nivel — la estructura (6 niveles + semáforo de 3 colores) **ya está definida**; los valores exactos de los cortes están `[PENDIENTE DE DATO PILOTO]` (Fase 8).
5. Primer modelo de arquetipos — **ya definido** (11 arquetipos en 4 familias).
6. Textos de interpretación.
7. Reglas de calidad (5 indicadores de validez).
8. Política inicial de privacidad.
9. Política de cámara.
10. Política de vigencia.
11. Multiplicadores exactos de nivel de puesto (0.70–1.50) y de personal a cargo (+0.15) — documento de acceso restringido a George; confirmar antes de programar la Historia SC-004/SC-005.

# PARTE XXIII
# ORDEN RECOMENDADO DE DESARROLLO

## Sprint 0 – Fundaciones

- arquitectura;
- autenticación;
- roles;
- base de datos;
- instrument versioning;
- auditoría.

## Sprint 1 – Candidato

- landing;
- registro;
- OTP;
- privacidad;
- perfil.

## Sprint 2 – Evaluación

- motor;
- reactivos;
- respuestas;
- tiempos;
- guardado;
- recuperación.

## Sprint 3 – Scoring

- dimensiones;
- score;
- cortes;
- arquetipo;
- resultado candidato.

## Sprint 4 – Cámara

- permisos;
- captura;
- verificación;
- incidencias.

## Sprint 5 – Empresa

- organización;
- usuarios;
- procesos;
- candidatos;
- perfiles de cargo.

## Sprint 6 – Reporte

- desbloqueo;
- riesgo;
- detalle;
- PDF.

## Sprint 7 – Comercial

- créditos;
- planes;
- pagos;
- promociones.

## Sprint 8 – QA/Piloto

- seguridad;
- performance;
- pruebas UX;
- piloto psicométrico;
- correcciones.

# PARTE XXIV
# DEFINICIÓN DE “DONE” DEL MVP

El MVP estará funcionalmente listo cuando sea posible ejecutar de extremo a extremo este escenario:

1. Una persona entra desde un enlace.
2. Acepta privacidad.
3. Se registra.
4. Verifica correo.
5. Activa cámara.
6. Realiza 70 reactivos: 50 sustantivos (5 dimensiones Núcleo Base × 10) + 20 de controles transversales (8 Deseabilidad Social + 6 Azarosidad + 6 bio-data).
7. El sistema guarda cada respuesta.
8. Calcula las cinco dimensiones Núcleo Base (Puntaje_dimensión 0–100 cada una).
9. Genera un arquetipo (de 11, agrupados en 4 familias).
10. El candidato ve y comparte su perfil.
11. Una empresa crea una cuenta.
12. Encuentra/invita al candidato.
13. Ve gratuitamente su arquetipo.
14. Desbloquea el reporte profesional.
15. Visualiza el IGI (0–95, con SEM e IC 95% `[PENDIENTE DE DATO PILOTO]`), su nivel 1–6 y el semáforo correspondiente.
16. Consulta interpretación y preguntas para entrevista.
17. Descarga PDF.
18. Todo queda registrado y versionado.

Si este flujo funciona correctamente, tenemos un producto mínimo vendible y testeable.

# PARTE XXV
# SIGUIENTE ENTREGABLE

A partir de este PRD, desarrollo necesita dos documentos técnicos inmediatos:

### 1. Especificación del modelo de datos

Tablas, relaciones, índices, estados y versionamiento.

### 2. Especificación del motor de evaluación y scoring

Cómo se seleccionan reactivos, cómo se guardan respuestas, cómo se calcula cada dimensión, cómo operan cortes, exigencias, controles y arquetipos.

El segundo es el más crítico, porque contiene el núcleo intelectual del producto.

---

**Nota de reconciliación (2026-09-16):** historias de usuario ajustadas para coincidir con el modelo de cálculo, banco de reactivos y reglas de negocio vigentes (DECISIONS.md).