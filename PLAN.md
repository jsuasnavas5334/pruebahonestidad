# Plan maestro — Proyecto Nuevo Instrumento de Integridad

Este plan se ejecuta de forma **autónoma**, una fase por cada disparo de la tarea programada (~1 hora entre cada una). Cada fase debe leerse junto con `DECISIONS.md` (reglas y decisiones fijas) y `PROGRESS.json` (qué fase sigue).

Insumos de referencia ya entregados a George (no reabrir ni repetir, solo consultar si hace falta contexto): `Fase1_Analisis_AMITAI.docx` y `Fase2_3_Reconstruccion_Norma_AMITAI.docx`, ambos en la carpeta `Software MITAI` (un nivel arriba de esta carpeta).

## Fase 1 — Arquitectura de dimensiones (nuevo instrumento) — REGENERAR (v2)
Entregable: `Fase1_Dimensiones_NuevoInstrumento.docx` (sobrescribir el existente, que usa nombres v1 obsoletos)
Contenido: las 21 dimensiones de la Versión 2 en `DECISIONS.md` punto 1 (usar esos nombres y esa lista EXACTAMENTE, no reinterpretar): 5 Núcleo Base + 7 Núcleo Adicionales + 9 Factores Contextuales. Para cada una: nombre propio (ya definido, no cambiar), definición conceptual (con fuente teórica citada), definición operacional 100% redactada de cero, subdimensiones o indicadores conductuales (2-4 por dimensión), grupo (Base/Adicional/Contextual), y una nota explícita en la introducción del documento aclarando que **cada dimensión es una sub-prueba independiente con resultado propio**, y que el IGI combina solo las dimensiones Núcleo (Base + Adicionales seleccionadas), nunca las Contextuales. Incluir también la "Regla de configuración por puesto" de DECISIONS.md (Base obligatoria + Adicionales según riesgo).

## Fase 1B — Diccionario de traducción de nombres (solo esta vez, nueva)
Entregable: `Fase1B_Diccionario_Nombres_v1_a_v2.md` (archivo corto, tabla de equivalencia nombre viejo → nombre nuevo, para trazabilidad y para poder revisar rápidamente el resto de fases al regenerarlas)

## Fase 2 — Marco de reactivos y escalas — REGENERAR (v2)
Entregable: `Fase2_Marco_Reactivos_Escalas.docx` (sobrescribir)
Contenido: igual alcance que la versión original (6 tipos de reactivo, escala de opción variable 2-6, direccionalidad, indicadores de validez con invalidación parcial/total), pero el diseño de pares espejo obligatorios aplica a las 12 dimensiones Núcleo (Base + Adicionales) de la Versión 2, usando los nombres nuevos. Actualizar cualquier ejemplo o tabla que use nombres v1 (p. ej. "Credibilidad", "Conflicto de Interés", "Apuestas").

## Fase 3 — Banco de reactivos, parte 1 (Núcleo Base: Robo, Mentira, Fraude, Irresponsabilidad, Soborno) — REGENERAR (v2)
Entregable: `Fase3_Banco_Reactivos_Parte1.docx` (sobrescribir)
Contenido: 4 reactivos originales por dimensión (20 total) para las 5 dimensiones Núcleo Base, con los 16 campos del formato ya establecido, incluyendo su par espejo obligatorio cada una.

## Fase 4 — Banco de reactivos, parte 2 (Núcleo Adicionales: Deslealtad, Favoritismo, Abuso de Recursos, Acoso Sexual, Maltrato Laboral, Discriminación, Asociación Criminal) — REGENERAR (v2)
Entregable: `Fase4_Banco_Reactivos_Parte2.docx` (sobrescribir)
Contenido: 4 reactivos originales por dimensión (28 total) para las 7 dimensiones Núcleo Adicionales, con par espejo obligatorio cada una.

## Fase 5 — Banco de reactivos, parte 3 (Factores Contextuales: Sustancias Lícitas, Sustancias Ilícitas, Incumplimiento de Normas, Deudas, Impulsividad, Violencia, Ludopatía, Egoísmo, Impunidad) y consolidación — REGENERAR (v2)
Entregable: `Fase5_Banco_Reactivos_Parte3_y_Consolidado.docx` (sobrescribir)
Contenido: 3 reactivos originales por dimensión (27 total, sin par espejo obligatorio) para las 9 dimensiones Contextuales — poner especial cuidado en que los reactivos de Ludopatía cubran juego con dinero en general (lotería, apuestas deportivas, cartas, tragamonedas, online), no solo escenarios de casino — más la tabla consolidada final de los 75 reactivos totales (20+28+27) del banco completo (ID, dimensión, grupo, tipo) para verificar cobertura balanceada.

## Fase 6 — Matriz de scoring — REGENERAR (v2)
Entregables: `Fase6_Matriz_Scoring.xlsx` + `Fase6_Modelo_Calculo.docx` (sobrescribir ambos)
Contenido del Excel: una fila por reactivo (75 filas) con ID, dimensión (nombres v2), grupo (Base/Adicional/Contextual), subdimensión, tipo, alternativas, valor asignado a cada alternativa, si es inverso, peso de la dimensión (parametrizable, solo aplica peso al IGI para Base+Adicionales), reactivos espejo relacionados, regla de inconsistencia aplicable, y contribución al índice general (0 para Contextuales). Contenido del Word: fórmula completa reactivo→dimensión→índice general (IGI), aclarando explícitamente que cada dimensión es una sub-prueba con resultado propio y que el IGI solo combina Núcleo Base + Adicionales seleccionadas, tratamiento de invalidación parcial/total.

## Fase 7 — Ejemplo de cálculo paso a paso — REGENERAR (v2)
Entregable: `Fase7_Ejemplo_Calculo.docx` (sobrescribir)
Contenido: mismo formato que el original, pero usando dimensiones y nombres v2 (p. ej. candidato con reactivos de Robo, Mentira, Fraude, más 1-2 Adicionales del perfil de puesto elegido), mostrando el resultado individual de cada sub-prueba antes de combinarlas en el IGI.

## Fase 8 — Marco de normas y plan de recolección
Entregable: `Fase8_Marco_Normas_Plan_Recoleccion.docx`
Contenido: cómo se calculará la norma cuando existan datos reales (procedimiento de estandarización, tamaño muestral objetivo por país/mercado, periodicidad de recalibración), y un plan concreto de recolección de datos piloto (a quién aplicar, cuántos casos mínimos, cómo obtener consentimiento, qué variables demográficas registrar). Sin inventar cifras de media/DE reales.

## Fase 9 — Plan de validación psicométrica
Entregable: `Fase9_Plan_Validacion.docx`
Contenido: diseño del estudio piloto, análisis de dificultad/endoso y discriminación por ítem, correlación ítem-total, consistencia interna (alfa/omega), AFE/AFC, hoja de ruta hacia TRI/IRT, DIF (funcionamiento diferencial de ítems), validez convergente/discriminante/criterial, construcción empírica de puntos de corte, validación cruzada, y análisis de falsos positivos/negativos.

## Fase 10 — Diseño de producto y modelo de negocio — REGENERAR (v2)
Entregable: `Fase10_Producto_Modelo_Negocio.docx` (sobrescribir)
Contenido: flujo de producto de la versión B2C viral (entrada gratuita, resultado tipo "perfil de integridad" compartible, mecánica de viralidad/compartir en redes, gancho de upsell a reporte premium), y de la versión B2B de pago (flujo de venta a empresas, reporte de riesgo para reclutadores, niveles de precio conceptuales), dejando explícito que ambas comparten el mismo motor de 21 dimensiones (5 Base + 7 Adicionales + 9 Contextuales) / banco de 75 reactivos y solo difieren en la capa de salida y monetización, según `DECISIONS.md`.

## Fase 11 — Documento consolidado final — REGENERAR (v2)
Entregable: `Fase11_Resumen_Ejecutivo_Consolidado.docx` (sobrescribir)
Contenido: resumen ejecutivo de todo el proyecto (de Fase 1 a Fase 10), estado de cada componente, referencia consistente a las 21 dimensiones v2 (5 Base + 7 Adicionales + 9 Contextuales, 75 reactivos), lista de pendientes que requieren datos reales o decisión humana, y checklist de qué falta antes de poder lanzar un piloto real. Al terminar esta fase, marcar el proyecto como COMPLETO en `PROGRESS.json` y no volver a ejecutar nada automáticamente.

---
### Reglas de ejecución para cada disparo automático
1. Leer `PROGRESS.json` para saber cuál es la próxima fase pendiente.
2. Ejecutar SOLO esa fase, completa, generando su(s) archivo(s) en esta carpeta.
3. Actualizar `PROGRESS.json`: marcar la fase como `"status": "completed"`, con fecha/hora y una nota de 1-2 líneas de lo entregado.
4. Si surge una duda que de verdad requiera decisión humana (no cubierta por `DECISIONS.md`), tomar la opción más conservadora, dejar constancia en `ASSUMPTIONS.md` (crear si no existe) y continuar — no detener el plan a esperar respuesta.
5. Si todas las fases ya están `completed`, no hacer nada nuevo (evitar trabajo duplicado).
