# BLUEPRINT FUNCIONAL V1
## Plataforma Digital de Evaluación de Integridad

## 1. Objetivo del blueprint

Este documento define cómo debe funcionar la plataforma desde el punto de vista operativo.

Describe:

- quién interactúa con el sistema;
- qué pantallas necesita;
- qué información ingresa;
- qué decisiones toma;
- qué procesa el sistema;
- qué resultados genera;
- qué ocurre ante errores o excepciones;
- qué información puede visualizar cada usuario.

El blueprint sirve como base para:

**Producto → UX/UI → Arquitectura tecnológica → Desarrollo → QA → Operación.**

## 2. Actores principales

### 2.1 Candidato

Persona que realiza la evaluación.

Puede ingresar:

- voluntariamente;
- desde un enlace compartido;
- mediante invitación empresarial;
- desde WhatsApp;
- desde el buscador de talento.

### 2.2 Empresa

Organización que utiliza la plataforma para:

- evaluar candidatos;
- consultar perfiles;
- adquirir reportes;
- crear procesos;
- configurar cargos;
- comparar candidatos;
- buscar talento.

### 2.3 Profesional empresarial

Usuario de RR. HH., psicólogo, consultor o responsable autorizado.

Puede tener diferentes permisos.

### 2.4 Administrador empresarial

Gestiona:

- usuarios;
- créditos;
- procesos;
- permisos;
- plantillas;
- configuración.

### 2.5 Administrador interno

Opera la plataforma.

### 2.6 Equipo psicométrico

Administra:

- reactivos;
- scoring;
- cortes;
- versiones;
- validación;
- normas.

### 2.7 Sistema

Ejecuta automáticamente:

- validaciones;
- scoring;
- generación de arquetipo;
- cálculo de riesgo;
- vigencia;
- verificación;
- notificaciones;
- alertas;
- recomendaciones.

# PARTE I
# FLUJO GENERAL DEL CANDIDATO

## 3. Entrada inicial

El candidato puede llegar desde:

- página pública;
- enlace compartido;
- QR;
- WhatsApp;
- invitación empresarial;
- enlace de proceso;
- buscador de talento.

El sistema registra:

- fuente;
- campaña;
- enlace;
- empresa relacionada;
- proceso relacionado;
- dispositivo;
- IP;
- fecha;
- hora.

## 4. Identificación del origen

El sistema pregunta internamente:

**¿La evaluación es personal o empresarial?**

### Personal

El candidato decidió realizarla voluntariamente.

### Empresarial

Existe:

- empresa solicitante;
- proceso;
- cargo;
- configuración;
- módulos;
- nivel de puesto y personal a cargo.

Esta diferencia afecta especialmente:

- cámara;
- verificación;
- reporte;
- comunicaciones.

## 5. Detección de país

Antes del registro:

**Sistema detecta país probable por IP.**

Pantalla:

> Detectamos que estás realizando la evaluación desde Ecuador.

Opciones:

**Confirmar**

**Estoy en otro país**

Si corrige:

el usuario selecciona país real.

El sistema conserva:

- país detectado;
- país declarado.

## 6. Política de privacidad

El sistema determina qué documentos mostrar considerando:

- país;
- empresa;
- proceso;
- tipo de aplicación;
- uso de cámara;
- documento;
- variables sensibles.

El candidato visualiza:

- privacidad;
- tratamiento;
- términos;
- autorizaciones específicas.

Acción:

**Aceptar y continuar**

Sin aceptación:

**no puede iniciar.**

El sistema registra:

- versión;
- fecha;
- hora;
- jurisdicción;
- IP;
- aplicación.

## 7. Registro

Campos mínimos:

- nombre;
- apellido;
- correo;
- teléfono;
- **país (campo técnico obligatorio, no demográfico opcional — habilita baremos por país al alcanzar ≥300 casos; el baremo General/Global existe desde el inicio).**

Campos adicionales cuando corresponda:

- fecha de nacimiento;
- ciudad;
- documento.

Botón:

**Continuar**

## 8. Control de duplicados

Al enviar los datos el sistema consulta:

**¿Existe perfil similar?**

Variables:

- correo;
- teléfono;
- nombre;
- nacimiento;
- documento cuando exista.

### No existe

Crea nuevo candidato.

### Existe coincidencia exacta

Solicita iniciar sesión/recuperar perfil.

### Existe posible duplicado

Solicita verificación adicional.

Nunca fusiona automáticamente perfiles dudosos.

## 9. Validación de correo

Pantalla:

> Te enviamos un código a:
> g***@correo.com

Campo:

**Código de 6 dígitos**

Opciones:

- verificar;
- reenviar;
- cambiar correo.

Código correcto:

**correo verificado.**

Código incorrecto:

muestra error.

Número máximo de intentos configurable.

## 10. Validación de teléfono

Inicialmente puede no ser obligatoria en todos los procesos.

Cuando se configure:

- SMS;
- WhatsApp;
- OTP.

El sistema registra:

**teléfono verificado / no verificado.**

## 11. Verificación mediante cámara

### Evaluación personal

Pantalla:

> Verifica tu evaluación

Explicación breve:

> La cámara permite confirmar que eres la persona que realiza la evaluación. Un resultado verificado podrá utilizarse posteriormente en procesos empresariales.

Opciones:

**Realizar evaluación verificada**

**Continuar sin cámara**

### Si acepta

Activa cámara.

### Si rechaza

Continúa como:

**Perfil personal no verificado.**

### Evaluación empresarial

No aparece como elección.

La pantalla informa:

> Esta evaluación requiere verificación mediante cámara.

Opciones:

**Continuar**

**Salir**

## 12. Captura inicial

Cuando existe cámara:

- solicita permiso;
- verifica funcionamiento;
- realiza fotografía inicial;
- ejecuta controles de presencia.

Resultado:

**Verificación inicial correcta**

o

**No fue posible verificar**

Si falla:

permite reintentar.

## 13. Pantalla previa a evaluación

Mostrar:

- tiempo aproximado;
- instrucciones;
- necesidad de responder naturalmente;
- recomendación de evitar interrupciones;
- cámara activa cuando corresponda.

Ejemplo:

> La evaluación base tarda aproximadamente entre 10 y 15 minutos.
>
> Lee cada situación con atención y responde de forma natural.
>
> Una vez respondida una pregunta no podrás regresar.

Botón:

**Comenzar**

# PARTE II
# MOTOR DE EVALUACIÓN

## 14. Configuración automática de la aplicación

Antes de mostrar el primer reactivo, el sistema construye la sesión.

Determina:

### Núcleo Base (5, siempre presentes)

- Robo
- Mentira
- Fraude
- Irresponsabilidad
- Soborno

### Núcleo Adicionales (7, según riesgo del puesto)

Deslealtad, Favoritismo, Abuso de Recursos, Acoso Sexual, Maltrato Laboral, Discriminación, Asociación Criminal. Solo se incluyen las requeridas y que no estén reutilizándose como vigentes. Junto con el Núcleo Base, alimentan el PRB/IGI.

### Factores Contextuales (9, informativos)

Sustancias Lícitas, Sustancias Ilícitas, Incumplimiento de Normas, Deudas, Impulsividad, Violencia, Ludopatía, Egoísmo, Impunidad. **Nunca** entran al IGI; se reportan por separado.

### Transversales (nunca entran al IGI)

- 5 indicadores de validez: Azarosidad, Omisión, Aquiescencia, Contradicción, Deseabilidad Social;
- 6 reactivos de control de Azarosidad (CTRL01-06);
- 6 reactivos de bio-data (BIO01-06).

## 15. Reutilización de resultados

El sistema pregunta por cada dimensión:

**¿Existe resultado vigente?**

### Sí

No necesita aplicarla nuevamente salvo que la empresa solicite actualización.

### No

Incluye reactivos correspondientes.

## 16. Construcción de la secuencia

El motor genera:

- reactivos;
- formatos;
- dilemas;
- controles;
- orden.

Aplica reglas para evitar:

- preguntas demasiado similares juntas;
- concentración de una dimensión;
- patrones previsibles;
- exceso de un mismo formato.

## 17. Pantalla de reactivo

Estructura:

- pregunta/situación;
- opciones;
- barra de progreso;
- botón implícito de avanzar al responder.

No debe mostrar:

- dimensión;
- scoring;
- valor de respuesta;
- tiempo.

## 18. Registro interno de cada respuesta

Al responder se registra:

- reactivo;
- versión;
- alternativa;
- valor interno;
- timestamp;
- tiempo de respuesta;
- dispositivo;
- sesión;
- eventos técnicos asociados.

La respuesta se guarda inmediatamente.

## 19. Navegación

Una vez respondido:

**no puede regresar.**

El siguiente reactivo aparece automáticamente.

## 20. Barra de progreso

Debe ser visual.

No necesariamente muestra:

“63%”.

Puede mostrar únicamente avance aproximado.

## 21. Mensajes intermedios

Aparecen según reglas de progreso.

Ejemplo:

> Ya avanzaste bastante.

> Falta poco.

> Continúa respondiendo con naturalidad.

No aparecen después de cada pregunta.

## 22. Respuestas excesivamente rápidas

El sistema compara:

- tiempo individual;
- comportamiento acumulado.

Si detecta repetición anormal:

muestra:

> Lee cada situación con atención antes de responder.

El sistema registra la advertencia.

No invalida automáticamente.

## 23. Cámara durante la aplicación web

El sistema puede realizar aproximadamente:

**8 capturas durante la sesión.**

Las capturas pueden ser:

- aleatorias;
- distribuidas;
- basadas en eventos.

El candidato no conoce el momento exacto.

## 24. Control de anomalías visuales

La IA podrá detectar:

- persona ausente;
- posible cambio de persona;
- presencia reiterada de terceros;
- cámara bloqueada;
- imagen inválida.

Nunca debe inferir:

- mentira;
- personalidad;
- honestidad;
- emoción.

## 25. Pérdida de cámara

Si la cámara deja de funcionar:

**pausar evaluación.**

Pantalla:

> Necesitamos recuperar la cámara para continuar.

Cuando vuelve:

- revalidación;
- continúa desde siguiente reactivo.

## 26. Cambio de pestaña

Evento:

**window focus lost**

Se registra.

Primer evento:

no necesariamente muestra alerta.

Patrón repetitivo:

> Mantén la evaluación abierta para garantizar una aplicación correcta.

Puede generar:

**Aplicación con observaciones.**

## 27. Caída de conexión

Las respuestas anteriores permanecen guardadas.

Pantalla local:

> Parece que perdiste conexión.

Al reconectar:

- recupera sesión;
- valida usuario;
- valida cámara;
- continúa.

## 28. Cierre accidental

Al volver a abrir:

- login/verificación;
- identifica sesión;
- confirma que está dentro de ventana permitida;
- continúa.

Ventana inicial:

**24 horas.**

## 29. Evaluación abandonada

Si no regresa:

estado:

**Incompleta**

No genera:

- arquetipo;
- score;
- reporte.

Puede recibir recordatorio.

# PARTE III
# EVALUACIÓN VÍA WHATSAPP

## 30. Inicio

Candidato recibe mensaje:

> Empresa X te ha invitado a realizar una evaluación.

Botón/enlace:

**Comenzar**

## 31. Validación

WhatsApp puede utilizar:

- número;
- OTP;
- enlace seguro;
- fotografía.

## 32. Presentación de reactivos

El sistema envía:

- pregunta;
- opciones numeradas/botones.

Respuesta:

1 / 2 / 3 / etc.

El candidato recibe inmediatamente siguiente reactivo.

## 33. Fotografías de control

Durante la aplicación se solicitan aproximadamente:

**6–8 fotografías.**

Ejemplo:

> Para continuar necesitamos una fotografía de verificación.

Si no la envía:

**la evaluación se detiene.**

## 34. Equivalencia psicométrica

Los reactivos WhatsApp pueden tener adaptación visual/textual.

Pero deben mantener:

- mismo constructo;
- scoring equivalente;
- versión identificada;
- validación propia.

# PARTE IV
# FINALIZACIÓN Y SCORING

## 35. Último reactivo

Al responder:

estado pasa a:

**Aplicación completada**

El sistema bloquea modificaciones.

## 36. Transición

Pantalla breve:

> Estamos analizando tus respuestas...

Duración corta.

No simular espera innecesaria.

## 37. Control de interpretabilidad

Antes del scoring final, revisar:

- completitud;
- consistencia;
- deseabilidad;
- velocidad;
- anomalías;
- cámara;
- eventos técnicos.

Resultado de calidad:

### Adecuada

Procesa normalmente.

### Con observaciones

Genera resultado con aviso.

### No interpretable

No genera conclusiones de riesgo.

## 38. Scoring dimensional

Para cada dimensión:

1. lectura de respuestas;
2. aplicación de claves;
3. control de reactivos invertidos;
4. ponderaciones vigentes;
5. transformación de score;
6. comparación normativa cuando exista.

Escala:

**0–95**

Interpretación:

**95 = mayor integridad / menor riesgo.**

## 39. Margen de distorsión y fórmula del IGI

El score reportado es el **IGI (Índice General de Integridad)**, calculado así:

- **PRB (Puntaje de Riesgo Base)** = promedio ponderado de riesgo de las dimensiones del Núcleo (Base + Adicionales incluidas), 0–1, alto = más riesgo.
- **Multiplicador_final** = Multiplicador de nivel de puesto (0.70–1.50, 6 niveles) + 0.15 si tiene personal a cargo. Solo afecta al Núcleo; los Factores Contextuales nunca entran al IGI.
- **Riesgo_ajustado** = MIN(1, PRB × Multiplicador_final).
- **IGI_reportado** = (1 − Riesgo_ajustado) × 100 × 0.95 → tope 95, nunca 100.

En baterías reducidas, los pesos se re-parametrizan a 100% entre las dimensiones del Núcleo efectivamente incluidas. El IGI reportado debe acompañarse siempre de SEM + IC 95% (o `[PENDIENTE DE DATO PILOTO]` mientras no haya datos de piloto).

## 40. Nivel de riesgo

Cada IGI se transforma en uno de **6 niveles** (Nivel 1 = Integridad Muy Baja … Nivel 6 = Integridad Muy Alta), con un semáforo de 3 colores como capa de lectura rápida (Rojo = Nivel 1-2, Amarillo = Nivel 3-4, Verde = Nivel 5-6).

Los cortes exactos permanecen `[PENDIENTE DE DATO PILOTO]`.

## 41. PRB y Puntaje_dimensión

El PRB se calcula utilizando las dimensiones del Núcleo presentes en la batería: siempre Robo, Mentira, Fraude, Irresponsabilidad y Soborno (Base), más las Adicionales que la empresa haya incorporado según el riesgo del puesto. Cada dimensión aporta su Puntaje_dimensión al promedio ponderado.

## 42. Factores Contextuales

Los Factores Contextuales (Sustancias Lícitas, Sustancias Ilícitas, Incumplimiento de Normas, Deudas, Impulsividad, Violencia, Ludopatía, Egoísmo, Impunidad) se reportan de forma independiente, informativa. **No existe un "Índice Ampliado" que los combine con el IGI**: el IGI es un índice único construido solo sobre el Núcleo.

## 43. Alertas críticas

Algunas dimensiones o reactivos pueden generar:

- alertas;
- banderas;
- necesidad de profundización.

Una sola respuesta no debe provocar automáticamente una conclusión extrema salvo reglas previamente validadas.

## 44. Arquetipo

Utiliza:

- cinco dimensiones del Núcleo Base;
- IGI;
- patrón de combinación.

No utiliza automáticamente los módulos adicionales para cambiar el arquetipo.

En la versión gratuita (B2C, 50 reactivos = 5 dimensiones Núcleo Base × 10), el resultado es uno de **11 arquetipos organizados en 4 familias**. En la versión empresarial (B2B, pago), el resultado es el reporte de riesgo con IGI; el arquetipo puede seguir mostrándose como complemento. Es el mismo instrumento y la misma sesión única: un test iniciado nunca se "completa" dos veces.

## 45. Subperfiles

Los módulos adicionales pueden generar:

- etiquetas;
- características;
- descriptores complementarios.

# PARTE V
# RESULTADO GRATUITO DEL CANDIDATO

## 46. Pantalla de resultado

Mostrar primero:

**Personaje**

**Nombre de arquetipo**

**Código interno no necesariamente visible**

**Frase principal**

## 47. Contenido gratuito

Incluye:

- descripción;
- 3 fortalezas;
- 2 áreas de atención;
- comportamiento bajo presión;
- relación con normas.

No muestra:

- Robo;
- Mentira;
- Fraude;
- Soborno;
- niveles técnicos;
- score 0–95.

## 48. Explicación del arquetipo

Lenguaje conductual.

Ejemplo conceptual:

> Tu perfil combina una alta orientación al cumplimiento con una tendencia moderada a flexibilizar decisiones cuando percibes presión externa.

No revela fórmula.

## 49. Módulos adicionales en perfil personal

Si tiene módulos:

pueden aparecer como:

- nuevas características;
- secciones;
- subperfiles.

Nunca como:

> Violencia: Riesgo Alto.

## 50. Compartir resultado

Opciones:

- WhatsApp;
- redes;
- copiar enlace;
- QR;
- tarjeta descargable.

## 51. Tarjeta

Debe contener:

- personaje;
- arquetipo;
- frase;
- marca.

Nombre:

opcional.

## 52. Incentivo de viralidad

Puede ofrecer:

> Comparte tu perfil y desbloquea una sección adicional.

Nunca bloquear el resultado principal.

## 53. Enlace de perfil

Candidato puede:

**activar**

**desactivar**

El enlace muestra:

- arquetipo;
- descripción;
- vigencia;
- verificación.

# PARTE VI
# PERFIL DEL CANDIDATO

## 54. Dashboard personal

Secciones:

### Mi perfil

- arquetipo;
- verificación;
- vigencia.

### Mis evaluaciones

- fechas;
- estado;
- vigencia.

### Mis dimensiones

- evaluadas;
- vigentes;
- vencidas.

Sin mostrar necesariamente riesgos técnicos.

### Compartir

- enlace;
- QR;
- tarjeta.

### Preferencias laborales

- cargos;
- industria;
- ciudad;
- modalidad;
- salario.

### Cuenta

- correo;
- teléfono;
- privacidad;
- eliminación.

## 55. Historial

Mostrar:

- fecha;
- arquetipo;
- vigente/vencido;
- verificado/no verificado.

No mostrar:

- logs;
- scoring interno;
- fórmula.

# PARTE VII
# ENTRADA DE EMPRESA

## 56. Registro empresarial

Solicitar:

- empresa;
- país;
- identificación fiscal;
- sector;
- tamaño;
- responsable;
- correo;
- teléfono.

## 57. Verificación empresarial

Controles:

- correo;
- dominio;
- identificación;
- pago;
- reglas antifraude.

Estado:

**Pendiente**

**Verificada**

**Revisión**

## 58. Organización

Estructura:

Organización matriz

↓

País

↓

Filial

↓

Unidad

↓

Usuarios

## 59. Roles

Ejemplo:

### Administrador

Control total empresarial.

### Profesional

Procesos/reportes.

### Reclutador

Candidatos/procesos.

### Solo lectura

Consulta.

Permisos configurables.

# PARTE VIII
# ONBOARDING EMPRESARIAL

## 60. Primer ingreso

Mostrar asistente:

> Crea tu primer proceso de selección.

Opciones:

**Comenzar**

**Omitir**

## 61. Creación de cargo

Opciones:

- seleccionar catálogo;
- escribir cargo;
- pegar descripción.

## 62. Motor de recomendación

Analiza:

- cargo;
- descripción;
- industria;
- nivel;
- responsabilidades.

Recomienda:

- dimensiones (Núcleo Adicionales y Factores Contextuales según el cargo);
- nivel de puesto (escala universal de 6 niveles, Operativo → Dirección/Alta Gerencia) y si tiene personal a cargo, que es lo que alimenta el multiplicador del IGI;
- justificación.

> **Resuelto (2026-09-16): George confirmó retirar la "exigencia 1–6 por dimensión".** Esta pantalla usaba originalmente ese concepto (ver tabla histórica más abajo, conservada solo por trazabilidad). El modelo vigente del IGI usa exclusivamente un multiplicador único por **nivel de puesto** (0.70–1.50) + 0.15 si tiene personal a cargo, aplicado sobre el PRB del Núcleo — no una exigencia distinta por cada dimensión. La pantalla 63 se rediseña en torno a nivel de puesto + personal a cargo (ver tabla actualizada abajo).

## 63. Confirmación profesional

Pantalla vigente:

| Dimensión | Recomendación |
|---|---|
| Robo | Recomendada (Núcleo Base, siempre incluida) |
| Fraude | Recomendada (Núcleo Base, siempre incluida) |
| Soborno | Recomendada (Núcleo Base, siempre incluida) |

Además, una sola vez por proceso (no por dimensión): **Nivel de puesto (1-6, escala universal Operativo→Dirección/Alta Gerencia)** y **¿Tiene personal a cargo? (Sí/No)** — estos dos campos alimentan el multiplicador del IGI (DECISIONS.md punto 27), no una exigencia individual por dimensión.

*(Tabla histórica de "exigencia por dimensión", ya retirada — se conserva solo como referencia de por qué se descartó este diseño:)*

| Dimensión | Recomendación | Exigencia *(retirado)* |
|---|---|---:|
| Robo | Recomendada | 6 |
| Fraude | Recomendada | 6 |
| Soborno | Recomendada | 4 |

El profesional puede:

- aceptar;
- agregar;
- eliminar;
- modificar el nivel de puesto y si tiene personal a cargo.

## 64. Eliminación de dimensión recomendada

Si elimina dimensión crítica:

mensaje:

> Esta dimensión suele ser relevante para este tipo de cargo.

Explica motivo.

Opciones:

**Mantener**

**Eliminar de todas formas**

La decisión final es profesional.

## 65. Guardar plantilla

Opciones:

**Guardar como plantilla**

**Duplicar**

**Editar**

Ejemplos:

- Vendedor Junior;
- Vendedor Senior;
- Vendedor Corporativo.

# PARTE IX
# CREACIÓN DE PROCESO

## 66. Datos del proceso

- nombre;
- cargo;
- país;
- unidad;
- responsable;
- fecha;
- plantilla.

## 67. Configuración

Incluye:

- dimensiones;
- nivel de puesto y personal a cargo;
- verificación;
- documento;
- idioma;
- canal.

## 68. Agregar candidatos

Métodos:

- manual;
- CSV/Excel;
- API;
- enlace;
- QR.

## 69. Candidato existente

Sistema identifica candidato.

Muestra:

**Base vigente ✓**

**Violencia vigente ✓**

**Deudas vencida ⚠**

**Impulsividad no evaluada**

No muestra riesgo.

## 70. Reutilización

El sistema recomienda:

> Puedes reutilizar 6 dimensiones vigentes.

La empresa decide:

**Reutilizar**

o

**Actualizar dimensión**

## 71. Nueva aplicación

Solo envía reactivos correspondientes a:

- dimensiones faltantes;
- dimensiones vencidas que decida actualizar;
- dimensiones vigentes que decida repetir.

# PARTE X
# DASHBOARD EMPRESARIAL

## 72. Vista principal

Indicadores:

- procesos activos;
- candidatos;
- evaluaciones pendientes;
- completadas;
- reportes disponibles;
- alertas;
- créditos.

## 73. Tabla de candidatos

Columnas:

- candidato;
- cargo;
- estado;
- arquetipo;
- verificación;
- vigencia;
- reporte;
- alertas.

## 74. Estados

- Invitado;
- Registrado;
- Iniciado;
- Completado;
- Reporte disponible;
- Con observaciones;
- No interpretable;
- Vencido;
- Cancelado.

## 75. Acciones

Empresa puede:

- reenviar invitación;
- cancelar;
- abrir perfil;
- comprar reporte;
- agregar dimensiones;
- comparar;
- descargar PDF.

# PARTE XI
# COMPRA DEL REPORTE

## 76. Perfil gratuito empresarial

Antes de pagar:

mostrar exactamente:

- arquetipo;
- resumen;
- vigencia;
- verificación;
- dimensiones disponibles.

No mostrar:

- score;
- riesgo;
- interpretación técnica.

## 77. CTA

Botón:

**Ver reporte profesional de riesgos**

## 78. Validación comercial

Sistema verifica:

- plan;
- créditos;
- permisos;
- empresa válida.

## 79. Compra

Puede:

- descontar crédito;
- utilizar reporte incluido;
- cobrar pago por uso.

## 80. Desbloqueo

Después de pago:

empresa obtiene acceso al reporte profesional.

# PARTE XII
# REPORTE PROFESIONAL

## 81. Primera pantalla

Resumen ejecutivo.

Debe contener:

- candidato;
- cargo;
- arquetipo;
- IGI (con SEM + IC 95%, o `[PENDIENTE DE DATO PILOTO]` mientras no haya datos);
- gráfica general;
- alertas;
- calidad de aplicación;
- vigencia;
- verificación.

## 82. Gráfica general

Debe permitir entender:

- fortalezas;
- zonas medias;
- alertas.

No depender exclusivamente de color.

## 83. Dimensiones del Núcleo (Base + Adicionales)

Cada una:

- nombre;
- Puntaje_dimensión;
- nivel;
- barra;
- interpretación.

## 84. Factores Contextuales

Sección independiente, claramente etiquetada como informativa (no entran al IGI).

Misma lógica de presentación (score, barra, interpretación), sin corte de riesgo asociado al IGI.

## 85. Dimensión vencida

Mostrar:

**RESULTADO VENCIDO**

Texto:

> Recomendamos una nueva aplicación.

Si la empresa decide usarlo:

se conserva visible la advertencia.

## 86. Detalle de dimensión

Incluye:

- score;
- nivel;
- interpretación;
- factores;
- alertas;
- hasta 3 reactivos representativos;
- preguntas sugeridas para entrevista.

## 87. Alerta crítica

Debe explicar:

- qué se detectó;
- por qué importa;
- qué profundizar;
- qué no concluir automáticamente.

## 88. Recomendación global

No:

**No contratar.**

Sí:

- Favorable;
- Revisión recomendada;
- Profundizar;

o equivalentes posteriores.

# PARTE XIII
# COMPARACIÓN DE CANDIDATOS

## 89. Reglas

Solo candidatos:

- mismo proceso;
- dimensiones equivalentes;
- configuración comparable.

## 90. Tabla comparativa

Mostrar:

- índice;
- dimensiones;
- cortes;
- alertas;
- vigencia;
- calidad.

## 91. Filtros

Profesional puede:

- incluir;
- excluir dimensiones.

Sistema registra la configuración utilizada.

## 92. Ordenamiento

Puede ordenar por:

- score;
- riesgo;
- criterio configurado.

Nunca mostrar:

**Mejor candidato automáticamente**.

# PARTE XIV
# BUSCADOR DE TALENTO

## 93. Entrada del candidato

Inicialmente podrá aparecer por defecto, sujeto a validación jurídica por país.

Podrá salir del buscador.

## 94. Perfil anonimizado

Empresa ve:

- cargo;
- ciudad;
- experiencia;
- industria;
- formación;
- arquetipo;
- evaluación vigente;
- verificación.

No:

- nombre;
- correo;
- teléfono.

## 95. Filtros

- puesto;
- ciudad;
- país;
- experiencia;
- industria;
- jerarquía;
- formación;
- arquetipo;
- dimensiones;
- vigencia.

## 96. Riesgo como filtro

Solo para servicios profesionales autorizados.

Nunca abierto públicamente.

## 97. Desbloqueo

Empresa puede comprar:

- datos de contacto;
- acceso profesional;
- reporte.

Usando créditos.

# PARTE XV
# NOTIFICACIONES

## 98. Candidato

Eventos:

- invitación;
- código;
- recordatorio;
- inicio pendiente;
- evaluación completada;
- resultado disponible;
- vencimiento.

Canales:

- correo;
- WhatsApp;
- ambos.

## 99. Empresa

Eventos:

- candidato inició;
- completó;
- reporte disponible;
- no interpretable;
- verificación fallida;
- dimensión vencida;
- incidencia.

Reporte:

notificación + enlace seguro.

No PDF automático adjunto.

# PARTE XVI
# SOPORTE E INCIDENCIAS

## 100. Centro de ayuda

Tres niveles:

### Autoservicio

FAQ.

### IA

Chatbot.

### Humano

Escalamiento.

## 101. Caso de soporte

Cada incidencia registra:

- ID;
- usuario;
- candidato;
- empresa;
- evaluación;
- fecha;
- tipo;
- descripción;
- acciones;
- responsable;
- resolución.

## 102. Reiniciar evaluación

Solo rol autorizado.

Debe seleccionar:

**motivo.**

Resultado anterior:

**Intento anulado**

No participa en scoring.

## 103. Reactivo reportado

El candidato puede marcar:

> Esta pregunta no es clara.

La evaluación continúa.

El reporte llega al equipo psicométrico.

# PARTE XVII
# BACKOFFICE INTERNO

## 104. Módulos del panel interno

### Usuarios

Candidatos y empresas.

### Evaluaciones

Aplicaciones y estados.

### Psicometría

Reactivos, scoring, versiones.

### Incidencias

Soporte.

### Auditoría

Accesos y cambios.

### Comercial

Planes/créditos.

### Seguridad

Eventos y fraude.

## 105. Gestión de reactivos

Estados:

- borrador;
- piloto;
- validación;
- activo;
- retirado.

## 106. Versionamiento

Cada reactivo debe tener:

- ID;
- dimensión;
- versión;
- idioma;
- canal;
- estado.

## 107. Dimensión

Debe contener:

- nombre;
- versión;
- reactivos;
- scoring;
- corte;
- normas;
- estado.

## 108. Algoritmo

Versión independiente.

Ejemplo:

**ALG-3.1**

Nunca sobreescribir algoritmo sin versión.

# PARTE XVIII
# ANALYTICS

## 109. Funnel candidato

Medir:

Visita  
→ Registro  
→ Validación  
→ Cámara  
→ Inicio  
→ Finalización  
→ Arquetipo  
→ Compartir  
→ Nuevo usuario  
→ Empresa

## 110. Cámara

KPIs:

- aceptación;
- rechazo;
- abandono;
- error técnico;
- dispositivo;
- conversión.

## 111. Reactivos

Medir:

- tiempo;
- distribución;
- incomprensión;
- abandono;
- anomalías.

## 112. Empresa

Medir:

- registro;
- primer reporte;
- frecuencia;
- reutilización;
- créditos;
- renovación;
- expansión.

## 113. Viralidad

Medir:

- shares;
- clics;
- nuevos candidatos;
- empresas generadas;
- coeficiente viral.

# PARTE XIX
# OUTCOMES Y APRENDIZAJE

## 114. Seguimiento

Empresa podrá registrar:

- contratado;
- descartado;
- renuncia;
- permanencia;
- incidente;
- desempeño.

## 115. Investigación

Los outcomes se utilizan para:

- validez predictiva;
- revisión de dimensiones;
- recomendaciones;
- normas.

Nunca modifican algoritmo automáticamente.

# PARTE XX
# PERMISOS Y SEGURIDAD

## 116. Principio

Cada usuario ve únicamente lo necesario.

## 117. Candidato

Puede:

- consultar perfil;
- compartir;
- modificar datos;
- eliminar cuenta;
- consultar historial.

No puede:

- ver scoring interno;
- cambiar respuestas;
- modificar riesgo.

## 118. Empresa

Puede según permisos:

- crear proceso;
- invitar;
- comprar reporte;
- comparar;
- descargar;
- configurar cargos.

No puede:

- modificar scoring;
- modificar reactivos;
- alterar resultados.

## 119. Equipo interno

Accesos segmentados.

No todos los empleados internos deben poder consultar datos sensibles.

# PARTE XXI
# INTEGRACIONES

## 120. API

Preparada desde arquitectura inicial.

Funciones futuras:

- crear candidato;
- crear proceso;
- enviar evaluación;
- consultar estado;
- obtener reporte;
- agregar dimensiones.

## 121. Webhooks

Eventos:

- started;
- completed;
- invalid;
- report_ready;
- verification_failed;
- expired.

## 122. SSO

Planes corporativos.

## 123. ATS/HRIS

Podrán recibir:

- estado;
- score;
- dimensiones;
- alertas;
- vigencia.

Según permisos.

# PARTE XXII
# ESTADOS MAESTROS

## 124. Estados del candidato

- Nuevo
- Verificado
- Activo
- Inactivo
- Eliminado

## 125. Estados de evaluación

- Creada
- Invitada
- Registrada
- Iniciada
- Pausada
- Completada
- Con observaciones
- No interpretable
- Cancelada
- Vencida
- Anulada

## 126. Estados de dimensión

- No evaluada
- Pendiente
- Vigente
- Vencida
- Piloto
- No interpretable

## 127. Estados de reporte

- No generado
- Disponible
- Bloqueado
- Comprado
- Histórico
- Vencido
- Corregido

# PARTE XXIII
# REGLAS CRÍTICAS DEL SISTEMA

## 128. Regla 1

Sin correo validado:

**no inicia evaluación.**

## 129. Regla 2

Evaluación empresarial sin cámara:

**no continúa.**

## 130. Regla 3

Evaluación incompleta:

**no genera resultado.**

## 131. Regla 4

Evaluación no interpretable:

**no genera conclusión de riesgo.**

## 132. Regla 5

Base vigente:

**no se repite automáticamente.**

## 133. Regla 6

Dimensión vigente:

**se reutiliza salvo actualización solicitada.**

## 134. Regla 7

Dimensión vencida:

**se recomienda repetir, pero la empresa puede aceptarla.**

## 135. Regla 8

Empresa sin pago:

**solo ve arquetipo.**

## 136. Regla 9

Empresa con reporte desbloqueado:

**ve todas las dimensiones vigentes disponibles.**

## 137. Regla 10

El candidato nunca ve los niveles técnicos de riesgo en la experiencia gratuita.

## 138. Regla 11

El arquetipo depende principalmente de las cinco dimensiones base.

## 139. Regla 12

Las dimensiones adicionales pertenecen funcionalmente al perfil del candidato.

## 140. Regla 13

Reporte histórico nunca se sobrescribe.

## 141. Regla 14

Toda modificación técnica relevante genera trazabilidad/versionamiento.

## 142. Regla 15

El sistema recomienda.

**El profesional decide.**

# PARTE XXIV
# MAPA SIMPLIFICADO DE LOS TRES ACTORES

## 143. Candidato

**Entra**

↓

Acepta privacidad

↓

Se registra

↓

Valida correo

↓

Activa/rechaza cámara

↓

Responde

↓

Sistema valida calidad

↓

Obtiene arquetipo

↓

Comparte / conserva perfil

↓

Participa en procesos futuros

## 144. Empresa

**Se registra**

↓

Crea proceso

↓

Define cargo

↓

Sistema recomienda dimensiones

↓

Profesional confirma dimensiones y configura nivel de puesto + personal a cargo

↓

Invita candidato

↓

Sistema reutiliza resultados vigentes

↓

Candidato completa faltantes

↓

Empresa ve arquetipo

↓

Compra reporte profesional

↓

Analiza riesgos

↓

Compara

↓

Profundiza en entrevista

## 145. Sistema

**Recibe datos**

↓

Valida identidad

↓

Construye evaluación

↓

Registra respuestas

↓

Controla calidad

↓

Calcula scores

↓

Asigna cortes

↓

Genera arquetipo

↓

Genera reporte profesional

↓

Gestiona vigencias

↓

Registra analytics

↓

Actualiza perfil

# PARTE XXV
# PRIORIDAD DE DESARROLLO

## 146. MVP 1

Debe incluir únicamente lo indispensable para comprobar producto.

### Candidato

- registro;
- correo;
- privacidad;
- cámara;
- 5 dimensiones base;
- reactivos transversales;
- arquetipo;
- compartir.

### Empresa

- registro;
- crear proceso;
- invitar;
- comprar reporte;
- consultar reporte;
- PDF.

### Sistema

- scoring;
- arquetipos;
- 6 cortes;
- vigencia;
- logs básicos.

## 147. MVP 2

Agregar:

- 16 módulos (7 Núcleo Adicionales + 9 Factores Contextuales);
- perfiles de cargo;
- nivel de puesto (6 niveles) + "¿tiene personal a cargo?" para el multiplicador del IGI (ver nota pendiente de confirmación en la sección 62);
- comparación;
- WhatsApp;
- analytics avanzado.

## 148. Fase 3

Agregar:

- buscador de talento;
- API;
- ATS/HRIS;
- white-label;
- SSO;
- normas regionales avanzadas.

## 149. Fase 4

Agregar:

- bancos rotativos;
- versiones paralelas;
- evaluación adaptativa;
- analítica predictiva;
- recomendaciones avanzadas por IA.

# PARTE XXVI
# SALIDA DEL BLUEPRINT

Con este blueprint ya pueden desarrollarse cuatro documentos específicos sin volver a redefinir el producto:

### Documento UX/UI

Pantallas, componentes, navegación y prototipos.

### Documento de requerimientos funcionales

Historias de usuario, reglas y criterios de aceptación.

### Documento técnico

Arquitectura, base de datos, API, seguridad y servicios.

### Documento psicométrico

Scoring, reactivos, cortes, normas, validación y arquetipos.

Este blueprint constituye el puente entre el concepto del producto y su construcción real.

---

**Nota de reconciliación (2026-09-16):** revisado y ajustado contra el respaldo técnico vigente (DECISIONS.md).