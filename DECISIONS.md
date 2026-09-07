# Decisiones de diseño — Proyecto Nuevo Instrumento de Integridad

Fecha: 2026-09-06. Confirmadas por George vía ronda obligatoria de preguntas cerradas.

## Núcleo psicométrico
1. **Dimensiones**: 20 en total = 17 dimensiones equivalentes a las de AMITAI (renombradas y redefinidas con lenguaje propio, sin copiar texto) + 3 nuevas dimensiones que cubren brechas detectadas en la Fase 1 del análisis: Conflicto de Interés, Uso Indebido de Recursos No Físicos (datos/tiempo/activos digitales), y Percepción de Impunidad.
2. **Modelo estadístico**: Híbrido. Se lanza con Teoría Clásica de los Tests (TCT) — puntaje ponderado tipo RGI, igual filosofía que AMITAI pero con fórmula y tabla de valores 100% documentadas y auditables desde el día uno. El diseño de ítems debe quedar preparado para migrar a TRI/IRT en una fase futura, cuando exista una muestra piloto suficiente (cientos de casos).
3. **Tamaño del banco de reactivos**: 60-80 reactivos en total (banco extendido, con ítems alternos por dimensión, similar en filosofía al banco de 343 de AMITAI pero de tamaño inicial menor).
4. **Originalidad**: Máxima. 0% de parafraseo de los ejemplos de reactivos vistos en los documentos de AMITAI. Cada reactivo se escribe desde la definición operacional del constructo, no desde ejemplos vistos.
5. **Formato de la matriz de scoring**: Excel (matriz estructurada: ID reactivo, dimensión, subdimensión, tipo, alternativas, valores, peso, inverso, ítems espejo, reglas de inconsistencia) + Word (informe narrativo que explica el modelo, la lógica de cálculo y el plan de validación).
6. **Alcance de las normas**: Se documenta el marco (fórmulas, tamaño muestral objetivo, procedimiento de estandarización Z, puntos de corte) y un plan de recolección de datos piloto. NO se inventan medias/desviaciones estándar ficticias — se dejan placeholders explícitos hasta contar con datos reales.

## Modelo de negocio (definido en una segunda ronda, tras revisar amitai.com, midot.com, kudert.com/seretico y 16personalities.com)
7. **Modelo**: Híbrido — versión **B2C gratuita y viral** para personas individuales (inspirada en 16Personalities: test gratis, resultado tipo "perfil" compartible en redes) + versión **B2B de pago** para empresas que ya usan el producto en procesos de selección/gestión de personal (inspirada en el modelo de AMITAI/Midot/Kudert, pero como upsell, no como único canal).
8. **Encuadre de contenido**: La versión individual (viral) usa un tono de autoconocimiento/perfil de integridad, pensado para compartirse. La versión empresarial conserva el marco de riesgo laboral (robo, fraude, etc.) para procesos de selección, tal como en el instrumento original que se está reconstruyendo conceptualmente.
9. **Monetización**: Freemium. Resultado básico gratis para individuos; reporte premium de pago para individuos (autoconocimiento extendido) y una oferta empresarial de pago separada para compañías (equivalente al "Teams"/enterprise de 16Personalities, o al modelo de venta de AMITAI/Midot).
10. **Relación con el núcleo psicométrico**: Se mantiene el mismo motor de 20 dimensiones y banco de 60-80 reactivos para ambas versiones (individual y empresarial); lo que cambia es la CAPA DE SALIDA (narrativa tipo perfil vs. reporte de riesgo para reclutador) y el modelo de monetización, no el instrumento de medición en sí.

## Nombre del instrumento/producto
11. Placeholder: **[NOMBRE DEL INSTRUMENTO]** — George lo definirá más adelante; todos los documentos deben usar ese placeholder de forma consistente para poder reemplazarlo con una sola pasada de buscar-y-reemplazar.

## Reglas de trabajo permanentes para todas las fases autónomas
- Nunca reproducir ni parafrasear reactivos, textos o ejemplos vistos en los documentos de AMITAI (ni de Midot/Kudert). Todo contenido nuevo se escribe desde cero a partir de la definición del constructo.
- Nunca inventar estadísticas reales (medias, desviaciones estándar, tamaños muestrales de norma) — usar placeholders explícitos marcados como `[PENDIENTE DE DATO PILOTO]`.
- Mantener siempre la distinción HECHO / INFERENCIA / HIPÓTESIS / DESCONOCIDO cuando se retome contenido de las Fases 1-3 ya entregadas.
- Cada fase debe dejar su(s) archivo(s) dentro de esta misma carpeta (`Proyecto_Nuevo_Instrumento`) y actualizar `PROGRESS.json`.
