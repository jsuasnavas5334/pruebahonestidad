# Plan maestro — Proyecto Nuevo Instrumento de Integridad

Este plan se ejecuta de forma **autónoma**, una fase por cada disparo de la tarea programada (~1 hora entre cada una). Cada fase debe leerse junto con `DECISIONS.md` (reglas y decisiones fijas) y `PROGRESS.json` (qué fase sigue).

Insumos de referencia ya entregados a George (no reabrir ni repetir, solo consultar si hace falta contexto): `Fase1_Analisis_AMITAI.docx` y `Fase2_3_Reconstruccion_Norma_AMITAI.docx`, ambos en la carpeta `Software MITAI` (un nivel arriba de esta carpeta).

## Fase 1 — Arquitectura de dimensiones (nuevo instrumento)
Entregable: `Fase1_Dimensiones_NuevoInstrumento.docx`
Contenido: las 20 dimensiones decididas (17 equivalentes renombradas + 3 nuevas), cada una con: nombre propio, definición conceptual (con fuente teórica citada, distinta o adicional a HEXACO/Acción Razonada/Triángulo del Fraude si aplica), definición operacional 100% redactada de cero, subdimensiones o indicadores conductuales (2-4 por dimensión), y nota de si pertenece a la familia "Integridad nuclear" (equivalente a Honestidad) o "Factores contextuales" (equivalente a Incidencia) para efectos de scoring.

## Fase 2 — Marco de reactivos y escalas
Entregable: `Fase2_Marco_Reactivos_Escalas.docx`
Contenido: tipología de reactivos a usar (mínimo 6 tipos: opinión, percepción de terceros, involucramiento pasado/frecuencia conductual, escenario/dilema, comparación de gravedad, intención futura), justificación de mantener escala de opción variable (2-6 alternativas) en vez de Likert fijo, reglas de direccionalidad (ítems directos vs. inversos), diseño de reactivos espejo/consistencia (mínimo 1 par por dimensión núcleo), y diseño de los 4 indicadores de validez (Azarosidad, Omisión, Aquiescencia, Contradicción) con regla de invalidación parcial (una dimensión) vs. total (todo el test), tomando como referencia conceptual — no textual — lo aprendido en la Fase 2 de la reconstrucción de AMITAI.

## Fase 3 — Banco de reactivos, parte 1 (dimensiones 1-7)
Entregable: `Fase3_Banco_Reactivos_Parte1.docx`
Contenido: 21-28 reactivos originales (3-4 por dimensión) cubriendo las primeras 7 dimensiones del listado de la Fase 1, con los 16 campos pedidos por George en el brief original (número, dimensión, subdimensión, indicador conductual, tipo de reactivo, pregunta completa, opciones de respuesta, respuesta de menor riesgo, valor psicométrico sugerido por opción, dirección, qué detecta, indicadores de riesgo, reactivos de contraste, contradicciones posibles, nivel de transparencia esperado, justificación psicométrica).

## Fase 4 — Banco de reactivos, parte 2 (dimensiones 8-14)
Entregable: `Fase4_Banco_Reactivos_Parte2.docx`
Mismo formato que Fase 3, para las siguientes 7 dimensiones.

## Fase 5 — Banco de reactivos, parte 3 (dimensiones 15-20) y consolidación
Entregable: `Fase5_Banco_Reactivos_Parte3_y_Consolidado.docx`
Contenido: reactivos restantes (últimas 6 dimensiones) más una tabla consolidada de los 60-80 reactivos totales (ID, dimensión, tipo) para verificar cobertura balanceada.

## Fase 6 — Matriz de scoring
Entregables: `Fase6_Matriz_Scoring.xlsx` + `Fase6_Modelo_Calculo.docx`
Contenido del Excel: una fila por reactivo con ID, dimensión, subdimensión, tipo, alternativas, valor asignado a cada alternativa, si es inverso, peso de la dimensión (parametrizable), reactivos espejo relacionados, regla de inconsistencia aplicable, y contribución al índice general. Contenido del Word: fórmula completa reactivo→dimensión→índice general (equivalente al RGI, con nombre propio), tratamiento de invalidación parcial/total (heredado de la lógica confirmada en la Fase 2 de la reconstrucción de AMITAI, pero como regla propia y justificada, no copiada).

## Fase 7 — Ejemplo de cálculo paso a paso
Entregable: `Fase7_Ejemplo_Calculo.docx`
Contenido: un candidato ficticio con respuestas de ejemplo en 5-6 reactivos, mostrando: respuesta → valor de reactivo → ajuste si es inverso → puntaje de dimensión → ponderación → transformación → comparación normativa (con placeholder de norma) → índice general → indicadores de validez → resultado final, en ambas capas de salida (perfil individual viral y reporte empresarial).

## Fase 8 — Marco de normas y plan de recolección
Entregable: `Fase8_Marco_Normas_Plan_Recoleccion.docx`
Contenido: cómo se calculará la norma cuando existan datos reales (procedimiento de estandarización, tamaño muestral objetivo por país/mercado, periodicidad de recalibración), y un plan concreto de recolección de datos piloto (a quién aplicar, cuántos casos mínimos, cómo obtener consentimiento, qué variables demográficas registrar). Sin inventar cifras de media/DE reales.

## Fase 9 — Plan de validación psicométrica
Entregable: `Fase9_Plan_Validacion.docx`
Contenido: diseño del estudio piloto, análisis de dificultad/endoso y discriminación por ítem, correlación ítem-total, consistencia interna (alfa/omega), AFE/AFC, hoja de ruta hacia TRI/IRT, DIF (funcionamiento diferencial de ítems), validez convergente/discriminante/criterial, construcción empírica de puntos de corte, validación cruzada, y análisis de falsos positivos/negativos.

## Fase 10 — Diseño de producto y modelo de negocio
Entregable: `Fase10_Producto_Modelo_Negocio.docx`
Contenido: flujo de producto de la versión B2C viral (entrada gratuita, resultado tipo "perfil de integridad" compartible, mecánica de viralidad/compartir en redes, gancho de upsell a reporte premium), y de la versión B2B de pago (flujo de venta a empresas, reporte de riesgo para reclutadores, niveles de precio conceptuales), dejando explícito que ambas comparten el mismo motor de 20 dimensiones/banco de reactivos y solo difieren en la capa de salida y monetización, según `DECISIONS.md`.

## Fase 11 — Documento consolidado final
Entregable: `Fase11_Resumen_Ejecutivo_Consolidado.docx`
Contenido: resumen ejecutivo de todo el proyecto (de Fase 1 a Fase 10), estado de cada componente, lista de pendientes que requieren datos reales o decisión humana, y checklist de qué falta antes de poder lanzar un piloto real. Al terminar esta fase, marcar el proyecto como COMPLETO en `PROGRESS.json` y no volver a ejecutar nada automáticamente.

---
### Reglas de ejecución para cada disparo automático
1. Leer `PROGRESS.json` para saber cuál es la próxima fase pendiente.
2. Ejecutar SOLO esa fase, completa, generando su(s) archivo(s) en esta carpeta.
3. Actualizar `PROGRESS.json`: marcar la fase como `"status": "completed"`, con fecha/hora y una nota de 1-2 líneas de lo entregado.
4. Si surge una duda que de verdad requiera decisión humana (no cubierta por `DECISIONS.md`), tomar la opción más conservadora, dejar constancia en `ASSUMPTIONS.md` (crear si no existe) y continuar — no detener el plan a esperar respuesta.
5. Si todas las fases ya están `completed`, no hacer nada nuevo (evitar trabajo duplicado).
