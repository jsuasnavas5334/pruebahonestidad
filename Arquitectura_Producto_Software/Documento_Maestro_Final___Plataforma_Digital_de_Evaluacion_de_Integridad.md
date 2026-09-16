# DOCUMENTO MAESTRO FINAL
## Plataforma Digital de Evaluación de Integridad
### Versión consolidada de producto, psicometría, UX, tecnología y negocio

---

# 1. Propósito del documento

Este documento consolida y sustituye conceptualmente los documentos previos de diseño del producto.

Integra en una única especificación:

- visión del producto;
- arquitectura psicométrica;
- experiencia del candidato;
- experiencia empresarial;
- reglas de scoring;
- modelo de arquetipos;
- privacidad y verificación;
- modelo comercial;
- arquitectura técnica;
- arquitectura de datos;
- seguridad;
- gobernanza;
- MVP;
- backlog;
- roadmap;
- responsabilidades.

A partir de esta versión, nuevas decisiones deberán gestionarse como cambios formales del producto y no como redefiniciones generales.

---

# 2. Visión

El producto será una plataforma digital, modular e internacional para evaluar **integridad laboral y factores de riesgo conductual relevantes para las organizaciones**.

No pretende clasificar moralmente a una persona como honesta/deshonesta, buena/mala o apta/no apta.

Su función es identificar:

- patrones;
- fortalezas;
- vulnerabilidades;
- factores de atención;
- riesgos potenciales;
- áreas que requieren profundización profesional.

La plataforma combinará:

**psicometría + tecnología + verificación + modularidad + arquetipos + analítica + portabilidad del perfil.**

---

# 3. Propuesta de valor

Existirán dos niveles de producto.

## Producto gratuito para el candidato

El candidato obtiene:

- arquetipo;
- personaje;
- descripción;
- fortalezas;
- áreas de atención;
- comportamiento bajo presión;
- relación con las normas;
- vigencia;
- estado de verificación;
- tarjeta y enlace compartible.

No ve scoring técnico ni categorías de riesgo.

## Producto profesional para la empresa

La empresa paga para desbloquear:

- score 0–95;
- seis niveles de resultado (Nivel 1 = Integridad Muy Baja … Nivel 6 = Integridad Muy Alta), con semáforo de 3 colores como capa de lectura rápida;
- índice global (IGI — Índice General de Integridad);
- dimensiones evaluadas;
- interpretación profesional;
- alertas;
- factores detectados;
- reactivos representativos;
- preguntas para entrevista;
- calidad de aplicación;
- verificación;
- vigencia;
- PDF ejecutivo.

La empresa compra acceso profesional al reporte, no propiedad de los datos personales del candidato.

---

# 4. Dimensiones

El modelo contempla 21 dimensiones.

## Núcleo Base

1. Robo  
2. Mentira  
3. Fraude  
4. Irresponsabilidad  
5. Soborno  

Son obligatorias para construir la evaluación base y el arquetipo principal.

## Núcleo Adicional

6. Deslealtad  
7. Favoritismo  
8. Abuso de Recursos  
9. Acoso Sexual  
10. Maltrato Laboral  
11. Discriminación  
12. Asociación Criminal  

## Contextuales

13. Sustancias Lícitas  
14. Sustancias Ilícitas  
15. Incumplimiento de Normas  
16. Deudas  
17. Impulsividad  
18. Violencia  
19. Ludopatía  
20. Egoísmo  
21. Impunidad  

La arquitectura debe permitir agregar nuevas dimensiones sin modificar el núcleo tecnológico.

---

# 5. Evaluación base

La base (B2C) utiliza:

**5 dimensiones Núcleo Base × 10 reactivos sustantivos = 50 reactivos dimensionales.**

A esto se agregan los reactivos de protocolo, ya definidos y con cifras cerradas (ver también sección 6):

- **8 reactivos de Deseabilidad Social** (5º indicador de validez);
- **6 reactivos de control de Azarosidad** (CTRL01–06: instrucción embebida + trivia obvia);
- **6 reactivos de bio-data** (factuales, sin variantes, sin puntaje).

Ninguno de estos 20 reactivos de protocolo entra al IGI; alimentan los indicadores de validez (Azarosidad, Omisión, Aquiescencia, Contradicción, Deseabilidad Social) y la identificación básica.

La evaluación base (B2C) tiene entonces:

**50 + 20 = 70 reactivos aproximadamente.**

Duración esperada:

**10–15 minutos** *(estimación de UX; a ajustar con dato piloto).*

---

# 6. Banco de reactivos

*(Nota de reconciliación: la metodología "15–20 reactivos candidatos por dimensión → seleccionar los mejores 10 según evidencia" describía una fase de desarrollo ya superada. El banco de reactivos ya está redactado y cerrado; las cifras siguientes son las reales — fuente: DECISIONS.md. Los valores exactos de calibración por reactivo permanecen confidenciales.)*

El banco sustantivo cerrado consta de:

- **210 reactivos sustantivos** = 21 dimensiones × 10 reactivos fijos cada una (2 de cada uno de 5 tipos: Opinión/Actitud, Percepción de terceros, Involucramiento pasado, Escenario/dilema, Intención futura), con 5 pares espejo por dimensión;
- **5 variantes de redacción por reactivo** → 210 × 5 = 1,050 textos clásicos (útiles, entre otras cosas, para reaplicaciones sin repetir texto — ver sección 8);
- **63 reactivos "alternativos" de opciones concretas** (`_alt`): para 3 de los 10 slots por dimensión (op1, op2, perc1) existe también una versión de opciones concretas. Por dimensión hay un pool de 13 candidatos (10 clásicos + 3 alternativos) y el motor elige al azar, por slot, cuál de las 2 versiones administrar. **Siempre se administran y puntúan exactamente 10 reactivos por dimensión, nunca 13.** 21 × 3 = 63 alternativos × 5 variantes = 315 textos adicionales;
- **8 reactivos de Deseabilidad Social**, **6 reactivos de control de Azarosidad** (CTRL01–06) y **6 reactivos de bio-data** (BIO01–06) — ver sección 5.

Cada reactivo del banco se analiza (o se analizará con dato piloto) según:

- discriminación (correlación ítem-total, r≥.30 aceptable, <.20 reemplazo obligatorio);
- confiabilidad (Omega de McDonald, ω≥.70 mínimo por dimensión, ≥.85 para el IGI);
- estructura factorial;
- test-retest;
- validez;
- funcionamiento diferencial (DIF, regla de las 4/5 partes);
- tiempos;
- comprensión (cognitive interviewing).

Todo el contenido del banco es propio y original del proyecto; no reproduce ni parafrasea reactivos de instrumentos comerciales de terceros.

---

# 7. Arquitectura modular

Las 16 dimensiones no base funcionan conceptualmente como mini evaluaciones independientes.

Cuando una empresa necesita dimensiones adicionales:

- el sistema revisa cuáles ya existen;
- reutiliza las vigentes;
- identifica las vencidas;
- aplica únicamente las faltantes o las que se decida repetir.

Para el candidato todo debe sentirse como una sola experiencia.

Nunca se mostrará:

> Ahora estás respondiendo Violencia.

Las dimensiones permanecen ocultas durante la aplicación.

---

# 8. Portabilidad del perfil

Los resultados dimensionales forman parte del perfil del candidato.

Esto permite que:

- una empresa solicite una dimensión;
- el candidato la complete;
- esa dimensión permanezca disponible mientras esté vigente;
- otra empresa pueda utilizarla posteriormente si desbloquea el reporte profesional.

La empresa que originalmente financió la evaluación no se convierte en propietaria exclusiva del resultado.

Debe conservarse siempre el origen técnico e histórico de cada medición.

**Excepción explícita — upgrade B2C → B2B:** esta portabilidad aplica entre evaluaciones B2B (empresa A ya midió una dimensión, empresa B la reutiliza). No aplica cuando alguien tomó únicamente el test gratuito B2C (5 dimensiones Base) y luego se necesita un reporte B2B: en ese caso **no se completa el test ya iniciado con preguntas adicionales**; se aplica la batería completa de nuevo (Base + Adicionales/Contextuales del cargo), usando variantes de redacción distintas del banco (sección 6), para preservar la validez psicométrica.

---

# 9. Vigencia

Regla inicial:

**180 días / 6 meses.**

Cada resultado dimensional deberá tener:

- valid_from;
- valid_until.

La vigencia podrá modificarse posteriormente por dimensión si existe evidencia.

Cuando una dimensión vence:

- se recomienda repetir;
- puede reutilizarse si la empresa decide aceptarla;
- siempre se muestra claramente como vencida.

La aceptación de un resultado vencido queda auditada.

---

# 10. Reaplicaciones

Si la base fue completada correctamente:

**reaplicación ordinaria después de 30 días.**

Podrán existir hasta dos oportunidades extraordinarias cuando:

- la evaluación quedó incompleta;
- fue no interpretable;
- existió incidencia técnica;
- existió manipulación o condición que requiera reaplicación.

El historial no se elimina.

---

# 11. Experiencia del candidato

La experiencia debe ser:

- mobile-first;
- rápida;
- limpia;
- profesional;
- no clínica;
- poco predecible;
- fácil de entender.

Reglas principales:

- un reactivo principal por pantalla;
- guardado automático;
- no permitir volver a respuestas anteriores;
- barra visual de progreso;
- sin cronómetro visible;
- sin mostrar dimensiones;
- sin mostrar scoring;
- mensajes breves de progreso;
- soporte disponible.

---

# 12. Flujo principal del candidato

El flujo será:

**Landing**

↓

**Confirmación de país**

↓

**Privacidad**

↓

**Registro**

↓

**Verificación de correo**

↓

**Verificación de identidad/cámara**

↓

**Instrucciones**

↓

**Evaluación**

↓

**Quality Engine**

↓

**Scoring**

↓

**Arquetipo**

↓

**Perfil**

↓

**Compartir / reutilizar**

---

# 13. Registro

Campos mínimos:

- nombre;
- apellido;
- correo;
- teléfono.

El sistema debe:

- validar email;
- validar teléfono;
- detectar posibles duplicados;
- asignar ID interno único.

El correo debe confirmarse mediante OTP antes de comenzar.

---

# 14. Cámara

## Evaluación personal

La cámara será opcional.

Si el candidato utiliza cámara:

- el resultado puede quedar profesionalmente verificado;
- podrá reutilizarse en procesos empresariales.

Si continúa sin cámara:

- obtiene arquetipo;
- conserva perfil personal;
- no obtiene estatus de evaluación empresarial verificada.

## Evaluación empresarial

La cámara es obligatoria.

Sin cámara:

**la evaluación empresarial no continúa.**

---

# 15. Capturas de verificación

En web se contemplan aproximadamente:

**8 capturas distribuidas durante la evaluación.**

En una futura versión WhatsApp:

**6–8 fotografías.**

Las capturas sirven para:

- verificar presencia;
- detectar posible cambio de persona;
- detectar múltiples personas;
- verificar funcionamiento de cámara.

No se utilizarán para inferir:

- mentira;
- honestidad;
- emociones;
- personalidad;
- intención.

---

# 16. Problemas de cámara

Si se pierde cámara:

- evaluación pausada;
- se solicita reactivación;
- se revalida;
- se continúa.

La pérdida puntual no invalida automáticamente la aplicación.

---

# 17. Conexión e interrupciones

Cada respuesta se guarda inmediatamente.

Si se pierde internet:

- las respuestas confirmadas permanecen;
- el sistema registra la incidencia;
- al reconectarse se continúa.

Si se cierra el navegador:

- la sesión puede recuperarse;
- se revalida acceso;
- se revalida cámara cuando corresponda.

Ventana inicial de recuperación:

**24 horas.**

---

# 18. Cambios de pestaña

El sistema registra:

- pérdida de foco;
- cambio de pestaña;
- retorno.

Un evento aislado no invalida.

Un patrón reiterado puede producir:

- advertencia;
- observación;
- revisión.

---

# 19. Tiempo de respuesta

Se registra internamente:

- tiempo por reactivo;
- tiempo total;
- patrones extremadamente rápidos;
- pausas.

No habrá presión temporal visible.

La velocidad, por sí sola, no invalida ni modifica automáticamente el score.

---

# 20. Quality Engine

La calidad se evalúa de forma independiente del scoring, apoyada en los **5 indicadores de validez del protocolo** definidos en DECISIONS.md: Azarosidad (6 reactivos control), Omisión, Aquiescencia, Contradicción y Deseabilidad Social (8 reactivos). Ninguno de los 5 cambia jamás el IGI ni ningún Puntaje_dimensión calculado; solo cambian cómo se muestra el resultado (en gris, con advertencia visible). El número nunca se excluye ni se recalcula por causa de estos indicadores.

Estados del Quality Engine:

**ADECUADA**

**CON OBSERVACIONES**

**NO INTERPRETABLE**

Variables posibles:

- completitud;
- consistencia (indicador de Contradicción);
- atención (indicador de Azarosidad);
- omisión;
- velocidad;
- deseabilidad (indicador de Deseabilidad Social);
- patrones mecánicos (indicador de Aquiescencia);
- eventos técnicos;
- verificación.

Si es:

**NO INTERPRETABLE**

el IGI y los Puntaje_dimensión igualmente se calculan y se muestran (en gris, con advertencia prominente); lo que no debe ocurrir es emitir conclusiones profesionales de riesgo sin esa advertencia explícita. Los números nunca se ocultan ni se sustituyen.

---

# 21. Escala de puntuación

La escala oficial será:

**0–95**

Dirección:

**95 = mayor integridad / menor riesgo.**

**0 = menor integridad / mayor riesgo.**

El sistema nunca debe invertir esta dirección entre dimensiones.

---

# 22. El 5% de distorsión

El producto reserva conceptualmente un 5% como margen de distorsión.

Hasta validación, no debe presentarse como:

- error estadístico demostrado;
- probabilidad de mentira;
- error de medición probado.

El software debe tratarlo como parámetro conceptual pendiente de validación.

---

# 23. Scoring dimensional

Primera versión:

- todos los reactivos con peso 1;
- corrección de invertidos;
- promedio ponderado;
- normalización a 0–95.

Modelo conceptual:

**Score bruto → transformación → Score 0–95.**

Todos los parámetros deben ser configurables y versionados.

---

# 24. Seis niveles de resultado

*(Nota de reconciliación: la versión anterior de esta sección invertía la dirección de los niveles — "Nivel 1 = menor riesgo, Nivel 6 = mayor riesgo". Se corrige aquí para ser consistente con DECISIONS.md.)*

Cada dimensión, y el IGI en su conjunto, se traduce a uno de:

**6 niveles.**

Dirección oficial (más alto = mejor):

**Nivel 1 = Integridad Muy Baja (peor / mayor riesgo).**

**Nivel 6 = Integridad Muy Alta (mejor / menor riesgo).**

Sobre estos 6 niveles se superpone, solo como capa de lectura rápida, un semáforo de 3 colores:

- Rojo = Niveles 1–2;
- Amarillo = Niveles 3–4;
- Verde = Niveles 5–6.

Los puntos de corte exactos entre niveles son **[PENDIENTE DE DATO PILOTO]**.

No deben quedar hardcodeados.

La validación determinará los cortes definitivos.

---

# 25. Score no significa probabilidad

El reporte nunca debe decir:

> 70% de probabilidad de fraude.

Ni:

> 70% de integridad.

El score es una escala psicométrica propia del producto.

---

# 26. Nivel de exigencia por cargo

Cada dimensión puede recibir un nivel de exigencia:

**1–6.**

Este nivel representa qué tan crítica es esa dimensión para el cargo.

Este nivel de exigencia por dimensión:

**NO cambia el Puntaje_dimensión del candidato.**

Correcto:

**Puntaje_dimensión + exigencia cargo = interpretación.**

Incorrecto:

**Puntaje_dimensión × exigencia = nuevo puntaje.**

*(Nota de reconciliación: este "nivel de exigencia por dimensión" es un concepto distinto del "Multiplicador_nivel_de_puesto" (6 niveles jerárquicos universales + "¿tiene personal a cargo?") definido en DECISIONS.md. Ese multiplicador de puesto SÍ es parte integral de la fórmula del IGI — ajusta el Puntaje_de_Riesgo_Base agregado del Núcleo antes de reportar el IGI, ver sección 28 — porque actúa sobre el riesgo agregado del cargo, no sobre un reactivo o dimensión individual. Ambos mecanismos coexisten sin contradecirse: el nivel de exigencia por dimensión aquí descrito nunca altera ningún puntaje; el multiplicador de nivel de puesto sí ajusta el IGI reportado, por diseño.)*

---

# 27. Perfiles de cargo

La empresa podrá:

- utilizar plantillas;
- crear perfiles;
- pegar descripción del cargo.

Además de las dimensiones y el nivel de exigencia (sección 26), cada perfil de cargo debe capturar dos datos obligatorios adicionales, definidos en DECISIONS.md, que alimentan el Multiplicador_final del IGI (sección 28):

- **Nivel de puesto**: escala universal de 6 niveles jerárquicos (Operativo, Administrativo/Auxiliar, Profesional/Técnico, Coordinación/Gestión de Procesos, Jefatura/Gerencia de Área, Dirección/Alta Gerencia);
- **¿Tiene personal a cargo?** (Sí/No), pregunta binaria independiente.

El sistema recomendará:

- dimensiones;
- nivel de exigencia;
- explicación.

Inicialmente mediante reglas técnicas.

Posteriormente podrá utilizar IA.

La decisión final permanece en el profesional.

---

# 28. IGI (Índice General de Integridad)

*(Nota de reconciliación: esta sección se llamaba "Índice Base de Integridad" y se describía como una media ponderada simple de las 5 dimensiones Base con pesos iguales. Esa descripción está superada; se corrige aquí con la fórmula real y vigente — fuente: DECISIONS.md. Los valores exactos de ponderación por reactivo permanecen confidenciales — fórmula detallada en Fase 6.)*

El IGI utiliza las dimensiones del **Núcleo** (Base — Robo, Mentira, Fraude, Irresponsabilidad, Soborno — siempre presentes, más las Adicionales seleccionadas según el riesgo del puesto). Las dimensiones **Contextuales nunca entran al IGI**; se reportan aparte, de forma informativa (ver sección 30).

Cálculo (más alto = mejor; tope estructural en 95, nunca 100):

```
PRB (Puntaje_de_Riesgo_Base) = promedio ponderado de riesgo de las dimensiones Núcleo, 0–1, alto = más riesgo
Multiplicador_final = Multiplicador_nivel_de_puesto (0.70 a 1.50 según los 6 niveles jerárquicos) + (0.15 si tiene personal a cargo)
Riesgo_ajustado_por_puesto = MIN(1, PRB × Multiplicador_final)
IGI_reportado = (1 − Riesgo_ajustado_por_puesto) × 100 × 0.95
```

El multiplicador de puesto y el tope de 95% son parte integral del cálculo, no un detalle opcional ni provisional.

En baterías reducidas (menos de las 12 dimensiones Núcleo posibles), los pesos se re-parametrizan para sumar 100% entre las dimensiones efectivamente incluidas (ej. batería mínima de 5 Base sin Adicionales → 20% cada una).

Cada dimensión individual también se reporta como **Puntaje_dimensión**, en escala 0–95, con la misma orientación (más alto = mejor).

El IGI se reporta siempre junto a su **Intervalo de Confianza del 95%** (SEM = DE_muestra × √(1−Confiabilidad_IGI); IC95% = IGI ± 1.96×SEM), nunca como número puntual aislado. Hasta contar con dato piloto, este intervalo se muestra como **[PENDIENTE DE DATO PILOTO]**.

Los pesos exactos podrán cambiar únicamente mediante validación y versionamiento.

---

# 29. Dimensiones críticas

Un IGI favorable nunca debe ocultar una dimensión crítica.

Ejemplo:

IGI alto + Soborno muy bajo.

El reporte debe conservar la alerta.

---

# 30. Dimensiones Adicionales y Contextuales dentro del IGI

*(Nota de reconciliación: esta sección proponía un "Índice Ampliado de Riesgo" separado para las dimensiones adicionales. Esa idea está superada por la fórmula real del IGI — no existe un índice ampliado independiente. Fuente: DECISIONS.md.)*

Cuando el perfil de cargo agrega dimensiones del Núcleo Adicional, estas **entran directamente al cálculo del PRB/IGI** (sección 28), junto con el Núcleo Base — no generan un índice paralelo.

Las dimensiones **Contextuales** (las 9 listadas en la sección 4) **nunca entran al IGI bajo ninguna circunstancia**. Se reportan siempre por separado, con su propio Puntaje_dimensión (0–95) y su propio nivel (1–6), como información complementaria para el profesional.

---

# 31. Alertas

Las alertas pueden originarse por:

- nivel dimensional;
- reactivos críticos;
- combinación de factores;
- calidad.

Debe priorizarse una lógica de combinación.

Evitar:

**una sola respuesta = conclusión extrema.**

---

# 32. Arquetipos

El arquetipo principal utiliza exclusivamente:

- cinco dimensiones base;
- índice base (agregado de riesgo de las 5 dimensiones Núcleo Base, sin el Multiplicador_nivel_de_puesto del IGI — en B2C no hay cargo asociado);
- patrón relativo.

Las dimensiones adicionales no cambian automáticamente el arquetipo principal.

Pueden generar:

- etiquetas;
- subperfiles;
- características complementarias.

---

# 33. Número de arquetipos

*(Nota de reconciliación: esta sección estimaba "8–12" arquetipos como número aún abierto. Ya existe una propuesta cerrada — fuente: DECISIONS.md.)*

**11 arquetipos propuestos**, organizados en **4 familias temáticas**:

- Custodia de Recursos;
- Palabra y Lealtad;
- Ética frente al Poder;
- Respeto y Responsabilidad.

Este número y estas familias son la propuesta de diseño vigente; podrán ajustarse solo mediante evidencia de piloto y versionamiento formal, no como redefinición libre.

En la primera versión podrá existir un modelo rule-based provisional.

Posteriormente podrá evolucionar hacia:

- clustering;
- modelo híbrido;
- reglas empíricamente calibradas.

---

# 34. Arquetipos no morales

No deben existir:

- “El Honesto”;
- “El Corrupto”;
- “El Mentiroso”.

Todos los arquetipos deben describir:

- patrón;
- fortalezas;
- vulnerabilidades.

---

# 35. Resultado candidato

El candidato ve:

- personaje;
- nombre;
- frase;
- descripción;
- 3 fortalezas;
- 2 áreas de atención;
- presión;
- normas;
- verificación;
- vigencia.

No ve:

- Robo;
- Mentira;
- Fraude;
- niveles de riesgo;
- score.

---

# 36. Compartir

El candidato puede:

- compartir por WhatsApp;
- copiar enlace;
- usar compartir del dispositivo;
- generar QR;
- descargar tarjeta.

Puede activar/desactivar su enlace.

El nombre en tarjeta es opcional.

Compartir nunca debe ser obligatorio para acceder al resultado principal.

---

# 37. Perfil gratuito empresarial

Sin pagar, una empresa puede ver:

- arquetipo;
- descripción;
- vigencia;
- verificación;
- dimensiones disponibles.

No ve:

- score;
- riesgo;
- alertas;
- interpretación profesional.

CTA:

**Ver reporte profesional de riesgos.**

---

# 38. Reporte profesional

El reporte profesional incluye:

- candidato;
- empresa;
- proceso;
- cargo;
- arquetipo;
- IGI (índice general de integridad);
- IC 95% del IGI (cuando exista dato piloto; mientras tanto, [PENDIENTE DE DATO PILOTO]);
- gráfica;
- cinco dimensiones base;
- adicionales;
- score;
- nivel;
- interpretación;
- alertas;
- factores;
- reactivos representativos;
- preguntas para entrevista;
- calidad;
- verificación;
- vigencia.

---

# 39. Reactivos visibles a empresa

La empresa no recibe el banco.

Cuando existe una alerta relevante podrá visualizar aproximadamente:

**hasta 3 reactivos representativos.**

Esto permite explicar el resultado sin exponer propiedad intelectual.

---

# 40. Recomendación global

El producto no debe generar:

**CONTRATAR**

o

**NO CONTRATAR.**

Puede mostrar categorías como:

- Favorable;
- Revisar;
- Profundizar.

La decisión final corresponde al profesional.

---

# 41. Comparación de candidatos

Solo cuando:

- están en el mismo proceso;
- tienen dimensiones equivalentes;
- existen condiciones comparables.

La empresa podrá seleccionar qué dimensiones comparar.

El sistema registra los filtros.

No se produce un ganador automático.

---

# 42. PDF

El PDF empresarial debe ser ejecutivo.

Estructura aproximada:

1. portada/resumen;
2. dimensiones base;
3. dimensiones adicionales;
4. alertas y profundización;
5. preguntas para entrevista;
6. calidad/versiones.

No convertir cada reporte en un documento innecesariamente extenso.

---

# 43. Snapshot histórico

Cada reporte comprado es un snapshot inmutable.

Debe conservar:

- scores;
- riesgos;
- textos;
- arquetipo;
- exigencias;
- alertas;
- versiones;
- vigencia.

Si el algoritmo cambia posteriormente:

**el reporte histórico no cambia.**

---

# 44. Correcciones

Si existe error:

- identificar afectados;
- evaluar impacto;
- emitir nueva versión;
- conservar original;
- vincular corrección;
- registrar auditoría.

Nunca modificar silenciosamente un reporte histórico.

---

# 45. Modelo comercial

Modalidades:

**Pay-as-you-go**

**Suscripción**

**Plan corporativo**

Se utilizarán créditos.

Los créditos pueden emplearse en:

- reportes;
- futuro buscador de talento;
- otros servicios.

---

# 46. Precio por dimensión

No existe precio individual por dimensión.

El plan da acceso al universo dimensional disponible.

La empresa selecciona lo necesario.

La monetización está en:

- reportes;
- planes;
- volumen;
- servicios;
- créditos.

---

# 47. Reporte siempre pagado

Aunque el candidato ya tenga todas las dimensiones vigentes:

la empresa debe desbloquear el reporte profesional.

Podrán existir:

- promociones;
- reportes de prueba;
- créditos comerciales.

No existe un número universal de pruebas gratuitas.

---

# 48. Buscador de talento

Es una fase posterior.

Mostrará inicialmente perfiles anonimizados:

- cargo;
- ciudad;
- experiencia;
- arquetipo;
- vigencia;
- verificación.

Datos identificativos se desbloquean mediante servicio comercial.

La participación por defecto deberá revisarse jurídicamente antes del lanzamiento en cada jurisdicción.

---

# 49. WhatsApp

Primera etapa:

- invitaciones;
- recordatorios;
- resultado disponible;
- enlace.

Evaluación completa vía WhatsApp:

fase posterior.

Debe mantener equivalencia psicométrica antes de considerarse intercambiable con web.

---

# 50. Privacidad

El producto se diseñará internacionalmente.

Referencias:

- Privacy by Design;
- ISO/IEC 27001;
- ISO/IEC 27701;
- ISO 31700.

Estos marcos no reemplazan legislación local.

Debe existir motor de políticas por jurisdicción.

---

# 51. Datos sensibles

Controles reforzados para:

- sustancias;
- deudas;
- violencia;
- acoso;
- fotografías;
- documentos;
- identificación.

Las dimensiones podrán restringirse por país cuando corresponda.

---

# 52. Eliminación y derechos

El candidato podrá solicitar:

- acceso;
- exportación;
- rectificación;
- eliminación.

La eliminación no implica borrar información que deba conservarse legalmente.

El sistema debe ejecutar workflow formal.

---

# 53. Arquitectura tecnológica

Para MVP:

**monolito modular + servicios especializados.**

No microservicios prematuros.

Componentes:

- Candidate Web;
- Enterprise Web;
- Admin;
- Backend API;
- Assessment Engine;
- Scoring Engine;
- Quality Engine;
- Report Engine;
- Workers;
- PostgreSQL;
- Redis;
- Queue;
- Object Storage.

---

# 54. Frontend

## Candidato

Mobile-first.

## Empresa

Desktop-first, responsive.

## Backoffice

Orientado a operación interna.

---

# 55. Backend

Módulos principales:

- Identity;
- Candidate;
- Organization;
- Recruitment;
- Assessment;
- Psychometrics;
- Results;
- Reporting;
- Commerce;
- Notifications;
- Support;
- Audit.

---

# 56. Base de datos

Base principal:

**PostgreSQL.**

Redis para:

- OTP;
- rate limits;
- caché;
- sesiones temporales.

Object Storage para:

- fotografías;
- documentos;
- PDFs;
- imágenes.

---

# 57. Entidades centrales

La arquitectura debe incluir al menos:

- Candidate;
- Organization;
- RecruitmentProcess;
- JobProfile;
- Assessment;
- AssessmentItem;
- Response;
- Dimension;
- DimensionResult;
- QualityAssessment;
- BaseIntegrityResult;
- ArchetypeResult;
- ProfessionalReport;
- ReportSnapshot;
- CreditWallet;
- AuditLog.

---

# 58. DimensionResult

El resultado dimensional debe estar asociado principalmente al:

**Candidate**

y no únicamente a la empresa.

Campos esenciales:

- dimensión;
- score;
- nivel;
- assessment origen;
- versión;
- vigencia;
- current/historical.

Esto habilita portabilidad.

---

# 59. Versionamiento

Cada resultado deberá poder identificar:

- InstrumentVersion;
- DimensionVersion;
- ItemVersion;
- AlgorithmVersion;
- RiskBandVersion;
- NormVersion;
- ArchetypeModelVersion;
- InterpretationVersion;
- idioma.

---

# 60. Protección del banco

El frontend del candidato nunca recibe:

- dimensión interna;
- scoring key;
- pesos;
- lógica crítica.

Solo:

- ID efímero;
- texto;
- opciones.

Los reactivos se entregan uno a uno.

---

# 61. Seguridad

Controles mínimos:

- TLS;
- secure headers;
- rate limiting;
- Secret Manager;
- cifrado;
- URLs firmadas;
- tenant isolation;
- RBAC;
- backups;
- auditoría;
- dependency scanning;
- secret scanning.

---

# 62. Multi-tenancy

Todas las empresas comparten infraestructura, pero sus datos deben permanecer aislados.

El backend debe validar siempre:

- usuario;
- organización;
- unidad;
- rol;
- permiso;
- recurso.

Nunca confiar únicamente en el frontend.

---

# 63. Auditoría

Debe registrarse:

- login;
- consentimientos;
- reportes abiertos;
- PDFs;
- créditos;
- cambios de scoring;
- cambios de reactivos;
- accesos sensibles;
- reinicios;
- correcciones.

---

# 64. Arquitectura asíncrona

Utilizar queue/workers para:

- emails;
- WhatsApp;
- PDF;
- fotografías;
- recordatorios;
- analytics;
- expiraciones.

Evitar bloquear el backend principal.

---

# 65. Eventos

Eventos importantes:

- AssessmentCreated;
- AssessmentStarted;
- AssessmentCompleted;
- AssessmentNonInterpretable;
- ResultGenerated;
- ReportUnlocked;
- ReportReady;
- DimensionExpired.

Se recomienda Outbox Pattern para garantizar consistencia.

---

# 66. API

REST versionada:

**/api/v1/**

Las APIs empresariales externas llegarán posteriormente.

El scoring permanece interno.

Nunca exponer fórmulas.

---

# 67. Analytics

Separar:

**Audit**

de

**Analytics.**

Audit:

quién hizo qué.

Analytics:

cómo se usa el producto.

Funnel candidato:

visita → registro → OTP → cámara → inicio → finalización → arquetipo → share.

Funnel empresa:

registro → proceso → invitación → perfil → unlock → reporte → recompra.

---

# 68. Outcomes

A futuro se solicitará a empresas información como:

- contratado;
- descartado;
- permanencia;
- renuncia;
- incidentes;
- desempeño.

Estos datos alimentan investigación y validez predictiva.

Nunca actualizan el algoritmo automáticamente.

---

# 69. Gobernanza psicométrica

Existirá comité con:

- psicometría;
- producto;
- tecnología.

Cambios importantes requieren:

- evidencia;
- revisión;
- staging;
- QA;
- aprobación;
- nueva versión.

---

# 70. Workflow de publicación

**DRAFT**

↓

**TECHNICAL REVIEW**

↓

**PSYCHOMETRIC REVIEW**

↓

**STAGING**

↓

**QA**

↓

**APPROVED**

↓

**PRODUCTION**

Debe existir rollback.

---

# 71. Arquitectura de pruebas

Pruebas:

- unitarias;
- integración;
- E2E;
- seguridad;
- performance;
- Golden Psychometric Tests.

Regla crítica:

**mismas respuestas + misma versión = mismo resultado.**

---

# 72. Golden Tests

Mantener perfiles artificiales para:

- riesgo favorable;
- medio;
- elevado;
- contradicción;
- deseabilidad;
- no interpretable.

Cada release psicométrico debe pasar estos tests.

---

# 73. MVP estricto

El MVP no necesita las 21 dimensiones productivas.

Debe iniciar con:

- cinco dimensiones base;
- controles transversales;
- scoring;
- seis bandas provisionales;
- arquetipos;
- cámara;
- candidato;
- empresa;
- proceso;
- reporte;
- créditos;
- PDF;
- auditoría;
- soporte mínimo.

---

# 74. Fuera del MVP inicial

No bloquear lanzamiento por:

- WhatsApp completo;
- buscador de talento;
- SSO;
- API pública;
- ATS/HRIS;
- white-label;
- evaluación adaptativa;
- machine learning;
- 21 dimensiones plenamente validadas.

---

# 75. Roadmap

## Release 0.1

Vertical Slice.

Registro → preguntas demo → score demo → arquetipo demo → reporte demo.

## Release 0.2

Evaluación Base.

50 reactivos + controles + scoring real provisional.

## Release 0.3

Candidate Alpha.

Cámara + arquetipo + vigencia + compartir.

## Release 0.4

Enterprise Alpha.

Empresa + cargos + procesos + reporte.

## Release 0.5

Commercial Alpha.

Créditos + pago + PDF.

## Release 0.6

Pilot Ready.

Seguridad + backoffice + soporte + auditoría + analytics.

## Pilot

Candidatos y empresas reales.

## Release 1.0

Versión ajustada posterior al piloto.

---

# 76. Orden real de construcción

La ruta crítica es:

**Banco de reactivos**

↓

**Assessment Engine**

↓

**Scoring**

↓

**Quality Engine**

↓

**Arquetipos**

↓

**Experiencia candidato**

↓

**Empresa**

↓

**Reporte**

↓

**Monetización**

↓

**Piloto**

---

# 77. Piloto

Debe realizarse por etapas.

## Etapa 1

Usuarios voluntarios.

Objetivos:

- UX;
- tiempo;
- reactivos;
- arquetipos.

## Etapa 2

Empresas piloto.

Objetivos:

- operación;
- reporte;
- entrevista;
- feedback.

## Etapa 3

Clientes pagados.

Objetivo:

- validación comercial.

---

# 78. Métricas del piloto

## Candidato

- finalización;
- duración;
- aceptación cámara;
- no interpretable;
- arquetipo visto;
- share.

## Empresa

- proceso creado;
- invitaciones;
- unlock;
- lectura;
- PDF;
- recompra.

## Psicometría

- confiabilidad;
- discriminación;
- distribución;
- tiempos;
- arquetipos.

## Tecnología

- error rate;
- latency;
- pérdidas de respuesta;
- camera failures;
- scoring failures.

---

# 79. Criterios Go/No-Go

No abrir piloto real si:

- se pierden respuestas;
- scoring no es reproducible;
- tenants no están aislados;
- reportes cambian históricamente;
- consentimientos no se registran;
- datos sensibles están expuestos.

---

# 80. Roles principales

## Product Owner

Visión, alcance y prioridades.

## Psicometría

Instrumento y scoring.

## Tech Lead

Arquitectura y seguridad técnica.

## UX/UI

Experiencia.

## Desarrollo

Implementación.

## QA

Pruebas.

## Legal/Privacidad

Consentimientos y jurisdicción.

## Comercial

Pricing y pilotos.

## Operaciones

Soporte y administración.

---

# 81. RACI resumido

Producto tiene la decisión final sobre alcance.

Psicometría tiene responsabilidad técnica sobre medición.

Tecnología tiene responsabilidad sobre arquitectura.

Legal aprueba tratamientos sensibles.

Comercial define condiciones comerciales conjuntamente con producto.

Ningún desarrollador puede modificar unilateralmente scoring, cortes o vigencia.

Ningún cliente puede modificar fórmulas psicométricas.

---

# 82. Principios no negociables

1. No decisión automática de contratación.

2. No inferir mentira mediante rostro.

3. No exponer scoring al candidato.

4. No perder respuestas confirmadas.

5. No modificar reportes históricos.

6. No modificar score por cargo.

7. No mezclar exigencia con medición.

8. No exponer el banco de reactivos.

9. No hardcodear cortes y pesos.

10. No construir microservicios prematuramente.

11. Versionar desde el primer día.

12. Auditar accesos sensibles.

13. Diseñar internacionalmente.

14. Reutilizar resultados vigentes.

15. El profesional conserva la decisión final.

---

# 83. Decisiones todavía provisionales

Deben validarse antes de considerarse definitivas:

- reactivos finales;
- pesos;
- fórmula exacta;
- significado estadístico del 5%;
- cortes;
- normas;
- número de arquetipos;
- reglas de arquetipo;
- Quality thresholds;
- reactivos críticos;
- matriz riesgo × exigencia;
- vigencias futuras por dimensión;
- reglas jurídicas del buscador;
- pricing final.

El software debe permitir configurarlos sin reconstrucción.

---

# 84. Estado actual del proyecto

La definición conceptual se considera cerrada.

Ya existen especificaciones suficientes para:

- diseñar Figma;
- revisar reactivos;
- crear prototipo;
- estimar desarrollo;
- formar equipo;
- comenzar arquitectura;
- construir Vertical Slice.

No es necesario continuar generando nuevos documentos conceptuales antes de iniciar ejecución.

---

# 85. Próxima acción recomendada

La siguiente fase no es documental.

Debe comenzar en paralelo con:

### Producto/UX

Construcción del prototipo Figma.

### Psicometría

Revisión exhaustiva de las cinco dimensiones base y controles transversales.

### Tecnología

Vertical Slice 0.1.

### Legal

Política y consentimiento inicial de cámara/datos.

### Comercial

Selección de primeras empresas piloto.

---

# 86. Definición final del MVP

El MVP queda demostrado cuando puede realizarse este flujo completo:

**Empresa crea proceso**

↓

**Invita candidato**

↓

**Candidato valida identidad**

↓

**Completa evaluación base**

↓

**Sistema guarda y analiza**

↓

**Quality Engine aprueba**

↓

**Genera scores y arquetipo**

↓

**Candidato ve resultado gratuito**

↓

**Empresa ve perfil gratuito**

↓

**Desbloquea reporte**

↓

**Consulta riesgos y preguntas**

↓

**Descarga PDF**

↓

**Todo queda versionado y auditado**

Cuando ese flujo exista y funcione correctamente, el producto deja de ser un concepto y se convierte en una plataforma piloto operativa.

---

# 87. Cierre

El producto queda definido como una plataforma de integridad laboral basada en una arquitectura psicométrica modular, perfil portátil del candidato y doble capa de resultados: arquetipo gratuito y reporte profesional de riesgos.

La ventaja estratégica no está únicamente en aplicar un test.

Está en construir progresivamente un ecosistema donde:

**el candidato conserva un perfil reutilizable;**

**la empresa accede a información profesional bajo pago;**

**las dimensiones se acumulan y mantienen vigencia;**

**la medición mejora mediante evidencia;**

**y la plataforma genera una base de información capaz de evolucionar hacia selección, talento y analítica predictiva.**

El desarrollo deberá preservar desde el primer día tres activos fundamentales:

**confianza en la medición, confianza en los datos y confianza en la trazabilidad.**

Este documento constituye la especificación maestra para iniciar ejecución.

---

**Nota de reconciliación (2026-09-16):** este documento fue revisado y ajustado para alinearlo con el respaldo técnico vigente del proyecto (DECISIONS.md) — 21 dimensiones en 3 grupos, banco de reactivos cerrado (210 sustantivos + 5 variantes + 63 alternativos + 8 Deseabilidad Social + 6 Azarosidad + 6 bio-data), fórmula real del IGI (Puntaje_de_Riesgo_Base × Multiplicador_nivel_de_puesto, tope 95%), dirección correcta de los 6 niveles de resultado, y los 11 arquetipos en 4 familias temáticas. Los cambios quedaron marcados en el propio texto de cada sección afectada como "Nota de reconciliación".