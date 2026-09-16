> **Nota de vigencia (2026-09-16): este documento es la versión V2 (anterior), conservada por trazabilidad. La versión vigente y más completa es `Documento_Maestro_Final___Plataforma_Digital_de_Evaluaci_n_de_Integridad.md`. Consulta esa versión para cualquier dato actualizado.**

# DOCUMENTO MAESTRO V2  
## Diseño conceptual del producto digital de evaluación de integridad

## 1. Definición del producto

El producto será una plataforma digital, modular y regional para evaluar integridad laboral y factores de riesgo asociados al comportamiento de una persona dentro de una organización.

Su propósito no es clasificar a una persona como “buena”, “mala”, “honesta” o “deshonesta”.

El producto busca identificar tendencias, fortalezas, vulnerabilidades y riesgos potenciales relacionados con situaciones como:

- robo o apropiación indebida;
- mentira y ocultamiento;
- fraude;
- irresponsabilidad;
- soborno;
- incumplimiento;
- abuso de recursos;
- violencia;
- sustancias;
- conflictos de interés;
- otros factores relevantes para la organización.

La plataforma transformará esta información en dos productos distintos:

**Reporte de Arquetipo:** gratuito, comprensible y orientado a la persona.

**Reporte Profesional de Riesgos:** de pago, técnico y orientado a empresas.

La medición es la misma. Lo que cambia es la profundidad y forma de presentar la información.

## 2. Principios centrales

El producto combinará:

**Integridad + Psicometría + Modularidad + Tecnología + Arquetipos + Verificación + Analítica**

La experiencia para el candidato deberá ser:

- rápida;
- sencilla;
- visual;
- interactiva;
- poco monótona;
- comprensible;
- fácil de compartir.

La experiencia empresarial deberá ser:

- técnica;
- configurable;
- trazable;
- orientada al riesgo;
- útil para selección;
- útil para entrevista;
- escalable.

## 3. Arquitectura de dimensiones

El modelo contempla 21 dimensiones.

### Núcleo Base

1. Robo  
2. Mentira  
3. Fraude  
4. Irresponsabilidad  
5. Soborno  

Estas cinco dimensiones son obligatorias y conforman la evaluación base.

Cada dimensión tiene inicialmente 10 reactivos.

**Total dimensional base: 50 reactivos.**

### Núcleo Adicional

6. Deslealtad  
7. Favoritismo  
8. Abuso de Recursos  
9. Acoso Sexual  
10. Maltrato Laboral  
11. Discriminación  
12. Asociación Criminal  

### Variables Contextuales

13. Sustancias Lícitas  
14. Sustancias Ilícitas  
15. Incumplimiento de Normas  
16. Deudas  
17. Impulsividad  
18. Violencia  
19. Ludopatía  
20. Egoísmo  
21. Impunidad  

El banco dimensional completo contempla actualmente:

**21 dimensiones × 10 reactivos = 210 reactivos finales.**

Cada dimensión dispone de su propio banco y deberá mantenerse versionada independientemente.

> **Nota de reconciliación:** el Núcleo (Base + Adicionales, 12 dimensiones) es el único que alimenta el índice de integridad reportado (IGI). Las 9 Variables/Factores Contextuales son siempre informativos y **jamás** entran al cálculo del IGI.

## 4. Reactivos transversales

A los 50 reactivos de la evaluación base podrán agregarse aproximadamente 5 a 10 reactivos transversales.

Su objetivo será apoyar controles como:

- consistencia;
- contradicción;
- atención;
- deseabilidad social;
- manejo de impresión;
- patrones mecánicos de respuesta;
- calidad general de la aplicación.

Por lo tanto, la prueba base tendrá aproximadamente:

**55 a 60 reactivos.**

## 5. Duración

La evaluación base deberá completarse aproximadamente en:

**10 a 15 minutos.**

No existe un máximo global de reactivos.

Cuando una empresa incorpora variables adicionales, sus reactivos se agregan a la aplicación.

Ejemplo:

Base: 55–60 reactivos.

Base + 3 dimensiones adicionales: aproximadamente 85–90 reactivos.

El tiempo final dependerá de las variables incluidas.

## 6. Arquitectura modular

Las 16 dimensiones adicionales funcionarán como mini assessments.

La empresa seleccionará las variables que considere relevantes según:

- puesto;
- nivel jerárquico;
- responsabilidades;
- acceso a dinero;
- manejo de información;
- activos;
- clientes;
- sector;
- riesgos particulares.

El candidato debe experimentar todo como **una única evaluación**.

Los reactivos de las dimensiones adicionales se mezclarán con los demás mediante reglas de aleatorización.

No deberá aparecer:

“Ahora comienza la sección de Violencia”  
o  
“Ahora evaluaremos Fraude”.

El constructo evaluado permanecerá oculto durante la aplicación.

## 7. Perfil de cargo

La plataforma incluirá perfiles de cargo previamente configurados.

Ejemplos:

- Cajero;
- Compras;
- Ventas;
- Conductor;
- Administrativo;
- Ejecutivo;
- Gerencial.

La empresa también podrá crear sus propios perfiles.

Cuando el profesional ingrese un cargo o descripción de puesto, el sistema podrá recomendar:

- dimensiones;
- niveles de exigencia;
- razones de la recomendación.

La recomendación funcionará mediante:

**catálogo técnicamente validado + asistencia de IA.**

El profesional siempre tendrá la decisión final.

## 8. Nivel de exigencia *(RETIRADO — ver nota de resolución más abajo)*

Cada dimensión podrá recibir un nivel de exigencia:

**1 a 6**

donde 1 representa menor exigencia y 6 mayor exigencia para el cargo.

Ejemplo conceptual:

Cajero:

Robo: 6  
Fraude: 6  
Soborno: 4  
Irresponsabilidad: 5  
Mentira: 5

El nivel de exigencia no modifica el constructo medido.

Modifica el criterio con el que la organización interpreta el resultado para ese cargo.

El sistema podrá recomendar la exigencia y el profesional podrá modificarla dentro de los límites técnicamente permitidos.

> **Resuelto (2026-09-16): George confirmó retirar este mecanismo.** Este "nivel de exigencia 1–6 por dimensión" no corresponde al mecanismo de multiplicador finalmente definido para el IGI, que usa un **nivel de puesto** único (escala universal de 6 niveles, Operativo→Dirección/Alta Gerencia, multiplicador 0.70–1.50) más un +0.15 si la persona tiene personal a cargo, aplicado sobre el PRB global del Núcleo. Se retira "exigencia por dimensión" como concepto de producto — no se implementa — para no duplicar el mecanismo de ajuste ya vigente (DECISIONS.md punto 27). Esta Sección 8 se conserva íntegra solo por trazabilidad histórica (documento V2, superado por el Documento Maestro Final).

## 9. Experiencia del candidato

Cada reactivo aparecerá principalmente de forma individual.

Se utilizarán transiciones rápidas para mantener ritmo.

Una vez respondido un reactivo, el candidato no podrá regresar para modificarlo.

El progreso se mostrará mediante una barra visual, sin porcentaje obligatorio y sin cronómetro.

La evaluación utilizará aproximadamente 2 o 3 formatos estandarizados de interacción.

Podrán incluir:

- escalas;
- alternativas;
- dilemas;
- situaciones laborales;
- elecciones entre opciones.

No se utilizarán formatos diferentes únicamente para hacer la evaluación “divertida”. Cada formato deberá mantener consistencia psicométrica.

## 10. Diseño de reactivos

La forma de respuesta podrá variar según el tipo de reactivo.

No se define una única escala universal para todo el instrumento.

Se podrán utilizar:

- reactivos directos;
- reactivos indirectos;
- racionalización;
- dilemas;
- situaciones;
- opciones conductuales.

Se revisará primero el banco existente antes de crear nuevos reactivos.

Los reactivos transparentes no serán eliminados necesariamente, pero deberán combinarse con mecanismos menos evidentes para reducir manipulación.

## 11. Aleatorización

La prueba utilizará aleatorización controlada.

No será completamente aleatoria.

El sistema deberá considerar:

- distribución de dimensiones;
- reactivos equivalentes;
- preguntas relacionadas;
- dilemas;
- controles de consistencia;
- orden lógico;
- prevención de patrones.

Los mini tests adicionales se integrarán dentro de esta misma lógica.

## 12. Mensajes de progreso

Se podrán incorporar mensajes breves como:

“Ya avanzaste bastante.”

“Falta poco.”

“Continúa respondiendo con naturalidad.”

“Gracias por responder con atención.”

Estos mensajes deberán ser neutrales.

Nunca deberán indicar cuál es la respuesta “correcta”.

## 13. Registro de tiempo

No habrá cronómetro visible.

No se utilizará presión temporal artificial en la evaluación base.

El sistema registrará internamente:

- tiempo por reactivo;
- tiempo total;
- respuestas extremadamente rápidas;
- interrupciones;
- patrones temporales;
- reinicios.

Inicialmente, estos datos tendrán finalidad técnica y de investigación.

No se interpretará automáticamente:

“respuesta rápida = mentira”.

Cuando exista evidencia suficiente, estos indicadores podrán incorporarse al análisis psicométrico.

## 14. Registro previo

Antes de comenzar, la persona deberá completar:

1. Política y condiciones aplicables.
2. Registro.
3. Validación de contacto.
4. Decisión/verificación de cámara.
5. Inicio de evaluación.

Se solicitarán como mínimo:

- nombre;
- apellido;
- correo electrónico;
- teléfono.

La fecha de nacimiento podrá ser opcional en la versión personal y obligatoria/configurable en aplicaciones empresariales.

## 15. Validación de correo

El candidato deberá validar su correo antes de iniciar.

El sistema enviará un código.

Sin código correcto:

**no se habilita la evaluación.**

La validación del correo demuestra control sobre esa cuenta, no identidad física.

## 16. Identificación única

El candidato tendrá:

- correo;
- teléfono;
- identificador interno único.

El sistema podrá utilizar adicionalmente:

- nombre;
- fecha de nacimiento;
- datos de verificación;
- documento cuando corresponda;

para detectar posibles duplicados.

Los posibles perfiles duplicados no se fusionarán automáticamente.

Se requerirá verificación.

## 17. Uso de cámara

### Versión personal

La cámara será opcional, pero fuertemente incentivada.

El mensaje será claro:

**Con cámara**

- la evaluación queda verificada;
- puede utilizarse posteriormente en procesos empresariales;
- el candidato obtiene estado de evaluación verificada.

**Sin cámara**

- puede realizar la evaluación;
- puede recibir su arquetipo;
- puede compartir su resultado personal;
- no podrá utilizarse como evaluación empresarial verificada.

### Versión empresarial

La cámara será obligatoria.

Si el candidato no acepta su uso, no podrá continuar con esa aplicación empresarial.

## 18. Funcionamiento de cámara en web

En la aplicación web:

- la cámara permanecerá habilitada;
- podrán realizarse capturas distribuidas durante la evaluación;
- se proyectan aproximadamente 8 fotografías de control;
- no será necesario grabar video continuo como regla general.

La empresa podrá recibir evidencia visual de la aplicación.

La plataforma podrá utilizar IA para identificar anomalías como:

- posible cambio de persona;
- ausencia;
- presencia de otra persona;
- situaciones anómalas de verificación.

La IA no deberá concluir:

- mentira;
- deshonestidad;
- emociones;
- intención;
- personalidad;

a partir de gestos faciales.

## 19. Evaluación vía WhatsApp

WhatsApp será:

- canal de invitación;
- canal de comunicación;
- potencial canal alternativo de evaluación.

La versión WhatsApp deberá medir los mismos constructos y mantener equivalencia de scoring.

Podrá disponer de reactivos específicamente calibrados para ese canal.

La verificación podrá incluir:

- número telefónico;
- código;
- fotografías solicitadas durante la aplicación.

Se solicitarán aproximadamente 6–8 fotografías distribuidas a lo largo de la prueba.

Si una fotografía obligatoria no es enviada:

**la evaluación se detendrá hasta completar la verificación.**

## 20. Documento de identidad

La solicitud de documento será configurable según:

- país;
- empresa;
- tipo de proceso.

Cuando se solicite, la plataforma podrá conservar copia del documento.

Esto requerirá:

- seguridad reforzada;
- permisos restrictivos;
- reglas de retención;
- trazabilidad;
- eliminación según normativa y política.

## 21. Privacidad internacional

La plataforma será regional e internacional.

No estará diseñada únicamente para Ecuador.

Utilizará como referencias globales:

- ISO/IEC 27001;
- ISO/IEC 27701;
- ISO 31700;
- principios de Privacy by Design.

Estos estándares no reemplazan la legislación local.

La plataforma deberá manejar:

**marco global + reglas por jurisdicción.**

## 22. Detección de país

La plataforma podrá utilizar IP para estimar ubicación.

Ejemplo:

“Detectamos que estás realizando la evaluación desde Colombia.”

El candidato podrá:

- confirmar;
- corregir.

El sistema podrá considerar:

- país detectado;
- país declarado;
- país de la empresa;
- entidad responsable;
- localización del procesamiento.

La IP no será el único criterio legal.

> **Nota de reconciliación:** el país queda definido como campo técnico **obligatorio** (no demográfico opcional), ya que habilita los baremos por país (activados automáticamente al alcanzar ≥300 casos de ese país; el baremo General/Global existe desde el inicio).

## 23. Consentimientos

Existirá:

- consentimiento/aceptación general;
- política de privacidad;
- autorizaciones específicas cuando corresponda.

Cámara, biometría o tratamientos especiales deberán informarse específicamente.

El sistema registrará:

- versión aceptada;
- fecha;
- hora;
- jurisdicción/configuración;
- candidato;
- aplicación.

## 24. Datos sensibles

Variables como:

- sustancias;
- deudas;
- violencia;
- acoso;

tendrán controles reforzados.

Las exportaciones masivas requerirán permisos especiales y trazabilidad.

## 25. Pausas y continuidad

El candidato podrá retomar una evaluación interrumpida dentro de una ventana corta, inicialmente:

**24 horas.**

Cuando regrese deberá:

- validar nuevamente acceso;
- reactivar cámara cuando corresponda.

Las respuestas se guardarán automáticamente.

## 26. Evaluaciones incompletas

No se generará resultado si no se completan todos los reactivos obligatorios.

Una prueba incompleta no produce:

- arquetipo;
- score;
- reporte profesional.

## 27. Problemas de cámara

Si se pierde cámara durante una evaluación verificada:

- la evaluación se pausa;
- se solicita recuperar la cámara;
- se revalida identidad;
- luego continúa.

Una interrupción técnica no invalida automáticamente la prueba.

## 28. Cambios de pestaña y anomalías

El sistema registrará:

- cambios de pestaña;
- pérdida de foco;
- interrupciones;
- pérdida de cámara;
- comportamientos atípicos.

Un evento aislado no invalida.

Cuando exista repetición anormal:

- se advertirá al candidato;
- podrá generarse una observación;
- podrá pasar a revisión.

## 29. Calidad de aplicación

El reporte podrá mostrar:

**Adecuada**

**Con observaciones**

**No interpretable**

Cuando una aplicación sea no interpretable, no deberán generarse conclusiones de riesgo.

## 30. Reaplicación

Cuando una evaluación se completó correctamente, el candidato podrá realizar nuevamente la base después de:

**30 días.**

Adicionalmente podrán permitirse hasta dos oportunidades extraordinarias cuando:

- no culminó;
- existió manipulación detectada;
- existió invalidez;
- ocurrió una incidencia técnica relevante.

El historial se conservará.

## 31. Vigencia

La evaluación base tendrá una vigencia inicial de:

**6 meses / 180 días.**

Las dimensiones adicionales tendrán también su propia fecha y vigencia.

Cada dimensión funciona como información independiente.

## 32. Reutilización de resultados

Si una persona tiene una base vigente:

**no repite la base.**

Si una empresa requiere dimensiones adicionales:

responde únicamente lo que falta.

Ejemplo:

Base vigente  
+ Violencia  
+ Impulsividad

El sistema genera un reporte combinando los resultados vigentes.

## 33. Dimensiones vencidas

Si una dimensión adicional está vencida:

- se mostrará como vencida;
- la plataforma recomendará repetirla.

Sin embargo, la empresa podrá decidir utilizar ese resultado como válido bajo su criterio profesional.

La advertencia deberá permanecer visible.

## 34. Propiedad funcional de las dimensiones

Las dimensiones evaluadas pasan a formar parte del perfil del candidato.

No pertenecen únicamente a la empresa que originalmente pagó su aplicación.

Si una dimensión está vigente, una empresa futura que compre el reporte profesional podrá verla.

Esto permite construir progresivamente un perfil profesional más completo.

## 35. Dos reportes diferentes

### Reporte gratuito de arquetipo

Disponible para candidato y terceros autorizados.

Incluye:

- nombre del arquetipo;
- personaje;
- descripción;
- 3 fortalezas;
- 2 áreas de atención;
- comportamiento bajo presión;
- relación con normas;
- interpretación conductual.

No muestra niveles técnicos de riesgo.

### Reporte profesional de riesgos

Es de pago.

Incluye:

- arquetipo;
- índice global;
- score;
- 6 niveles/cortes de riesgo;
- cinco dimensiones base;
- dimensiones adicionales disponibles;
- alertas;
- interpretación;
- factores detectados;
- reactivos críticos seleccionados;
- preguntas sugeridas para entrevista;
- calidad de aplicación;
- verificación;
- vigencia.

## 36. Arquetipos

El arquetipo principal se determina utilizando:

- las cinco dimensiones base;
- índice global;
- patrones combinados.

Las dimensiones adicionales no cambian automáticamente el arquetipo.

Podrán agregar:

- etiquetas;
- subperfiles;
- características complementarias.

El número definitivo de arquetipos no está fijado.

Deberá surgir de los datos de validación.

**Nota de reconciliación:** este número ya quedó definido: **11 arquetipos organizados en 4 familias**, para la versión gratuita (B2C) de 50 reactivos (5 dimensiones Núcleo Base × 10).

## 37. Diseño visual de arquetipos

Cada arquetipo tendrá:

- nombre;
- código interno;
- personaje;
- identidad visual;
- fortalezas;
- vulnerabilidades;
- patrón conductual.

Podrán existir personajes humanos estilizados o figuras conceptuales.

Podrán existir diferentes representaciones visuales del mismo arquetipo.

No se utilizarán personajes protegidos de películas, cómics o marcas.

## 38. Arquetipo vigente

Cuando el candidato vuelva a realizar la base:

el último resultado válido determina el arquetipo actual.

Los arquetipos anteriores permanecen en historial.

## 39. Viralidad

El candidato podrá compartir:

- tarjeta visual;
- enlace;
- WhatsApp;
- redes;
- QR.

La tarjeta podrá incluir:

- arquetipo;
- frase;
- personaje.

El nombre será opcional.

Compartir será voluntario.

El resultado principal no se bloqueará.

Podrán ofrecerse incentivos como:

“Comparte y desbloquea una sección adicional.”

## 40. Enlace controlado

El candidato podrá generar un enlace a su perfil.

Podrá:

- activarlo;
- desactivarlo.

Quien acceda verá:

- arquetipo;
- descripción gratuita;
- vigencia;
- estado de verificación.

El reporte profesional seguirá bloqueado.

## 41. Perfil portátil

El candidato tendrá un perfil reutilizable con:

- arquetipo;
- evaluaciones;
- vigencias;
- módulos realizados;
- estado de verificación;
- historial;
- enlaces de compartir.

El perfil podrá utilizarse en múltiples procesos empresariales.

## 42. Acceso empresarial

Una empresa que no paga ve únicamente:

**el reporte gratuito de arquetipo.**

Para conocer riesgos debe pagar el:

**Reporte Profesional de Riesgos.**

La empresa compra acceso al reporte profesional.

No compra la propiedad de los datos personales.

## 43. Información disponible para la empresa

Antes de pagar, la empresa podrá identificar:

- que existe perfil;
- arquetipo;
- evaluación verificada/no verificada;
- qué dimensiones están vigentes;
- cuáles están vencidas;
- cuáles no han sido aplicadas.

Los niveles reales de riesgo permanecen bloqueados.

## 44. Alcance del reporte pagado

Cuando una empresa compra el reporte profesional:

podrá visualizar todas las dimensiones vigentes disponibles en el perfil del candidato.

No importa qué empresa solicitó originalmente esas dimensiones.

## 45. Reporte histórico

Una empresa que compró un reporte conserva acceso histórico.

Si posteriormente el candidato realiza una nueva evaluación:

- el reporte anterior permanece;
- se identifica como histórico;
- puede indicarse que existe información más reciente.

## 46. PDF empresarial

El reporte profesional podrá descargarse.

El PDF incluirá:

- candidato;
- empresa;
- cargo/proceso;
- fecha;
- vigencia;
- verificación;
- versión del instrumento;
- resumen ejecutivo;
- gráfica general;
- resultados;
- alertas;
- interpretación.

El PDF será una versión ejecutiva.

La versión web será más interactiva.

## 47. Resumen ejecutivo

La primera pantalla/reporte mostrará:

- arquetipo;
- resultado global;
- gráfica general;
- principales alertas;
- calidad de aplicación;
- vigencia.

La empresa deberá comprender el resultado principal en pocos segundos.

## 48. Visualización por dimensión

Cada dimensión mostrará:

- barra horizontal;
- score;
- nivel;
- interpretación breve.

Las cinco dimensiones base y las adicionales aparecerán en secciones separadas.

## 49. Seis niveles de riesgo

El producto manejará:

**6 cortes o niveles.**

Los nombres definitivos: Nivel 1 (Integridad Muy Baja) … Nivel 6 (Integridad Muy Alta). Adicionalmente existe un semáforo de 3 colores como capa de lectura rápida sobre esos 6 niveles (Rojo = Nivel 1-2, Amarillo = Nivel 3-4, Verde = Nivel 5-6).

Los puntos de corte exactos permanecen `[PENDIENTE DE DATO PILOTO]`.

## 50. Escala de puntuación

La escala del producto irá de:

**0 a 95.**

El 5% restante representa un margen de distorsión definido en el modelo.

Dirección:

**95 = mayor integridad / menor riesgo.**

**0 = menor integridad / mayor riesgo.**

El concepto de “5% de distorsión” deberá quedar técnicamente sustentado durante la validación y no presentarse como error estadístico demostrado hasta contar con evidencia.

## 51. Interpretación

La empresa verá:

**Score + nivel + interpretación textual.**

Ejemplo conceptual:

Integridad: 83/95  
Nivel: favorable

Fraude: 51/95  
Nivel: atención

Los nombres definitivos deberán validarse.

## 52. Índices

> **Nota de reconciliación:** el modelo final define un único índice, el **IGI (Índice General de Integridad)**, y no dos índices separados ("Base" y "Ampliado"). El IGI se calcula así:
>
> - **PRB (Puntaje de Riesgo Base):** promedio ponderado de riesgo de las dimensiones del Núcleo (Base + Adicionales que se hayan incluido), 0–1, donde más alto = más riesgo.
> - **Multiplicador_final** = Multiplicador de nivel de puesto (0.70–1.50, 6 niveles) + 0.15 si tiene personal a cargo.
> - **Riesgo_ajustado** = MIN(1, PRB × Multiplicador_final).
> - **IGI_reportado** = (1 − Riesgo_ajustado) × 100 × 0.95 (tope 95, nunca 100).
>
> Las Variables Contextuales nunca entran al PRB ni al IGI; son siempre informativas. En baterías reducidas los pesos se re-parametrizan a 100% entre las dimensiones del Núcleo efectivamente incluidas. El IGI reportado debe acompañarse siempre de SEM + IC 95% (o `[PENDIENTE DE DATO PILOTO]` mientras no haya datos).

Una dimensión crítica podrá generar alerta aunque el IGI global sea favorable.

## 53. Reactivos críticos

Determinados reactivos podrán generar alertas específicas incluso si no modifican sustancialmente el score general.

La empresa podrá visualizar hasta aproximadamente:

**3 reactivos representativos**

cuando una alerta requiera explicación.

No tendrá acceso al banco completo.

## 54. Preguntas para entrevista

Cada dimensión relevante podrá generar:

- interpretación;
- factores encontrados;
- preguntas sugeridas para profundizar durante entrevista.

El objetivo es convertir el reporte en una herramienta de decisión, no en un PDF descriptivo.

## 55. Decisión de contratación

La plataforma no emitirá:

**Contratar / No contratar.**

Podrá utilizar niveles como:

- favorable;
- revisar;
- profundizar;

o equivalentes.

La decisión final corresponde al profesional.

## 56. Normas

El producto buscará desarrollar normas:

- globales;
- por país;
- por ciudad;
- por provincia/estado;
- por puesto/cargo.

Solo se mostrarán cuando exista muestra estadística suficiente.

## 57. Comparación de candidatos

La empresa podrá comparar candidatos cuando:

- participan en el mismo proceso;
- tienen dimensiones equivalentes;
- utilizan condiciones comparables.

Se podrán comparar:

- índice global;
- dimensiones;
- alertas;
- vigencia;
- calidad de aplicación.

La empresa podrá seleccionar qué dimensiones considerar.

El sistema registrará los filtros utilizados.

## 58. Base general empresarial y procesos

La empresa tendrá:

- base general de candidatos;
- procesos de selección;
- cargos/vacantes;
- plantillas.

Un candidato puede participar simultáneamente en varios procesos.

Cada proceso podrá exigir diferentes variables.

## 59. Dashboard empresarial

Mostrará:

- candidatos;
- procesos;
- estados;
- vigencias;
- módulos pendientes;
- saldo/créditos;
- alertas;
- evaluaciones;
- reportes.

## 60. Invitaciones

La empresa podrá invitar mediante:

- correo;
- WhatsApp;
- enlace;
- código QR.

También podrá realizar:

- carga masiva;
- importación;
- API en planes empresariales.

## 61. Estados de evaluación

La empresa podrá ver estados generales como:

- invitado;
- iniciado;
- completado;
- pendiente;
- no interpretable;
- vencido.

No es necesario mostrar porcentaje exacto de avance.

## 62. Notificaciones empresariales

Podrán generarse alertas por:

- evaluación completada;
- reporte disponible;
- dimensión vencida;
- resultado no interpretable;
- fallo de verificación;
- módulos pendientes.

## 63. Cuentas empresariales

La arquitectura permitirá:

- organización matriz;
- filiales;
- países;
- unidades de negocio;
- múltiples usuarios.

Roles posibles:

- administrador;
- RR. HH.;
- profesional;
- solo lectura;
- roles personalizados.

El administrador define permisos.

## 64. Auditoría empresarial

Se registrará:

- quién consultó un reporte;
- quién lo descargó;
- cuándo;
- qué candidato;
- qué acción realizó.

## 65. Modelo comercial

Habrá tres modalidades:

**Pay-as-you-go**

**Plan mensual**

**Plan corporativo personalizado**

Las empresas podrán disponer de créditos.

Los créditos promocionales podrán tener vencimiento distinto a los comprados.

## 66. Dimensiones y precio

Las dimensiones no tendrán precios individuales.

El producto/plan incluye acceso al universo disponible de dimensiones.

La empresa las utiliza según sus necesidades y condiciones comerciales del plan.

No existe:

“Violencia cuesta X y Deudas cuesta Y”.

La monetización se concentra en:

- reportes profesionales;
- volumen;
- créditos;
- planes;
- servicios;
- buscador de talento;
- funcionalidades corporativas.

## 67. Reporte profesional de pago

Aunque el candidato ya tenga todas sus dimensiones vigentes, la empresa debe pagar para desbloquear:

**el Reporte Profesional de Riesgos.**

Los planes podrán incluir reportes dentro de sus paquetes.

## 68. Prueba empresarial gratuita

Una empresa nueva podrá recibir acceso promocional a determinados reportes profesionales.

El número no será universal.

Dependerá de:

- empresa;
- tamaño;
- oportunidad comercial;
- campaña;
- plan.

## 69. Buscador de talento

Existirá como servicio adicional.

El candidato entrará inicialmente al buscador por defecto, con posibilidad de salir.

Esta regla deberá validarse jurídicamente por jurisdicción antes del lanzamiento.

La empresa verá inicialmente un perfil anonimizado.

Ejemplo:

- cargo;
- ciudad;
- experiencia;
- arquetipo;
- evaluación vigente;
- estado verificado.

Sin datos personales completos.

## 70. Filtros del buscador

Podrán incluir:

- cargo;
- ciudad;
- país;
- experiencia;
- industria;
- nivel jerárquico;
- formación;
- arquetipo;
- dimensiones disponibles;
- vigencia.

Los filtros de riesgo estarán disponibles únicamente bajo servicios profesionales y reglas de acceso.

## 71. Desbloqueo de candidatos

La empresa podrá comprar acceso a:

- información de contacto;
- perfil;
- reporte profesional.

El buscador tendrá modelo:

**suscripción + créditos.**

## 72. Preferencias laborales

El candidato podrá indicar:

- cargos deseados;
- industria;
- ubicación;
- modalidad;
- expectativa salarial.

Podrá salir del servicio de búsqueda cuando lo desee.

## 73. Notificaciones del candidato

Podrá elegir:

- correo;
- WhatsApp;
- ambos.

Recibirá:

- invitación;
- código;
- recordatorios;
- confirmación;
- resultado disponible;
- aviso de vencimiento.

El aviso de vencimiento de su base se enviará al candidato.

## 74. Resultado por correo/WhatsApp

No se enviará necesariamente el resultado completo.

Se podrá enviar:

- resumen;
- arquetipo;
- enlace seguro.

Esto devuelve tráfico a la plataforma.

## 75. Comunicación empresarial

Los reportes profesionales no deberán enviarse automáticamente como PDF adjunto.

La empresa recibirá:

**notificación + enlace seguro.**

El PDF se descarga desde la plataforma.

## 76. Co-branding

La plataforma utilizará co-branding.

La invitación podrá mostrar:

- nuestra plataforma;
- nombre/logo de empresa cliente.

Los contratos corporativos podrán acceder a opción white-label.

## 77. Personalización de invitaciones

La empresa podrá personalizar mensajes dentro de una plantilla controlada.

No tendrá libertad absoluta para modificar textos legales o condiciones críticas.

## 78. Recuperación e incidencias

Cada respuesta se guarda automáticamente.

Si se cae internet:

- el progreso se conserva;
- se registra la incidencia;
- puede continuar.

Si se cierra navegador:

- retoma desde último punto;
- revalida acceso;
- revalida cámara cuando corresponda.

## 79. Incidencias repetidas

Cuando existan múltiples interrupciones:

- se registran;
- pueden generar estado “Con observaciones”;
- pueden pasar a revisión.

No se invalidan automáticamente por una única falla.

## 80. Soporte

Existirá:

- centro de ayuda;
- chatbot/IA;
- escalamiento a soporte humano.

El candidato podrá reportar:

- acceso;
- correo;
- cámara;
- conexión;
- reactivo confuso;
- situación externa que afectó la prueba.

## 81. Reinicio de evaluación

Solo usuarios autorizados podrán reiniciar una prueba.

Debe registrarse:

- motivo;
- responsable;
- fecha;
- caso.

La aplicación anulada se conserva para auditoría pero no se utiliza para scoring.

## 82. Reclamos

Cuando un candidato reclame su resultado:

- se abre caso;
- se revisa;
- no se modifica automáticamente.

Solo se modifica si existe error:

- técnico;
- metodológico;
- operativo demostrado.

## 83. Panel interno de operación

El producto deberá disponer de panel interno para:

- usuarios;
- empresas;
- evaluaciones;
- incidencias;
- reportes;
- scoring;
- versiones;
- auditoría;
- seguridad;
- soporte.

## 84. Historial y retención

Las evaluaciones vencidas se conservarán como histórico durante un período inicialmente estimado entre:

**2 y 5 años**, sujeto a política y legislación.

Internamente se conservará el historial completo necesario.

La información visible dependerá de:

- vigencia;
- permisos;
- tipo de usuario.

## 85. Eliminación de cuenta

El candidato podrá eliminar su cuenta.

La plataforma podrá conservar únicamente la información que legal o contractualmente corresponda mantener para:

- auditoría;
- seguridad;
- defensa de derechos;
- obligaciones empresariales;
- registros regulatorios.

Los reportes históricos legítimamente adquiridos por empresas podrán mantenerse asociados al proceso correspondiente.

## 86. Evidencia de cámara

Las imágenes deberán conservarse durante el período mínimo necesario conforme a:

- verificación;
- auditoría;
- incidencias;
- normativa.

Posteriormente deberán eliminarse, anonimizarse o manejarse según política.

El estado:

**Identidad verificada**

podrá conservarse independientemente.

## 87. Logs técnicos

Se conservarán durante períodos definidos:

- IP;
- navegador;
- dispositivo;
- fecha;
- hora;
- interrupciones;
- cámara;
- eventos técnicos.

Su uso será:

- seguridad;
- auditoría;
- soporte;
- investigación.

## 88. Versionamiento

Cada resultado deberá identificar:

- versión global del instrumento;
- versión de dimensión;
- versión del algoritmo;
- idioma/adaptación.

Los reportes históricos quedan congelados tal como fueron emitidos.

## 89. Correcciones posteriores

Si cambia una interpretación:

los reportes antiguos no cambian.

Los nuevos utilizan la nueva versión.

Si se detecta un error:

- se identifican reportes afectados;
- se analiza impacto;
- se notifica cuando corresponda;
- se emite corrección;
- el original permanece en auditoría.

## 90. Scoring y reactivos

> **Nota de reconciliación:** el banco de reactivos ya está escrito y cerrado, no se trata de "candidatos a elegir". Cada dimensión tiene **10 reactivos fijos** (2 de cada uno de 5 tipos, 5 pares espejo), con 5 variantes de redacción por reactivo (1,050 textos clásicos en total). Para 3 de esos 10 slots por dimensión (op1, op2, perc1) existen además reactivos "alternativos" de opciones concretas (`_alt`): un pool de 13 candidatos por dimensión (10 clásicos + 3 alternativos), del cual el motor elige al azar por slot, pero siempre se administran y puntúan exactamente 10 por dimensión (63 reactivos `_alt` × 5 variantes = 315 textos adicionales). A esto se suman 8 reactivos de Deseabilidad Social, 6 de control de Azarosidad y 6 de bio-data, ninguno de los cuales entra al IGI.

Inicialmente podrán tener peso equivalente.

Posteriormente la evidencia podrá modificar ponderaciones.

## 91. Banco rotativo

Cada dimensión deberá evolucionar hacia:

- núcleo de reactivos;
- banco alternativo calibrado.

Esto permitirá:

- rotación;
- reducir aprendizaje;
- disminuir manipulación;
- desarrollar versiones equivalentes.

## 92. Validación psicométrica

Cada dimensión deberá analizarse mediante:

- confiabilidad;
- discriminación;
- estructura factorial;
- test-retest;
- validez convergente;
- validez discriminante;
- análisis de sesgo.

Las cinco dimensiones base serán prioridad.

Simultáneamente se recolectará información para las adicionales.

## 93. Funcionamiento diferencial

Se analizarán posibles diferencias injustificadas por:

- país;
- sexo;
- edad;
- región;
- otros grupos relevantes;

cuando exista tamaño de muestra suficiente.

## 94. Normas y actualización

Las normas se actualizarán cuando exista nueva evidencia suficiente.

Cuando el producto alcance madurez:

**revisión formal al menos anual.**

## 95. Dimensiones piloto

Una dimensión nueva que todavía no tenga evidencia suficiente podrá ofrecerse como:

**Piloto / Experimental**

Debe estar claramente identificada hasta completar validación.

## 96. Deseabilidad social

> **Nota de reconciliación:** el modelo final define 5 indicadores de validez, no solo deseabilidad social: Azarosidad, Omisión, Aquiescencia, Contradicción y Deseabilidad Social. Ninguno cambia el número reportado del IGI, solo cómo se muestra (gris + advertencia).

La deseabilidad social y manejo de impresión funcionarán como indicadores de calidad.

Podrán aparecer en reporte como alerta resumida.

No invalidarán automáticamente el instrumento.

La invalidez requerirá análisis combinado con:

- inconsistencia;
- velocidad;
- contradicción;
- otros indicadores.

## 97. API e integraciones

La arquitectura estará preparada para API desde el inicio.

Las integraciones se liberarán progresivamente.

La API podrá permitir:

- crear candidato;
- enviar evaluación;
- consultar estado;
- recuperar reporte;
- configurar variables;
- recibir eventos.

## 98. Integraciones empresariales

Se contemplarán:

- ATS;
- HRIS;
- plataformas de reclutamiento;
- sistemas internos;
- API;
- webhooks.

Planes corporativos podrán utilizar SSO.

## 99. Webhooks

Eventos posibles:

- evaluación iniciada;
- completada;
- no interpretable;
- reporte disponible;
- dimensión vencida;
- fallo de verificación.

## 100. Arquitectura multinacional

Desde el inicio deberá contemplar:

- organización matriz;
- filial;
- país;
- unidad;
- moneda;
- impuesto;
- idioma;
- permisos.

## 101. Idiomas

La arquitectura será multidioma.

Lanzamiento inicial:

**español.**

Posteriormente podrán incorporarse:

- inglés;
- portugués;
- otros.

Cada traducción/adaptación deberá:

- versionarse;
- validarse cultural y psicométricamente.

## 102. Métricas del candidato

Se medirá:

Visita  
→ Registro  
→ Validación  
→ Cámara  
→ Inicio  
→ Abandono  
→ Finalización  
→ Resultado  
→ Compartir  
→ Empresa generada

La aceptación de cámara será KPI específico.

## 103. Métricas por reactivo

Podrán analizarse:

- tiempo;
- respuestas;
- abandono;
- patrones anómalos;
- reportes de incomprensión.

Estos datos también alimentarán psicometría.

## 104. KPIs empresariales

Se medirá:

Registro  
→ Primer reporte  
→ Candidatos  
→ Reutilización  
→ Dimensiones utilizadas  
→ Créditos  
→ Renovación  
→ Expansión

El principal KPI comercial será:

**empresa activa que utiliza recurrentemente reportes.**

## 105. Viralidad

Se analizará:

- porcentaje que comparte;
- nuevos evaluados generados;
- empresas generadas;
- canal de adquisición.

Canales:

- orgánico;
- WhatsApp;
- candidato;
- referral;
- empresa;
- campañas;
- buscador;
- API.

## 106. Outcomes

La plataforma invitará a las empresas a registrar resultados posteriores:

- contratado;
- descartado;
- renuncia;
- permanencia;
- incidentes;
- desempeño relevante.

Estos datos podrán utilizarse para mejorar la validez predictiva.

Nunca modificarán automáticamente el algoritmo de producción.

## 107. Analytics empresariales

Las organizaciones podrán acceder a información agregada como:

- evaluados;
- tendencias;
- riesgos;
- dimensiones;
- cargos;
- tiempos;
- vigencias.

Se evitará exponer información individual innecesaria.

## 108. Gobernanza psicométrica

Existirá un comité técnico con:

- psicometría;
- producto;
- tecnología.

Cambios de scoring requieren aprobación formal y trazabilidad.

## 109. Control de reactivos

Solo usuarios autorizados podrán modificar reactivos.

Los cambios deberán seguir:

- flujo de aprobación;
- versionamiento;
- pruebas;
- publicación controlada.

## 110. Versiones del instrumento

Se utilizará:

**versión global**

+

**versión por dimensión**

+

**versión de algoritmo**

Ejemplo conceptual:

Instrumento 2.1  
Robo 1.4  
Algoritmo 3.0

## 111. Comité psicométrico

Existirá formalmente.

Revisará:

- confiabilidad;
- validez;
- sesgos;
- normas;
- reactivos;
- cortes;
- modelos;
- pilotos.

Habrá:

**monitoreo continuo + revisión formal anual.**

## 112. Seis cortes de riesgo

Los cambios de cortes solo podrán realizarse con:

- evidencia;
- comité;
- trazabilidad;
- nueva versión.

Los clientes no pueden modificar las fórmulas.

Solo pueden configurar:

- exigencia;
- criterios permitidos.

## 113. Sandbox

Antes de publicar cambios existirá entorno de:

**sandbox/staging.**

Se probarán:

- scoring;
- algoritmos;
- reactivos;
- reportes;
- integraciones;
- compatibilidad.

## 114. Uso permitido

Existirá una política específica que defina:

- usos permitidos;
- usos prohibidos;
- limitaciones;
- responsabilidades del profesional;
- condiciones de interpretación;
- procesos que requieren controles adicionales.

La herramienta será apoyo para decisión profesional.

No sustituirá automáticamente el criterio humano.

## 115. Definición final del producto

El producto será una plataforma digital, modular y regional de evaluación de integridad laboral que permite a una persona completar una evaluación base de aproximadamente 55 a 60 reactivos en 10 a 15 minutos, obtener gratuitamente un arquetipo conductual y construir progresivamente un perfil profesional reutilizable.

La evaluación base mide:

**Robo, Mentira, Fraude, Irresponsabilidad y Soborno.**

La plataforma dispone de 16 dimensiones adicionales que pueden incorporarse según las necesidades del cargo.

El candidato recibe una experiencia comprensible basada en arquetipos.

La empresa paga por acceder al reporte profesional, donde encuentra los riesgos reales, puntuaciones, alertas, interpretación y herramientas para profundizar en entrevista.

Los resultados pertenecen funcionalmente al perfil del candidato y pueden reutilizarse mientras permanezcan vigentes.

La evaluación base tendrá inicialmente una vigencia profesional de seis meses.

La plataforma incorporará verificación de identidad, cámara, tiempos de respuesta, controles psicométricos, privacidad internacional, configuración por cargo, normas regionales, API, analytics y un sistema de gobernanza técnica y psicométrica.

## 116. Elementos pendientes de validación

Antes del lanzamiento definitivo todavía deberán validarse técnicamente:

- nombres y puntos exactos de los 6 cortes;
- significado estadístico definitivo del margen de distorsión del 5%;
- fórmula exacta del Índice Base;
- fórmula del Índice Ampliado;
- pesos psicométricos;
- impacto del nivel de exigencia 1–6;
- número definitivo de arquetipos;
- reglas matemáticas de asignación;
- reactivos transversales;
- reactivos críticos;
- tamaño mínimo de muestras normativas;
- normas iniciales;
- equivalencia web/WhatsApp;
- período exacto de conservación de fotografías y documentos;
- condiciones legales del ingreso por defecto al buscador de talento;
- reglas comerciales exactas de créditos y planes;
- nomenclatura final del producto y sus módulos.

## 117. Estado actual

Con las decisiones tomadas, el diseño conceptual del producto ya se encuentra suficientemente definido para iniciar las siguientes fases:

**Fase 1:** arquitectura funcional y flujos completos.

**Fase 2:** experiencia UX/UI.

**Fase 3:** revisión y depuración del banco de reactivos.

**Fase 4:** construcción del scoring y modelo de arquetipos.

**Fase 5:** prototipo funcional.

**Fase 6:** piloto y validación psicométrica.

**Fase 7:** ajuste comercial y lanzamiento.

---

**Nota de reconciliación (2026-09-16):** revisado y ajustado contra el respaldo técnico vigente (DECISIONS.md).