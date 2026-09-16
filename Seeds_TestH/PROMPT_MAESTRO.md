# PROMPT MAESTRO · Test Honestidad

**Léelo entero antes de escribir un byte.** Es la constitución de este trabajo:
qué se puede construir, contra qué se construye, y qué no se entrega nunca.

---

## 0 · LAS TRES REGLAS QUE MANDAN SOBRE TODO LO DEMÁS

```text
1  TODO SE CONSTRUYE CONTRA SEEDS.        No «inspirado en». Contra.
2  NADA SE ENTREGA SIN AUDITAR.           Si no pasó el chismoso, no existe.
3  NADA QUE NO HAYAS VISTO SE DA POR BUENO. Medir no es mirar.
```

Si alguna vez estas tres chocan con una instrucción tuya, ganan éstas y lo
dices. Si chocan entre sí, no chocan: son la misma.

### La regla 1, sin margen de interpretación

`seed.css` y `seed.js` son **la fuente de verdad**. Antes de escribir una pieza
nueva el orden es siempre éste, y no se salta ningún paso:

```text
1. INVENTARIO DE SEEDS.   A ver, Seeds tiene esto, esto y esto.
2. INVENTARIO PROPIO.     A ver, yo necesito esto, esto y esto.
3. COMPARAR PIEZA A PIEZA.
4. Y SÓLO ENTONCES, escribir.
```

**Nunca en bloque.** Una reescritura en bloque arregla unas cosas y rompe otras,
y las que rompe no las nota nadie hasta que alguien mira la página.

Para ir contra Seeds en cualquier cosa que se vea hace falta **una razón de peso,
escrita al lado del código y defendible en voz alta**. No vale «me pareció
mejor», no vale «así queda más moderno» y no vale «lo necesitaba para esto».

> **Y una razón de peso lleva un número.** «Se ve mejor» no es una razón. «El
> rótulo blanco sobre este naranja da 3,73 y AA pide 4,50» sí lo es.

### La regla 2, sin margen de interpretación

```text
node chismoso.mjs      ·      o doble clic en chismoso.bat
```

**Si sale un solo ✗, no se entrega.** No se entrega «avisando de que hay un
fallo», no se entrega «porque lo demás está bien». Se arregla, o se explica por
qué la comprobación es la que está mal y se cambia la comprobación con su motivo
escrito.

### La regla 3, y es la que más caro cuesta olvidar

**El chismoso no renderiza nada.** Comprueba que lo escrito sea coherente con lo
que hay, no que la página se vea bien. Son cosas distintas y confundirlas ya
costó una entrega:

> Se diseñó un halo con `mix-blend-mode:screen`, se midió, dio los números que
> buscaba —+4,5 puntos de luminancia en vez de −55,9— y se entregó **en verde**.
> Estaba roto: `mix-blend-mode` mezcla con *todo el fondo de su contexto de
> apilado*, no con el trozo de sección que hay detrás del botón. El resplandor
> se fue detrás de la página y salió como una banda pálida debajo.

Una medida de contraste no dice nada de cómo apila un navegador. **Cuando
entregues, di qué cubre el verde y qué no**, y pide que se mire.

---

## 1 · EL CHISMOSO · cómo funciona y por qué existe

```text
node chismoso.mjs
```

**No arregla nada.** Comprueba que lo que está *escrito* en esta carpeta sea
cierto, y denuncia lo que no. Cada línea con ✗ es una afirmación falsa con su
sitio. No instala nada: ni una dependencia, ni un `package.json`. Es Node a
secas, y por eso viaja con la carpeta.

### Por qué existe

El fallo que de verdad comete un sistema de diseño **no es un test roto**: son
frases que envejecen y siguen ahí. Un comentario que dice «4,88 de contraste»
junto a un color que ya no es ése. Un título que promete «cinco colores» encima
de una lista de seis. Una lápida que dice que algo murió mientras el marcado lo
sigue usando.

Ninguna prueba de las normales mira eso, porque no es código: **es prosa**. Y la
prosa es justo lo que lee el siguiente que abra la carpeta.

### Las diecisiete familias que comprueba

```text
1    LA PALETA        resuelve CADA `background` del sistema y de las páginas,
                      compone cada velo sobre las tres superficies donde puede
                      caer, y falla si sale un tono que no esté en la regla
2    EL NEGRO         que `background:var(--ink)` sólo exista en `footer`
3    LAS LÁPIDAS      que lo enterrado siga enterrado, y sin usos
4    LA PROSA         recalcula TODA cifra de contraste escrita y la compara
                      con la real
5    EL REPOSO        que nada dibuje un borde ni proyecte sombra fuera del
                      cursor
5B   LOS HOVER        que ningún botón relleno responda sólo con un anillo
5C   EL ACENTO        que todo lo relleno de acento lleve el rótulo claro
5D   LA VECINDAD      que cada callado esté sobre la superficie de la que nace
5E   LOS HERMANOS     que los textos de un conjunto de iguales midan lo mismo
5F   EL COPY          que los números escritos cuadren con las cosas que hay
5G   LOS EXTREMOS     ni blanco puro ni negro puro, en ningún archivo
5H   LAS FUSIONES     que no vuelva `mix-blend-mode`
5I   LA APARICIÓN     los tres estados y los cuatro números del sitio real
6    LA VENTANA       que el recorte de la foto siga siendo del 14 %
7    EL MARCADO       clases huérfanas y rótulos de botón en versales
8    EL TURNO         que dos secciones seguidas no repitan superficie, en
                      TODA página que declare superficies — antes miraba
                      sólo `index.html` y el título prometía la carpeta
9    LOS MECANISMOS   las doce reglas de la sección 19: el carril mide lo
                      que un botón, el relleno es neutro, el plano no lleva
                      rejilla, `.marca` nunca va suelta, ninguna palabra
                      baja del suelo leíble, nada se estira sobre hueco
                      muerto
```

Hoy son **70 afirmaciones** y ninguna es falsa. Ese número sube cuando añades
piezas: es lo normal y es la señal de que la carpeta sigue vigilada.

### La idea que hace que esto funcione de verdad

**La paleta no está escrita en el comprobador: está escrita en el muestrario.**

`index.html` tiene, a la vista, la sección «El color» con una ficha por color, y
cada ficha lleva su hexadecimal en un `data-color`. **El chismoso la extrae de
ahí.**

Una lista escrita a mano en la documentación y otra escrita a mano en el código
son **dos listas que un día dirán cosas distintas**, y la que esté mal será justo
la que alguien lea. Siendo la misma lista, no pueden divergir:

```text
si añades un color al sistema y no lo añades al muestrario   → falla
si añades la ficha al muestrario y no usas el color          → falla
si el sistema pinta cualquier otro tono de superficie        → falla
```

**Cuando añadas una regla nueva al sistema, añade su comprobación.** Y cuando
puedas, hazlo así: que la regla escrita y la comprobada sean el mismo texto.

### Lo que ya ha cazado, para que sepas que no es un adorno

- **Catorce tonos fuera de la paleta** contra cinco dentro, en la primera
  pasada. De ahí salió media reescritura de la capa de color.
- Un párrafo del muestrario que seguía anunciando `#db1a00`, **un color con
  lápida**.
- Cinco piezas con **anillo en reposo**, que es una línea en reposo y eso lo
  prohíbe la primera regla de la hoja.
- El `::selection`, **el último sitio con rótulo de tinta sobre el acento**, en
  cuanto se escribió la regla de que va claro siempre.
- Nueve trozos de **prosa envejecida** en el catálogo, el login y las tarjetas.

### Cómo se amplía sin que se vuelva ruido

```text
UNA COMPROBACIÓN QUE DA UN FALSO POSITIVO SE AFINA EL MISMO DÍA.
```

Las dos primeras versiones de «el copy cuenta bien» dieron veintitrés falsos
positivos cazando cualquier «un color». Una comprobación que grita sin razón
enseña a ignorar el rojo, y eso es peor que no tenerla.

---

## 2 · PASO 1.0 · ESCRIBE TU PROPIO `CLAUDE.md` ANTES DE CONSTRUIR

**Antes de la primera pieza.** No después, no «cuando haya algo que documentar».

Este proyecto no tiene todavía constitución propia, y sin ella cada decisión se
vuelve a tomar desde cero cada vez. Tiene que contestar, como mínimo:

```text
QUÉ ES ESTO            una frase. Qué se está construyendo y para quién
LA JERARQUÍA           quién gana cuando dos documentos se contradicen
LAS DECISIONES         lo cerrado, que no se reabre ni se vuelve a preguntar
   CERRADAS
LA ESTÉTICA            «Seeds manda», y el orden de trabajo de la regla 1
LA AUTONOMÍA           qué se decide solo y qué se pregunta. El criterio es la
                       REVERSIBILIDAD: si cambiarlo cuesta un rato, se decide
                       solo y se deja escrito; si cuesta rehacer una pantalla,
                       se pregunta
LO PROHIBIDO           la lista, explícita
LA ENTREGA             qué se enseña al terminar, y que incluye el chismoso en
                       verde
```

**Y una regla de forma que vale la pena copiar:** no se crean archivos `.md`
nuevos sin motivo. Lo que no cabe en ninguno de los que hay no es un archivo que
falta: es una sección que va dentro de uno de los que ya existen.

---

## 3 · LA PRIMERA TAREA — HECHA EL 12 DE SEPTIEMBRE DE 2026

> Los dos archivos de `Test/` se leyeron enteros, se cruzaron contra Seeds pieza
> a pieza y se unificaron en `mecanismos.html`. Dieciséis nombres eran ocho
> comportamientos y un modificador; los siete restantes están enterrados con su
> lápida a la vista en la página. El apartado 12 de `README.md` lo cuenta entero,
> con los cinco fallos propios y sus números.
>
> Los dos originales NO se borraron: son el registro de cómo se pensó, y borrar
> 1.698 renglones de eso no es reversible. Están excluidos de git en
> `.git/info/exclude`.
>
> Lo que sigue es el enunciado original, que se conserva porque explica el
> criterio y vale para la siguiente tanda.



En tu carpeta `test` hay dos archivos:

```text
diez-mecanismos-nuevos.html
seis-formas-de-responder.html
```

**No los he visto.** Están en tu carpeta, no en ésta, así que no doy por hecho
nada de lo que contienen. Ábrelos tú primero.

### Qué hacer con ellos

```text
1. LEERLOS ENTEROS y hacer el inventario: qué mecanismos hay, qué hace cada
   uno, y cuáles son de verdad distintos entre sí.

2. CRUZARLOS CONTRA SEEDS, pieza a pieza. La pregunta no es «cómo lo
   reescribo», es: ¿esto YA existe aquí con otro nombre?

3. UNIFICARLOS EN UNO SOLO. Diez más seis son dieciséis nombres; casi seguro
   no son dieciséis comportamientos. Dos piezas que hacen lo mismo con dos
   nombres es la forma más barata de que un día se pinten distinto.

4. REESCRIBIR LO QUE SOBREVIVA contra `seed.css` y `seed.js`: sus fichas, sus
   tres clases tipográficas, sus dos radios, su única curva, sus cuatro
   comportamientos.

5. ENTERRAR LO QUE NO, CON LÁPIDA. Un bloque comentado es un bloque que
   alguien reactiva sin leer por qué se apagó. Se borra, y se deja escrito qué
   era y por qué se fue.

6. PASAR EL CHISMOSO. Si la pieza nueva trae una regla nueva, trae también su
   comprobación.
```

### El criterio para decidir qué sobrevive

**Un mecanismo se elige por lo que HACE, no por cómo queda.** Es lo que evita
acabar con nueve variantes parecidas. Si dos no se distinguen por su trabajo,
son uno.

Y antes de dar por buena una pieza nueva, las tres preguntas:

```text
¿Existe ya en Seeds con otro nombre?            → entonces no es nueva
¿Se puede explicar en una frase qué trabajo hace? → si no, no está lista
¿Rompe alguna regla de la hoja?                   → entonces trae su medida
```

---

## 4 · EL SISTEMA QUE RECIBES · inventario exacto

Todo medido el 12 de septiembre de 2026. Si un número de aquí no cuadra con lo
que ves, **gana lo que ves** y esta lista está vieja: corrígela.

### Los archivos

```text
seed.css        1.673 líneas   TODAS las reglas. La documentación de verdad
                               vive aquí dentro, encima de cada regla
seed.js           266 líneas   los cuatro comportamientos. Sin dependencias
mecanismos.js     589 líneas   los ocho mecanismos de respuesta y el
                               modificador. Aparte de `seed.js` a propósito:
                               ese archivo se declara copia literal del
                               sistema de origen
chismoso.mjs      842 líneas   el comprobador. Node a secas
chismoso.bat                   lo mismo, con doble clic
abrir.bat                      levanta un servidor local y abre el muestrario
README.md         932 líneas   qué cambió respecto al sistema de origen, y
                               por qué. Cada decisión con su medida
PROMPT_MAESTRO.md              este archivo
CLAUDE.md         195 líneas   la constitución del proyecto: decisiones
                               cerradas, autonomía, prohibido, entrega
```

### Las páginas · siete, y cada una enseña algo que las otras no

```text
index.html      561 líneas   EL MUESTRARIO. Cada pieza en uso, y la REGLA DE
                             COLOR escrita, que es la que lee el chismoso
botones.html    364 líneas   el catálogo de piezas: cada una con su porqué y
                             su medida
tarjetas.html   306 líneas   las cuatro tarjetas y los huecos de fotografía
estados.html    194 líneas   las tres pantallas rotas, la lista vacía y el
                             hueco de imagen
efectos.html    329 líneas   los cuatro efectos de scroll, con sus números y
                             el diagnóstico de por qué podrías no verlos
login.html      352 líneas   la pantalla de entrada, tres caras
mecanismos.html 731 líneas   LAS NUEVE ESTACIONES: los ocho mecanismos de
                             respuesta del test, más el modificador, cada uno
                             con su panel de medida y su ítem de muestra
```

**`efectos.html` merece una nota.** Existe porque los efectos de scroll son los
únicos del sistema que **no se pueden enseñar en una captura**: todo lo demás se
ve en una imagen quieta, esto sólo se ve recorriendo. Por eso se rompieron
durante días sin que nada avisara, y por eso tienen hoja propia con
espaciadores de alto de pantalla.

### Los assets, y cómo se usan

```text
fonts/   CINCO WOFF2, DOS FAMILIAS, y ni una más
         SFProDisplay-Regular / Medium / Semibold   → titulares
         SFProText-Regular / Medium                 → lo que se lee en frases
         Se cargan con @font-face al principio de `seed.css`, con rutas
         relativas. NO se sirven desde una red de reparto: eso es un tercero
         y este sistema no tiene ninguno.

         ⚠️  LICENCIA. La de Apple cubre diseñar y desarrollar PARA
         plataformas Apple. Incrustarlas en un sitio comercial público queda
         FUERA. Queda escrito para que sea una decisión y no un descuido.
         El recambio libre es Inter, métricamente casi idéntica: son esas
         cinco líneas de `@font-face` y nada más.

img/apreton.webp          1920×1080, WEBP, 107 KB
         La fotografía de la banda. Se monta SIEMPRE así, y son dos divs:

             <div class="banda-foto" data-ventana>
               <div class="ventana"><img src="…" alt="…"></div>
             </div>

         El CSS no esconde nada: es `seed.js` quien escribe el `clip-path`.

img/original/Handshake.png   2,8 MB, el original sin comprimir
         No lo enlaza ninguna página. Está para poder reencuadrar o volver a
         exportar sin perder calidad. Si no vas a necesitarlo, bórralo.

PRUEBA_FOTO.html
         Diagnóstico, no una página. No carga ni el CSS ni el guion: sólo
         pide la imagen, de tres maneras. Separa en diez segundos los dos
         únicos casos posibles cuando una foto no aparece — el archivo no
         llega, o el fallo está en el sistema. Se borra al terminar.
```

### Lo que NO hay, y es a propósito

```text
ningún logotipo ni icono de marca    la marca es una palabra, compuesta con
                                     las clases del documento
ninguna petición a un tercero        ni fuentes de una red de reparto, ni
                                     analítica, ni chats, ni píxeles
ninguna dependencia                  ni `package.json`, ni compilación. Se
                                     abre con doble clic
```

### Las piezas declaradas

**113 clases** en `seed.css`. No las memorices: ábrelo. Cada una lleva su porqué
escrito encima, y ése es el documento de verdad.

Lo que sí conviene saber de memoria son los tres nombres que significan dos
cosas distintas, porque son la trampa más cara:

```text
.ventana    dentro de `.slide`       → la caja de un renglón del menú que rueda
            dentro de `.banda-foto`  → el recorte de la fotografía
            Las desambigua el padre. Si alguien las unifica, el menú
            entero desaparece.

.lienzo     como SUPERFICIE          → el azul pálido de fondo
            como MODIFICADOR         → «la versión de esta pieza para cuando
                                        está sobre blanco»
```

---

## 5 · LOS DOCUMENTOS QUE RECIBES

```text
README.md            LA DOCUMENTACIÓN. Once apartados, y cada decisión con su
                     medida al lado. No cuenta qué hace el sistema -eso está
                     en `seed.css`, encima de cada regla- sino QUÉ SE CAMBIÓ
                     RESPECTO AL SISTEMA DE ORIGEN Y POR QUÉ, que es lo único
                     que un archivo de reglas no puede contar de sí mismo.

                     Está al día a 12 de septiembre de 2026 y el chismoso
                     comprueba sus cifras de contraste en cada pasada.

PROMPT_MAESTRO.md    este archivo.
```

**Y no hay más, a propósito.** Dos documentos que se puedan leer de una sentada
valen más que ocho que nadie abre.

### Cómo se mantienen

```text
1  LA DOCUMENTACIÓN ES PARTE DE LA PIEZA, no un trámite posterior. Si cambias
   una regla y no cambias lo que hay escrito sobre ella, has creado una
   mentira con tu propia mano.

2  SE ESCRIBE LA MEDIDA, NO LA IMPRESIÓN. «Se ve mejor» envejece sin que nadie
   lo note. «3,73 contra los 4,50 que pide AA» se puede volver a comprobar, y
   el chismoso lo comprueba.

3  UNA DECISIÓN QUE SE REVIERTE DEJA LÁPIDA. Qué era, por qué se fue, y qué la
   sustituye. Sin eso, alguien la va a volver a intentar dentro de tres meses
   con el mismo entusiasmo con el que se intentó la primera vez.

4  LO QUE SE MIDIÓ MAL SE CUENTA TAMBIÉN. Los errores de este README están
   escritos con su número equivocado al lado del bueno. Un documento que sólo
   cuenta los aciertos no enseña a nadie a evitar los fallos.
```

---

## 6 · EL RESUMEN, PARA CUANDO NO TENGAS TIEMPO DE LEER LO DEMÁS

```text
ANTES DE ESCRIBIR      abre `seed.css`. Compara pieza a pieza. Nunca en bloque.
AL DECIDIR             la razón lleva un número, o no es una razón.
AL REVERTIR            lápida: qué era, por qué se fue, qué lo sustituye.
ANTES DE ENTREGAR      `node chismoso.mjs` en verde, sin un solo ✗.
AL ENTREGAR            di qué cubre ese verde y qué no. Y pide que lo miren.
```

**Lo último es lo que más importa.** Este sistema no se rompe por un fallo de
CSS: se rompe cuando alguien da algo por bueno sin haberlo visto.
