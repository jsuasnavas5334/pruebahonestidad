/* ═══════════════════════════════════════════════════════════════════════════
   TEST HONESTIDAD — EL COMPORTAMIENTO

   ⚠️  COPIA LITERAL DEL SISTEMA DE ORIGEN. Ni un número cambiado. El color no
   se toca desde aquí, así que repintar la paleta no da derecho a tocar nada
   de este archivo.

   Todo lo que se mueve, en un sitio. Lo comparten los HTML de al lado.

   Va a mano y sin dependencias para que la semilla se abra sin instalar nada
   — pero LOS NÚMEROS SON LOS MISMOS y son lo que hay que copiar.

   ── LO QUE MÁS IMPORTA DE ESTE ARCHIVO ────────────────────────────────────
   LA VENTANA NUNCA ESCONDE LA IMAGEN. Recorta un 14% por los cuatro lados y
   lo va abriendo hasta 0. En el peor momento se ve el 72% de la foto. Si
   alguna vez lees aquí un recorte del 100%, eso no es este efecto: es una
   avería, porque un 100% es una imagen invisible.
   ═══════════════════════════════════════════════════════════════════════════ */


/* ── QUIÉN MANDA SOBRE EL MOVIMIENTO ────────────────────────────────────────
   El sistema operativo puede pedir que no haya animaciones, y hay que
   obedecerle. En Windows es Accesibilidad → Efectos visuales → Efectos de
   animación; en macOS, Accesibilidad → Pantalla → Reducir movimiento.

   Pero esta semilla existe para ENSEÑAR el movimiento, así que hay una
   trampilla: si el sistema lo tiene apagado, el soplón lo dice y ofrece
   verlo igualmente. En una página real esa trampilla no existe. */
const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
let forzado = false;
const quieto = () => reducido && !forzado;

const bloques = [...document.querySelectorAll(".reveal")];
const bandas = [...document.querySelectorAll("[data-ventana]")];


/* ── 1 · LA APARICIÓN ───────────────────────────────────────────────────────
   ⚠️  ESTE BLOQUE SE CORRIGIÓ, Y NO ES UN CAPRICHO: EL COPIADO ESTABA ROTO.

   La semilla de origen trae un `aparecer()` que sólo pone la clase `visible`.
   Su hoja de estilos, en cambio, espera TRES estados -`abajo`, `arriba` y
   `visible`- y el reposo, el que esconde la pieza, es `abajo`.

   O sea que nadie ponía nunca el estado de partida: las piezas nacían visibles
   y añadirles `visible` no cambiaba nada. NINGUNA APARICIÓN SE EJECUTABA, en
   ninguna página, y el efecto parecía «no estar» sin que nada fallara.

   Lo que hay aquí abajo es el motor del SITIO REAL, que sí es el bueno y está
   en `src/lib/vista/aparicion.ts`. Los cuatro números vienen de ahí sin tocar:

       estado inicial   `abajo`                 nace oculta y esperando
       margen           `0px 0px -28% 0px`      SÓLO por abajo
       escalonado       0,05 s, y nunca más de tres pasos
       desconectar      NUNCA. Por eso se repite en cada pasada

   ── LAS DOS COSAS QUE NO SON OBVIAS ──────────────────────────────────────

   EL MARGEN SÓLO RECORTA POR ABAJO. Con `-12%` arriba y abajo -que es lo que
   traía la semilla- una sección más alta que la pantalla dispara en cuanto su
   BORDE superior cruza la raya, y para entonces lo que hay dentro sigue por
   debajo del pliegue: el efecto ocurre entero fuera de la vista. Lo cazó Jorge
   mirando la página: «el efecto de scroll no se nota, sólo si voy muy rápido
   se ve apenas». Y el margen de arriba se queda en CERO a propósito: al salir,
   la pieza espera a irse del todo, porque apagarla antes es ver desaparecer
   algo que todavía se está leyendo.

   TRES ESTADOS Y NO DOS. Lo fácil es alternar entre visible y no visible, y al
   probarlo sale el fallo: al SUBIR la página, las piezas entran desde abajo
   aunque vengan de arriba. Se lee como falso y nadie sabe decir por qué. Así
   que el reposo son DOS sitios distintos, y cuál toca lo dice el borde
   superior del rectángulo: si quedó por encima de la pantalla, la pieza se fue
   por arriba. Con eso el movimiento va siempre en el sentido del dedo.

   Y SI EL NAVEGADOR NO TRAE `IntersectionObserver`, LA PIEZA SE MUESTRA. Aquí
   el reposo es opacidad cero, así que no hacer nada no deja la página como
   estaba: la deja en blanco. */
let io = null;
const ESTADO_INICIAL = "abajo";
const MARGEN_APARICION = "0px 0px -28% 0px";

/* El estado que toca, separado del observador para poder medirlo sin un
   navegador: quien lo pruebe sólo necesita saber estas dos cosas. */
function estadoDe(entrada) {
  if (entrada.isIntersecting) return "visible";
  return entrada.boundingClientRect.top < 0 ? "arriba" : "abajo";
}

function vestir(n, estado) {
  n.classList.remove("abajo", "arriba", "visible");
  n.classList.add("reveal", estado);
}

function aparecer() {
  io?.disconnect();

  /* Quien pide menos movimiento no espera nada: la pieza nace puesta. El CSS
     lo neutraliza además por su cuenta, para que valga aunque este archivo no
     llegue a correr. */
  if (quieto() || typeof IntersectionObserver === "undefined") {
    bloques.forEach((n) => vestir(n, "visible"));
    return;
  }

  bloques.forEach((n) => vestir(n, ESTADO_INICIAL));

  /* Los dos `requestAnimationFrame` no son manía. Hay que dejar que el
     navegador pinte una vez con el estado de partida antes de observar: sin esa
     espera, los bloques que ya están en pantalla al cargar reciben el estado
     final en el mismo fotograma en que nacen, no hay nada de lo que partir, y
     la transición no ocurre. Aparecen de golpe — que es exactamente lo que se
     siente como «no hay efecto». */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    io = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        e.target.style.transitionDelay =
          (parseFloat(e.target.dataset.delay) || 0) + "s";
        vestir(e.target, estadoDe(e));
      }
      /* NO hay `unobserve` ni `disconnect` aquí, y ésa es la mitad del efecto:
         era justo lo que impedía la segunda pasada. */
    }, { rootMargin: MARGEN_APARICION });
    bloques.forEach((n) => io.observe(n));
  }));
}


/* ── 2 · LA VENTANA QUE SE ABRE ─────────────────────────────────────────────
   Lo lleva la fotografía, y cada imagen se lleva una banda entera para ella
   sola. Nada comparte renglón con una fotografía: una foto al lado de un
   párrafo es una foto que ilustra un párrafo, y éstas tienen que sostenerse
   solas.

     recorte  14%  → 0%      inset por los cuatro lados
     radio    28px → 0
     escala   1.12 → 1

   Se mide contra la posición de la PROPIA BANDA, no contra el scroll de la
   ventana: progreso 0 cuando su borde superior toca el fondo de la pantalla,
   1 cuando su centro llega al centro. Así se comporta igual esté donde esté
   en la página.

   La esquina se abre con ella, y eso es medio efecto: algo que empieza con
   el radio de las tarjetas del sitio y termina a sangre es el mismo gesto que
   hace el resto del sistema — algo que LLEGA, en vez de algo que aparece. */
let pendiente = false;
function pintar() {
  pendiente = false;
  const alto = innerHeight;
  for (const b of bandas) {
    const ventana = b.querySelector(".ventana");
    const img = b.querySelector("img");
    if (quieto()) { ventana.style.clipPath = "none"; img.style.transform = "none"; continue; }

    const r = b.getBoundingClientRect();
    const desde = alto;                        /* el borde superior entra */
    const hasta = alto / 2 - r.height / 2;     /* el centro llega al centro */
    const recorrido = Math.max(1, desde - hasta);
    const p = Math.min(1, Math.max(0, (desde - r.top) / recorrido));

    ventana.style.clipPath =
      `inset(${14 * (1 - p)}% ${14 * (1 - p)}% round ${28 * (1 - p)}px)`;
    img.style.transform = `scale(${1 + 0.12 * (1 - p)})`;
  }
}
const pedir = () => { if (!pendiente) { pendiente = true; requestAnimationFrame(pintar); } };


/* ── 3 · LA BARRA SE TIÑE AL BAJAR ──────────────────────────────────────────
   Transparente arriba, perla translúcida con desenfoque a partir de 24 px.
   No aparece ninguna línea: cambia de superficie, como todo lo demás. */
const barra = document.querySelector("header.barra");
const tenir = () => barra?.classList.toggle("pegada", scrollY > 24);


/* ── 4 · LA FAQ ─────────────────────────────────────────────────────────────
   Una abierta a la vez. La altura se anima de 0 al alto real y se devuelve a
   `auto` al terminar, porque una altura fija se rompe cuando el texto
   refluye — al girar el teléfono, al cambiar el cuerpo, al traducir. */
function faq() {
  const filas = [...document.querySelectorAll(".faq-fila")];
  const cerrar = (f) => {
    const r = f.nextElementSibling;
    f.setAttribute("aria-expanded", "false");
    r.style.height = r.scrollHeight + "px";
    requestAnimationFrame(() => { r.style.height = "0px"; });
  };
  const abrir = (f) => {
    const r = f.nextElementSibling;
    f.setAttribute("aria-expanded", "true");
    r.style.height = r.scrollHeight + "px";
    r.addEventListener("transitionend", function fin(e) {
      if (e.propertyName !== "height") return;
      r.style.height = "auto";
      r.removeEventListener("transitionend", fin);
    });
  };
  filas.forEach((f) => {
    f.addEventListener("click", () => {
      const abierta = f.getAttribute("aria-expanded") === "true";
      filas.forEach((o) => o.getAttribute("aria-expanded") === "true" && cerrar(o));
      if (!abierta) abrir(f);
    });
  });
  /* La primera nace abierta: una lista de preguntas todas cerradas parece
     una lista de enlaces, y no se entiende que se despliegan hasta que
     alguien acierta a pulsar una. */
  if (filas[0]) abrir(filas[0]);
}


/* ── 5 · EL AÑO ─────────────────────────────────────────────────────────────
   Del reloj y no escrito a mano. Un © con el año del año pasado es la señal
   más barata de que un sitio está abandonado. */
function anio() {
  document.querySelectorAll("[data-anio]")
    .forEach((n) => (n.textContent = new Date().getFullYear()));
}


/* ── ARRANQUE ───────────────────────────────────────────────────────────── */
addEventListener("scroll", pedir, { passive: true });
addEventListener("resize", pedir);
addEventListener("scroll", tenir, { passive: true });
aparecer();
pintar();
tenir();
faq();
anio();


/* ═══════════════════════════════════════════════════════════════════════════
   EL SOPLÓN — BÓRRALO CON LA BANDA DE REFERENCIA

   No va en una página real. Está aquí porque «no funciona» no es un
   diagnóstico, y estos datos lo convierten en uno.

   Y da uno más por omisión: se dibuja desde JavaScript, así que SI NO LO VES,
   el guion no llegó a correr. Ésa es la primera pregunta que hay que
   responder y la única que no puede responderse sola.
   ═══════════════════════════════════════════════════════════════════════════ */
(() => {
  const chip = document.createElement("div");
  chip.className = "soplon";
  const texto = document.createElement("span");
  const pon = () => {
    texto.textContent =
      `guion ok · ${bloques.length} apariciones · ${bandas.length} ventana` +
      (bandas.length === 1 ? "" : "s") +
      ` · movimiento reducido: ${reducido ? (forzado ? "sí, ignorado" : "SÍ") : "no"}`;
  };
  pon();
  chip.appendChild(texto);

  if (reducido) {
    const b = document.createElement("button");
    b.textContent = "verlo igualmente";
    b.className = "btn accent sm";
    b.style.cssText = "height:26px;padding:0 12px;font-size:12px";
    b.onclick = () => {
      forzado = true; pon(); b.remove();
      aparecer(); pintar(); scrollTo({ top: 0 });
    };
    chip.appendChild(b);
  }
  document.body.appendChild(chip);
})();
