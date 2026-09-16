# CLAUDE.md — la constitución de esta carpeta

Escrito antes de la primera pieza, que es cuando sirve. Si se escribe después
no es una constitución: es un acta.

Se lee junto con `PROMPT_MAESTRO.md`, que manda sobre esto. Aquí está lo que
ese archivo no puede saber porque se decidió después.

---

## QUÉ ES ESTO

El sistema de diseño del **Test de Honestidad**, y el banco de mecanismos con
los que una persona responde un ítem del test.

Dos productos sobre un motor: una versión B2C gratuita que se comparte, y una
B2B de pago para selección de personal. Lo que cambia entre las dos es la capa
de salida, no el instrumento.

---

## LA JERARQUÍA · quién gana cuando dos documentos se contradicen

```text
1  LO QUE SE VE EN PANTALLA        gana siempre. Una medida no dice cómo
                                   apila un navegador
2  `PROMPT_MAESTRO.md`             las tres reglas
3  `seed.css` y `seed.js`          la fuente de verdad de lo que se ve
4  este archivo
5  `README.md`                     qué cambió respecto al sistema de origen
6  el chismoso                     comprueba 3, 4 y 5. No los sustituye
```

Y una regla de forma: **no se crean archivos `.md` nuevos.** Lo que no cabe en
ninguno de los cinco que hay no es un archivo que falta, es una sección que va
dentro de uno de ellos.

---

## LAS DECISIONES CERRADAS · no se reabren

### Del sistema, heredadas y ya medidas

1. **La paleta son seis colores.** Blanco `#fbfbfb`, lienzo `#e8f9fd`, tinta
   `#1c1c1d`, acento `#ff1e00`, señal `#59ce8f`, gris `#63696b`. La lista vive
   en el muestrario y el chismoso la lee de ahí.
2. **Un borde es un cambio de tono, nunca una línea.** Excepción única: el
   cursor.
3. **La tinta es para las letras y para el pie.** Nada más.
4. **El rótulo sobre el acento es claro. Siempre.** Con su desviación de 3,73
   contra los 4,50 de AA escrita donde ocurre.
5. **Tres clases tipográficas, dos radios, una curva.**
6. **Sin dependencias, sin terceros, sin red de reparto.**

### De este proyecto, cerradas el 12 de septiembre de 2026

7. **UN SOLO TEMA: el claro de Seeds.** Los dos prototipos de `Test/` traían
   una paleta oscura completa y un botón para cambiarla. Se descarta.

   La razón lleva número: un segundo tema **duplica** cada medida de contraste
   de la carpeta —hoy son diez afirmaciones recalculadas por el chismoso— y
   obliga a resolver cada superficie **dos veces** en la familia 1, que ya
   compone cada velo sobre tres superficies. Y es asimétrico: añadir el oscuro
   más adelante cuesta una pasada; quitarlo después de haber construido encima
   cuesta rehacer la capa de color entera.

   Queda **abierta, no enterrada**: si algún día entra, entra por las fichas
   de `:root` y por una segunda vuelta de la familia 1, y no por sobreescribir
   colores en las páginas.

8. **OCHO MECANISMOS, uno por trabajo, más un modificador.** De los dieciséis
   nombres de `Test/` sobreviven ocho porque son ocho datos distintos. El
   criterio es el del prompt: un mecanismo se elige por lo que HACE.

9. **La página de mecanismos es un BANCO DE PRUEBAS, no la interfaz del test.**
   El panel de medida se queda a la vista porque enseña qué quedaría guardado
   por respuesta. La interfaz real del test, cuando exista, no lo lleva: el
   evaluado no puede ver lo que se le mide.

10. **Los colores no codifican polaridad.** Ni la señal para un extremo ni el
    acento para el otro. Un eje verde-a-rojo en un test de honestidad le
    entrega al evaluado el mapa de la respuesta socialmente correcta, que es
    exactamente el fallo que este banco de mecanismos existe para evitar.
    El relleno de un carril es neutro y punto.

11. **ESTA CARPETA SÍ VA AL REPOSITORIO DE GEORGE**, menos las cinco fuentes
    de Apple y el PNG sin comprimir. Las dos exclusiones viven en
    `.gitignore` —que se sube— y no en `.git/info/exclude`, porque una regla
    que sólo existe en la copia de quien la escribió no vale para el otro.
    `fonts/LEEME.txt` explica qué falta y cómo se cambia a Inter.

    Y va con una corrección de proceso: la primera versión excluía la carpeta
    entera y **esa decisión la tomé solo**. Afectaba al repositorio de otra
    persona, así que era de las que se preguntan. El criterio de este archivo
    ya lo decía; no lo apliqué. Queda escrito para no repetirlo.

12. **LA VOZ ES ESPAÑOL NEUTRO DE LATAM, NUNCA RIOPLATENSE.** Ni en los ítems
    del test, ni en la interfaz, ni en la conversación. Ver la sección siguiente.

---

## LA VOZ

**Español neutro de LATAM, con «tú». Cero voseo rioplatense.**

```text
SE ESCRIBE          pruébalos · sostén · pinta · ordena · arrastra · mantén
                    quieres · puedes · tienes · eres · dime · avísame

NUNCA               probálos · sostené · pintá · ordená · arrastrá · mantené
                    querés · podés · tenés · sos · decime · avisame · vos
```

### Por qué es una decisión y no un gusto

Tres razones, y la tercera es la que manda:

1. **Jorge es chileno.** El voseo rioplatense no es su registro, y una
   herramienta que le habla en un español que no es el suyo se lee como
   importada.
2. **George es ecuatoriano, y el mercado es LATAM.** Ecuador usa «tú» y
   «usted». Un instrumento aplicado en Quito que dice «sostené» y «pintá»
   suena argentino, y eso es exactamente lo contrario del argumento comercial
   del proyecto: un instrumento **autóctono** frente a uno importado. Un test
   de integridad que suena prestado pierde autoridad antes de la primera
   pregunta.
3. **En un ítem, el registro es parte de la medida.** Si el evaluado tropieza
   con la redacción, lo que se registra ya no es sólo su respuesta: es su
   respuesta más el ruido de una frase que le suena ajena. La resolución del
   input no puede superar la calidad de la pregunta, y una pregunta en un
   dialecto que no es el del evaluado ya es una pregunta peor.

### De dónde venía

De los dos prototipos de `Test/`, que traen 17 formas rioplatenses —«probálos»,
«Interactuá y mirá», «Marcá dónde caés», «Repartí 10 fichas»—. Seeds estaba
limpio: cero formas en sus siete páginas. Al unificar los mecanismos se
arrastraron **7** a `mecanismos.html` y `mecanismos.js`, y cuatro de ellas
estaban en los ítems de muestra, que es el peor sitio posible.

Corregidas. Los originales de `Test/` **no** se tocan: son el registro de cómo
se pensó el banco, no material de producción.

Lo comprueba `chismoso.mjs` en 9.12, sobre el texto visible de todas las
páginas.

### Lo que sigue abierto

**«Tú» o «usted» en los ítems del B2B.** Hoy todo está en «tú», que es lo
correcto para la capa viral y lo neutro para un prototipo. Pero un instrumento
de selección aplicado por una empresa a un postulante probablemente pida
«usted» — y eso no es cosmético: cambia la distancia social del ítem, y la
distancia social afecta cuánto se maquilla una respuesta. Es una decisión de
producto, no de estilo, y no la toma esta carpeta.

---

## LA ESTÉTICA

**Seeds manda.** El orden de trabajo no se salta:

```text
1. INVENTARIO DE SEEDS.   A ver, Seeds tiene esto, esto y esto.
2. INVENTARIO PROPIO.     A ver, yo necesito esto, esto y esto.
3. COMPARAR PIEZA A PIEZA.
4. Y SÓLO ENTONCES, escribir.
```

Nunca en bloque. Y para ir contra Seeds en algo que se vea hace falta una
razón con un número, escrita al lado del código.

### Lo que este proyecto añadió al sistema, y por qué hacía falta

Seeds no tenía **ningún** control de entrada continua: su único campo es
`.campo`, que es texto. Los ocho mecanismos necesitan arrastrar, así que el
sistema creció en cuatro piezas —`.carril`, `.marca`, `.plano`, `.pieza`— y una
superficie de lectura, `.medida`. Cada una lleva su razón en `seed.css`,
sección 19.

Lo que **no** se añadió, porque ya existía: el botón (siete piezas), el campo,
la tarjeta, la cita, el radio de superficie dentro de superficie, la aparición
al recorrer, las tres clases tipográficas.

---

## LA AUTONOMÍA · el criterio es la reversibilidad

```text
SE DECIDE SOLO Y SE DEJA ESCRITO      si deshacerlo cuesta un rato
SE PREGUNTA                           si deshacerlo cuesta rehacer una pantalla
```

Ejemplos reales de esta sesión, para calibrar:

- **Se decidió solo:** que el relleno de un carril sea gris y no una segunda
  superficie. Surfaces claras dan 1,05:1 entre ellas, que no es una cantidad,
  es nada. Cambiarlo después es una línea.
- **Se preguntó:** el tema oscuro, el corte de dieciséis a ocho, y si la página
  es banco de pruebas o interfaz real. Los tres cuestan rehacer la pantalla.

---

## LO PROHIBIDO · la lista, explícita

```text
mix-blend-mode                     se probó, se rompió, se revirtió
blanco puro y negro puro           en ningún archivo
un borde o una sombra en reposo    fuera del cursor
background:var(--ink)              fuera de `footer`
una tercera superficie             `.sup-sunk` ya tiene lápida
un velo de tinta como relleno      los velos son para letras y líneas
color-mix()                        no llega a navegadores de antes de 2023, y
                                   cuando no llega desaparece sin avisar
una cuarta clase tipográfica       y no hay tercera letra
rótulos de botón en versales       excepto `.card .ir`
peticiones a un tercero            ni fuentes, ni analítica, ni píxeles
un color que codifique la respuesta correcta
un bloque comentado en vez de una lápida
```

---

## LA ENTREGA

```text
1  `node chismoso.mjs` en verde, sin un solo ✗
2  DECIR QUÉ CUBRE ESE VERDE Y QUÉ NO. El chismoso no renderiza: comprueba
   que lo escrito sea coherente, no que la página se vea bien
3  PEDIR QUE SE MIRE, y decir dónde mirar
4  Si la pieza trajo una regla nueva, trae su comprobación
```

### Lo que el verde NO cubre, y hay que mirarlo a mano

- **Que el arrastre se sienta bien.** Ninguna afirmación mide inercia ni
  precisión de un pulgar. Hay que probarlo en un teléfono de verdad.
- **Que el trazo de un carril se lea como una cantidad.** Está medido a 5,15
  de contraste, y 5,15 no dice si se entiende de un vistazo.
- **Que el plano de dos ejes se entienda sin explicación.** La propia tabla de
  `Test/` le puso 7 sobre 10 de simpleza percibida, y eso lo dijo una persona
  mirándolo, no una medida.

---

## LAS DOS HERRAMIENTAS DE GIT

Viven un nivel arriba, en `Test Honestidad\`, porque son del repositorio y no
del sistema de diseño. Excluidas en `.git/info/exclude`: son de Jorge, no del
proyecto de George.

```text
subiralgit.bat      fetch · add · commit con mensaje descriptivo · pull · push
                    El orden importa: COMMITEA ANTES DE INTEGRAR, así el
                    trabajo ya está a salvo cuando entra lo de George.
                    Mensaje automático a partir de los archivos que cambiaron
                    -«Actualiza Fase3, Fase6»-, nunca «cambios». Con uno
                    propio: subiralgit.bat "lo que hiciste"

comprobarrepo.bat   Informa primero, toca después. Iguala SÓLO cuando es
                    seguro: con la carpeta limpia hace `merge --ff-only`; con
                    cambios sin guardar NO TOCA NADA; con las dos copias
                    divergidas tampoco fuerza.
                    /forzar respalda en `_respaldo_<fecha>\`, VERIFICA archivo
                    por archivo que la copia salió, y sólo entonces resetea.
```

### Estado de verificación, al 13 de septiembre de 2026

Ejecutado en Windows por Jorge, no sólo leído:

```text
PROBADO      comprobarrepo.bat con la carpeta limpia y al día. Con eso queda
             probado `:buscar_git` -que comparten los dos-, el fetch contra
             GitHub, los tres bloques `for /f`, la expansión diferida, las
             etiquetas, el `pause` final y que no hay un solo acento roto.

SIN PROBAR   el push, o sea si hay permiso de ESCRITURA. La rama con archivos
             modificados. `/forzar` y su respaldo. Las ramas `:conflicto` y
             `:sin_permiso`.
```

### Cinco fallos de cmd que se arreglaron antes de entregar

Ninguno se ve leyendo el código con buena voluntad:

1. **`if exist X set A & exit /b`** ejecuta el `exit /b` SIEMPRE: el `&` termina
   el `if`. Cortaba la cadena de búsqueda de git en el primer sitio donde no
   estuviera. Un `if` por renglón, sin `&`.
2. **`%ProgramFiles(x86)%`** lleva paréntesis en el NOMBRE y revienta cualquier
   bloque `( ... )`. Va a una variable limpia primero.
3. **`%DATE%`** cambia con la configuración regional: en un Windows en español
   podía dar basura como nombre de carpeta. La fecha la da PowerShell.
4. **git entrecomilla los nombres con espacios** en `status --porcelain`, así
   que el `xcopy` del respaldo recibía comillas dobles. Se limpian con `%%~B`.
5. **Cero acentos en los dos archivos.** Feo, y es lo que garantiza que se lean
   igual en cualquier consola sin depender de la codepage.

---

## LO QUE FALTA DECIDIR, y no lo decide esta carpeta

Heredado de `seis-formas-de-responder.html`, y sigue abierto:

1. **Para qué se usa el test.** Selección laboral, autoconocimiento o dinámica
   de equipo. En selección hay incentivo a mentir y los ítems tienen que ser
   indirectos; en autoconocimiento no lo hay.
2. **Cuántos ítems.** Bajo quince no se mide consistencia entre pares
   invertidos, que es donde está la señal. Sobre cuarenta, con mecanismos de
   arrastre, la gente abandona.
3. **Qué devuelve al final.** Un puntaje, un perfil de motivos, o un mapa de
   dónde se doblan los principios. Los tres se construyen con datos distintos.

Y dos que salieron de esta sesión:

4. **La licencia de las fuentes.** Las cinco de Apple cubren diseñar y
   desarrollar para plataformas Apple. Un sitio comercial público queda fuera.
   El recambio libre es Inter, métricamente casi idéntica: son cinco líneas de
   `@font-face`. Está escrito para que sea una decisión y no un descuido.
5. **Dónde vive esta carpeta.** Hoy está dentro del árbol de trabajo del repo
   `pruebahonestidad`, que es de George. Ver `README.md`.
