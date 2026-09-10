# Decisiones de diseño — Proyecto Nuevo Instrumento de Integridad

Fecha: 2026-09-06. Confirmadas por George vía ronda obligatoria de preguntas cerradas.

## Núcleo psicométrico
1. **Dimensiones — VERSIÓN 2 (2026-09-09, reemplaza la versión original de abajo)**: 21 dimensiones en total, organizadas en tres grupos. Los nombres deben ser cortos, directos y sin jerga clínica salvo que el término clínico sea de uso público muy extendido y más claro que la alternativa descriptiva (caso Ludopatía). Cada dimensión es una **sub-prueba independiente** con su propio resultado (0-100); el Índice General de Integridad (IGI) es EXCLUSIVAMENTE la combinación ponderada de las dimensiones del grupo "Núcleo — Base" + las de "Núcleo — Adicionales" que se hayan seleccionado para el puesto. Las "Factores Contextuales" nunca entran al IGI, se reportan siempre aparte.

   **Núcleo — Base obligatoria (5, presentes en TODO test sin excepción, es el estándar mínimo del instrumento):**
   1. Robo — sustracción de bienes, dinero, información o tiempo ajenos.
   2. Mentira — tendencia a decir falsedades o distorsionar la verdad para conveniencia propia.
   3. Fraude — alteración de documentos, registros o información para obtener un beneficio.
   4. Irresponsabilidad — evasión de responsabilidad por los propios actos, incluyendo culpar a terceros.
   5. Soborno — ofrecer o aceptar algo a cambio de una concesión que viola una norma.

   **Núcleo — Adicionales (7, se suman a la Base según el perfil de riesgo del puesto; no siempre las 7 juntas):**
   6. Deslealtad — disposición a actuar en contra de los intereses de la organización.
   7. Favoritismo — anteponer relaciones personales/intereses propios a decisiones objetivas (antes "Conflicto de Interés").
   8. Abuso de Recursos — uso indebido de recursos, tiempo o activos de la organización para fines propios.
   9. Acoso Sexual — conducta no deseada de naturaleza sexual hacia otra persona.
   10. Maltrato Laboral — uso de una posición de autoridad para intimidar, humillar u hostigar (antes "Acoso Psicológico Laboral").
   11. Discriminación — trato desigual basado en características personales no relacionadas con el desempeño.
   12. Asociación Criminal — tolerancia o cercanía actitudinal hacia grupos o actividades delictivas.

   **Factores Contextuales (9, informativos, NUNCA entran al IGI):**
   13. Sustancias Lícitas — consumo/justificación de alcohol, tabaco u otras sustancias legales.
   14. Sustancias Ilícitas — consumo/justificación de drogas no permitidas por la ley.
   15. Incumplimiento de Normas — predisposición a ignorar leyes, reglamentos o normas de convivencia.
   16. Deudas — relación de la persona con el endeudamiento como forma de obtener bienes.
   17. Impulsividad — tendencia a actuar sin pensar, asumiendo riesgos por beneficios inmediatos.
   18. Violencia — tendencia al uso de fuerza física, verbal o relacional.
   19. Ludopatía — pérdida de control sobre conductas de juego que implican dinero (no limitado a casinos: incluye lotería, apuestas deportivas, cartas, tragamonedas, apuestas en línea, etc.).
   20. Egoísmo — falta de interés genuino por el bienestar ajeno o colectivo.
   21. Impunidad — creencia de que es poco probable ser descubierto o sancionado por una conducta deshonesta.

   **Regla de configuración por puesto**: toda batería incluye obligatoriamente las 5 dimensiones Base. A partir de ahí se agregan 0 o más dimensiones Núcleo Adicionales según el análisis de riesgo del puesto (igual lógica de "probabilidad × impacto" ya usada en el análisis de referencia), y opcionalmente Factores Contextuales relevantes. Nunca se exige incluir las 12 dimensiones Núcleo a la vez.

   *(Versión original, ahora obsoleta, se conserva por trazabilidad: 20 dimensiones = 17 equivalentes a las de AMITAI + 3 nuevas — Conflicto de Interés, Uso Indebido de Recursos No Físicos, Percepción de Impunidad — con nombres largos/técnicos tipo "Respeto a la Propiedad Ajena". Reemplazada íntegramente por la Versión 2 de arriba.)*
2. **Modelo estadístico**: Híbrido. Se lanza con Teoría Clásica de los Tests (TCT) — puntaje ponderado tipo RGI, igual filosofía que AMITAI pero con fórmula y tabla de valores 100% documentadas y auditables desde el día uno. El diseño de ítems debe quedar preparado para migrar a TRI/IRT en una fase futura, cuando exista una muestra piloto suficiente (cientos de casos).
3. **Tamaño del banco de reactivos — ACTUALIZADO (ver punto 16-18)**: la cifra original de 75 reactivos (4 por dimensión Núcleo + 3 por Contextual) queda **reemplazada** por 123 reactivos (8 por dimensión Núcleo, 4 pares espejo completos, + 3 por Contextual), conforme al punto 16 de este documento (2026-09-10). El razonamiento original de esta sección (banco extendido con ítems alternos, filosofía similar a AMITAI) se mantiene sin cambios; solo cambia el número final por dimensión Núcleo.
4. **Originalidad**: Máxima. 0% de parafraseo de los ejemplos de reactivos vistos en los documentos de AMITAI. Cada reactivo se escribe desde la definición operacional del constructo, no desde ejemplos vistos.
5. **Formato de la matriz de scoring**: Excel (matriz estructurada: ID reactivo, dimensión, subdimensión, tipo, alternativas, valores, peso, inverso, ítems espejo, reglas de inconsistencia) + Word (informe narrativo que explica el modelo, la lógica de cálculo y el plan de validación).
6. **Alcance de las normas**: Se documenta el marco (fórmulas, tamaño muestral objetivo, procedimiento de estandarización Z, puntos de corte) y un plan de recolección de datos piloto. NO se inventan medias/desviaciones estándar ficticias — se dejan placeholders explícitos hasta contar con datos reales.

## Modelo de negocio (definido en una segunda ronda, tras revisar amitai.com, midot.com, kudert.com/seretico y 16personalities.com)
7. **Modelo**: Híbrido — versión **B2C gratuita y viral** para personas individuales (inspirada en 16Personalities: test gratis, resultado tipo "perfil" compartible en redes) + versión **B2B de pago** para empresas que ya usan el producto en procesos de selección/gestión de personal (inspirada en el modelo de AMITAI/Midot/Kudert, pero como upsell, no como único canal).
8. **Encuadre de contenido**: La versión individual (viral) usa un tono de autoconocimiento/perfil de integridad, pensado para compartirse. La versión empresarial conserva el marco de riesgo laboral (robo, fraude, etc.) para procesos de selección, tal como en el instrumento original que se está reconstruyendo conceptualmente.
9. **Monetización**: Freemium. Resultado básico gratis para individuos; reporte premium de pago para individuos (autoconocimiento extendido) y una oferta empresarial de pago separada para compañías (equivalente al "Teams"/enterprise de 16Personalities, o al modelo de venta de AMITAI/Midot).
10. **Relación con el núcleo psicométrico**: Se mantiene el mismo motor de 21 dimensiones (5 Núcleo Base + 7 Núcleo Adicionales + 9 Factores Contextuales) y banco de 75 reactivos para ambas versiones (individual y empresarial); lo que cambia es la CAPA DE SALIDA (narrativa tipo perfil vs. reporte de riesgo para reclutador) y el modelo de monetización, no el instrumento de medición en sí.
11. **Capa gratuita B2C — arquetipos de personaje (2026-09-09)**: El resultado gratuito individual se presenta como un "arquetipo de personaje" (mecánica tipo quiz viral: "¿a qué personaje te pareces?"), construido a partir del patrón de las 2-3 dimensiones Núcleo con mejor puntaje de la persona, con nombre, descripción y tono siempre favorecedor. Los arquetipos deben ser **personajes originales propios del producto**, nunca personajes con derechos de autor/marca de terceros (tipo Batman, Bart Simpson u otros), por el riesgo legal de usar propiedad intelectual ajena en un producto comercial. El reporte de riesgo laboral (IGI) permanece exclusivamente en la capa de pago B2B, conforme al punto 10.

## Nombre del instrumento/producto
12. Placeholder: **[NOMBRE DEL INSTRUMENTO]** — George lo definirá más adelante; todos los documentos deben usar ese placeholder de forma consistente para poder reemplazarlo con una sola pasada de buscar-y-reemplazar.

## Reglas de trabajo permanentes para todas las fases autónomas
- Nunca reproducir ni parafrasear reactivos, textos o ejemplos vistos en los documentos de AMITAI (ni de Midot/Kudert). Todo contenido nuevo se escribe desde cero a partir de la definición del constructo.
- Nunca inventar estadísticas reales (medias, desviaciones estándar, tamaños muestrales de norma) — usar placeholders explícitos marcados como `[PENDIENTE DE DATO PILOTO]`.
- Mantener siempre la distinción HECHO / INFERENCIA / HIPÓTESIS / DESCONOCIDO cuando se retome contenido de las Fases 1-3 ya entregadas.
- Cada fase debe dejar su(s) archivo(s) dentro de esta misma carpeta (`Proyecto_Nuevo_Instrumento`) y actualizar `PROGRESS.json`.

## Variantes de redacción por reactivo (2026-09-09)
13. **Familias de reactivos**: cada uno de los 75 reactivos del banco tiene **4 variantes de redacción** (la base + 3 adicionales), documentadas en las Fases 3-5. Las 4 variantes de una misma familia comparten siempre dimensión, subdimensión, indicador, tipo, dirección, número de opciones y valor por opción; solo cambia el escenario/objeto/grupo de referencia concreto de la pregunta. El sistema debe mostrar una variante al azar (o rotarlas) por reactivo en cada aplicación, y registrar qué variante vio cada persona, para permitir verificar empíricamente en la Fase 9 que las variantes de una misma familia son equivalentes. Objetivo: que el test nunca se sienta repetido entre dos aplicaciones, y reducir el riesgo de que las respuestas se compartan entre personas antes de tomarlo.
14. **Una sola aplicación por persona; el número de reactivos por dimensión es fijo, nunca "se completa" después (2026-09-10)**: No existe un "test corto/mini" que luego se alargue agregando preguntas para producir el reporte de pago. Cada persona responde, en **una sola sesión**, la batería configurada para ese proceso (Base obligatoria + Adicionales/Contextuales que correspondan según la "Regla de configuración por puesto" del punto 1), con el número fijo de reactivos por dimensión ya definido en el punto 3 (4 por dimensión Núcleo, 3 por Contextual) — las variantes de redacción del punto 13 cambian el texto, nunca la cantidad de reactivos. Esa misma sesión es la fuente de datos tanto para la capa de salida gratuita (arquetipo B2C) como para la de pago (reporte de riesgo B2B); lo único que cambia entre capas es qué tan grande es la batería configurada (punto 10), no que se le pidan más respuestas a una persona que ya terminó.
    - **Capa gratuita B2C**: batería = únicamente las 5 dimensiones Base × 4 reactivos = **20 reactivos fijos**. Con esos 20 (usando variantes) se calcula el IIC por dimensión Base y se asigna el arquetipo (punto 11). No hay una versión reducida de esto; 20 es el número.
    - **Capa de pago B2B**: batería = Base (20, siempre obligatoria) + Adicionales elegidas para el puesto (4 c/u) + Contextuales elegidas (3 c/u), todo respondido en la misma sesión.
    - Si se necesita el reporte de pago de alguien que ya tomó solo la versión gratuita, no se "completan" sus respuestas: se le vuelve a aplicar el test completo correspondiente, con variantes de redacción distintas a las que ya vio.
15. **Instrucción inicial sobre situaciones personales/laborales (2026-09-10)**: Antes del primer reactivo, el test (web o WhatsApp) muestra una sola vez el siguiente bloque de instrucciones, que aplica a todo el test sin repetirse después:

    > "Algunas preguntas describen situaciones que pueden darse tanto en tu vida personal como en tu trabajo. Aunque no te haya pasado exactamente así, respondé imaginando qué harías si estuvieras en esa situación. No hay respuestas correctas o incorrectas: lo importante es tu reacción más sincera."

    Objetivo: evitar que la persona se bloquee o deje de responder honestamente por pensar "esto no me ha pasado", cuando lo que se busca medir es la tendencia de reacción, no el historial literal de esa situación exacta.

## Banco de reactivos — Versión 3 (confirmado 2026-09-10)
16. **8 reactivos por dimensión Núcleo (Base + Adicionales)**: sube de los 4 originales a **8**, organizados en **4 pares espejo completos** por dimensión (antes solo 1 par de 4 reactivos era par espejo obligatorio; ahora los 4 indicadores conductuales de la Fase 1 quedan cubiertos por un par cada uno — una versión declarativa/actitudinal o de percepción, y una versión conductual/situacional — para poder cruzar cada indicador contra sí mismo y detectar contradicciones con más precisión). Esto sube el banco Núcleo de 48 a **96 reactivos** (12 dimensiones × 8). El detalle exacto de qué tipo de reactivo forma cada par, por dimensión, se documenta en la Fase 2 Sección 4 (revisión) y en la Fase 6.
17. **Factores Contextuales se quedan en 3 reactivos cada uno** (27 total): no entran al IGI, por lo que no requieren el mismo nivel de precisión que el Núcleo.
18. **Banco total: 123 reactivos** (96 Núcleo + 27 Contextuales), reemplaza la cifra de 75 usada en la Versión 2. Cada reactivo conserva sus 4 variantes de redacción (punto 13); el banco completo de variantes queda entonces en 123 × 4 = 492 textos.

## Escala reportada, niveles de corte y semáforo (confirmado 2026-09-10)
19. **Tope estructural del 95% (margen de error de medición)**: el puntaje final que se reporta (IGI, IIC, y el puntaje de cada dimensión individual) siempre se calcula sobre 0-100 y luego se reescala multiplicando ×0.95, de modo que **nunca llega a 100**, reflejando que ningún instrumento psicométrico puede afirmar con 100% de certeza una conducta. Aplica siempre, para toda aplicación, independientemente de si el protocolo es válido o no.
20. **Niveles de corte: mínimo 6 niveles**, no 3. George indicó que el estándar mínimo en instrumentos psicométricos de este tipo es de 6 niveles de corte, tanto para el IGI general como para cada dimensión individualmente. Los 6 niveles (ordenados de menor a mayor riesgo) son: Riesgo Muy Bajo, Riesgo Bajo, Riesgo Moderado-Bajo, Riesgo Moderado-Alto, Riesgo Alto, Riesgo Muy Alto. Los puntos de corte exactos (percentiles) entre estos 6 niveles **no se inventan**: quedan como `[PENDIENTE DE DATO PILOTO]` hasta que exista una muestra real (Fase 8-9), conforme a la regla ya vigente de no inventar normas ficticias (sección "Reglas de trabajo permanentes"). Mientras tanto, el sistema puede operar con puntos de corte provisionales, explícitamente marcados como tales, para tener un prototipo funcional.
21. **Semáforo de 3 colores como capa de lectura rápida sobre los 6 niveles**: Verde = Riesgo Muy Bajo + Riesgo Bajo (niveles 1-2); Amarillo = Riesgo Moderado-Bajo + Riesgo Moderado-Alto (niveles 3-4); Rojo = Riesgo Alto + Riesgo Muy Alto (niveles 5-6). Se aplica tanto al IGI general como al resultado de cada dimensión individual (Robo, Soborno, etc.), no solo al índice general.
22. **La invalidación del protocolo (Azarosidad, Omisión, Aquiescencia, Contradicción) NUNCA cambia el número calculado — solo cambia cómo se muestra.** Corrige el mecanismo anterior (que excluía la dimensión afectada del promedio y renormalizaba pesos): a partir de esta versión, el IGI y cada Puntaje_dimensión se calculan siempre con la fórmula completa, sin excluir ni renormalizar nada. Lo único que cambia cuando se detecta invalidación parcial (una dimensión) o total (todo el protocolo) es la presentación: el número se sigue mostrando con su valor real, pero **en color gris en vez de su color de semáforo normal**, acompañado de una advertencia visible de que esa aplicación (o esa dimensión específica) mostró patrones de respuesta inconsistentes y debe interpretarse con cautela. Objetivo declarado por George: lo importante es poder mostrar que la prueba fue manipulada, no ocultar o alterar el dato calculado.
