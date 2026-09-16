# Test Honestidad — el sistema

**Esto es una copia repintada de un sistema de diseño que ya funcionaba, no un
sistema nuevo.** Estructura, medidas, curvas, tiempos y comportamientos vienen
del original sin tocar. Lo único que cambia es la paleta y las palabras.

Esa frase es la regla de mantenimiento de toda la carpeta: **si algo difiere
del original y no tiene una medida escrita al lado que lo justifique, es un
error, y se devuelve al original.**

---

## Los archivos

```text
seed.css       todas las reglas. La documentación de verdad vive aquí dentro
seed.js        los cuatro comportamientos. Copia literal, ni un número cambiado
index.html     el muestrario: cada pieza, en uso
botones.html   el catálogo de piezas: cada una con su porqué y su medida
tarjetas.html  las cuatro tarjetas y los huecos de fotografía
estados.html   las tres pantallas rotas, la lista vacía y el hueco de imagen
efectos.html   los cuatro efectos de scroll, con sus números y su diagnóstico
login.html     la pantalla de entrada, tres caras
fonts/         cinco WOFF2, dos familias
img/           la fotografía de la banda
chismoso.mjs   comprueba que lo escrito aquí sea cierto. `node chismoso.mjs`
chismoso.bat   lo mismo, con doble clic
PROMPT_MAESTRO.md  cómo se trabaja aquí. Léelo antes de escribir un byte
PRUEBA_FOTO.html   diagnóstico de la fotografía. Ver abajo
abrir.bat      levanta un servidor local y abre el muestrario
```

**`seed.css` es el documento.** Cada regla lleva su porqué escrito encima, y ahí
es donde hay que leer. Este README sólo cuenta **qué cambió respecto al
original y por qué**, que es lo que un archivo de reglas no puede contar de sí
mismo.

---

## 0 · La regla que manda sobre todas: la tinta es para las letras y para el pie

**Y ésta sí se aparta del original a propósito**, por un motivo que no es de
diseño sino de marca. Allí el negro **es** un color de marca, así que puede
pintar secciones enteras, botones y tarjetas. Aquí los colores de marca son
otros —el azul, el naranja y el verde— y una sección negra no dice «esta
marca»: dice otra marca.

```text
PERMITIDO   footer{background:var(--ink)}          una vez, y sólo ahí
PERMITIDO   la tinta como COLOR DE LETRA            siempre
PERMITIDO   un velo de tinta para una LETRA o una LÍNEA (--t100/65/30)

PROHIBIDO   un botón de tinta
PROHIBIDO   una sección de tinta
PROHIBIDO   una tarjeta, una hoja o un panel de tinta
PROHIBIDO   background:var(--ink) en cualquier sitio que no sea el pie
PROHIBIDO   un velo de tinta pintando una SUPERFICIE. Ver el apartado 1
```

**Lo que esto obligó a mover**, listado para que nadie lo deshaga creyendo que
se apartó del original por descuido:

| Pieza | Era | Es |
|---|---|---|
| `.btn.primary` | tinta | el acento, con rótulo claro |
| `.btn.accent` | un botón propio | **retirado**: era el mismo que el primario en cuanto el primario dejó de ser tinta |
| `.arrow` | tinta | nace en la superficie vecina y se enciende |
| `.faq-num::before` | tinta | el acento, con el número en claro |
| `.precio` | una hoja de tinta | una hoja **blanca** que sube |
| `.sup-ink` | una superficie | **retirado** |
| `.card .ir` | tinta | nace en la superficie vecina y se enciende |

Los cuatro espejos claros —`--c80`, `--c45`, `--c40`, `--c25`—, las clases
`.claro*` y `.btn.invert` **siguen existiendo enteros, pero sólo tienen un
sitio donde vivir**: el pie. No se han retirado porque el pie los necesita.

---

## 1 · La paleta — seis colores, auditados

**Cinco de marca más un gris.** Dos de los cinco vienen heredados y no se
tocan: el blanco que no es blanco y el negro que no es negro.

```text
--lienzo   #e8f9fd   el fondo. Uno de los dos que se turnan
--raised   #fbfbfb   heredado · el otro. Lo que sube sobre el lienzo
--ink      #1c1c1d   heredado · el texto, y el pie. Nada más
--accent   #ff1e00   el acento. Menos del 5 % de la página
--senal    #59ce8f   lo que sale bien. No existe en el original
--gris     #63696b   el +1, aprobado por su nombre. Ver abajo
```

**Y esta lista no está escrita aquí: está escrita en el muestrario, a la
vista, en la sección «El color» de `index.html`.** Cada ficha lleva su
hexadecimal en un `data-color`, y **`chismoso.mjs` la extrae de ahí**.

Ésa es la idea entera del comprobador. Una lista escrita a mano en la
documentación y otra escrita a mano en el código son **dos listas que un día
dirán cosas distintas**, y la que esté mal será justo la que alguien lea.
Siendo la misma lista no pueden divergir:

```text
si alguien añade un color al sistema y no lo añade al muestrario  → falla
si añade la ficha al muestrario y no usa el color                 → falla
si el sistema renderiza cualquier otro tono de superficie          → falla
```

Con eso, `node chismoso.mjs` resuelve cada `background` del sistema y de las
páginas, compone cada velo sobre las tres superficies donde puede caer, y falla
si sale un tono que no esté en la regla escrita.

> La primera vez que se corrió dio **catorce tonos fuera de la paleta contra
> cinco dentro**. De ahí salieron casi todas las correcciones de este apartado.

### El gris es el +1, y no es un color nuevo

Lo aprobó Jorge por su nombre: *«los 5 colores que te di, y quizás el gris del
filete que sí me gustó»*.

Es exactamente `--t65` —la tinta al 65 %— puesta sobre el lienzo. Lo que cambia
es que está declarado como color **pleno**, y eso importa: un velo cambia según
lo que tenga detrás, y un relleno no puede permitírselo. El mismo gris valía
para una letra; para una superficie había que fijarlo.

```text
rótulo blanco encima   5,39   PASA
contra el lienzo       5,15   PASA
contra el blanco       5,39   PASA
```

Hace dos trabajos: **el anillo del filete**, y **el relleno al que se invierten
los botones neutros** al pasar el cursor.

### Una superficie es un color pleno. Un velo es para letras y para líneas

Ésta es la regla que más cosas movió, y salió de una captura de Jorge: *«aquí
hay dos tonos de celeste»*.

El original usa `--f06` —tinta al 6 %— como relleno de campos, botones
callados, citas y huecos. Allí funciona porque su fondo es gris. Aquí el fondo
es **azul**, así que ese velo daba `#dcecf0`: **un segundo celeste**, en 16
sitios, más otros 16 de `#eeeeee` sobre blanco.

```text
UNA SUPERFICIE ES UN COLOR PLENO. Lienzo, blanco, o tinta (sólo el pie).
                                  No hay una cuarta y no se fabrica con opacidad.

UN VELO DE TINTA ES PARA LETRAS    Ahí viven --t100, --t65, --t30 y el anillo.
Y PARA LÍNEAS. Nunca un relleno.
```

Lo que antes era un velo, ahora es una de dos cosas: **la superficie vecina**
(campos, citas, huecos de foto, el paso de la tarjeta) o **un anillo en el
gris** (el filete, un dato, la flecha al pasar).

### Las secciones se turnan

El `body` es lienzo, así que una página que no declare nada sale entera azul.
No debe: las dos superficies claras se alternan.

```text
1  DOS SECCIONES SEGUIDAS NO REPITEN SUPERFICIE. Si comparten tono son una
   sola sección con el doble de alto, y entonces sobra el corte.
2  LO QUE VA DENTRO CAMBIA CON ELLA. Una tarjeta es la superficie VECINA:
   blanca sobre el lienzo, de lienzo sobre blanco. Al revés mide 1,00.
3  UNA BANDA A SANGRE no cuenta como sección a efectos de turno.
4  EL PIE NO ENTRA EN EL TURNO. Es tinta, siempre, y es la única.
```

El chismoso comprueba la 1 y falla si se repite.

### El verde nunca es una letra, ni un filo que tenga que leerse

```text
tinta sobre verde    8,64   todo permitido
verde sobre claro    1,91   invisible
```

El verde es **relleno**. Puede ser también un **filo bajo el cursor** —ahí no
hay nada que leer— pero nunca una letra.

---

## 2 · Los botones — seis, y ninguno responde con un adorno

**Un botón relleno se INVIERTE. Un anillo solo se lee barato.** Lo dijo Jorge
así: la pieza no cambia, sólo se le dibuja algo encima. El anillo se reserva
para lo que no tiene relleno —el filete—, donde la línea **es** la pieza.

| Botón | Reposo | Al pasar el cursor |
|---|---|---|
| `primary` | acento, rótulo claro | no cambia de relleno · **el halo se enciende + relieve** |
| `senal` | verde, rótulo tinta | **blanco con filo y letra en gris** · 48,2 puntos |
| `quiet` | blanco · en secciones **blancas** | **lienzo** — salta a la otra superficie clara |
| `lienzo` | lienzo · en secciones de **lienzo** | **blanco** — la misma regla, al revés |
| `edge` | sin relleno | **anillo gris** · aquí sí, porque no hay relleno |
| `invert` | blanco | no cambia · sólo vive en el pie |

**Nunca de verde a naranja ni al revés.** Instrucción de Jorge: las inversiones
se hacen con blanco, gris y neutros. Los dos colores de marca no se pisan.

### El primario: la desviación que está escrita

Sobre `#ff1e00` **no hay ningún rótulo pequeño que llegue a AA**:

```text
blanco sobre el acento   3,73
tinta  sobre el acento   4,41
AA pide                  4,50
```

Las dos suspenden, así que no había una opción correcta: había dos fallos.
**Jorge eligió el blanco**, y lo dijo dos veces. Es una decisión de marca sobre
una diferencia de 0,68 entre dos valores que suspenden igual, y queda escrita
con los dos números —en la hoja, donde ocurre, y aquí— para que sea una
decisión y no un descuido.

> **Un sexto hexadecimal murió por esto.** Hubo un `--accent-hondo: #db1a00`
> que cerraba el hueco, y lo cazó Jorge: *«#db1a00 es invento tuyo»*. Tenía
> razón. Su lápida está en `seed.css` y el chismoso comprueba que no vuelva.

Las dos salidas, si algún día hay que cerrar la desviación: subir el rótulo a
18,67 px en negrita, que lo convierte en texto grande y entonces el umbral es
3,0 y pasa; o declarar un sexto tono de marca a propósito y con nombre.

### Los dos callados nacen del color de su sección

Se hizo mal dos veces antes de entenderlo, y las dos merecen quedar escritas.

**Un callado nace del color de su sección.** Por eso se llama callado: en
reposo casi no está. No compite con el principal, que es justo su trabajo. Y al
pasar el cursor **salta a la otra superficie clara** — ése es el suceso entero:
la pieza pasa de confundirse con el fondo a separarse de él.

```text
sobre una sección BLANCA      .btn.quiet     blanco  →  lienzo
sobre una sección de LIENZO   .btn.lienzo    lienzo  →  blanco
```

Son el mismo botón en dos vecindades, y por eso son dos clases y no una: cuál
se usa **lo decide la superficie que hay detrás**, no el gusto.

**El primer intento saltaba al acento**, copiando al original. Allí funciona
porque su primario es tinta y los dos siguen siendo distintos; aquí el primario
ya *es* el acento, así que el callado se convertía en su vecino mientras durase
el cursor.

**El segundo saltaba al gris**, buscando un salto grande. Y era grande —82
puntos— pero decía otra cosa: un secundario que se pone casi negro al tocarlo
pesa más que el principal que tiene al lado. Jorge: *«este lo nerfeaste; lo
correcto es que tras hover quede celeste»*.

El bueno son **4,5 puntos** de luminancia, y basta. No hace falta gritar para
dejar de estar callado.

> El chismoso comprueba además que cada callado esté en su vecindad. Un `quiet`
> sobre lienzo salta, al tocarlo, al color que ya tiene debajo: **desaparece**,
> que es peor que no reaccionar. Y eso no se ve leyendo el CSS — sólo cruzando
> qué botón está dentro de qué sección.

### El halo, y lo que rompí intentando arreglarlo

Jorge: *«¿hay forma de que le dé más vida y no más oscuridad?»*. Y tenía razón
por una razón física: un rojo saturado desenfocado **encima** de un fondo claro
no lo ilumina, lo tapa.

```text
accent al 55 %, fusión normal, sobre el lienzo   →   −55,9 puntos de luminancia
```

Eso no es un resplandor: es una sombra de color. Y da igual la opacidad —
cualquier valor con fusión normal resta luz, sólo cambia cuánta. Por eso el
primer intento (`.28`) se veía sucio y el segundo (`.12`) se veía vacío: se
buscaba el punto bueno **dentro de una escala que no tenía ninguno**.

**La salida que parecía obvia fue `mix-blend-mode:screen`**, que suma luz y
matemáticamente no puede oscurecer. Los números salían: +4,5 puntos. Se
entregó. **Y estaba roto:** `mix-blend-mode` mezcla con *todo el fondo de su
contexto de apilado*, no con el trozo de sección que hay detrás del botón. El
resplandor se fue detrás de la página, apareció como una banda pálida debajo, y
de paso lavó el rótulo.

> **La lección no es sobre CSS.** Aquello se escribió, se midió, dio los
> números que buscaba, y se entregó **sin haberlo visto**. Una medida de
> contraste no dice nada de cómo apila un navegador. Lo que se ve sólo se
> comprueba mirándolo, y el chismoso **no mira**: comprueba que lo escrito sea
> coherente, no que la página esté bien.

Así que el halo **es una sombra de color y se asume**. Lo que sí se puede
elegir es cómo se reparte:

```text
un blob macizo al 55 %   resta los 55,9 puntos de golpe, planos   se lee sucio
un degradado radial      resta lo mismo SÓLO en el canto y cae
                         a cero enseguida                          se lee como luz
```

Mismo pigmento, otro reparto. El degradado concentra el color donde nace
—pegado al botón— y lo suelta rápido, que es como se comporta una luz; el blob
lo reparte plano, que es como se comporta una mancha. Y el relieve hace la otra
mitad: el botón se levanta 2 px al encenderse.

`mix-blend-mode` **queda vetado y el veto se comprueba**, porque la idea es
tentadora en el papel y volverá a parecerlo.

### El blanco del rótulo se queda en #fbfbfb

Jorge lo dijo cinco veces: *«las letras las veo celestes»*. Y luego lo midió él
mismo con un extractor: **el código estaba bien**, es un efecto visual.

```text
nuestro blanco   #fbfbfb   R=251 G=251 B=251   azul de más: 0
blanco puro      #ffffff   R=255 G=255 B=255   azul de más: 0
```

Los dos son **perfectamente neutros**, y entre ellos hay un 1,6 % de brillo. Lo
que se ve frío lo produce el naranja de al lado: un gris neutro rodeado de un
cálido saturado se percibe con el tono opuesto, porque el ojo compensa. **Le
pasa igual al 251 que al 255.**

Así que subir a `#ffffff` habría roto la regla heredada de «sin blanco puro» **a
cambio de nada**: se seguiría viendo igual. Lo único que lo arreglaría es un
blanco *cálido*, y eso es un séptimo color.

Se queda `#fbfbfb`, y **el chismoso vigila los dos extremos**: ni un blanco puro
ni un negro puro, en ningún archivo.

### La señal: se vacía a neutro, y dos colores no tres

La idea de Jorge era *«un botón blanco con línea y texto verdes; la idea es un
contraste que haga ver costosa la página»*. Se intentó, y falló por dos razones
distintas que conviene no mezclar.

**La primera es aritmética.** El texto no podía ser verde:

```text
verde como texto sobre blanco   1,91   y el texto pide 4,50
gris  como texto sobre blanco   5,39   PASA
```

**La segunda la vio él en pantalla, y es la que manda.** Con el filo verde y el
rótulo en tinta, el botón tenía **tres colores a la vez** —blanco, verde y
tinta— y eso se lee recargado: *«un botón con 3 colores es demasiado»*.

Así que la pieza se vacía entera a neutro: blanco de relleno, y filo y letra
del mismo gris. **Dos colores y una sola idea.** El verde se va del todo, que
es justo lo que hace que el cambio se note — 48,2 puntos de salto, el más
grande del sistema.

> Vale la pena separar las dos: una regla de contraste dice qué **no se puede**;
> sólo mirar la pantalla dice qué **sobra**. La primera la caza el chismoso; la
> segunda, no.

### Y el filete: el anillo es del color del rótulo

El rótulo **no se mueve** y lo único que ocurre es que aparece un anillo del
mismo tono. Una señal, no dos. Y de paso arregla algo que el original nunca
cumplió —WCAG 1.4.11 pide 3,0 al contorno que identifica un control—:

```text
anillo de acento al 35 %   el original      1,83   falla
anillo en el gris          éste             5,15   PASA
```

No ocupa sitio: es `box-shadow:inset` y no `border`. Un borde empujaría el
contenido un píxel al aparecer y toda la fila daría un salto.

---


## 3 · Las tres piezas que más se rompen al copiar esto

Las tres se copiaron mal una vez, se vieron rotas en pantalla, y se arreglaron
volviendo al original. Quedan escritas para que no vuelva a pasar.

### El halo es un ENVOLTORIO, no una propiedad del botón

```html
<span class="halo"><a class="btn primary md">Ver el sistema</a></span>
```

Lo que brilla es **un pseudoelemento detrás del botón**: un borrón del acento a
`opacity:.4`, desenfocado a 16 px, que al pasar el cursor crece de `inset:-8px`
a `-12px` y de 16 px de desenfoque a 24.

**No se puede resolver con un `box-shadow` en el propio botón.** Se intentó: una
sombra proyectada no se desenfoca a 24 px ni crece hacia fuera, así que da algo
mucho más flojo — tan flojo que en pantalla parecía que el halo no estaba.

Va con `--accent`, el de marca, y no con el hondo: aquí no hay texto encima que
proteger y lo que se busca es que brille.

### La ventana NUNCA esconde la imagen

```html
<div class="banda-foto" data-ventana>
  <div class="ventana"><img src="img/apreton.webp" alt="..."></div>
</div>
```

**El CSS no esconde nada.** Es `seed.js` quien escribe el `clip-path` en línea,
midiendo dónde está la banda respecto a la pantalla:

```text
recorte   14 % → 0 %      inset por los cuatro lados
radio     28px → 0
escala    1.12 → 1
```

**El recorte máximo es del 14 %: en el peor momento se ve el 72 % de la foto.**

> Si alguna vez lees en esta carpeta un recorte del 100 %, eso no es este
> efecto. Un `inset(100% 0 0 0)` es una imagen invisible, y se lee exactamente
> como un fallo de carga. Pasó, costó tres rondas, y se arregló volviendo al
> original.

Y `.banda-foto` lleva fondo propio (`--f06`), así que **si la imagen no llega,
queda un rectángulo visible en vez de nada.** La diferencia importa para
arreglarlo: un hueco de color dice «la caja está y la foto no llegó»; la nada
manda a buscar el fallo al sitio equivocado.

### El menú rueda con el rótulo escrito dos veces

```html
<a class="slide" href="#color">
  <span class="ventana"><span class="par">
    <span>Color</span><span aria-hidden="true">Color</span>
  </span></span>
</a>
```

La caja mide **exactamente un renglón** y recorta lo que sobra. Al pasar el
cursor la columna sube justo la mitad, así que el de abajo ocupa el sitio del de
arriba. No es un texto que cambia de color: es un texto que se va y otro que
llega.

**Dos copias de texto y no un `::after`:** un pseudoelemento no se selecciona,
no se traduce y no lo lee un lector de pantalla. Y el gemelo va `aria-hidden`, o
la etiqueta se anunciaría dos veces.

> **`.ventana` significa dos cosas distintas, y es del original.** Dentro de
> `.slide` es esta caja de un renglón; dentro de `.banda-foto` es el recorte de
> la fotografía. Las desambigua el padre. Si alguien las unifica, el menú entero
> desaparece.

---

## 4 · La entrada — `login.html`

**No hay tarjeta. Ni blanca ni de tinta.**

```css
.pantalla .caja{width:100%;max-width:380px;text-align:center}
```

Un ancho máximo y texto centrado, y nada más. Lo que se ve es **el lienzo
limpio**, con los elementos flotando encima. Ponerle una superficie detrás la
convierte en un formulario dentro de una página, que es otra cosa.

Lo que separa cada botón del fondo **no es un borde**: es `--f06`. Diez puntos y
medio de luminancia, el mismo mecanismo que usa la hoja entera. Un filete
alrededor de cada botón haría lo mismo peor y rompería la regla que gobierna
todo el sistema.

### Tres puertas que se excluyen a propósito

```text
CARA 1                          CARA 2
Continuar con Google            tu@correo.com  →
Continuar con Facebook
       o                               o
Usar mi correo        ⇄         Usar mis redes sociales
```

Las tres caben técnicamente en 380 px. **No caben en la cabeza de quien entra.**

Las dos caras viven en **la misma celda de una rejilla**, así que la caja mide
lo que la más alta y no encoge al cambiar: sin eso el rótulo sube y baja, y un
desvanecido se lee como otra página.

**Y el foco viaja con la cara.** Al campo cuando se despliega, al primer botón
cuando se vuelve. Sin eso, quien navega con teclado se queda encima de algo que
`visibility:hidden` acaba de sacar del recorrido.

### Las dos marcas van en monocromo

Van con `fill="currentColor"`, así que **heredan el color del botón** y sirven
sobre el lienzo, sobre blanco y sobre tinta sin tocar nada. Las dos publican una
versión de un solo tono justamente para esto.

> Siete tonos ajenos en un sistema que se define por tener cinco no es una
> excepción documentada: es un agujero con una nota al lado.

Y la **f** va sin su disco: el disco obligaría a recortar la letra con el color
del botón, y el dibujo dejaría de valer sobre cualquier superficie.

---

## 5 · Si no ves ningún efecto

**Mira la pastilla de abajo a la derecha.** La dibuja `seed.js`, y dice:

```text
guion ok · 22 apariciones · 1 ventana · movimiento reducido: no
```

Es un diagnóstico de tres respuestas:

1. **Si la pastilla no está**, el guion no llegó a correr. Ése es el problema y
   no hay que buscar más lejos.
2. **Si dice `movimiento reducido: SÍ`**, lo apaga el sistema operativo, no la
   página. En Windows: Accesibilidad → Efectos visuales → Efectos de animación.
   En macOS: Accesibilidad → Pantalla → Reducir movimiento. La pastilla trae un
   botón para verlo igualmente.
3. **Si dice `0 ventanas` y esperabas una**, falta el `data-ventana` en la
   banda.

> **Bórrala antes de usar esto en una página real.** Es `.soplon` en `seed.css` y
> el último bloque de `seed.js`.

### Y si lo que no ves es la fotografía

Abre **`PRUEBA_FOTO.html`**. No carga ni `seed.css` ni `seed.js`: sólo pide la
imagen, tres veces y de tres maneras. Separa en diez segundos los dos únicos
casos posibles:

- **se ve** → el archivo y la ruta están bien, y el fallo está en el sistema;
- **no se ve** → el navegador no consigue el archivo, y el sistema no tiene
  nada que ver.

---

## 6 · Las reglas que no se negocian

```text
Un borde es un cambio de tono, nunca una línea.
Ni un `border` ni un `box-shadow` fuera de un `:hover`.
Dos radios y sólo dos: 28 px, y 20 px para lo que va dentro. Más la píldora.
Tres clases tipográficas. Ningún componente inventa un tamaño.
El suelo de lo que hay que poder leer es --t65.
El acento nunca aparece en un aviso, un error ni una alerta.
Sin blanco puro en ninguna parte.
```

La única excepción es **el cursor**. En reposo no hay sombras ni líneas; bajo el
cursor puede haberlas —el halo, el filete, la raya de la FAQ—. El reposo es la
composición que lee el ojo; el hover es la respuesta a una mano que ya está ahí.
**Nada de esa excepción sale nunca en una captura de la página quieta.**

Si algo obliga a romper una de estas, no la rompas: cambia de superficie.

---

## 7 · La licencia de la tipografía

Las cinco caras son **SF Pro**. La licencia de Apple cubre diseñar y desarrollar
*para plataformas Apple*; incrustarlas en un sitio comercial público queda
fuera.

Queda escrito para que sea una decisión y no un descuido. **El recambio libre es
Inter**, métricamente casi idéntica: son las cinco líneas de `@font-face` del
principio de `seed.css` y nada más.


---

## 8 · El chismoso

```text
node chismoso.mjs        ·        o doble clic en chismoso.bat
```

**No arregla nada.** Comprueba que lo que está escrito en esta carpeta sea
cierto, y denuncia lo que no. Hoy son **56 afirmaciones** y ninguna es falsa.

### Por qué existe

El fallo que de verdad comete un sistema de diseño no es un test roto: son
**frases que envejecen y siguen ahí**. Un comentario que dice «4,88 de
contraste» junto a un color que ya no es ése. Una regla que promete «cinco
colores» en una hoja que renderiza diecinueve. Una lápida que dice que algo
murió mientras el marcado lo sigue usando.

Ninguna prueba de las normales mira eso, porque no es código: es prosa. Y la
prosa es justo lo que lee el siguiente que abra esta carpeta.

### Qué comprueba

```text
1    LA PALETA        resuelve CADA `background` y falla si sale un tono que
                      no esté en la regla escrita del muestrario
2    EL NEGRO         que `background:var(--ink)` sólo exista en `footer`
3    LAS LÁPIDAS      que lo enterrado siga enterrado, y sin usos
4    LA PROSA         recalcula TODA cifra de contraste escrita
5    EL REPOSO        que nada dibuje ni proyecte sombra fuera del cursor
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
8    EL TURNO         que dos secciones seguidas no repitan superficie
```

### Lo que ya ha cazado

No es un adorno: cada una de éstas estaba en pantalla cuando se escribió.

- **Catorce tonos fuera de la paleta** contra cinco dentro, en la primera
  pasada. De ahí salió media reescritura de la capa de color.
- Un párrafo del muestrario que seguía anunciando `#db1a00`, **el sexto
  hexadecimal que ya tenía lápida**.
- Cinco piezas con **anillo en reposo** —la flecha, un dato, el botón apagado,
  el de la tarjeta y el soplón—, que es una línea en reposo y eso lo prohíbe la
  primera regla de la hoja.
- El `::selection`, **el último sitio con rótulo de tinta sobre el acento**, en
  cuanto se escribió la regla de que el rótulo va claro siempre.

> **No escribe, no arregla y no instala nada.** Ni una dependencia ni un
> `package.json`: es Node a secas, y por eso viaja con la carpeta.


---

## 9 · En un conjunto de iguales, los textos miden lo mismo

Dentro de un **15 %** de caracteres entre el más largo y el más corto.

No es manía de maquetador. Una columna de cinco renglones al lado de una de
tres deja un agujero en la de tres, y ese agujero **se lee como que falta
algo** — cuando lo único que pasa es que alguien escribió de más.

La rejilla de filas salva lo que va **debajo** del texto: por eso las tres
imágenes caen alineadas aunque los párrafos midan distinto. Lo que no puede
salvar es el hueco que el texto deja **dentro de su propia columna**.

**Se arregla escribiendo, no maquetando:** se recorta el largo o se alarga el
corto. Y si un texto no cabe en la medida de sus hermanos, lo que está mal es
que sean hermanos.

```text
las tres reglas    99 · 101 · 103 caracteres    4 % de desviación
los tres pasos    110 · 119 · 121              10 %
```

El chismoso mide los hermanos de `.tres`, `.pasos` y `.rejilla-tarjetas`, y
falla si se pasan del 15 %.


---

## 10 · Los efectos, y por qué tienen hoja propia

```text
1 · LA APARICIÓN   toda sección estática enfoca al entrar, y va y vuelve
2 · LA VENTANA     la fotografía se destapa mientras se posa
3 · EL RODILLO     el rótulo del menú rueda bajo el cursor
4 · LA BARRA       se tiñe al bajar
```

**Son los únicos del sistema que no se pueden enseñar en una captura.** Todo lo
demás —un color, un botón, una tarjeta— se ve en una imagen quieta; esto sólo se
ve recorriendo. Por eso `efectos.html` tiene espaciadores de alto de pantalla
entre demostración y demostración: un efecto de scroll no se puede enseñar en
una página que no se recorre.

### Y por eso estuvieron rotos días sin que nada avisara

El guion copiado de la semilla de origen **sólo ponía la clase `visible`**. El
CSS espera tres estados —`abajo`, `arriba`, `visible`— y el reposo, el que
esconde la pieza, es `abajo`.

Nadie ponía nunca el estado de partida. **Las piezas nacían visibles y añadirles
`visible` no cambiaba nada: ninguna aparición se ejecutaba**, en ninguna página,
y el efecto parecía «no estar» sin que nada fallara.

> Ninguna comprobación lo veía: el CSS era correcto, el JS era correcto por
> separado, y las cuatro clases existían. Lo que estaba mal es que **no se
> hablaban**. Lo cazó Jorge mirando la página.

El motor de aquí es ahora el del sitio real (`src/lib/vista/aparicion.ts`), con
sus cuatro números sin tocar:

```text
estado inicial   abajo                 nace oculta y esperando
margen           0px 0px -28% 0px      SÓLO por abajo
escalonado       0,05 s, máximo tres peldaños
desconectar      NUNCA. Por eso se repite en cada pasada
```

**El margen sólo recorta por abajo**, y no es un detalle: con margen arriba y
abajo, una sección más alta que la pantalla dispara en cuanto su *borde*
superior cruza la raya, y para entonces lo que hay dentro sigue bajo el pliegue.
El efecto ocurre entero fuera de la vista. Y el de arriba se queda en cero a
propósito: al salir, la pieza espera a irse del todo, porque apagarla antes es
ver desaparecer algo que todavía se está leyendo.

**Tres estados y no dos**, porque al *subir* la página con sólo dos, las piezas
entran desde abajo aunque vengan de arriba. Se lee como falso y nadie sabe decir
por qué.

El chismoso comprueba los cuatro números, los tres estados, y que no haya
`unobserve` al aparecer.

### La causa número uno de «no veo ningún efecto»

No es un fallo: es `prefers-reduced-motion`, una preferencia del sistema
operativo, y se respeta. La pastilla de abajo a la derecha lo dice, y trae un
botón para verlo igualmente.

```text
Windows   Accesibilidad › Efectos visuales › Efectos de animación
macOS     Accesibilidad › Pantalla › Reducir movimiento
```


═══════════════════════════════════════════════════════════════════════════════
12 · LOS MECANISMOS DE RESPUESTA — 12 de septiembre de 2026
═══════════════════════════════════════════════════════════════════════════════

Lo que este apartado cuenta es lo que la hoja no puede contar de sí misma: qué
se decidió, contra qué, y qué salió mal en el camino.

## DE DÓNDE SALE

De dos prototipos sueltos, `diez-mecanismos-nuevos.html` y
`seis-formas-de-responder.html`, 1.698 renglones entre los dos. No iban contra
Seeds: iban al lado. Ni uno de los dos enlazaba `seed.css` ni `seed.js`.

Lo que traían, contado antes de tocar nada:

```text
25  hexadecimales           y ninguno de los 6 de la paleta
54  bordes en reposo        y la primera regla de la hoja los prohíbe
 3  sombras en reposo       idem
 1  tercera superficie      `--sunken`. Y `.sup-sunk` ya tenía lápida por esto
10  versales                3 de ellas rótulos de botón, prohibido
13  color-mix()             que la hoja evita a propósito (navegadores < 2023)
 7  font-family             contra las 3 clases tipográficas del documento
 6  peticiones a Google     y el sistema no tiene ni un tercero
16  botones inventados      contra `.btn` + 6 variantes + 3 tamaños que ya había
 4  radios sueltos          contra los dos del sistema
 2  temas completos         y Seeds tiene uno
23  clases de chrome        duplicadas LITERALMENTE entre los dos archivos
```

## DIECISÉIS NOMBRES, OCHO COMPORTAMIENTOS

El criterio es el del prompt maestro: un mecanismo se elige por lo que HACE.
Clasificados por el dato que producen, los dieciséis colapsan a ocho:

```text
un escalar                   B  ·  y con costo físico del gesto,  D
un escalar y su anchura      J
dos escalares                A
categoría + intensidad       C
un vector de 4 que suma 10   H
un orden completo            P
texto libre, posición        F
```

Y un hallazgo que no estaba en ninguno de los dos prototipos: **N, el revelado
progresivo, no es un mecanismo.** No captura una respuesta, controla cómo se
presenta el ítem, así que se monta encima de cualquiera de los ocho. No compite
con ellos: los multiplica. Va montado sobre `B` porque la barra saca 10 sobre 10
de simpleza percibida en la comparación de los propios prototipos, así que el
«cuánto pediste ver antes de contestar» no queda confundido con el costo de
entender el mecanismo.

Los siete enterrados, con su lápida a la vista en la página: E balanza (variante
de B con el eje como canje), G trazo (su firma de certeza ya la mide J con el
ancho), I cascada (tres B seguidas; eso es diseño de ítems, no un mecanismo),
K arrepentimiento (la deliberación ya está en la telemetría de los ocho),
L inclinación (un mecanismo que en la mitad de los aparatos es otro mecanismo no
es un mecanismo), M nube (el mismo comportamiento que C), O bimanual (el mismo
dato que A con dos gestos).

## LAS TRES DECISIONES QUE SE PREGUNTARON

Por el criterio de reversibilidad: deshacerlas cuesta rehacer una pantalla.

1. **UN SOLO TEMA, el claro.** Un segundo tema duplica las diez cifras de
   contraste que el chismoso recalcula y obliga a resolver cada superficie dos
   veces en su familia 1. Añadir el oscuro después cuesta una pasada; quitarlo
   después de construir encima cuesta la capa de color entera.
2. **OCHO MECANISMOS Y UN MODIFICADOR.**
3. **BANCO DE PRUEBAS, no la interfaz del test.** El panel de medida se queda a
   la vista. En el test real no va: el evaluado no puede ver lo que se le mide.

## LO QUE SE AÑADIÓ AL SISTEMA, Y POR QUÉ HACÍA FALTA

El inventario de Seeds dio una respuesta que no suele dar: de entrada continua
no tenía **nada**. `.campo` es texto. Así que la sección 19 añade cinco piezas
—`.carril`, `.nivel`, `.plano`, `.huella`, `.pieza`— más `.medida`, `.estacion`
y `.fichas`. Veinticinco clases nuevas, y ninguna repite algo que ya existiera:
el botón entero, el campo, la tarjeta, la cita, el radio de superficie dentro de
superficie y la aparición al recorrer se reutilizan tal cual.

### LA DECISIÓN DE COLOR, QUE ES DE PSICOMETRÍA Y NO DE DISEÑO

**EL RELLENO DE UN CARRIL ES NEUTRO.** Un eje que va de verde a rojo le entrega
al evaluado el mapa de la respuesta socialmente correcta, y entonces el
instrumento deja de medir a la persona y mide su lectura de la interfaz — que es
exactamente el fallo que este banco de mecanismos existe para evitar. La señal
`#59ce8f` está declarada en el sistema como «lo que sale bien», así que ponerla
en un extremo de una escala de honestidad es decirlo en voz alta.

Y no puede ser una segunda superficie, que era la respuesta obvia:

```text
el lienzo contra el blanco     1,05 : 1
```

Los dos claros están a 4,5 puntos de luminancia, que es justo lo que hace
funcionar el hover del `quiet`. Pero un relleno no señala un cambio de estado:
tiene que leerse como una CANTIDAD, y 1,05 no es una cantidad poco contrastada,
es nada.

Así que es **el gris**, y ése es su tercer trabajo:

```text
el gris contra el lienzo   5,15      el gris con rótulo blanco   5,39
```

El único neutro pleno de la paleta, y el mismo tono que ya identifica un control
en este sistema. La ficha `--gris` se corrigió para contar tres trabajos en vez
de dos.

**LA HUELLA SÍ LLEVA EL ACENTO**, y es la excepción: un punto de 20 px sobre un
plano de 16:5 ocupa el 0,4 % de su superficie, muy por debajo del 5 % en que la
hoja acota el acento. Y se lo gana: la huella es lo único de la estación que puso
la persona.

## CINCO FALLOS PROPIOS, Y NINGUNO LO CAZÓ EL CHISMOSO

Van con su número equivocado al lado del bueno, que es la regla de este archivo.
Los cinco tienen algo en común: **el CSS era correcto, el marcado era correcto y
el contraste era correcto.** Lo que estaba mal era otra cosa.

1. **`.marca` habría roto la barra.** La pieza nueva se llamó `.marca` en el
   primer borrador, y `.marca` ya existe: es el rótulo de marca de la barra y del
   pie. La pieza nueva trae `position:absolute`, que por cascada le habría caído
   encima a la palabra de la barra y la habría despegado de su rejilla. Las dos
   reglas eran correctas por separado. Se renombró a `.huella` antes de que
   llegara a pantalla, y hay una comprobación (9.5) para que no vuelva.

2. **El presupuesto de fichas arrancaba lleno.** 3-3-2-2, o sea las diez puestas.
   Con la bolsa a cero, subir cualquier columna es imposible hasta bajar otra, así
   que lo primero que hace cualquiera —tirar una hacia arriba— no producía nada
   Y NADA LO DECÍA. Arranca en 3-2-2-1, con dos en la bolsa.

3. **Un tirón rápido no reordenaba.** El destino se buscaba por el hermano cuyo
   rectángulo contenía el cursor, y entre dos eventos de puntero el dedo puede
   recorrer más que el alto de un renglón y caer en el hueco de 4 px. Arrastrando
   despacio funcionaba perfecto. Ahora el índice se CALCULA desde la posición
   dentro de la lista.

4. **42 palabras por debajo del suelo leíble.** `ink-30` en el rótulo del ítem,
   los rótulos de eje, el número de orden y el aviso de que las cifras son de
   demostración. Los 42 llevaban información, no adorno, y la escalera de esta
   hoja lo dice de sí misma: el suelo de lo leíble es `--t65`. **1,93 contra los
   5,22 de `--t65`.** La peor de las 42 era el aviso de demostración, porque es
   justo la frase que evita leer cifras de ejemplo como cifras medidas.

5. **Las fichas salían redondas.** Los 999 px del carril horizontal, heredados al
   vertical, sobre una columna de 240 × 144 no la redondean: la dejan REDONDA, y
   cuatro columnas medio llenas se leen como cuatro lunas. Ahora el vertical usa
   `--card-in` y tope de 6 rem de ancho, o sea 96 × 144: más del doble de los
   44 px que pide un pulgar, y con forma de columna.

6. **Siete formas de voseo rioplatense, cuatro de ellas dentro de los ítems.**
   «probálos», «Sostené», «Pintá», «Ordená», «Arrastrá», «Mantené», «cuán
   íntegro sos». Vinieron de los dos prototipos de `Test/`, que traen **17**, y
   se arrastraron al unificar en vez de corregirse. Seeds estaba **limpio**:
   cero formas en sus siete páginas, así que no había ninguna excusa de
   herencia.

   Y no es una manía de estilo. Jorge es chileno, George es ecuatoriano y el
   mercado es LATAM: un instrumento aplicado en Quito que dice «sostené» suena
   argentino, y eso es exactamente lo contrario del argumento comercial del
   proyecto — un instrumento autóctono frente a uno importado. En un ítem el
   registro es además parte de la medida: si el evaluado tropieza con la
   redacción, lo que se registra es su respuesta más el ruido de una frase que
   le suena ajena.

   Las siete corregidas. Comprobación 9.12, con lista cerrada y curada: un
   patrón general de acentos finales cazaría «está», «acá», «aquí», «también»
   y «café», y una comprobación que grita sin razón enseña a ignorar el rojo.
   Probada con once frases de español normal: no grita con ninguna.

Y una séptima que no es un fallo sino un límite medido: **durante los 0,85 s de la
aparición, las tarjetas están a `scale(1.015)`**, así que un arrastre que empieza
antes de que termine el efecto aterriza unos píxeles desplazado. El efecto es una
decisión sellada del sistema y no se toca; queda escrito para que nadie lo
diagnostique dos veces.

## EL COMPORTAMIENTO VA EN SU PROPIO ARCHIVO

`mecanismos.js` y no dentro de `seed.js`, y no es desorden. La cabecera de
`seed.js` dice, literal: «COPIA LITERAL DEL SISTEMA DE ORIGEN. Ni un número
cambiado». Meter ahí el comportamiento de un producto haría falsa esa frase, y
una frase falsa en la cabecera de la fuente de verdad es exactamente lo que el
chismoso existe para cazar. El CSS sí va todo junto en `seed.css`, porque ahí la
regla es la contraria y también está escrita.

## EL COMPROBADOR CRECIÓ, Y UNA DE LAS VIEJAS ESTABA CORTA

`56 → 70 afirmaciones`, y no todas son nuevas:

**LA FAMILIA 8 PROMETÍA MÁS DE LO QUE MIRABA.** Su título decía «dos secciones
seguidas no repiten superficie» y su cuerpo leía un archivo, `index.html`.
Cualquier página nueva entraba sin que nadie mirara su turno. Ahora recorre toda
página que declare superficies.

**LA FAMILIA 9, doce afirmaciones nuevas**, y las diez primeras se probaron
rompiendo el sistema a propósito para comprobar que muerden — una comprobación
que no puede fallar es decoración.

## DOS FRASES DE LA HOJA QUE YA ERAN FALSAS ANTES DE ESTA SESIÓN

Las cazó el inventario, no el comprobador:

- **`--gris`: «HACE DOS TRABAJOS Y NINGUNO MÁS».** Eran dos cuando se escribió;
  ahora son tres. Corregida, y comprobada en 9.3.
- **`.punto`: «el único sitio donde el color se queda quieto».** No lo era ya:
  `.paso .num` y `.apagada-num` llevan el acento en reposo desde que existen.
  Lo que sí es cierto y ahora está escrito: el acento en reposo vive sólo en
  cosas diminutas, y lo que la hoja acota es la SUPERFICIE que ocupa.

## LO QUE EL VERDE NO CUBRE

El chismoso no renderiza. Las 70 afirmaciones dicen que lo escrito es coherente,
no que la página se vea bien. Queda por mirar a mano, en un teléfono de verdad:

- que el arrastre se sienta bien. Ninguna afirmación mide inercia ni la precisión
  de un pulgar.
- que el plano de dos ejes se entienda sin explicación. La propia tabla de los
  prototipos le puso 7 sobre 10 de simpleza percibida, y eso lo dijo una persona
  mirándolo.
- que la franja del mapa de calor se lea como «depende» y no como un error.

## QUE SE SUBIO AL REPOSITORIO, Y QUE NO

Decidido por Jorge el 13 de septiembre de 2026, después de que yo lo hubiera
decidido solo y mal. **23 archivos**, y el repo pasa de 288 KB a unos 830.

```text
SE SUBE     el sistema entero: seed.css, seed.js, mecanismos.js, el
            comprobador, las siete páginas y los cuatro documentos
            `img/apreton.webp`, 108 KB, que es la que usan las páginas
            `Test/`, los dos prototipos originales — son el registro de cómo
            se pensó el banco, y los siete mecanismos enterrados sólo
            sobreviven ahí como código
            `subiralgit.bat` y `comprobarrepo.bat`, para que George trabaje
            con las mismas dos herramientas

NO SE SUBE  `fonts/*.woff2` — las cinco de Apple, 544 KB. Por licencia, no
            por peso. Ver `fonts/LEEME.txt`, que explica qué falta, qué pasa
            mientras no estén y cómo se cambia a Inter en cinco líneas
            `img/original/Handshake.png` — 2,8 MB que no enlaza ninguna
            página; está sólo para reencuadrar
```

**LAS DOS EXCLUSIONES VIVEN EN `.gitignore` Y NO EN `.git/info/exclude`**, y la
diferencia importa: `.gitignore` se sube, así que la regla vale para los dos.
Una regla que sólo existe en la copia de quien la escribió no es una regla, es
una costumbre — y el día que George haga un `commit -A` subiría las fuentes sin
saber que no debía.

### El fallo de proceso que hubo aquí, y va escrito porque es el más caro

La primera versión de esto excluía `Seeds_TestH/`, `Test/` y los dos `.bat`
**enteros**, y esa decisión la tomé yo solo. Se lo mencioné a Jorge dos veces en
un párrafo, y mencionar no es preguntar.

Dos cosas estaban mal, y la segunda más que la primera:

1. **Contradecía lo que se había pedido.** El encargo era un `.bat` que «sube
   todo sin interacción»; excluir cuatro cosas por mi cuenta es justo lo
   contrario.
2. **No era una decisión mía.** El criterio de `CLAUDE.md` es la
   reversibilidad, y esto afectaba al repositorio de OTRA persona. Eso se
   pregunta siempre, no cuando conviene.

Se descubrió porque Jorge fue a mirar GitHub y los archivos no estaban. O sea:
lo cazó una persona mirando, igual que los cinco fallos de la sección anterior.

## Y UNA COSA QUE NO ES DE DISEÑO

Esta carpeta vive dentro del árbol de trabajo de `pruebahonestidad`, que es el
repositorio de George. Se añadió a `.git/info/exclude` —local, nunca se sube, y
sin tocar el `.gitignore` de él— para que un «commit all» no le mande el sistema
entero, las cinco fuentes de Apple con su exposición de licencia, ni los 2,8 MB
de `img/original/Handshake.png`.
