# ESPECIFICACIÓN V1  
## Motor de Evaluación y Scoring

## 1. Propósito

Este documento define el núcleo lógico del producto: cómo el sistema construye una evaluación, registra respuestas, verifica su calidad, calcula puntuaciones, asigna niveles, genera alertas y determina el arquetipo.

El motor debe ser:

- parametrizable;
- versionado;
- auditable;
- reproducible;
- independiente de la interfaz;
- independiente del canal;
- compatible con web y futuras aplicaciones equivalentes;
- modificable sin reescribir el sistema.

Ninguna fórmula psicométrica crítica deberá quedar codificada de manera rígida.

---

# 2. Principio fundamental

El sistema debe separar cinco conceptos diferentes:

**1. Respuesta del candidato**

↓

**2. Puntuación psicométrica de la dimensión**

↓

**3. Calidad/interpretabilidad de la aplicación**

↓

**4. Nivel de riesgo asociado al score**

↓

**5. Exigencia específica del cargo**

No deben mezclarse.

Ejemplo:

Una persona puede obtener:

**Soborno: 72/95**

Ese 72 es su resultado psicométrico.

Para un cargo con exigencia 2 puede interpretarse favorablemente.

Para un cargo con exigencia 6 puede requerir mayor revisión.

El score de la persona no cambia por el cargo.

---

# 3. Arquitectura del motor

El motor se divide conceptualmente en nueve servicios:

1. Assessment Builder
2. Item Engine
3. Response Engine
4. Quality Engine
5. Scoring Engine
6. Risk Interpretation Engine
7. Role Requirement Engine
8. Archetype Engine
9. Report Snapshot Engine

---

# 4. Assessment Builder

Responsable de determinar qué debe responder cada candidato.

## Input

- candidato;
- proceso;
- organización;
- cargo;
- dimensiones requeridas;
- dimensiones vigentes;
- dimensiones vencidas;
- reaplicaciones solicitadas;
- idioma;
- canal;
- versión del instrumento.

## Output

Una instancia cerrada de evaluación.

Ejemplo:

Assessment A-93842

Base requerida (obligatorias, entran al PRB/IGI):

- Robo
- Mentira
- Fraude
- Irresponsabilidad
- Soborno

Adicionales seleccionadas para el puesto (entran al PRB/IGI):

- Acoso Sexual
- Maltrato Laboral

Contextuales solicitadas (NUNCA entran al PRB/IGI; se reportan siempre aparte):

- Impulsividad
- Violencia

Reutilizadas (Contextual, resultado vigente):

- Deudas

> Nota: "Impulsividad" y "Violencia" son dimensiones **Contextuales**, no
> "Adicionales" — corregido respecto a la versión previa de este ejemplo, que
> las clasificaba erróneamente como Adicionales. Las 21 dimensiones vigentes
> se dividen en Base (5) + Adicionales (7) + Contextuales (9); solo Base y
> Adicionales alimentan el PRB/IGI (ver §34).

Total reactivos sustantivos:

7 dimensiones Núcleo (5 Base + 2 Adicionales) × 10 = 70, más las Contextuales
solicitadas (Impulsividad, Violencia = 2 × 10 = 20) que se administran y
reportan aparte del IGI. Deudas se reutiliza (0 reactivos nuevos). Total
aplicado en esta instancia: 90 reactivos sustantivos + controles
transversales (azarosidad/deseabilidad social) según reglas de secuencia.

---

# 5. Determinación de dimensiones

Para cada dimensión solicitada:

```text
SI no existe resultado previo:
    aplicar

SI existe resultado vigente:
    reutilizar

SI existe resultado vigente
Y empresa solicita nueva medición:
    aplicar nuevamente

SI existe resultado vencido:
    recomendar nueva aplicación

SI empresa acepta resultado vencido:
    reutilizar con bandera VENCIDO
```

---

# 6. Selección de reactivos

El banco ya está cerrado y escrito (no es una metodología de "desarrollar
15–20 candidatos y elegir los mejores 10"):

- **210 reactivos sustantivos** = 21 dimensiones × 10 reactivos (5 Base + 7
  Adicionales + 9 Contextuales).
- **63 reactivos alternativos** (3 de los 10 reactivos de cada dimensión
  tienen una segunda versión — ver "slots duales" abajo: 21 dimensiones × 3
  slots = 63).
- **8 reactivos de deseabilidad social.**
- **6 reactivos de control de azarosidad** (CTRL01–CTRL06).
- **6 reactivos de bio-data** (BIO01–BIO06).

**Siempre se administran y puntúan exactamente 10 reactivos sustantivos por
dimensión** (nunca 13, nunca menos de 10).

### Slots duales (op1/op1_alt, op2/op2_alt, perc1/perc1_alt)

Para 3 de los 10 reactivos de cada dimensión existen dos versiones de
redacción (una "clásica" y una de "opciones concretas"). El motor debe:

```text
PARA cada uno de los 3 slots duales de la dimensión:
    elegir al azar, ANTES de armar la secuencia de presentación,
    cuál de las dos variantes (clásica vs. alternativa) se administra
```

El resultado de esa elección aleatoria (qué variante se vio) debe
almacenarse junto con la respuesta — es trazabilidad necesaria para una
futura recalibración/equating cuando se migre de TCT a TRI/IRT (ver §56 y
§68). El motor NO administra las dos variantes de un mismo slot a la misma
persona; siempre son 10 reactivos por dimensión, ni más ni menos.

Cada reactivo debe contener al menos:

- item_id;
- dimension_id;
- version;
- formato;
- texto;
- idioma;
- canal;
- opciones;
- clave;
- dirección;
- peso;
- criticidad;
- estado.

---

# 7. Estados de reactivo

Un reactivo podrá estar en:

- DRAFT
- PILOT
- ACTIVE
- SUSPENDED
- RETIRED

Solo ACTIVE entra normalmente en aplicaciones oficiales.

PILOT puede utilizarse exclusivamente cuando una configuración experimental autorizada lo permita.

---

# 8. Tipos de reactivos

El motor deberá soportar como mínimo:

### Tipo A – Escala

Ejemplo:

Muy en desacuerdo → Muy de acuerdo.

### Tipo B – Situacional

Situación + opciones conductuales.

### Tipo C – Elección forzada

Selección entre alternativas.

### Tipo D – Control transversal

Consistencia, atención, deseabilidad u otros.

El scoring interno será independiente de la apariencia visual.

---

# 9. Dirección de los reactivos

Los reactivos pueden ser:

- directos;
- invertidos.

Ejemplo conceptual:

Reactivo directo:

> Suelo respetar una regla aunque nadie esté supervisando.

Mayor acuerdo puede representar mayor puntuación de integridad.

Reactivo invertido:

> Si nadie resulta perjudicado, algunas reglas pueden ignorarse.

Mayor acuerdo puede representar menor puntuación de integridad.

El sistema aplica la clave correspondiente.

---

# 10. Puntuación primaria

Cada alternativa tendrá un valor interno.

Ejemplo con escala de seis posiciones:

```text
1
2
3
4
5
6
```

Para reactivo invertido:

```text
valor_corregido = 7 - valor_respuesta
```

Esto es únicamente un ejemplo de implementación.

La escala concreta deberá definirse por formato y versión.

---

# 11. Peso inicial del reactivo

Primera versión:

**peso = 1.00**

para todos los reactivos válidos dentro de la dimensión.

Posteriormente podrán existir pesos diferentes:

```text
item_01 = 0.92
item_02 = 1.06
item_03 = 1.11
```

Solo después de validación psicométrica.

---

# 12. Score bruto de dimensión (Puntaje_dimensión)

Modelo vigente:

```text
ScoreBruto =
Σ(valor_corregido × peso_item)
/
Σ(peso_item)
```

**Regla obligatoria sobre el denominador:** `Σ(peso_item)` se calcula
ÚNICAMENTE sobre los reactivos de esa dimensión EFECTIVAMENTE RESPONDIDOS
por el candidato. El denominador NUNCA es un número fijo (por ejemplo,
nunca se asume "siempre 10"), y nunca se imputa un valor a un reactivo
faltante. Si de los 10 reactivos administrados de una dimensión el
candidato respondió 9, el promedio se calcula sobre esos 9 (con sus pesos),
no sobre 10. Esto aplica incluso con `peso_item = 1.00` para todos (primera
versión, §11): el denominador sigue siendo la cantidad de reactivos
respondidos, no la cantidad de reactivos administrados.

Este resultado todavía no es el score 0–95/reportado; ese es
`Puntaje_dimensión` tras la normalización y el tope estructural del §13.

---

# 13. Normalización a 0–95 (tope estructural ×0.95)

El resultado bruto debe convertirse primero a una escala 0–100 orientada a
integridad (más alto = más integridad), y luego aplicarse el tope
estructural del 95% — el mismo tope que se aplica al IGI (§34bis, Paso 4).
Este NO es un rescalado lineal directo a un rango "0–95"; es una
normalización a 0–100 seguida de una multiplicación por 0.95:

```text
Puntaje_dimensión_0-100 =
((ScoreBruto - MinTeórico)
/
(MaxTeórico - MinTeórico))
× 100

Puntaje_dimensión_reportado = Puntaje_dimensión_0-100 × 0.95
```

Límite resultante:

```text
0 ≤ Puntaje_dimensión_reportado ≤ 95
```

El ×0.95 se aplica **siempre, sin excepción** (ver §15 — es un tope
estructural ya decidido, no una hipótesis pendiente de validar).

Ejemplo:

`Puntaje_dimensión_0-100` = 86.7 → `Puntaje_dimensión_reportado` = 86.7 ×
0.95 = **82.4 / 95**

En interfaz podría mostrarse:

**82 / 95**

El valor decimal puede permanecer internamente.

---

# 14. Dirección única de interpretación

Todas las dimensiones deberán cumplir:

**Score alto = mayor integridad / menor riesgo**

**Score bajo = menor integridad / mayor riesgo**

No deberán existir dimensiones con dirección visual opuesta.

Esto reduce errores de interpretación.

---

# 15. El concepto del 5%

La escala máxima se establece en 95. Esto **no es una hipótesis pendiente
de validar ni un margen de error estadístico**: es un **tope estructural
de diseño ya decidido**, aplicado siempre, sin excepción, tanto al IGI
como a cada `Puntaje_dimensión` individual.

Su significado es conceptual, no estadístico:

**Nadie se certifica con integridad perfecta (100).**

El 5% restante NO debe programarse como:

- 5% de error estadístico;
- 5% de probabilidad de mentira;
- 5% de error de medición;
- un valor a "ganar" o "perder" por evidencia futura.

Por tanto:

**0–95 es la escala oficial y definitiva del producto** — el tope se aplica
multiplicando por 0.95 el valor 0–100 ya calculado (ver §13 y Paso 4 del
IGI, §34bis), no reescalando el rango teórico de las opciones de
respuesta.

---

# 16. Quality Engine

Antes de interpretar riesgos, el sistema evalúa calidad.

El Quality Engine no modifica necesariamente los scores.

Genera indicadores separados.

Variables iniciales:

- completitud;
- consistencia;
- contradicciones;
- velocidad;
- atención;
- deseabilidad;
- patrones repetitivos;
- interrupciones;
- cámara;
- anomalías de identidad.

### Los 5 indicadores de validez de protocolo

De estas variables, cinco constituyen formalmente los **indicadores de
validez de protocolo** que activan la "invalidación de protocolo" descrita
en §26bis (Paso 7). Son exactamente cinco — no cuatro:

1. **Azarosidad** (respuestas aleatorias, vía reactivos CTRL01–CTRL06);
2. **Omisión** (patrón de reactivos sin responder, distinto de la regla
   dura de completitud del §17);
3. **Aquiescencia** (tendencia a responder siempre "de acuerdo" sin
   discriminar contenido);
4. **Contradicción** (pares/conjuntos de reactivos incompatibles, §19);
5. **Deseabilidad Social** (`ImpressionManagementIndex`, §22).

Estos 5 indicadores NUNCA excluyen, recalculan ni ocultan un
`Puntaje_dimensión` o el IGI ya calculados — ver §26bis. Su efecto es
exclusivamente visual/de advertencia.

---

# 17. Completitud

Regla:

```text
SI existe ≥1 reactivo obligatorio sin responder:
    evaluación = INCOMPLETE
```

No generar score final.

---

# 18. Índice de consistencia

Se utilizarán pares o conjuntos de reactivos conceptualmente relacionados.

Ejemplo:

Reactivo A y Reactivo B deberían correlacionarse dentro de determinado rango.

El sistema puede calcular:

```text
ConsistencyIndex = función(pares_consistencia)
```

Escala interna propuesta:

0–100.

No visible necesariamente al candidato.

---

# 19. Contradicciones

No toda diferencia es contradicción.

El motor deberá definir reglas por reactivo.

Ejemplo:

```text
SI Item_23 >= 5
Y Item_41 <= 2:
    contradiction_event += 1
```

Las reglas deberán estar versionadas.

---

# 20. Tiempo de respuesta

Para cada reactivo:

```text
response_time_ms
```

Se podrán calcular:

- mediana;
- media;
- desviación;
- número de respuestas extremadamente rápidas;
- patrón de respuestas consecutivas rápidas.

Inicialmente:

**no modifica directamente el score psicométrico.**

Contribuye al Quality Engine.

---

# 21. Umbral de velocidad

No debe existir un único número universal.

Debe depender de:

- longitud del reactivo;
- formato;
- idioma;
- dispositivo;
- evidencia empírica.

Mientras se valida:

utilizar únicamente reglas conservadoras para detectar patrones extremos.

---

# 22. Deseabilidad social

Debe producir un indicador independiente:

```text
ImpressionManagementIndex
```

No debe aplicarse:

```text
score_final = score - deseabilidad
```

de forma automática sin evidencia.

Su función inicial:

- alerta;
- indicador de interpretación;
- insumo de calidad.

---

# 23. Atención

Podrán utilizarse reactivos o patrones diseñados para detectar:

- lectura insuficiente;
- respuestas mecánicas;
- secuencias incompatibles.

Nunca basar la invalidez en un único reactivo de atención.

---

# 24. Cámara y calidad

La cámara produce:

```text
VerificationStatus
```

Posibles estados:

- VERIFIED
- VERIFIED_WITH_OBSERVATIONS
- NOT_VERIFIED
- FAILED

La cámara no modifica el score.

Ejemplo:

Una persona puede tener:

Fraude: 83/95

y simultáneamente:

VerificationStatus = VERIFIED_WITH_OBSERVATIONS

Son conceptos separados.

---

# 25. Calidad final

Resultado:

### ADEQUATE

Los controles permiten interpretación normal.

### WITH_OBSERVATIONS

Existen incidencias, pero la aplicación puede interpretarse con advertencia.

### NON_INTERPRETABLE

No existe suficiente calidad para emitir conclusiones.

> **Importante — no confundir con la invalidación de protocolo (§26bis):**
> `NON_INTERPRETABLE` se reserva para problemas de disponibilidad de datos
> o de identidad (ej.: completitud incumplida, identidad no verificable en
> proceso empresarial — §26 abajo). Los 5 indicadores de validez de
> protocolo (Azarosidad/Omisión/Aquiescencia/Contradicción/Deseabilidad
> Social, §16) **no** disparan `NON_INTERPRETABLE` por sí mismos: su efecto
> es únicamente visual (gris + advertencia), nunca ocultar ni bloquear el
> número calculado. Ver §26bis.

---

# 26. Regla de no interpretabilidad

Debe utilizar un motor de reglas configurables.

Ejemplo conceptual:

```text
SI completitud != 100%:
    NON_INTERPRETABLE

SI consistencia < límite_crítico
Y contradicciones > límite_crítico:
    NON_INTERPRETABLE

SI identidad no puede verificarse
EN proceso empresarial:
    NON_INTERPRETABLE
```

No fijar todavía valores numéricos definitivos.

---

# 26bis. Invalidación de protocolo (Paso 7) — efecto exclusivamente visual

Cuando uno o más de los 5 indicadores de validez de protocolo (§16) superan
su umbral crítico, el motor **nunca** recalcula ni cambia el número ya
obtenido (`IGI` ni `Puntaje_dimensión`). El único efecto permitido es:

```text
SI protocolo (o una dimensión específica) muestra patrones de
respuesta inconsistentes (Azarosidad / Omisión / Aquiescencia /
Contradicción / Deseabilidad Social por encima del umbral):
    mostrar el número en GRIS en vez de su color de semáforo normal
    mostrar una advertencia visible de inconsistencia
    NO excluir el valor
    NO recalcular el valor
    NO ocultar el valor real
```

Esto aplica tanto al IGI global como a un `Puntaje_dimensión` individual
(invalidación granular por dimensión cuando la inconsistencia se concentra
ahí). El caso de `NON_INTERPRETABLE` (§25–26, por incompletitud o identidad
no verificable) es un mecanismo distinto y sigue siendo el único que puede
impedir la generación de un score final.

---

# 27. Seis niveles de integridad (y semáforo de 3 colores)

Cada dimensión (y el IGI) tendrá seis niveles. **Corregido: la dirección es
orientada a integridad, no a riesgo** — consistente con el principio del
§14 ("score alto = mayor integridad") y con el modelo vigente:

```text
Nivel 1  Nivel 2  Nivel 3  Nivel 4  Nivel 5  Nivel 6
```

Dirección:

**1 = Integridad Muy Baja (mayor riesgo)**

**6 = Integridad Muy Alta (menor riesgo)**

Sobre estos 6 niveles se pinta un **semáforo de 3 colores**:

```text
Rojo    = niveles 1–2
Amarillo = niveles 3–4
Verde   = niveles 5–6
```

(Cuando el protocolo o la dimensión está invalidada por los 5 indicadores
de validez, §26bis, el color se sustituye por GRIS + advertencia — el
nivel numérico y el color base no se pierden internamente.)

---

# 28. Cortes parametrizados

Los cortes exactos entre niveles se definen por **percentiles** de la
población de referencia (norma), no por rangos fijos de puntaje bruto.

**Cortes de percentil exactos: `[PENDIENTE DE DATO PILOTO]`** — no deben
inventarse.

Mientras no exista data piloto, puede usarse una aproximación matemática de
**sextiles sobre la escala 0–95**, marcada explícitamente como
`[PROVISIONAL]`:

```text
Nivel 1 [PROVISIONAL]: 0.00  – 15.83  (Integridad Muy Baja)
Nivel 2 [PROVISIONAL]: 15.83 – 31.67
Nivel 3 [PROVISIONAL]: 31.67 – 47.50
Nivel 4 [PROVISIONAL]: 47.50 – 63.33
Nivel 5 [PROVISIONAL]: 63.33 – 79.17
Nivel 6 [PROVISIONAL]: 79.17 – 95.00 (Integridad Muy Alta)
```

Estos intervalos NO deben considerarse definitivos ni comunicarse como
cortes psicométricamente validados.

Los puntos de corte definitivos deberán surgir de:

- distribución;
- criterio;
- validez;
- normas;
- outcomes.

El software únicamente necesita poder almacenarlos y modificarlos mediante
versión (norm_group, algorithm_version — ver §29).

---

# 29. Tabla de cortes

Cada versión debe contener:

- dimension_id;
- norm_group;
- threshold_1;
- threshold_2;
- threshold_3;
- threshold_4;
- threshold_5;
- algorithm_version;
- valid_from.

---

# 30. Score vs nivel de integridad

Ejemplo (recalculado con los sextiles provisionales del §28 — 72 cae en el
rango 63.33–79.17):

```text
Fraude
Puntaje_dimensión = 72/95
Nivel = 5 [PROVISIONAL]  (Rojo/Amarillo/Verde → Verde)
```

Nunca comunicar:

> “Tiene 72% de integridad”.

Ni:

> “Tiene 28% de probabilidad de fraude”.

El score no representa directamente una probabilidad.

---

# 31. Exigencia del cargo

Cada dimensión individual puede configurarse con:

```text
RequirementLevel = 1..6
```

Esto no cambia:

```text
Puntaje_dimensión
```

`Puntaje_dimensión` es la medición de la persona en esa dimensión y **nunca
se recalcula por cargo**, sin excepción, a ningún nivel.

Lo que sí incorpora la exigencia del cargo es el **índice agregado (PRB →
IGI)** descrito en §34bis — no la dimensión individual. Esa distinción es
la más importante de todo el motor de scoring y se detalla a continuación.

---

# 32. Multiplicador de exigencia por nivel de puesto (afecta al PRB/IGI, nunca a Contextuales)

**Corrección respecto a versiones previas de este documento:** el
mecanismo real no es una "matriz de interpretación" cualitativa
score×exigencia con celdas sueltas — es un **multiplicador numérico
aplicado al Puntaje de Riesgo Base (PRB)**, antes de convertir a IGI (ver
fórmula completa en §34bis). El multiplicador afecta exclusivamente al
Núcleo (Base + Adicionales seleccionadas) que alimenta el PRB/IGI; **jamás
se aplica a dimensiones Contextuales**, que se reportan siempre aparte.

```text
Multiplicador_final =
    Multiplicador_nivel_de_puesto
    + (0.15 SI Tiene_personal_a_cargo = "Sí", si no 0)
```

Tabla de `Multiplicador_nivel_de_puesto` — 6 niveles jerárquicos
universales (sin nombres de cargo específicos de una empresa):

| Nivel | Descripción | Multiplicador base | Con personal a cargo (+0.15) |
|---|---|---:|---:|
| 1 | Operativo | ×0.70 | ×0.85 |
| 2 | Administrativo/Auxiliar | ×0.85 | ×1.00 |
| 3 | Profesional/Técnico | ×1.00 | ×1.15 |
| 4 | Coordinación/Gestión de Procesos | ×1.15 | ×1.30 |
| 5 | Jefatura/Gerencia de Área | ×1.30 | ×1.45 |
| 6 | Dirección/Alta Gerencia | ×1.50 | ×1.65 |

Una tabla de interpretación cualitativa (favorable / profundizar / atención
relevante) puede seguir existiendo como capa de **redacción de texto**
sobre el nivel de integridad ya calculado con el multiplicador aplicado
(ver Motor de interpretación, §41), pero nunca sustituye el cálculo
numérico de arriba ni es en sí misma "la fórmula".

---

# 33. Importante: el multiplicador va sobre el RIESGO, nunca sobre el score de integridad directamente

Este es exactamente el anti-patrón que debe evitarse (y el que corrigió la
decisión de diseño vigente):

Incorrecto — multiplicar el score/IGI (orientado a integridad) directamente
por la exigencia:

```text
score_ajustado = score × exigencia     # INCORRECTO
```

Este patrón es doblemente erróneo: (1) mezcla exigencia con la medición
individual de la persona, y (2) si `exigencia > 1`, **subiría** el score de
integridad — exactamente lo opuesto de "ser más exigente" con un cargo de
mayor responsabilidad.

Correcto — el multiplicador se aplica al **riesgo** (complemento de
integridad, 0–1), antes de convertir a integridad, y nunca al
`Puntaje_dimensión` individual:

```text
Puntaje_dimensión = medición de la persona (nunca cambia por cargo)

PRB = riesgo base agregado del Núcleo (§34bis) — orientado a riesgo

Riesgo_ajustado_por_puesto = MIN(1, PRB × Multiplicador_final)   # §32

IGI_reportado = (1 − Riesgo_ajustado_por_puesto) × 100 × 0.95    # §34bis
```

Bajo este modelo, a mayor exigencia del puesto, mayor es el riesgo
ajustado, y por lo tanto **menor** es el IGI reportado para la misma
batería de respuestas — el efecto correcto y opuesto al anti-patrón.

---

# 34. Puntaje de Riesgo Base (PRB)

**Corrección respecto a versiones previas de este documento:** no existe un
"Índice Base de Integridad" fijo sobre las 5 dimensiones Base solamente.
El cálculo interno agregado es el **PRB (Puntaje de Riesgo Base)**, 0–1,
orientado a riesgo (alto = más riesgo, complemento de integridad), y
utiliza el **Núcleo completo**: las 5 dimensiones Base (obligatorias) MÁS
las dimensiones Adicionales seleccionadas para ese puesto (0 a 7 de las 7
disponibles). Las dimensiones Contextuales **jamás** entran a este cálculo
— se reportan siempre aparte, sin excepción (ver §36).

```text
Riesgo_dimensión_i = 1 − (Puntaje_dimensión_i_0-100 / 100)

PRB =
Σ(Riesgo_dimensión_i × Peso_i)
/
Σ(Peso_i)
    para i en {dimensiones Núcleo incluidas en esta batería}
```

**Los pesos se re-parametrizan siempre para sumar 100% entre las
dimensiones Núcleo efectivamente incluidas en esa batería**, no un peso
fijo de 1 sobre una lista fija de 5:

- Batería mínima (5 Base, 0 Adicionales) → 5 dimensiones → 1/5 = 20% cada
  una.
- Batería con 2 Adicionales agregadas → 7 dimensiones → 1/7 ≈ 14.29% cada
  una.

Nota: `Puntaje_dimensión_i_0-100` es el valor normalizado a 0–100 **antes**
del tope estructural ×0.95 (es decir, el insumo intermedio del §13, no el
`Puntaje_dimensión_reportado` ya topado en 95). `[PENDIENTE DE CONFIRMACIÓN
DE GEORGE]`: confirmar si el PRB efectivamente se calcula sobre el valor
0–100 pre-tope o sobre el valor 0–95 ya topado (la diferencia es
proporcional y pequeña, pero el software debe implementar una sola
convención).

`[PENDIENTE DE CONFIRMACIÓN DE GEORGE]`: si `Peso_i` puede además diferir
entre dimensiones dentro del Núcleo (pesos no uniformes, análogos al
`peso_item` de §11) antes de re-parametrizar a 100%, o si en esta fase
todas las dimensiones Núcleo pesan igual entre sí y solo cambia el
denominador según cuántas se incluyan.

---

# 34bis. Multiplicador de puesto, conversión final a IGI, y SEM/IC 95%

Pipeline completo del índice agregado (Pasos 2–5 del modelo vigente):

```text
Paso 2 — PRB (§34, orientado a riesgo, solo Núcleo)
            ↓
Paso 3 — Riesgo_ajustado_por_puesto = MIN(1, PRB × Multiplicador_final)   (§32/§33)
            ↓
Paso 4 — IGI_reportado = (1 − Riesgo_ajustado_por_puesto) × 100 × 0.95
            ↓
Paso 5 — SEM e Intervalo de Confianza 95% (capa adicional, NO antes del IGI ya ajustado)
```

El `MIN(1, ...)` del Paso 3 es obligatorio: evita que el riesgo ajustado
supere 1 cuando `PRB × Multiplicador_final` exceda ese valor, lo que
rompería la fórmula del Paso 4 (daría un IGI negativo).

El ×0.95 del Paso 4 es el mismo tope estructural del §13/§15: el IGI nunca
llega a 100.

**SEM (Error Estándar de Medición) e Intervalo de Confianza 95%:**

```text
SEM = DesviaciónEstándar_muestra_referencia × √(1 − Confiabilidad_IGI)

IC_95% = IGI_reportado ± 1.96 × SEM
```

Mientras no exista `Confiabilidad_IGI` ni la desviación estándar de una
muestra de referencia real (pendientes de piloto), el motor y la interfaz
deben mostrar SEM e IC_95% como **`[PENDIENTE DE DATO PILOTO]`** — nunca se
omiten del diseño de pantalla/reporte, y nunca se inventa un valor
provisional para ellos (a diferencia de los sextiles del §28, que sí
admiten una aproximación `[PROVISIONAL]`).

---

# 35. Una dimensión crítica no desaparece en el promedio

Ejemplo (terminología corregida: `IGI` en vez de `OverallIndex`):

```text
Robo = 92
Mentira = 89
Fraude = 91
Irresponsabilidad = 90
Soborno = 32
```

El promedio podría parecer favorable.

Pero:

**Soborno = riesgo alto**

debe seguir siendo visible, y además pesa en el PRB agregado (§34) — no es
solo una alerta visual aislada, es parte del cálculo del riesgo agregado
del que depende el IGI.

Por tanto el sistema genera:

```text
IGI = X
CriticalAlert = TRUE
```

---

# 36. Dimensiones Contextuales — nunca entran al IGI, siempre se reportan aparte

Las 9 dimensiones Contextuales (Sustancias Lícitas, Sustancias Ilícitas,
Incumplimiento de Normas, Deudas, Impulsividad, Violencia, Ludopatía,
Egoísmo, Impunidad) **jamás** entran al cálculo del PRB/IGI (§34) — esto no
es una opción de configuración ni algo "que podría no mostrarse
públicamente hasta tener evidencia": es una regla estructural, siempre
activa. Se calculan y reportan como `Puntaje_dimensión` independientes,
con la misma orientación a integridad y el mismo tope de 95 (§13), pero
totalmente separadas del PRB/IGI.

`[PENDIENTE DE CONFIRMACIÓN DE GEORGE]`: si además de reportarse
individualmente debe existir algún índice agregado propio de las
Contextuales (análogo a un "ExpandedRiskIndex") para consumo interno del
equipo de producto/psicometría, distinto del IGI. Los hechos vigentes
confirman que tal índice, de existir, nunca sustituye ni se mezcla con el
IGI.

---

# 37. Alert Engine

Las alertas pueden surgir de:

### A. Nivel dimensional

Ejemplo (orientación a integridad corregida, §27: nivel bajo = mayor
riesgo):

Nivel <= 2 (Rojo).

### B. Reactivo crítico

Respuesta específica previamente definida.

### C. Combinación de dimensiones

Ejemplo conceptual:

Impulsividad elevada

+

Incumplimiento elevado

+

Violencia elevada.

### D. Calidad

Ejemplo:

alta deseabilidad + contradicciones.

---

# 38. Alertas combinadas

Evitar:

```text
una respuesta = alerta extrema
```

Preferir:

```text
varias condiciones = bandera
```

Ejemplo:

```text
IF:
    critical_item_A == TRUE
AND
    dimension_level >= 4

THEN:
    generate_alert()
```

---

# 39. Severidad de alerta

Separada del riesgo dimensional.

Posibles niveles internos:

- INFO
- REVIEW
- IMPORTANT
- CRITICAL_REVIEW

No utilizar terminología alarmista frente al candidato.

---

# 40. Reactivos críticos

Cada reactivo puede tener:

```text
critical_flag = true/false
```

y reglas específicas.

La empresa podrá visualizar únicamente reactivos seleccionados asociados a una alerta.

Máximo inicial sugerido:

**3 por dimensión relevante.**

---

# 41. Motor de interpretación

Cada combinación podrá mapear a textos versionados.

Ejemplo:

```text
dimension = FRAUD
nivel = 4
requirement = 6
language = ES
```

↓

Texto correspondiente.

Los textos no deben generarse libremente por IA en primera versión.

Preferible:

**biblioteca controlada + variables.**

---

# 42. Preguntas de entrevista

Cada dimensión/nivel puede tener un banco de preguntas.

El motor selecciona:

- 2–5 preguntas;
- según factores detectados;
- evitando revelar el scoring.

Ejemplo:

```text
InterviewQuestionSet:
    dimension
    nivel
    factor
    question
    version
```

---

# 43. Archetype Engine

El arquetipo utiliza:

- las cinco dimensiones Base (y, cuando corresponda, las Adicionales
  incluidas en el Núcleo — `[PENDIENTE DE CONFIRMACIÓN DE GEORGE]`: si el
  arquetipo se calcula solo sobre las 5 Base o sobre todo el Núcleo);
- PRB (§34);
- patrón relativo;
- reglas de consistencia.

No utiliza automáticamente:

- edad;
- sexo;
- país;
- raza;
- fotografía;
- empresa;
- cargo.

---

# 44. Arquetipos basados en patrones

El motor no debe hacer:

```text
score alto = arquetipo bueno
score bajo = arquetipo malo
```

Debe analizar configuración.

Ejemplo:

Persona A:

```text
Robo 90
Mentira 72
Fraude 85
Irresponsabilidad 60
Soborno 88
```

Persona B:

```text
Robo 73
Mentira 90
Fraude 72
Irresponsabilidad 90
Soborno 70
```

Pueden tener promedio similar pero arquetipos diferentes.

---

# 45. Regla provisional de arquetipo

Hasta disponer de clustering real, puede utilizarse un modelo rule-based versionado.

Ejemplo conceptual:

```text
IF:
    compliance_dimensions high
AND
    responsibility high
AND
    flexibility low
THEN:
    Archetype = GUARDIAN
```

Las reglas concretas deberán definirse después de analizar datos.

---

# 46. Número de arquetipos

No codificar:

```text
exactly 12 archetypes
```

El sistema debe admitir:

```text
N archetypes
```

con versión.

Estimación inicial:

**8–12**

sujeta a validación.

---

# 47. Confidence del arquetipo

Puede existir internamente:

```text
ArchetypeFitScore
```

para saber qué tan claramente una persona encaja en un patrón.

No necesariamente se muestra.

Esto evita forzar perfiles ambiguos.

---

# 48. Reaplicación

Cuando existe nueva evaluación base válida:

```text
old_base.status = HISTORICAL
new_base.status = CURRENT
```

El arquetipo actual se recalcula usando únicamente la nueva base.

---

# 49. Dimensiones adicionales

Una dimensión adicional nueva:

```text
candidate_dimension_result
```

se incorpora al perfil.

No recalcula automáticamente el arquetipo principal.

---

# 50. Vigencia

Cada DimensionResult debe contener:

```text
valid_from
valid_until
```

Regla inicial:

```text
valid_until = valid_from + 180 días
```

Debe ser configurable por dimensión.

---

# 51. Reutilización

Una empresa nueva puede utilizar resultados vigentes.

Pero el sistema debe conservar:

- evaluación origen;
- versión;
- fecha;
- verificación.

---

# 52. Reaplicación de dimensión todavía vigente

Cuando se repite:

```text
old_result = HISTORICAL
new_result = CURRENT
```

El antiguo no se elimina.

---

# 53. Report Snapshot Engine

Al generar un reporte profesional, crear snapshot.

Debe guardar:

- scores;
- niveles;
- exigencias;
- alertas;
- textos;
- arquetipo;
- normas;
- vigencias;
- versiones.

---

# 54. Regla crítica de históricos

El reporte no debe reconstruirse dinámicamente con parámetros actuales.

Incorrecto:

> Abrir reporte de 2026 y recalcular usando algoritmo 2028.

Correcto:

> Mostrar exactamente el reporte emitido en 2026.

---

# 55. Reprocesamiento para investigación

Internamente se puede realizar:

```text
research_recalculation
```

con algoritmo nuevo.

Pero nunca sustituye automáticamente:

```text
official_report_snapshot
```

---

# 56. Versiones necesarias

Cada resultado debe conocer:

```text
instrument_version
algorithm_version
dimension_version
item_version
norm_version
interpretation_version
archetype_model_version
language_version
```

---

# 57. Ejemplo de trazabilidad

```text
Candidate: C-73921

Assessment:
A-2026-8493

Instrument:
2.1

Algorithm:
1.3

Fraud dimension:
1.2

Norm:
EC-GLOBAL-2026-01

Archetype model:
0.9

Report:
R-92214
```

---

# 58. Norm Engine

**Baremo General (Global) activo desde el inicio** — no es una norma
"provisional a falta de algo mejor", es el baremo por defecto del producto
desde el primer candidato.

Adicionalmente, **baremos por país se activan automáticamente al alcanzar
≥300 casos de ese país** (ver §59). `país` es un **campo técnico
obligatorio** de cada assessment/candidato — no un dato demográfico
opcional — precisamente porque condiciona qué baremo aplica.

Posteriormente (fuera de alcance del umbral automático de 300, sujeto a
validación adicional):

- región;
- ciudad;
- cargo;
- industria.

---

# 59. Reglas de activación de normas

Una norma por país solo puede utilizarse cuando alcance el criterio
mínimo:

**≥300 casos de ese país** → activación automática del baremo de país
(reemplaza al Baremo General para ese país en adelante, hasta nueva
versión de norma).

Por debajo de ese umbral, el candidato de ese país sigue evaluándose contra
el Baremo General (Global).

Variables adicionales que pueden refinar la activación en el futuro
(baremos por región/cargo/industria, no cubiertos por el umbral de 300):

- representatividad;
- estabilidad;
- fecha;
- calidad.

`[PENDIENTE DE CONFIRMACIÓN DE GEORGE]`: si el umbral de 300 casos debe
re-evaluarse periódicamente (por ejemplo, países que caen por debajo de
300 tras depurar casos de mala calidad) o es un gatillo de una sola vía
(una vez activado, no se desactiva).

---

# 60. Jerarquía de norma

Ejemplo futuro:

```text
IF role_norm sufficient:
    use role_norm
ELSE IF country_norm sufficient:
    use country_norm
ELSE:
    use global_norm
```

La empresa debe poder saber qué referencia fue utilizada.

---

# 61. Adaptaciones culturales

Un reactivo traducido no debe asumir automáticamente equivalencia.

Cada versión debe registrar:

```text
language
country_adaptation
validation_status
```

Ejemplo:

```text
ES-EC
ES-MX
ES-CO
PT-BR
```

---

# 62. Canal

Cada reactivo puede estar habilitado para:

- WEB
- MOBILE_WEB
- WHATSAPP

Una versión adaptada a WhatsApp debe tener relación con su reactivo equivalente.

Ejemplo:

```text
equivalence_group = EQ-00291
```

---

# 63. Motor multi-canal

El scoring debe recibir respuestas normalizadas.

No debe importar si proceden de:

web

o

WhatsApp.

Ejemplo:

```text
NormalizedResponse
```

antes del Scoring Engine.

---

# 64. Anti-manipulación

El sistema puede analizar:

- consistencia;
- tiempos;
- patrones;
- cambios de foco;
- verificación.

No debe intentar inferir mentira mediante:

- rostro;
- microexpresiones;
- emociones.

---

# 65. Protección del banco

El frontend nunca debe recibir:

- scoring_key;
- critical_logic;
- dimension_id visible;
- weights internos.

Solo recibe:

- item_session_id;
- texto;
- opciones.

---

# 66. ID efímero de reactivo

Durante evaluación puede utilizarse:

```text
assessment_item_instance_id
```

en lugar del ID maestro.

Esto dificulta inferir el banco.

---

# 67. Randomización

La secuencia debe cumplir restricciones.

Ejemplo:

```text
no >2 items same dimension consecutively

separate consistency pairs

distribute critical items

distribute transversal items

avoid identical response format streaks
```

Los parámetros serán configurables.

---

# 68. Semilla de evaluación

Cada evaluación puede almacenar:

```text
randomization_seed
```

Esto permite reproducir exactamente el orden para auditoría.

---

# 69. Respuesta duplicada

Cada reactivo de una sesión solo acepta:

```text
1 final_response
```

Implementar idempotencia.

Si el móvil envía dos veces:

el backend no debe crear dos respuestas.

---

# 70. Integridad transaccional

Secuencia:

```text
receive response
↓
validate session
↓
persist response
↓
confirm persistence
↓
serve next item
```

No avanzar antes de guardar.

---

# 71. Corrección posterior

Las respuestas del candidato no deben editarse manualmente.

Si existe error operativo:

- anular evaluación;
- reaplicar.

No:

> cambiar la respuesta directamente en base de datos.

---

# 72. Modificación administrativa de resultado

Solo excepcionalmente.

Requiere:

- rol privilegiado;
- motivo;
- ticket/incidencia;
- valor anterior;
- valor nuevo;
- fecha;
- usuario.

Preferencia:

**corregir algoritmo/reporte, no alterar respuestas.**

---

# 73. Auditoría del scoring

El motor debe poder responder:

> ¿Por qué este candidato obtuvo 61/95 en Fraude?

Internamente debe reconstruir:

- reactivos utilizados;
- respuestas;
- claves;
- pesos;
- fórmula;
- versión;
- transformación.

---

# 74. Audit Trail

Ejemplo (terminología y nivel corregidos — orientación a integridad, §27):

```text
Raw score (ScoreBruto): 4.21
Normalized 0-100 (Puntaje_dimensión_0-100): 63.7
Final con tope ×0.95 (Puntaje_dimensión_reportado): 60.51
Rounded display: 61
Nivel [PROVISIONAL]: 4  (60.51 cae en el sextil 47.50–63.33, §28)
Algorithm: 1.3
```

Solo interno.

---

# 75. Motor de scoring no editable por empresa

Las organizaciones nunca podrán modificar:

- pesos;
- claves;
- fórmulas;
- cortes centrales sin autorización del producto.

Sí podrán modificar:

- exigencia;
- dimensiones requeridas;
- configuraciones permitidas.

---

# 76. Resultados sensibles y empleo

Los resultados deben funcionar como **apoyo profesional**, no como decisión automática de contratación.

El motor no deberá producir:

```text
HIRE = TRUE
```

o

```text
REJECT = TRUE
```

Podrá producir estados interpretativos como:

- Favorable;
- Revisar;
- Profundizar.

La decisión laboral final corresponde a la organización y deberá considerar otras evidencias relevantes.

---

# 77. Ranking automático

El sistema puede ordenar datos descriptivos dentro de un proceso cuando el profesional lo solicite, pero no debe convertir automáticamente un score de integridad en una decisión de contratación.

Debe conservarse trazabilidad de:

- criterios elegidos;
- dimensiones incluidas;
- filtros.

---

# 78. Casos con información sensible

Dimensiones especialmente delicadas como:

- sustancias;
- deudas;
- violencia;
- acoso;

deberán poder:

- restringirse por jurisdicción;
- deshabilitarse;
- requerir autorización;
- limitar quién las visualiza.

El motor debe admitir:

```text
dimension_availability_by_jurisdiction
```

---

# 79. Pipeline completo

Flujo técnico (actualizado para incluir slots duales, PRB/multiplicador de
puesto, tope 0.95, SEM/IC 95% e invalidación visual — Pasos 1–7 del modelo
vigente referenciados entre paréntesis):

```text
CREATE ASSESSMENT
        ↓
RESOLVE DIMENSIONS (Base + Adicionales del puesto + Contextuales)
        ↓
REUSE VALID RESULTS
        ↓
SELECT ITEMS (10 por dimensión; resolver slot dual clásica/alt por cada
              uno de los 3 slots, §6)
        ↓
RANDOMIZE (incluye el sorteo de variante de cada slot dual, §68)
        ↓
DELIVER ITEMS
        ↓
SAVE RESPONSES
        ↓
QUALITY ANALYSIS (completitud/identidad → puede producir NON_INTERPRETABLE;
                  los 5 indicadores de validez de protocolo → NO bloquean,
                  solo marcan bandera de invalidación visual, §26bis)
        ↓
IF NON_INTERPRETABLE (por completitud/identidad, no por los 5 indicadores)
    STOP INTERPRETATION
ELSE
        ↓
DIMENSION SCORING (Paso 1 — Puntaje_dimensión, denominador = respondidos, §12)
        ↓
PRB — RIESGO BASE DEL NÚCLEO (Paso 2, §34; Contextuales quedan fuera)
        ↓
MULTIPLICADOR DE PUESTO SOBRE EL RIESGO (Paso 3 — MIN(1, PRB × Mult), §32/§33)
        ↓
CONVERSIÓN A IGI CON TOPE ×0.95 (Paso 4, §34bis)
        ↓
SEM / IC 95% (Paso 5 — `[PENDIENTE DE DATO PILOTO]` hasta piloto, §34bis)
        ↓
NIVELES (1–6) Y SEMÁFORO (Paso 6, §27/§28)
        ↓
INVALIDACIÓN VISUAL SI APLICA (Paso 7 — gris + advertencia, nunca recalcula, §26bis)
        ↓
ALERT ENGINE
        ↓
ARCHETYPE ENGINE
        ↓
ROLE INTERPRETATION (redacción de texto sobre el nivel ya calculado, §41)
        ↓
CANDIDATE RESULT
        ↓
PROFESSIONAL REPORT
        ↓
SNAPSHOT
```

---

# 80. Configuración provisional del MVP

Para poder construir sin esperar toda la validación final:

### Reactivos

10 por dimensión (de las 21 dimensiones del banco cerrado, §6); slots
duales resueltos por sorteo antes de la secuencia.

### Pesos

1.00 (peso_item) para el cálculo de `Puntaje_dimensión`; re-parametrización
a 100% entre dimensiones Núcleo incluidas para el PRB (§34) — no un peso
fijo de 1 por dimensión en el agregado.

### Score

normalización a 0–100 + tope estructural ×0.95 (§13), nunca un rescalado
lineal directo a "0–95".

### Niveles (1–6) y semáforo

6 niveles provisionales parametrizados, orientados a integridad (1=Muy
Baja…6=Muy Alta), semáforo Rojo/Amarillo/Verde (§27/§28); cortes
provisionales = sextiles matemáticos marcados `[PROVISIONAL]` hasta contar
con percentiles de piloto.

### PRB / Multiplicador de puesto / IGI

PRB sobre el Núcleo (Base + Adicionales seleccionadas), multiplicador de
puesto de la tabla de 6 niveles jerárquicos + 0.15 por personal a cargo,
`MIN(1, PRB × Multiplicador)`, conversión final `IGI = (1−riesgo)×100×0.95`
(§32–§34bis).

### SEM / IC 95%

Fórmula implementada en el motor, pero mostrada como
`[PENDIENTE DE DATO PILOTO]` hasta contar con confiabilidad y desviación
estándar reales (§34bis).

### Exigencia

Multiplicador de nivel de puesto (1–6) + ajuste por personal a cargo,
aplicado al PRB — no una "matriz de interpretación" cualitativa separada
del cálculo numérico (§32).

### Quality Engine

reglas conservadoras; los 5 indicadores de validez de protocolo
(Azarosidad/Omisión/Aquiescencia/Contradicción/Deseabilidad Social) activan
solo la invalidación visual del §26bis, nunca bloquean ni recalculan.

### Arquetipos

motor rule-based provisional.

### Vigencia

180 días.

Todo marcado internamente como:

**PROVISIONAL / PILOT CONFIGURATION**

hasta obtener validación.

---

# 81. Lo que NO debe hacerse

No desarrollar:

### 1.

Cortes hardcodeados en frontend.

### 2.

Pesos incorporados directamente en código.

### 3.

Arquetipos mediante if/else dispersos en varias pantallas.

### 4.

Scores recalculados cada vez que se abre un reporte histórico.

### 5.

Modificar respuestas manualmente.

### 6.

Utilizar cámara para detectar “mentira”.

### 7.

Confundir riesgo con probabilidad de conducta futura.

### 8.

Restar automáticamente deseabilidad del score sin validación.

### 9.

Alterar `Puntaje_dimensión` individual según cargo, o multiplicar el
IGI/score de integridad directamente por la exigencia (`score × exigencia`
— ver §33). El multiplicador de puesto se aplica al PRB en espacio de
riesgo, nunca al número de integridad ya calculado.

### 10.

Permitir a clientes cambiar fórmulas.

### 11.

Asumir un denominador fijo (ej. "siempre 10") al promediar reactivos de
una dimensión en vez de dividir por la cantidad efectivamente respondida
(§12).

### 12.

Ocultar, excluir o recalcular un `Puntaje_dimensión`/IGI por causa de los 5
indicadores de validez de protocolo — su único efecto permitido es visual
(gris + advertencia, §26bis).

### 13.

Inventar cortes de nivel, percentiles, SEM o Confiabilidad_IGI sin dato
piloto real — deben marcarse `[PENDIENTE DE DATO PILOTO]` (los cortes por
nivel admiten una aproximación matemática `[PROVISIONAL]`; SEM/IC no).

---

# 82. Panel técnico psicométrico

Debe permitir visualizar:

### Dimensiones

- versión;
- estado;
- cantidad de reactivos;
- muestra;
- confiabilidad.

### Reactivos

- rendimiento;
- discriminación;
- tiempo;
- distribución;
- reportes;
- DIF.

### Scoring

- algoritmo;
- pesos;
- thresholds;
- vigencia.

### Normas

- población;
- N;
- país;
- cargo;
- fecha.

### Arquetipos

- reglas;
- distribución;
- estabilidad.

---

# 83. Publicación de nueva configuración

Flujo:

```text
DRAFT
↓
TECHNICAL REVIEW
↓
PSYCHOMETRIC REVIEW
↓
STAGING
↓
QA
↓
APPROVED
↓
PRODUCTION
```

---

# 84. Rollback

Toda versión publicada debe poder revertirse.

Ejemplo:

Algorithm 1.4 produce error.

Sistema vuelve:

Algorithm 1.3

Las nuevas evaluaciones usan 1.3.

Las evaluaciones realizadas con 1.4 quedan identificadas para revisión.

---

# 85. Reglas ante error crítico

Si se identifica error que modifica resultados:

1. detener generación de reportes afectados;
2. identificar assessments;
3. identificar reportes;
4. evaluar impacto;
5. corregir versión;
6. recalcular para análisis;
7. generar corrección cuando proceda;
8. conservar histórico y auditoría.

---

# 86. Tests automatizados necesarios

El Scoring Engine debe contar con pruebas unitarias.

Ejemplo:

Input fijo:

```text
Item 1 = 6
Item 2 = 5
...
```

Output esperado:

```text
Puntaje_dimensión = X
Nivel = Y   (orientado a integridad, §27)
```

Si cambia código y el resultado cambia inesperadamente:

el test falla.

---

# 87. Golden Test Cases

Psicometría debe crear perfiles artificiales conocidos:

### Caso A

Respuestas altamente favorables.

### Caso B

Perfil medio.

**Ejemplo numérico trazable (nuevo — antes este documento no incluía
números; útil como caso de prueba real para el software):**

Batería: 5 Base + 2 Adicionales (Acoso Sexual, Maltrato Laboral) = 7
dimensiones Núcleo, más 1 Contextual (Deudas) solo de referencia. Puesto:
Nivel 3 (Profesional/Técnico), sin personal a cargo →
`Multiplicador_final = 1.00`.

`Puntaje_dimensión_0-100` (pre-tope) por dimensión Núcleo:

```text
Robo = 75            → Riesgo = 0.25
Mentira = 70         → Riesgo = 0.30
Fraude = 68          → Riesgo = 0.32
Irresponsabilidad = 72 → Riesgo = 0.28
Soborno = 65         → Riesgo = 0.35
Acoso Sexual = 80    → Riesgo = 0.20
Maltrato Laboral = 74 → Riesgo = 0.26

Deudas (Contextual) = 60  → NO entra al PRB; se reporta aparte
```

Paso 2 — PRB (pesos re-parametrizados a 1/7 ≈ 14.29% cada una, §34):

```text
PRB = (0.25+0.30+0.32+0.28+0.35+0.20+0.26) / 7 = 1.96 / 7 = 0.28
```

Paso 3 — Multiplicador de puesto (Nivel 3, sin personal a cargo, §32):

```text
Riesgo_ajustado_por_puesto = MIN(1, 0.28 × 1.00) = 0.28
```

Paso 4 — Conversión a IGI (§34bis):

```text
IGI_reportado = (1 − 0.28) × 100 × 0.95 = 72 × 0.95 = 68.4 / 95
```

Paso 5 — SEM/IC 95%: `[PENDIENTE DE DATO PILOTO]`.

Paso 6 — Nivel/semáforo (sextiles provisionales del §28): 68.4 cae en
63.33–79.17 → **Nivel 5 [PROVISIONAL], Verde**.

**Contraste con puesto más exigente (mismo perfil de respuestas):**
Nivel 6 (Dirección/Alta Gerencia) CON personal a cargo →
`Multiplicador_final = 1.50 + 0.15 = 1.65`:

```text
Riesgo_ajustado_por_puesto = MIN(1, 0.28 × 1.65) = 0.462
IGI_reportado = (1 − 0.462) × 100 × 0.95 = 53.8 × 0.95 ≈ 51.1 / 95
```

El mismo conjunto de respuestas produce un IGI menor (68.4 → 51.1) cuando
el puesto es más exigente — el efecto correcto y opuesto al anti-patrón
`score × exigencia` del §33.

### Caso C

Perfil de alto riesgo.

### Caso D

Contradictorio.

### Caso E

Alta deseabilidad.

### Caso F

No interpretable.

Estos casos se ejecutarán en cada nueva versión.

---

# 88. Observabilidad

Registrar métricas del motor:

- scoring duration;
- errors;
- assessments processed;
- noninterpretable rate;
- alert frequency;
- archetype distribution;
- distribution of scores;
- missing data;
- version usage.

---

# 89. Alertas internas estadísticas

El sistema debe advertir al equipo si ocurre algo como:

> 70% de candidatos esta semana recibió el mismo arquetipo.

o

> El promedio de Fraude cambió 20 puntos después de una versión.

Esto puede indicar:

- error;
- drift;
- problema de reactivos;
- problema de scoring.

---

# 90. Drift

A futuro monitorear:

- distribución de scores;
- distribución de arquetipos;
- países;
- cargos;
- canales;
- versiones.

No ajustar automáticamente el modelo.

Enviar a revisión psicométrica.

---

# 91. Datos requeridos para validación

Por aplicación almacenar adecuadamente:

- respuestas;
- tiempos;
- dimensión;
- versión;
- score;
- quality indicators;
- país;
- cargo cuando proceda;
- outcome posterior cuando exista.

Estos datos permitirán posteriormente evaluar:

- confiabilidad;
- validez;
- discriminación;
- DIF;
- normas;
- predictividad.

---

# 92. Outcome Engine futuro

Outcome:

- contratado;
- no contratado;
- permanencia;
- renuncia;
- incidentes;
- desempeño.

Nunca realizar:

```text
new_weight = machine_learning_auto_update()
```

Directamente en producción.

Los outcomes alimentan investigación.

Los cambios pasan por gobernanza formal.

---

# 93. MVP técnico del motor

`[PENDIENTE DE CONFIRMACIÓN DE GEORGE]`: si el primer MVP cubre solo las 5
dimensiones Base (50 reactivos) o ya incluye Adicionales/Contextuales
seleccionables desde el inicio. Lo que sigue asume el escenario mínimo (5
Base) como subconjunto del diseño completo de 21 dimensiones (§6) — no
como el modelo final.

El primer motor funcional deberá ser capaz de:

1. cargar una versión del instrumento;
2. seleccionar 50 reactivos (5 dimensiones Base × 10, resolviendo los
   slots duales de cada una por sorteo, §6);
3. agregar controles transversales (azarosidad, deseabilidad social);
4. randomizar según reglas (incluye el sorteo de variante por slot dual);
5. entregar uno por uno;
6. guardar respuestas;
7. registrar tiempos;
8. calcular cinco `Puntaje_dimensión` (denominador = reactivos
   efectivamente respondidos, con tope ×0.95, §12–§13);
9. calcular el PRB sobre las 5 Base, aplicar el multiplicador de puesto y
   convertir a IGI con tope ×0.95 (§32–§34bis);
10. mostrar SEM/IC 95% como `[PENDIENTE DE DATO PILOTO]` (§34bis);
11. asignar seis niveles de integridad y semáforo (sextiles
    `[PROVISIONAL]`, §27–§28);
12. ejecutar Quality Engine, incluyendo los 5 indicadores de validez de
    protocolo con efecto exclusivamente visual (§16, §26bis);
13. asignar arquetipo;
14. generar textos;
15. congelar snapshot;
16. reproducir cálculo para auditoría.

---

# 94. Condición de aceptación técnica

El motor estará listo para piloto cuando:

### Reproducibilidad

La misma entrada + misma versión produce exactamente el mismo resultado.

### Auditabilidad

Puede explicarse internamente cada score.

### Versionamiento

Dos versiones pueden coexistir.

### Seguridad

Las claves no llegan al frontend.

### Reutilización

Resultados vigentes pueden combinarse.

### Calidad

Una aplicación no interpretable queda bloqueada.

### Reporte

El resultado puede congelarse históricamente.

---

# 95. Decisiones psicométricas todavía pendientes

**Ya decidido (no confundir con lo pendiente abajo):** el tope estructural
×0.95 (§15), la fórmula del PRB/multiplicador de puesto/IGI (§32–§34bis),
la lista y efecto visual-únicamente de los 5 indicadores de validez de
protocolo (§16/§26bis), el umbral de 300 casos para baremo por país (§59),
y la separación Base/Adicionales/Contextuales (§34/§36).

El software debe permitir configurar, pero NO asumir como definitivo:

- escala exacta por reactivo;
- ponderaciones (`Peso_i` del PRB, `peso_item` de reactivos);
- cortes de percentil exactos entre niveles (§28);
- `Confiabilidad_IGI` y `DesviaciónEstándar_muestra_referencia` para SEM/IC
  95% (§34bis);
- tolerancias de inconsistencia (umbrales de los 5 indicadores de validez);
- velocidad mínima;
- reglas de deseabilidad;
- reactivos críticos;
- normas (país/región/cargo/industria más allá del umbral de 300);
- reglas de arquetipo;
- valores exactos de `Multiplicador_nivel_de_puesto` (la tabla del §32 se
  toma como vigente, pero cualquier ajuste fino queda sujeto a validación
  con datos de outcome).

---

# 96. Conclusión técnica

La arquitectura correcta no consiste en programar “un test”.

Debe programarse un:

**motor psicométrico versionado y configurable.**

La lógica principal será:

**Reactivos**

↓

**Respuestas**

↓

**Calidad**

↓

**Scores dimensionales**

↓

**Niveles de riesgo**

↓

**Patrones**

↓

**Arquetipo**

↓

**Interpretación según cargo**

↓

**Reporte congelado**

La separación entre estas capas permitirá cambiar reactivos, algoritmos, normas, arquetipos y criterios de interpretación sin reconstruir toda la plataforma.

Este motor constituye el núcleo intelectual y técnico del producto.

---

**Nota de reconciliación (2026-09-16):** fórmulas y pipeline ajustados
para coincidir exactamente con el modelo de cálculo vigente (DECISIONS.md,
Fase 6).