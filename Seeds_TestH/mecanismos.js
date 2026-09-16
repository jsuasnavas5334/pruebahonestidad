/* ═══════════════════════════════════════════════════════════════════════════
   LOS MECANISMOS DE RESPUESTA — EL COMPORTAMIENTO

   ⚠️  ESTO NO VA EN `seed.js`, Y NO ES DESORDEN. La cabecera de ese archivo
   dice, literal: «COPIA LITERAL DEL SISTEMA DE ORIGEN. Ni un número
   cambiado». Meter aquí dentro el comportamiento de un producto haría falsa
   esa frase, y una frase falsa en la cabecera de la fuente de verdad es
   exactamente lo que el chismoso existe para cazar.

   Así que son dos archivos con dos trabajos: `seed.js` es el sistema heredado
   —la aparición, la ventana, la barra, la FAQ— y éste es lo que el Test de
   Honestidad le añade. El CSS sí va todo junto en `seed.css`, porque ahí la
   regla es la contraria y está escrita: «Todas las reglas viven aquí, y sólo
   aquí».

   Sin dependencias, como todo lo demás de la carpeta.

   ── LO QUE MIDE CADA MECANISMO, Y LA ADVERTENCIA QUE VA CON ELLO ──────────
   Cada estación registra dos cosas: el VALOR y CÓMO se produjo ese valor
   -latencia, correcciones, deriva, deliberación-. Esa segunda capa es la
   ventaja de un input continuo sobre una casilla, porque una casilla sólo
   registra el resultado.

   Y ES UNA SEÑAL SECUNDARIA, NUNCA UN PUNTAJE. La evidencia sobre latencia y
   trayectoria del cursor como indicadores de engaño muestra efectos reales
   pero modestos y frágiles fuera del laboratorio: una conexión lenta, una
   pantalla táctil o simplemente releer el ítem producen el mismo patrón que la
   vacilación culpable. Sirve para marcar ítems que vale la pena repreguntar.
   Queda escrito aquí y a la vista en la página.
   ═══════════════════════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const cifra = (n) => n.toLocaleString("es-CL");
  const ms = (n) => cifra(Math.round(n)) + " ms";
  const tope = (v, a, b) => (v < a ? a : v > b ? b : v);
  const signo = (n) => (n > 0 ? "+" : n < 0 ? "−" : "") + Math.abs(n);

  /* ── LA MEDIDA ───────────────────────────────────────────────────────────
     Un objeto por estación. Escribe en los `[data-out]` de su propia caja y
     lleva la cuenta de la segunda capa.

     EL AVISO DE DEMOSTRACIÓN SE VA AL PRIMER CONTACTO, y eso es una decisión
     de honestidad, no un detalle: la página nace con cifras de ejemplo para
     que se entienda qué se registra, y en cuanto la persona toca algo esas
     cifras dejan de ser de ejemplo. Un panel que no distingue las dos cosas
     enseña datos inventados como si fueran medidos. */
  class Medida {
    constructor(caja) {
      this.caja = caja;
      this.t0 = performance.now();
      this.primer = null;
      this.correcciones = 0;
      this.direccion = 0;
      this.valorInicial = null;
      this.ultimo = undefined;
      this.desdeQue = null;
      this.aviso = caja.querySelector("[data-demo]");
    }
    pon(clave, valor) {
      const n = this.caja.querySelector(`[data-out="${clave}"]`);
      if (n) n.textContent = valor;
    }
    /* Primer contacto: mata el aviso y fija la latencia. */
    toca() {
      if (this.aviso) { this.aviso.remove(); this.aviso = null; }
      if (this.primer === null) {
        this.primer = performance.now();
        this.pon("lat", ms(this.primer - this.t0));
      }
      if (this.desdeQue === null) this.desdeQue = performance.now();
    }
    /* Una CORRECCIÓN es un cambio de sentido, no cualquier movimiento. El
       umbral de 0,4 puntos existe porque el temblor de un dedo sobre una
       pantalla produce microcambios de signo continuamente: sin él, cualquier
       arrastre normal contaría treinta correcciones y el dato no diría nada. */
    sigue(v) {
      if (this.valorInicial === null) this.valorInicial = v;
      if (this.ultimo !== undefined) {
        const d = v - this.ultimo;
        if (Math.abs(d) > 0.4) {
          const dir = d > 0 ? 1 : -1;
          if (this.direccion !== 0 && dir !== this.direccion) {
            this.correcciones++;
            this.pon("corr", cifra(this.correcciones));
          }
          this.direccion = dir;
        }
      }
      this.ultimo = v;
    }
    suelta(v) {
      if (this.valorInicial !== null)
        this.pon("deriva", cifra(Math.round(Math.abs(v - this.valorInicial))) + " pts");
      if (this.desdeQue !== null)
        this.pon("delib", ms(performance.now() - this.desdeQue));
    }
  }

  /* ── EL ARRASTRE ─────────────────────────────────────────────────────────
     Un solo helper para las nueve estaciones. `setPointerCapture` y no
     listeners en `document`: con la captura el nodo sigue recibiendo los
     eventos aunque el dedo salga de su caja, que es lo que pasa siempre en el
     último 5 % de un carril. Sin ella el arrastre se corta justo en los
     extremos, que son los dos valores que más importan. */
  function arrastre(nodo, alMover, alSoltar) {
    let activo = false;
    const punto = (e) => {
      const r = nodo.getBoundingClientRect();
      return {
        x: tope((e.clientX - r.left) / r.width, 0, 1),
        y: tope((e.clientY - r.top) / r.height, 0, 1),
      };
    };
    nodo.addEventListener("pointerdown", (e) => {
      activo = true;
      nodo.setPointerCapture(e.pointerId);
      e.preventDefault();
      alMover(punto(e), true);
    });
    nodo.addEventListener("pointermove", (e) => { if (activo) alMover(punto(e), false); });
    nodo.addEventListener("pointerup", (e) => {
      if (!activo) return;
      activo = false;
      if (alSoltar) alSoltar(punto(e));
    });
    nodo.addEventListener("pointercancel", () => { activo = false; });
  }

  /* El teclado, en un sitio y no nueve veces. Un carril que sólo responde al
     ratón es un ítem que una persona con teclado no puede contestar, y un test
     que no se puede contestar no mide. */
  function teclas(nodo, leer, escribir, paso = 0.02) {
    nodo.addEventListener("keydown", (e) => {
      const p = leer();
      if (e.key === "ArrowRight") p.x += paso;
      else if (e.key === "ArrowLeft") p.x -= paso;
      else if (e.key === "ArrowUp") p.y -= paso;
      else if (e.key === "ArrowDown") p.y += paso;
      else return;
      e.preventDefault();
      escribir({ x: tope(p.x, 0, 1), y: tope(p.y, 0, 1) });
    });
  }

  const cajas = {};
  for (const el of document.querySelectorAll("[data-mec]"))
    cajas[el.getAttribute("data-mec")] = new Medida(el);

  const pct = (n) => n * 100 + "%";

  /* ═══ B · BARRA CIEGA ═══════════════════════════════════════════════════
     Un escalar. El más barato de los nueve y el único que no le enseña a nadie
     dónde está el centro. */
  const barraCiega = (clave, caja) => {
    const M = cajas[clave];
    const carril = caja.querySelector("[data-carril]");
    const nivel = carril.querySelector(".nivel");
    const aplica = (p) => {
      M.toca();
      const v = p.x * 100;
      nivel.style.width = pct(p.x);
      M.pon("valor", v.toFixed(1).replace(".", ","));
      carril.setAttribute("aria-valuenow", v.toFixed(1));
      M.sigue(v);
      return v;
    };
    arrastre(carril, aplica, (p) => M.suelta(aplica(p)));
    teclas(carril, () => ({ x: parseFloat(nivel.style.width) / 100 || 0, y: 0 }), aplica);
    return aplica;
  };
  for (const caja of document.querySelectorAll('[data-mec="B"]'))
    barraCiega("B", caja);

  /* ═══ D · PRESIÓN SOSTENIDA ═════════════════════════════════════════════
     El único donde afirmar más CUESTA más. El llenado sube a ritmo constante y
     topa a los 4 s; nadie ve una cifra, ve un nivel y decide cuándo parar.
     Los 4 s no son redondos por casualidad: por debajo de 3 el gesto no llega
     a sentirse como un costo, y por encima de 5 un test de cuarenta ítems se
     vuelve inaceptable sólo en esperas. */
  (() => {
    const M = cajas.D;
    if (!M) return;
    const boton = M.caja.querySelector("[data-reten]");
    const nivel = boton.querySelector(".nivel");
    const rotulo = boton.querySelector(".rotulo");
    const DURACION = 4000;
    let cuadro = null, desde = 0, pulsaciones = 0;
    const late = () => {
      const t = performance.now() - desde;
      const v = tope((t / DURACION) * 100, 0, 100);
      nivel.style.height = v + "%";
      M.pon("valor", cifra(Math.round(v)));
      M.pon("sostenido", ms(t));
      M.pon("tope", v >= 100 ? "sí" : "no");
      cuadro = v < 100 ? requestAnimationFrame(late) : null;
    };
    const baja = (e) => {
      e.preventDefault();
      M.toca();
      pulsaciones++;
      M.pon("reintentos", cifra(pulsaciones - 1));
      rotulo.textContent = "Sostén mientras sea verdad";
      desde = performance.now();
      if (cuadro) cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(late);
    };
    const sube = () => {
      if (cuadro) { cancelAnimationFrame(cuadro); cuadro = null; }
      rotulo.textContent = "Registrado";
    };
    boton.addEventListener("pointerdown", baja);
    boton.addEventListener("pointerup", sube);
    boton.addEventListener("pointerleave", sube);
    boton.addEventListener("pointercancel", sube);
    boton.addEventListener("keydown", (e) => {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) baja(e);
    });
    boton.addEventListener("keyup", (e) => { if (e.key === " " || e.key === "Enter") sube(); });
  })();

  /* ═══ J · MAPA DE CALOR ═════════════════════════════════════════════════
     Se pinta una FRANJA, no un punto. El centro es la posición y el ancho es
     la variabilidad que la persona declara de sí misma: «esto me aplica, pero
     depende». Ningún otro mecanismo le deja decir eso. */
  (() => {
    const M = cajas.J;
    if (!M) return;
    const carril = M.caja.querySelector("[data-carril]");
    const franja = carril.querySelector(".nivel");
    const marca = carril.querySelector(".huella");
    let ancla = null;
    const aplica = (p, primero) => {
      M.toca();
      if (primero) ancla = p.x;
      const a = Math.min(ancla, p.x), b = Math.max(ancla, p.x);
      /* Un mínimo del 4 %: un toque sin arrastre daría una franja de ancho
         cero, que no se ve y no se distingue de «no contesté». */
      const ancho = Math.max(b - a, 0.04);
      const centro = tope((a + b) / 2, ancho / 2, 1 - ancho / 2);
      franja.style.left = pct(centro - ancho / 2);
      franja.style.width = pct(ancho);
      marca.style.left = pct(centro);
      M.pon("valor", cifra(Math.round(centro * 100)));
      M.pon("ancho", cifra(Math.round(ancho * 100)) + " pts");
      M.pon("ambivalencia", ancho > 0.34 ? "alta" : ancho > 0.16 ? "moderada" : "baja");
      carril.setAttribute("aria-valuenow", Math.round(centro * 100));
      M.sigue(centro * 100);
      return centro * 100;
    };
    arrastre(carril, aplica, (p) => M.suelta(aplica(p, false)));
    teclas(carril,
      () => ({ x: parseFloat(marca.style.left) / 100 || 0.5, y: 0 }),
      (p) => { ancla = p.x; aplica(p, false); });
  })();

  /* ═══ A · PANEL CROMÁTICO ═══════════════════════════════════════════════
     Dos escalares en un clic: la posición y cuánta certeza tiene esa posición.

     ⚠️  SOLAPE CONOCIDO, Y QUEDA ESCRITO PARA QUE SE FALSE. El eje vertical de
     aquí y el ancho de la franja de `J` codifican el MISMO constructo —la
     certeza que la persona declara— en dos formas: aquí como una altura
     independiente, allí como un intervalo alrededor del valor.

     No se unifican todavía porque para el puntaje no son el mismo dato: el
     ancho de J da una dispersión a nivel de ítem y la altura de A da una
     covariable de confianza. Pero SI EL PILOTO ENSEÑA QUE CORRELACIONAN ALTO,
     uno de los dos se entierra. Está dicho aquí para que sea una hipótesis con
     fecha de caducidad y no una duplicación que nadie vuelve a mirar. */
  (() => {
    const M = cajas.A;
    if (!M) return;
    const plano = M.caja.querySelector("[data-plano]");
    const marca = plano.querySelector(".huella");
    const aplica = (p) => {
      M.toca();
      const x = Math.round(p.x * 200 - 100), y = Math.round((1 - p.y) * 100);
      marca.style.left = pct(p.x);
      marca.style.top = pct(p.y);
      M.pon("valor", signo(x));
      M.pon("certeza", cifra(y));
      plano.setAttribute("aria-valuenow", x);
      M.sigue(x);
      return x;
    };
    arrastre(plano, aplica, (p) => M.suelta(aplica(p)));
    teclas(plano, () => ({
      x: parseFloat(marca.style.left) / 100 || 0.5,
      y: parseFloat(marca.style.top) / 100 || 0.5,
    }), aplica);
  })();

  /* ═══ C · VECTOR DESDE EL CENTRO ════════════════════════════════════════
     Categoría e intensidad en un gesto: el cuadrante dice QUÉ motivo pesó, la
     distancia CUÁNTO. Quedarse en el centro también contesta: «no me movió
     nada», y por eso hay una zona muerta de 8 px en vez de forzar un motivo. */
  (() => {
    const M = cajas.C;
    if (!M) return;
    const plano = M.caja.querySelector("[data-plano]");
    const linea = plano.querySelector(".vector");
    const marca = plano.querySelector(".huella");
    const CUADRANTES = [
      { hasta: 90, nombre: "Conveniencia" },
      { hasta: 180, nombre: "Lealtad" },
      { hasta: 270, nombre: "Cuidado" },
      { hasta: 360, nombre: "Miedo" },
    ];
    let anterior = null;
    const aplica = (p) => {
      M.toca();
      const R = 110;
      let dx = p.x * 220 - R, dy = p.y * 220 - R;
      let r = Math.hypot(dx, dy);
      if (r > 100) { dx = (dx / r) * 100; dy = (dy / r) * 100; r = 100; }
      let ang = (Math.atan2(-dy, dx) * 180) / Math.PI;
      if (ang < 0) ang += 360;
      const nombre = r < 8 ? "Ninguno · centro"
        : (CUADRANTES.find((c) => ang < c.hasta) || CUADRANTES[0]).nombre;
      linea.setAttribute("x2", R + dx);
      linea.setAttribute("y2", R + dy);
      marca.style.left = pct((R + dx) / 220);
      marca.style.top = pct((R + dy) / 220);
      M.pon("valor", cifra(Math.round(r)));
      M.pon("motivo", nombre);
      M.pon("angulo", cifra(Math.round(ang)) + "°");
      if (anterior !== null && anterior !== nombre) {
        M.correcciones++;
        M.pon("corr", cifra(M.correcciones));
      }
      anterior = nombre;
      return r;
    };
    arrastre(plano, aplica, aplica);
  })();

  /* ═══ H · REPARTO DE FICHAS ═════════════════════════════════════════════
     Diez fichas entre cuatro motivos. LA SUMA ES CONSTANTE, y eso es el
     mecanismo entero: subir una baja lo disponible para las otras, así que no
     hay forma de aprobar los cuatro a la vez. Es el único de los nueve que
     obliga a un canje, y el único cuyo dato es un vector y no un número. */
  (() => {
    const M = cajas.H;
    if (!M) return;
    const carriles = [...M.caja.querySelectorAll("[data-ficha]")];
    const rotulos = carriles.map((c) => c.getAttribute("data-ficha"));
    /* ⚠️  ARRANCA CON DOS FICHAS SIN REPARTIR, Y NO ES UN DETALLE.
       Arrancaba en 3-3-2-2, o sea con las diez puestas, y eso rompía el
       mecanismo en el primer gesto: con la bolsa vacía, subir cualquier
       columna es imposible hasta bajar otra, así que lo primero que hace
       cualquiera —tirar una hacia arriba— no producía nada Y NADA LO DECÍA.
       Lo cazó una prueba dirigida, no el chismoso: las cuatro columnas
       estaban bien, la suma estaba bien y el tope estaba bien. Lo que estaba
       mal era el estado inicial.
       Con 3-2-2-1 quedan dos en la bolsa, así que el primer tirón hacia
       arriba SÍ hace algo y el mecanismo se explica solo. */
    const valores = [3, 2, 2, 1];
    let ajustes = 0;
    const pinta = () => {
      const suma = valores.reduce((a, b) => a + b, 0);
      carriles.forEach((c, i) => {
        c.querySelector(".nivel").style.height = (valores[i] / 10) * 100 + "%";
        c.querySelector("[data-n]").textContent = valores[i];
        c.setAttribute("aria-valuenow", valores[i]);
      });
      M.caja.querySelector("[data-bolsa]").textContent = 10 - suma;
      let may = 0;
      for (let i = 1; i < 4; i++) if (valores[i] > valores[may]) may = i;
      M.pon("valor", rotulos[may]);
      M.pon("reparto", valores.join("-"));
      const orden = [...valores].sort((a, b) => b - a);
      M.pon("concentracion", orden[0] >= 6 ? "alta" : orden[0] >= 4 ? "media" : "baja");
    };
    carriles.forEach((carril, i) => {
      const mueve = (p) => {
        M.toca();
        const pedido = Math.round((1 - p.y) * 10);
        const resto = valores.reduce((a, b, j) => (j === i ? a : a + b), 0);
        const nuevo = tope(pedido, 0, 10 - resto);
        if (nuevo !== valores[i]) {
          valores[i] = nuevo;
          ajustes++;
          M.pon("ajustes", cifra(ajustes));
          pinta();
        }
      };
      arrastre(carril, mueve);
      teclas(carril, () => ({ x: 0, y: 1 - valores[i] / 10 }), mueve, 0.1);
    });
    pinta();
  })();

  /* ═══ P · REORDENAMIENTO ════════════════════════════════════════════════
     El único cuyo dato no es una posición en un continuo sino una JERARQUÍA
     completa. Y los cruces antes de fijar son la señal extra: un orden que
     salió de un tirón no dice lo mismo que uno que se rehízo cuatro veces. */
  (() => {
    const M = cajas.P;
    if (!M) return;
    const lista = M.caja.querySelector("[data-reorden]");
    const boton = M.caja.querySelector("[data-fijar]");
    let cruces = 0, fijado = false, moviendo = null;
    const t0 = performance.now();
    const pinta = () => {
      [...lista.children].forEach((it, i) => {
        it.querySelector(".orden").textContent = i + 1;
      });
      const primero = lista.children[0].querySelector("[data-texto]").textContent;
      M.pon("valor", primero.length > 26 ? primero.slice(0, 25) + "…" : primero);
      M.pon("orden", [...lista.children]
        .map((it) => it.getAttribute("data-item")).join("-"));
    };
    for (const it of lista.children) {
      it.addEventListener("pointerdown", (e) => {
        if (fijado) return;
        M.toca();
        moviendo = it;
        it.classList.add("moviendo");
        it.setPointerCapture(e.pointerId);
      });
      /* ⚠️  EL DESTINO SE CALCULA, NO SE BUSCA. La primera versión buscaba el
         hermano cuyo rectángulo contenía el cursor, y eso PIERDE LOS TIRONES
         RÁPIDOS: entre dos eventos de puntero el dedo puede recorrer más que
         el alto de un renglón y caer en el hueco de 4 px, o directamente
         fuera de la lista. Entonces no pasa nada y el renglón se queda donde
         estaba, que es la clase de fallo que la gente lee como «se colgó».

         Lo cazó una prueba que arrastraba rápido; arrastrando despacio
         funcionaba perfecto, y ninguna comprobación del chismoso lo veía
         porque el código era correcto.

         Ahora el índice sale de la posición del cursor dentro de la lista,
         así que un tirón de una punta a la otra aterriza igual de bien que
         un arrastre lento. */
      it.addEventListener("pointermove", (e) => {
        if (!moviendo || fijado) return;
        const hijos = [...lista.children];
        const caja = lista.getBoundingClientRect();
        const alto = caja.height / hijos.length;
        const destino = tope(Math.floor((e.clientY - caja.top) / alto), 0, hijos.length - 1);
        const actual = hijos.indexOf(moviendo);
        if (destino === actual) return;
        const ref = hijos[destino];
        lista.insertBefore(moviendo, destino > actual ? ref.nextSibling : ref);
        cruces++;
        M.pon("cruces", cifra(cruces));
        pinta();
      });
      const fin = () => { if (moviendo) { moviendo.classList.remove("moviendo"); moviendo = null; } };
      it.addEventListener("pointerup", fin);
      it.addEventListener("pointercancel", fin);
    }
    boton.addEventListener("click", () => {
      if (fijado) return;
      fijado = true;
      M.toca();
      M.pon("hasta", ms(performance.now() - t0));
      boton.textContent = "Orden fijado";
      boton.setAttribute("aria-disabled", "true");
    });
    pinta();
  })();

  /* ═══ F · PALABRA LIBRE ═════════════════════════════════════════════════
     Cero escala impuesta: la persona escribe y el sistema ubica.

     ⚠️  EL LÉXICO DE AQUÍ ABAJO ES UNA MAQUETA, y decirlo importa más que
     tenerlo. Son cuarenta y dos términos con una posición a mano, escritos
     para que la estación se pueda probar; no son un modelo y no generalizan.
     En producción esto es un modelo con su propia validación, y su error de
     mapeo entra en el error de medida del ítem — que es justo lo que la banda
     de confianza dibuja.

     Es el mecanismo que más ruido introduce al comparar personas: dos
     honestas pueden quedar a treinta puntos por redacción. Por eso la banda se
     ENSANCHA cuando la confianza baja, en vez de esconderlo. */
  (() => {
    const M = cajas.F;
    if (!M) return;
    const campo = M.caja.querySelector("[data-campo]");
    const boton = M.caja.querySelector("[data-ubicar]");
    const carril = M.caja.querySelector("[data-carril]");
    const franja = carril.querySelector(".nivel");
    const marca = carril.querySelector(".huella");
    const LEXICO = [
      ["dije la verdad", -92], ["lo dije igual", -78], ["confesé", -88],
      ["confese", -88], ["lo dije", -72], ["avisé", -70], ["avise", -70],
      ["denuncié", -84], ["denuncie", -84], ["aclaré", -58], ["aclare", -58],
      ["transparenté", -80], ["nada", -8], ["dudé", 6], ["dude", 6],
      ["esperé", 18], ["espere", 18], ["postergué", 24], ["maticé", 32],
      ["matice", 32], ["suavicé", 38], ["suavice", 38], ["relativicé", 40],
      ["omití", 45], ["omiti", 45], ["evadí", 50], ["evadi", 50],
      ["cambié el tema", 48], ["me callé", 55], ["me calle", 55],
      ["callé", 55], ["calle", 55], ["guardé silencio", 52], ["adorné", 58],
      ["exageré", 62], ["exagere", 62], ["inventé", 88], ["invente", 88],
      ["mentí", 88], ["menti", 88], ["lo negué", 92], ["negué", 90],
    ];
    const ubica = (txt) => {
      const t = txt.toLowerCase().trim();
      if (!t) return null;
      let mejor = null;
      for (const [clave, v] of LEXICO) {
        if (t === clave) return { v, confianza: 93, termino: clave };
        if (t.includes(clave) && (!mejor || clave.length > mejor.termino.length))
          mejor = { v, confianza: 80, termino: clave };
      }
      /* Y CUANDO NO LO CONOCE, LO DICE: confianza 31 y la banda se come media
         escala. Un mapeo que devuelve el centro con cara de certeza es peor
         que uno que se declara perdido. */
      return mejor || { v: 0, confianza: 31, termino: t };
    };
    const aplica = () => {
      M.toca();
      const s = ubica(campo.value);
      if (!s) return;
      const mitad = Math.round((100 - s.confianza) * 0.45);
      const pos = (s.v + 100) / 2;
      marca.style.left = pos + "%";
      franja.style.left = tope(pos - mitad / 2, 0, 100) + "%";
      franja.style.width = tope(mitad, 2, 100) + "%";
      M.pon("valor", signo(s.v));
      M.pon("termino", s.termino.length > 20 ? s.termino.slice(0, 19) + "…" : s.termino);
      M.pon("confianza", s.confianza + " %");
      M.pon("banda", "± " + mitad);
      carril.setAttribute("aria-valuenow", s.v);
    };
    boton.addEventListener("click", aplica);
    campo.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); aplica(); }
    });
    for (const c of M.caja.querySelectorAll("[data-sugerencia]"))
      c.addEventListener("click", () => {
        campo.value = c.getAttribute("data-sugerencia");
        aplica();
      });
  })();

  /* ═══ N · EL MODIFICADOR · REVELADO PROGRESIVO ══════════════════════════
     ⚠️  ESTO NO ES UN NOVENO MECANISMO, y ése es el hallazgo. El revelado no
     captura una respuesta: controla cómo se PRESENTA el ítem. Se puede montar
     encima de cualquiera de los ocho, así que no compite con ellos — los
     multiplica.

     Va montado sobre la barra ciega por una razón con número: la barra saca 10
     sobre 10 de simpleza percibida en la propia comparación de los prototipos,
     así que el «cuánto pediste ver antes de contestar» no queda confundido con
     el costo de entender el mecanismo. Montado sobre el panel de dos ejes no
     se sabría cuál de las dos cosas midió. */
  (() => {
    const M = cajas.N;
    if (!M) return;
    const carril = M.caja.querySelector("[data-revelar]");
    const cortina = M.caja.querySelector(".cortina");
    const estado = M.caja.querySelector("[data-estado]");
    const boton = M.caja.querySelector("[data-responder]");
    const aplicaBarra = barraCiega("N", M.caja);
    let leido = 0, cerrado = false;
    const t0 = performance.now();
    const revela = (p) => {
      if (cerrado) return;
      M.toca();
      leido = p.x * 100;
      cortina.style.width = 100 - leido + "%";
      estado.textContent = Math.round(leido) + " % leído";
      carril.setAttribute("aria-valuenow", Math.round(leido));
    };
    arrastre(carril, revela);
    teclas(carril, () => ({ x: leido / 100, y: 0 }), revela);
    boton.addEventListener("click", () => {
      if (cerrado) return;
      cerrado = true;
      M.pon("revelado", Math.round(leido) + " %");
      M.pon("hasta", ms(performance.now() - t0));
      M.pon("completo", leido >= 95 ? "sí" : "no");
      estado.textContent = "respondió al " + Math.round(leido) + " %";
      boton.textContent = "Respuesta fijada";
      boton.setAttribute("aria-disabled", "true");
    });
    void aplicaBarra;
  })();

  /* ── REINICIO ────────────────────────────────────────────────────────────
     Recarga, y no un reset a mano. Nueve estaciones con estado propio son
     nueve sitios donde olvidar una variable, y un reset que deja una a medias
     es peor que no tenerlo: la siguiente medida sale contaminada sin avisar. */
  document.querySelector("[data-reiniciar]")
    ?.addEventListener("click", () => location.reload());
})();
