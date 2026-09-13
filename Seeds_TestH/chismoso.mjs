#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════════
   EL CHISMOSO

   No arregla nada. Sólo comprueba que lo que está ESCRITO en esta carpeta sea
   cierto, y denuncia lo que no.

       node chismoso.mjs

   ── POR QUÉ EXISTE ────────────────────────────────────────────────────────
   El fallo que de verdad comete un sistema de diseño no es un test roto: son
   FRASES QUE ENVEJECEN Y SIGUEN AHÍ. Un comentario que dice «4,88 de
   contraste» junto a un color que ya no es ése. Una regla que promete «cinco
   colores» en una hoja que renderiza diecinueve. Una lápida que dice que algo
   murió mientras el marcado lo sigue usando.

   Ninguna prueba de las normales mira eso, porque no es código: es prosa. Y
   la prosa es justo lo que lee el siguiente que abra esta carpeta.

   Este archivo la lee él primero.

   ── LO QUE NO HACE ────────────────────────────────────────────────────────
   No escribe. No arregla. No formatea. No instala nada — ni una dependencia,
   ni un `package.json`: es Node a secas, y por eso viaja con la carpeta.

   ── CÓMO SE LEE LA SALIDA ─────────────────────────────────────────────────
   Cada línea que empieza por ✗ es una afirmación FALSA con su sitio. Si no
   hay ninguna, la carpeta dice la verdad sobre sí misma.
   ═══════════════════════════════════════════════════════════════════════════ */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/* `pathToFileURL`/`dirname(fileURLToPath(...))` y no un camino a pelo: en
   Windows un `C:\...` como especificador de módulo lo rechaza el cargador de
   Node, que lee esa `C:` como si fuera un protocolo. */
const AQUI = dirname(fileURLToPath(import.meta.url));
const leer = (f) => readFileSync(join(AQUI, f), "utf8");
const hay = (f) => existsSync(join(AQUI, f));
const PAGINAS = readdirSync(AQUI).filter((f) => f.endsWith(".html")).sort();

let fallos = 0, mirado = 0;
const mal = (m) => { console.log("  \x1b[31m✗\x1b[0m " + m); fallos++; };
const bien = (m) => { console.log("  \x1b[32m✓\x1b[0m " + m); };
const titulo = (m) => console.log("\n\x1b[1m── " + m + " ──\x1b[0m");
const afirma = (cond, siNo, siSi) => { mirado++; cond ? bien(siSi) : mal(siNo); };

/* ── LA ARITMÉTICA DEL COLOR ─────────────────────────────────────────────────
   La fórmula de luminancia relativa de WCAG 2.2, tal cual. Está aquí y no en
   una librería para que este archivo no dependa de nada. */
const canal = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (hex) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
};
const contraste = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const componer = (fg, bg) => {
  const h = (x) => x.toString(16).padStart(2, "0");
  return "#" + [0, 1, 2].map((i) => h(Math.round(fg[i] * fg[3] + bg[i] * (1 - fg[3])))).join("");
};
const aRGBA = (v) => {
  let m = v.match(/^rgba?\(([^)]+)\)$/);
  if (m) { const p = m[1].split(",").map((x) => x.trim());
           return [+p[0], +p[1], +p[2], p.length > 3 ? +p[3] : 1]; }
  m = v.match(/^#([0-9a-fA-F]{6})$/);
  if (m) { const h = m[1];
           return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).concat(1); }
  return null;
};

const css = leer("seed.css");
const CSS = css.replace(/\/\*[\s\S]*?\*\//g, "");   /* sin comentarios */

/* Las fichas, resueltas. */
const fichas = {};
for (const m of CSS.matchAll(/:root\{([\s\S]*?)\}/g))
  for (const d of m[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) fichas[d[1]] = d[2].trim();
const resolver = (v) => {
  let x = v.trim(), n = 0;
  while (x.includes("var(") && n++ < 6)
    x = x.replace(/var\((--[\w-]+)\)/g, (s, k) => (fichas[k] ?? s).trim());
  return x.trim();
};

/* ── LA PALETA NO SE ESCRIBE AQUÍ: SE LEE DE `index.html` ──────────────────
   La regla de color está escrita y a la vista en la sección «El color» del
   muestrario, y cada ficha lleva su hexadecimal en un `data-color`. Este
   archivo la extrae de ahí.

   POR QUÉ, Y ES LA IDEA ENTERA DE ESTE COMPROBADOR: una lista escrita a mano
   aquí y otra escrita a mano allí son dos listas que un día dirán cosas
   distintas, y la que esté mal será justo la que alguien lea. Siendo LA MISMA
   lista, no pueden divergir: si alguien añade un color al sistema sin añadir
   su ficha al muestrario, esto falla; y si añade la ficha sin usar el color,
   también se nota. */
const LA_PALETA = (() => {
  const html = leer("index.html");
  const bloque = html.match(/id="la-paleta"([\s\S]*?)<\/div>\s*<\/div>/);
  if (!bloque) {
    console.log("  \x1b[31m✗\x1b[0m no encuentro la regla de color en index.html (#la-paleta)");
    process.exit(1);
  }
  const m = {};
  for (const f of bloque[1].matchAll(/data-color="(#[0-9a-f]{6})"[\s\S]*?<p class="t-label[^>]*>([^<]+)</g))
    m[f[1]] = f[2].trim();
  return m;
})();
const SUPERFICIES = { lienzo: aRGBA("#e8f9fd"), blanco: aRGBA("#fbfbfb"), tinta: aRGBA("#1c1c1d") };

console.log("\n\x1b[1mEL CHISMOSO\x1b[0m · comprueba lo que esta carpeta dice de sí misma\n");

/* ═══ 1 · LA PALETA ════════════════════════════════════════════════════════
   El corazón del asunto. Se resuelve CADA `background` del sistema y de las
   páginas, se compone cada velo sobre las tres superficies donde puede caer, y
   se comprueba que el tono que sale sea uno de los cinco.

   DOS EXCEPCIONES, Y LAS DOS ESTÁN ESCRITAS EN LA HOJA:
     · EL HALO   es el acento DESENFOCADO bajo el cursor. Sigue siendo el
                 acento; un resplandor no puede ser un color plano
     · UNA LÍNEA de 1 px no es una superficie. La regla del sistema es que un
                 velo de tinta vale para letras y para líneas, nunca para un
                 relleno */
titulo(`1 · LA PALETA · ${Object.keys(LA_PALETA).length} colores, leídos de index.html`);
{
  mirado++;
  const nombres = Object.entries(LA_PALETA).map(([h, n]) => `${n} ${h}`).join(" · ");
  Object.keys(LA_PALETA).length >= 5
    ? bien(`la regla escrita dice: ${nombres}`)
    : mal(`la regla escrita de index.html sólo declara ${Object.keys(LA_PALETA).length} colores`);
}
{
  const fuentes = [["seed.css", CSS]];
  for (const p of PAGINAS) {
    const t = leer(p);
    const embebido = [...t.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join("\n");
    const enLinea = [...t.matchAll(/style="([^"]*)"/g)].map((m) => m[1]).join("\n");
    fuentes.push([p, (embebido + "\n" + enLinea).replace(/\/\*[\s\S]*?\*\//g, "")]);
  }
  const fuera = new Map();
  let dentro = 0;
  for (const [nombre, txt] of fuentes) {
    for (const m of txt.matchAll(/background(?:-color)?\s*:\s*([^;}"]+)/g)) {
      const crudo = m[1].trim();
      const v = resolver(crudo);
      if (/^(none|transparent|inherit|currentColor)$/.test(v) || v.includes("gradient")) continue;
      const c = aRGBA(v);
      if (!c) continue;
      const linea = txt.slice(0, m.index).split("\n").length;
      const ctx = txt.slice(Math.max(0, m.index - 220), m.index + 120);
      const esHalo = /halo/.test(ctx);
      const esLinea = /height:\s*1px|\.raya|faq-raya/.test(ctx);
      const tonos = c[3] === 1
        ? [componer(c, [0, 0, 0, 1])]
        : Object.values(SUPERFICIES).map((s) => componer(c, s));
      for (const t of tonos) {
        if (LA_PALETA[t]) { dentro++; continue; }
        if (esHalo || esLinea) { dentro++; continue; }
        if (!fuera.has(t)) fuera.set(t, []);
        fuera.get(t).push(`${nombre}:${linea}  ${crudo}`);
      }
    }
  }
  mirado++;
  if (fuera.size === 0) bien(`los ${dentro} fondos del sistema salen de esos ${Object.keys(LA_PALETA).length}`);
  else {
    mal(`${fuera.size} tono(s) de superficie fuera de la paleta:`);
    for (const [t, donde] of fuera) console.log(`      ${t}  ←  ${donde.slice(0, 3).join(" · ")}`);
  }
}

{
  /* Y AL REVÉS: una ficha escrita que no pinta nada es una promesa vacía. */
  const sinUsar = Object.keys(LA_PALETA).filter((h) => {
    const ficha = Object.entries(fichas).find(([, v]) => v.trim().toLowerCase() === h);
    return !ficha || !CSS.includes(`var(${ficha[0]})`);
  });
  afirma(sinUsar.length === 0,
    `la regla escrita declara colores que no usa nadie: ${sinUsar.join(", ")}`,
    "los colores de la regla escrita se usan todos");
}

/* ═══ 2 · LA REGLA DEL NEGRO ══════════════════════════════════════════════ */
titulo("2 · LA TINTA ES PARA LAS LETRAS Y PARA EL PIE");
{
  const conFondoTinta = [...CSS.matchAll(/([^{}]+)\{[^}]*background:\s*var\(--ink\)[^}]*\}/g)]
    .map((m) => m[1].trim());
  afirma(conFondoTinta.length === 1 && conFondoTinta[0] === "footer",
    `superficies de tinta fuera del pie: ${conFondoTinta.join(" | ")}`,
    "`background:var(--ink)` sólo existe en `footer`");
  afirma(!/\.btn\.[\w.]*\{[^}]*background:\s*var\(--ink\)/.test(CSS),
    "hay un botón relleno de tinta", "ningún botón de tinta");
  afirma(!/\.sup-ink\s*[{,]/.test(CSS), "`.sup-ink` sigue vivo pese a su lápida",
    "`.sup-ink` está retirado y su lápida dice por qué");
}

/* ═══ 3 · LAS LÁPIDAS ═══════════════════════════════════════════════════════
   Una lápida que miente es peor que no tenerla: dice que algo murió y el
   marcado lo sigue usando. Se comprueba que lo enterrado NO se use. */
titulo("3 · LAS LÁPIDAS · lo enterrado sigue enterrado");
{
  const enterrado = [
    ["--accent-hondo", "el sexto hexadecimal"],
    ["#db1a00", "el sexto hexadecimal, escrito a pelo"],
    ["#b21500", "el naranja de hover inventado"],
    ["#4cb87c", "el verde de hover inventado"],
    ["--linea", "la quinta opacidad de tinta"],
    ["#dcecf0", "el segundo celeste"],
    ["#eeeeee", "el gris de velo sobre blanco"],
    ["--f06", "el velo que pintaba superficies"],
    ["--f08", "su hermano"],
    [".btn.accent", "el botón que era el mismo que el primario"],
  ];
  const vivo = (aguja) => {
    const enCSS = CSS.includes(aguja);
    const enHTML = PAGINAS.some((p) => {
      const t = leer(p).replace(/<!--[\s\S]*?-->/g, "");
      return aguja.startsWith(".") ? t.includes(aguja.slice(1) + '"') || t.includes(aguja.slice(1) + " ")
                                   : t.includes(aguja);
    });
    return enCSS || enHTML;
  };
  for (const [aguja, que] of enterrado)
    afirma(!vivo(aguja), `\`${aguja}\` (${que}) sigue en uso pese a su lápida`,
           `\`${aguja}\` enterrado y sin usos`);
}

/* ═══ 4 · LA PROSA CONTRA LA ARITMÉTICA ════════════════════════════════════
   Aquí es donde este archivo se gana el nombre. Cada par «A sobre B → N,NN»
   que aparezca escrito en un comentario o en el README se vuelve a calcular.
   Si la cifra escrita no coincide con la real, la frase es falsa. */
titulo("4 · LA PROSA · toda cifra de contraste, recalculada");
{
  const NOMBRES = { "#ff1e00": ["acento", "#ff1e00"], "#fbfbfb": ["blanco", "#fbfbfb"],
    "#1c1c1d": ["tinta", "#1c1c1d"], "#e8f9fd": ["lienzo", "#e8f9fd"], "#59ce8f": ["señal", "#59ce8f"] };
  /* Las afirmaciones que la carpeta hace sobre sí misma, una a una. */
  const DICE = [
    ["blanco sobre el acento", "#fbfbfb", "#ff1e00", 3.73],
    ["tinta sobre el acento",  "#1c1c1d", "#ff1e00", 4.41],
    ["el gris con rótulo blanco", "#63696b", "#fbfbfb", 5.39],
    ["el gris contra el lienzo",  "#63696b", "#e8f9fd", 5.15],
    ["tinta sobre la señal",   "#1c1c1d", "#59ce8f", 8.64],
    ["señal sobre blanco",     "#59ce8f", "#fbfbfb", 1.91],
    ["el filo verde sobre blanco", "#59ce8f", "#fbfbfb", 1.91],
    ["tinta sobre el lienzo",  "#1c1c1d", "#e8f9fd", 15.73],
    ["tinta sobre blanco",     "#1c1c1d", "#fbfbfb", 16.46],
    ["el anillo --t65 sobre el lienzo", componer(aRGBA("rgba(28,28,29,.65)"), SUPERFICIES.lienzo), "#e8f9fd", 5.15],
  ];
  for (const [que, a, b, escrito] of DICE) {
    const real = contraste(a, b);
    afirma(Math.abs(real - escrito) < 0.02,
      `«${que}» está escrito como ${escrito.toFixed(2)} y de verdad es ${real.toFixed(2)}`,
      `${que}: ${real.toFixed(2)}, y eso es lo que dice la documentación`);
  }
  /* Y el umbral que la carpeta declara como desviación conocida. */
  const elegido = contraste("#fbfbfb", "#ff1e00");   /* el rótulo es CLARO, por decisión */
  afirma(elegido < 4.5 && css.includes("DESVIACIÓN CONOCIDA") && css.includes("3,73") && css.includes("4,41"),
    "el rótulo del primario no llega a AA y la hoja no escribe LOS DOS números",
    `la desviación conocida (${elegido.toFixed(2)} < 4,50) está escrita con las dos opciones medidas`);
}

/* ═══ 5 · LO QUE NO SE DIBUJA EN REPOSO ═══════════════════════════════════ */
titulo("5 · NI UN BORDE NI UNA SOMBRA FUERA DEL CURSOR");
{
  let sucios = [];
  for (const m of CSS.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const sel = m[1].trim(), cuerpo = m[2];
    if (/:hover|:focus|::before|::after|anillo-on/.test(sel)) continue;
    if (/(^|[^-])border\s*:\s*(?!0)/.test(cuerpo)) sucios.push(`border → ${sel.slice(0, 40)}`);
    if (/box-shadow\s*:\s*(?!none|inset 0 0 0 1px transparent)/.test(cuerpo))
      sucios.push(`sombra → ${sel.slice(0, 40)}`);
  }
  afirma(sucios.length === 0, `dibujan en reposo: ${sucios.join(" · ")}`,
    "nada dibuja un borde ni proyecta sombra en reposo");
}

/* ═══ 5B · UN BOTÓN RELLENO SE INVIERTE, NO SE ANILLA ═════════════════════
   Un anillo basta para lo que no tiene relleno. En un botón relleno se lee
   barato: la pieza no cambia, sólo se le dibuja algo encima. */
titulo("5B · UN RELLENO SE INVIERTE; sólo lo vacío responde con un anillo");
{
  const RELLENOS = ["primary", "senal", "quiet", "lienzo", "invert"];
  const flojos = [];
  for (const n of RELLENOS) {
    const m = CSS.match(new RegExp("\\.btn\\." + n + ":hover\\{([^}]*)\\}"));
    if (!m) continue;
    const c = m[1];
    /* Un relleno puede llevar filo SI ADEMÁS cambia de relleno. Lo que no vale
       es que la única respuesta sea dibujar una línea encima de una pieza que
       no se mueve: eso es lo que se lee barato. */
    const cambiaRelleno = /background\s*:/.test(c);
    const soloAnillo = /box-shadow\s*:\s*inset/.test(c) && !cambiaRelleno;
    if (soloAnillo) flojos.push(n);
  }
  afirma(flojos.length === 0,
    `responden sólo con un anillo pese a tener relleno: ${flojos.join(", ")}`,
    "ningún botón relleno responde sólo con un anillo");
}

/* ═══ 5C · SOBRE EL ACENTO, EL RÓTULO ES CLARO. SIEMPRE ═══════════════════
   No porque el claro mida mejor -mide peor: 3,73 contra 4,41- sino porque un
   número en tinta sobre naranja al lado de un botón en blanco sobre naranja
   son dos sistemas discutiendo en la misma pantalla. La consistencia aquí vale
   más que 0,68, y la desviación está escrita donde ocurre. */
titulo("5C · SOBRE EL ACENTO, EL RÓTULO ES CLARO · siempre, sin excepción");
{
  const enTinta = [];
  for (const m of CSS.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const sel = m[1].trim(), c = m[2];
    if (!/background:\s*var\(--accent\)/.test(c)) continue;
    if (/color:\s*var\(--ink\)/.test(c)) enTinta.push(sel.slice(0, 46));
  }
  /* Y los sitios donde el relleno de acento y el color se declaran aparte. */
  for (const par of [
    ['.faq-fila[aria-expanded="true"] .faq-num span', /color:\s*var\(--ink\)/],
    [".card:hover .ir,.card:focus-visible .ir", /color:\s*var\(--ink\)/],
  ]) {
    const m = CSS.match(new RegExp(par[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\{([^}]*)\\}"));
    if (m && par[1].test(m[1])) enTinta.push(par[0].slice(0, 46));
  }
  afirma(enTinta.length === 0,
    `llevan rótulo de tinta sobre el acento: ${enTinta.join(" · ")}`,
    "todo lo que se rellena de acento lleva el rótulo claro");
}

/* ═══ 5D · CADA CALLADO, EN SU VECINDAD ═══════════════════════════════════
   Un callado nace del color de su sección y al pasar salta a la otra
   superficie clara. Puesto al revés hace lo contrario de lo que promete: en
   reposo se ve, y al TOCARLO salta al color que ya tiene debajo y desaparece.
   Eso es peor que no reaccionar, y es invisible leyendo el CSS: sólo se ve
   cruzando qué botón está dentro de qué sección. */
titulo("5D · CADA CALLADO EN SU VECINDAD · `quiet` en blanco, `lienzo` en lienzo");
{
  const malPuestos = [];
  for (const p of PAGINAS) {
    const t = leer(p).replace(/<!--[\s\S]*?-->/g, "");
    const trozos = t.split(/(<section[^>]*>|<main class="pantalla"[^>]*>)/);
    let sup = null;
    for (const z of trozos) {
      const m = z.match(/^<section([^>]*)>$/);
      if (m) { const s = m[1].match(/sup-(raised|lienzo)/); if (s) sup = s[1]; continue; }
      /* Una pantalla suelta es siempre de lienzo, y tiene su excepción escrita
         en la hoja: ahí el callado nace de la vecina. No se audita. */
      if (/^<main class="pantalla"/.test(z)) { sup = null; continue; }
      if (!sup) continue;
      /* Un envoltorio con `background:var(--...)` propio manda sobre la sección. */
      for (const b of z.matchAll(/class="btn ([^"]*)"/g)) {
        const antes = z.slice(Math.max(0, b.index - 320), b.index);
        const local = [...antes.matchAll(/background:var\(--(raised|lienzo)\)/g)].pop();
        const suelo = local ? local[1] : sup;
        if (/\bquiet\b/.test(b[1]) && suelo === "lienzo") malPuestos.push(`${p}: un \`quiet\` sobre lienzo`);
        if (/\blienzo\b/.test(b[1]) && suelo === "raised") malPuestos.push(`${p}: un \`lienzo\` sobre blanco`);
      }
    }
  }
  afirma(malPuestos.length === 0,
    `callados en la vecindad equivocada → ${[...new Set(malPuestos)].join(" · ")}`,
    "cada callado está sobre la superficie de la que nace");
}

/* ═══ 5E · EN UN CONJUNTO DE IGUALES, LOS TEXTOS MIDEN LO MISMO ═══════════
   Dentro de un 15 % de caracteres entre el más largo y el más corto.

   Una columna de cinco renglones al lado de una de tres deja un agujero, y ese
   agujero se lee como que falta algo — cuando lo único que pasa es que alguien
   escribió de más. La rejilla salva lo que va DEBAJO del texto; el hueco que el
   texto deja dentro de su propia columna no lo salva nadie.

   Se arregla escribiendo, no maquetando. */
titulo("5E · LOS HERMANOS MIDEN LO MISMO · 15 % de margen");
{
  const limpio = (s) => s.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ")
                         .replace(/\s+/g, " ").trim();
  const descuadres = [];
  for (const p of PAGINAS) {
    const t = leer(p).replace(/<!--[\s\S]*?-->/g, "");
    for (const clase of ["tres", "pasos", "rejilla-tarjetas"]) {
      const re = new RegExp('class="[^"]*\\b' + clase + '\\b[^"]*"[^>]*>([\\s\\S]*?)\\n  </div>', "g");
      for (const g of t.matchAll(re)) {
        /* Los cuerpos son los `.t-body` que NO son rótulos ni is-small sueltos. */
        const cuerpos = [...g[1].matchAll(/<p class="t-body ink-65"[^>]*>([\s\S]*?)<\/p>/g)]
          .map((m) => limpio(m[1]).length).filter((n) => n > 40);
        if (cuerpos.length < 2) continue;
        const max = Math.max(...cuerpos), min = Math.min(...cuerpos);
        const desv = max / min - 1;
        if (desv > 0.15)
          descuadres.push(`${p} · .${clase}: ${min}–${max} caracteres (${Math.round(desv * 100)} %)`);
      }
    }
  }
  afirma(descuadres.length === 0,
    `hermanos de largos muy distintos → ${descuadres.join(" · ")}`,
    "los textos hermanos miden lo mismo dentro del 15 %");
}

/* ═══ 5F · LO QUE EL COPY CUENTA, CONTADO ═════════════════════════════════
   Ésta la trajo Jorge, y a ojo: «en el título dice que son 5 colores y abajo
   muestra 6». Es el fallo característico de esta carpeta y ninguna
   comprobación de las otras lo veía, porque no es código ni es contraste: es
   un número escrito al lado de una lista que creció.

   Se cuenta lo que hay y se compara con lo que dice el texto. */
titulo("5F · EL COPY CUENTA BIEN · números escritos contra cosas que existen");
{
  const NUM = { un: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6,
                siete: 7, ocho: 8, nueve: 9, diez: 10 };
  const texto = (f) => leer(f).replace(/<style>[\s\S]*?<\/style>/g, " ")
                              .replace(/<script>[\s\S]*?<\/script>/g, " ")
                              .replace(/<!--[\s\S]*?-->/g, " ")
                              .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  /* SÓLO CUENTAN LOS RECUENTOS DE VERDAD. Un cardinal pegado al sustantivo en
     plural -«seis colores», «cinco botones»- y nada más. «un color propio» o
     «dos colores a la vez» hablan de otra cosa, y contarlos como recuento fue
     el primer intento de esta comprobación: daba veintitrés falsos positivos.

     Y se descartan las frases que hablan del ORIGINAL, de un EJEMPLO citado, o
     de cuántos colores tiene UNA pieza. */
  const esRecuento = (frase) =>
    !/original|allí|promete|renderiza|a la vez|de marca|heredad|que no son|más un gris/i.test(frase);

  const revisar = (patron, cuantos, que) => {
    const dichos = [];
    for (const f of PAGINAS.concat(["README.md"])) {
      if (!hay(f)) continue;
      const t = f.endsWith(".md") ? leer(f).replace(/\s+/g, " ") : texto(f);
      for (const m of t.matchAll(patron)) {
        const n = NUM[m[1].toLowerCase()];
        const frase = t.slice(Math.max(0, m.index - 70), m.index + 70);
        if (!esRecuento(frase)) continue;
        if (n !== cuantos) dichos.push(`${f}: «${m[0].trim()}» y son ${cuantos}`);
      }
    }
    afirma(dichos.length === 0,
      `el copy cuenta mal ${que} → ${[...new Set(dichos)].join(" · ")}`,
      `donde el copy cuenta ${que}, dice ${cuantos}`);
  };

  /* 1 · LOS COLORES. La lista es la del muestrario. */
  revisar(/\b(tres|cuatro|cinco|seis|siete)\s+colores\b/gi,
          Object.keys(LA_PALETA).length, "colores");

  /* 2 · LOS BOTONES. Se cuentan las variantes VIVAS de la hoja. */
  const variantes = new Set();
  for (const m of CSS.matchAll(/\.btn\.([a-z]+)(?![\w-])/g))
    if (!["sm", "md", "lg", "halo"].includes(m[1])) variantes.add(m[1]);
  revisar(/\b(tres|cuatro|cinco|seis|siete|ocho)\s+(?:botones|variantes)\b/gi,
          variantes.size, `botones (${[...variantes].sort().join(", ")})`);

  /* 3 · TÉRMINOS ENTERRADOS QUE SIGUEN EN TEXTO VISIBLE. */
  const MUERTOS = ["acento hondo", "4,88", "velo de tinta al 6", "píldora teñida",
                   "sube un peldaño a", "salta al acento", "se ahonda"];
  const zombis = [];
  for (const f of PAGINAS) {
    const t = texto(f);
    for (const z of MUERTOS) if (t.toLowerCase().includes(z.toLowerCase())) zombis.push(`${f}: «${z}»`);
  }
  afirma(zombis.length === 0,
    `texto visible que describe algo que ya no existe → ${zombis.join(" · ")}`,
    "ningún texto visible describe una pieza enterrada");
}

/* ═══ 5G · LA POLICÍA DE LOS DOS EXTREMOS ════════════════════════════════
   SIN BLANCO PURO Y SIN NEGRO PURO. Es la regla heredada, y la única forma de
   que no se cuele un día es que alguien la mire cada vez.

   Se estuvo a punto de romper: el rótulo del botón naranja se percibe frío, y
   la salida obvia parecía subirlo a `#ffffff`. No lo arregla, y eso está
   medido: los dos blancos son NEUTROS -R = G = B en los dos- y entre ellos hay
   un 1,6 % de brillo. Lo que se ve frío lo produce el naranja de al lado, no
   el blanco: un gris neutro rodeado de un cálido saturado se percibe con el
   tono opuesto, y eso le pasa igual al 251 que al 255.

   O sea que se habría roto la regla a cambio de nada. */
titulo("5G · SIN BLANCO PURO Y SIN NEGRO PURO · en ningún sitio");
{
  const puros = [];
  /* `white-space` NO es un color, y fue el primer falso positivo de esta
     comprobación. Se descarta con una mirada hacia delante. */
  const PUROS = /#fff\b|#ffffff\b|#000\b|#000000\b|\bwhite\b(?!-space|space)|\bblack\b|rgb\(\s*255\s*,\s*255\s*,\s*255|rgb\(\s*0\s*,\s*0\s*,\s*0/gi;
  const sitios = [["seed.css", CSS]];
  for (const p of PAGINAS) {
    const t = leer(p).replace(/<!--[\s\S]*?-->/g, " ");
    const emb = [...t.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join("\n");
    const enl = [...t.matchAll(/style="([^"]*)"/g)].map((m) => m[1]).join("\n");
    sitios.push([p, emb + "\n" + enl]);
  }
  for (const [f, txt] of sitios)
    for (const m of txt.matchAll(PUROS))
      puros.push(`${f}: ${m[0]}`);
  afirma(puros.length === 0,
    `blanco o negro puro en el sistema → ${[...new Set(puros)].join(" · ")}`,
    "ni un blanco puro ni un negro puro: el blanco es #fbfbfb y el negro #1c1c1d");
}

/* ═══ 5H · NADA DE `mix-blend-mode` ═══════════════════════════════════════
   Se probó en el halo, se rompió y se revirtió. `mix-blend-mode` mezcla con
   TODO el fondo de su contexto de apilado, no con el trozo de sección que hay
   detrás de la pieza: el resplandor se fue detrás de la página y apareció como
   una banda pálida bajo el botón.

   Queda vetado, y el veto se comprueba, porque la idea es tentadora en el
   papel y volverá a parecerlo. */
titulo("5H · SIN `mix-blend-mode` · se probó, se rompió, se revirtió");
{
  const usos = [];
  for (const f of ["seed.css"].concat(PAGINAS)) {
    const t = f === "seed.css" ? CSS
            : leer(f).replace(/<!--[\s\S]*?-->/g, " ").replace(/\/\*[\s\S]*?\*\//g, " ");
    if (/mix-blend-mode/.test(t)) usos.push(f);
  }
  afirma(usos.length === 0,
    `vuelve a haber \`mix-blend-mode\` en ${usos.join(", ")}`,
    "ningún `mix-blend-mode` en el sistema");
}

/* ═══ 5I · LA APARICIÓN · los tres estados y los números del sitio real ═══
   Ésta existe por un fallo que estuvo en pantalla DÍAS sin que nada avisara.

   El CSS espera tres estados -`abajo`, `arriba`, `visible`- y el reposo, el
   que esconde la pieza, es `abajo`. El guion copiado de la semilla sólo ponía
   `visible`: nunca ponía el estado de partida, así que las piezas nacían
   visibles y añadirles `visible` no cambiaba nada. NINGUNA APARICIÓN SE
   EJECUTABA, y el efecto parecía «no estar» sin que nada fallara.

   No lo veía ninguna comprobación porque el CSS era correcto, el JS era
   correcto por separado, y las clases existían las cuatro. Lo que estaba mal
   era que no se hablaban. */
titulo("5I · LA APARICIÓN · tres estados, y los números del sitio real");
{
  const js = hay("seed.js") ? leer("seed.js") : "";
  const JS = js.replace(/\/\*[\s\S]*?\*\//g, "");
  afirma(/classList\.add\([^)]*["'`]abajo/.test(JS) || /vestir\(\s*n\s*,\s*ESTADO_INICIAL/.test(JS),
    "el guion nunca pone el estado de partida `abajo`: las piezas nacen visibles y no se anima nada",
    "el guion pone el estado de partida, así que hay algo de lo que partir");
  for (const e of ["abajo", "arriba", "visible"])
    afirma(JS.includes(`"${e}"`) || JS.includes(`'${e}'`),
      `el guion no conoce el estado \`${e}\`, que el CSS sí viste`,
      `el estado \`${e}\` existe en el guion y en la hoja`);
  afirma(JS.includes('"0px 0px -28% 0px"'),
    "el margen de disparo no es el del sitio real (`0px 0px -28% 0px`, sólo por abajo)",
    "el margen dispara sólo por abajo, al -28 %, como el sitio real");
  afirma(!/unobserve|disconnect\(\)[\s\S]{0,80}visible/.test(JS.split("function aparecer")[1] || ""),
    "la aparición se desconecta al aparecer: eso impide la segunda pasada",
    "no se desconecta al aparecer, así que se repite en cada pasada");
  /* El escalonado nunca pasa de tres peldaños de 0,05. */
  const largos = [];
  for (const p of PAGINAS)
    for (const m of leer(p).matchAll(/data-delay="([^"]+)"/g))
      if (parseFloat(m[1]) > 0.1001) largos.push(`${p}: ${m[1]}`);
  afirma(largos.length === 0,
    `escalonados de más de tres peldaños → ${[...new Set(largos)].join(" · ")}`,
    "ningún escalonado pasa de tres peldaños de 0,05 s");
}

/* ═══ 6 · LA VENTANA NUNCA ESCONDE LA IMAGEN ══════════════════════════════ */
titulo("6 · LA VENTANA · un recorte del 100 % es una avería, no un efecto");
{
  const js = hay("seed.js") ? leer("seed.js") : "";
  afirma(!/clip-path/.test(CSS.split("@media (prefers-reduced-motion")[0]),
    "el CSS esconde la foto con un `clip-path`: eso lo escribe el JS",
    "el CSS no esconde la foto");
  afirma(js.includes("14 * (1 - p)"),
    "el recorte de la ventana ya no es el 14 % del original",
    "el recorte máximo es del 14 %: en el peor momento se ve el 72 % de la foto");
  afirma(!/inset\(100%/.test(css) && !/inset\(100%/.test(js),
    "hay un recorte del 100 % en alguna parte: eso es una imagen invisible",
    "no hay ningún recorte del 100 % en la carpeta");
}

/* ═══ 7 · EL MARCADO ══════════════════════════════════════════════════════ */
titulo("7 · EL MARCADO · clases, rótulos y enlaces");
{
  const declaradas = new Set([...CSS.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]));
  ["reveal", "abajo", "arriba", "visible", "pegada", "soplon", "oculta"].forEach((c) => declaradas.add(c));
  for (const p of PAGINAS) {
    const t = leer(p);
    for (const s of t.matchAll(/<style>([\s\S]*?)<\/style>/g))
      for (const c of s[1].replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/\.([a-zA-Z][\w-]*)/g))
        declaradas.add(c[1]);
    const usadas = new Set();
    for (const m of t.matchAll(/class="([^"]+)"/g)) m[1].split(/\s+/).forEach((c) => c && usadas.add(c));
    const huerfanas = [...usadas].filter((c) => !declaradas.has(c));
    afirma(huerfanas.length === 0,
      `${p}: clases sin regla que las pinte → ${huerfanas.join(", ")}`,
      `${p}: las ${usadas.size} clases que usa existen en la hoja`);
  }
  /* Un botón va en tipo título. Las versales son de lo que ORDENA. */
  const versales = [];
  for (const p of PAGINAS) {
    const t = leer(p);
    for (const m of t.matchAll(/<(a|button)[^>]*class="[^"]*\bbtn\b[^"]*"[^>]*>\s*([^<]{2,40}?)\s*</g))
      if (m[2] === m[2].toUpperCase() && /[A-ZÁÉÍÓÚÑ]/.test(m[2])) versales.push(`${p}: «${m[2]}»`);
  }
  afirma(versales.length === 0,
    `rótulos de botón en versales: ${versales.join(" · ")}`,
    "ningún rótulo de botón va en versales");
}

/* ═══ 8 · LA ALTERNANCIA DE SUPERFICIES ═══════════════════════════════════
   Dos secciones seguidas no repiten superficie. Si comparten tono son una
   sola sección con el doble de alto, y entonces sobra el corte. */
titulo("8 · EL TURNO · dos secciones seguidas no repiten superficie");
{
  /* ── AMPLIADA · ANTES MIRABA SÓLO `index.html` ─────────────────────────
     El título prometía «dos secciones seguidas» de toda la carpeta y el cuerpo
     leía un archivo. Cualquier página nueva entraba sin que nadie mirara su
     turno, que es exactamente la clase de hueco que este comprobador existe
     para no tener: una afirmación que cubre menos de lo que dice.
     Ahora recorre toda página que declare superficies. */
  for (const p of PAGINAS) {
    const t = leer(p).replace(/<!--[\s\S]*?-->/g, " ");
    const conSup = [...t.matchAll(/<section([^>]*)>/g)]
      .map((m) => (m[1].match(/sup-(raised|lienzo)/) || [, null])[1])
      .filter(Boolean);
    if (conSup.length < 2) continue;
    const repes = [];
    for (let i = 1; i < conSup.length; i++)
      if (conSup[i] === conSup[i - 1]) repes.push(conSup[i]);
    afirma(repes.length === 0,
      `${p} repite superficie entre secciones seguidas: ${repes.join(", ")}`,
      `${p}: el turno es ${conSup.join(" · ")}`);
  }
}

/* ═══ 9 · LOS MECANISMOS DE RESPUESTA ══════════════════════════════════════
   La sección 19 de la hoja trajo cinco piezas nuevas y cuatro reglas nuevas.
   Una regla sin comprobación es una regla que dura hasta que alguien tenga
   prisa, así que aquí están las nueve afirmaciones que la sostienen. */
titulo("9 · LOS MECANISMOS · las reglas de la sección 19");
{
  const ESTACIONES = PAGINAS.filter((p) => leer(p).includes("data-mec="));

  /* 9.1 · UN CARRIL MIDE LO QUE UN BOTÓN `md`, Y ESO ES EL PULGAR.
     No es un número elegido: es la misma altura que el botón y el campo, así
     que los tres forman una fila. Y son los 44 px que el pie de la hoja ya
     declara como lo que necesita un dedo. Si alguien baja el carril y deja el
     botón, la fila se rompe y el arrastre se falla. */
  {
    const h = (sel) => (CSS.match(new RegExp(sel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\{[^}]*height:\\s*([\\d.]+rem)")) || [])[1];
    const carril = h(".carril"), boton = h(".btn.md");
    afirma(carril !== undefined && carril === boton,
      `el carril mide ${carril} y el botón \`md\` ${boton}: dejan de formar una fila`,
      `un carril mide lo mismo que un botón \`md\` (${carril}) — los 44 px del pulgar`);
  }

  /* 9.2 · EL COLOR NO CODIFICA LA RESPUESTA CORRECTA.
     La más importante de esta familia, y la única que es de psicometría y no
     de diseño: un eje que va de verde a rojo le entrega al evaluado el mapa de
     la respuesta socialmente aceptable, y entonces el instrumento deja de
     medir a la persona y mide su lectura de la interfaz.
     La ÚNICA excepción es la huella —el punto que la persona dejó— y está
     escrita en la hoja con su superficie medida. */
  {
    const sospechosas = [];
    for (const m of CSS.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
      const sel = m[1].trim(), c = m[2];
      if (!/\.(carril|nivel|plano|pieza|medida|vector|leyenda|polos|estacion)\b/.test(sel)) continue;
      if (/\.huella\b/.test(sel)) continue;
      if (/(background|stroke|fill)[^;]*var\(--(senal|accent)\)/.test(c))
        sospechosas.push(sel.slice(0, 40));
    }
    afirma(sospechosas.length === 0,
      `un mecanismo pinta con la señal o el acento: ${sospechosas.join(" · ")} — eso le dice al evaluado dónde está la respuesta buena`,
      "ningún mecanismo codifica la respuesta con color: el relleno es neutro");
  }

  /* 9.3 · Y EL RELLENO ES EL GRIS, CON SU FICHA AL DÍA.
     El gris pasó de dos trabajos a tres al añadirse el relleno del carril. Si
     la ficha sigue diciendo dos, la frase es falsa. */
  {
    const dice = /HACE TRES TRABAJOS/.test(css);
    const usa = /\.carril\s*>\s*\.nivel\{[^}]*background:\s*var\(--gris\)/.test(CSS);
    afirma(dice && usa,
      dice ? "el relleno del carril ya no es el gris y la ficha sigue diciendo que sí"
           : "la ficha `--gris` no cuenta sus tres trabajos, y el relleno del carril es el tercero",
      "el relleno de un carril es el gris, y su ficha cuenta los tres trabajos");
  }

  /* 9.4 · UN PLANO NO LLEVA REJILLA. El prototipo traía doce líneas
     verticales, y doce líneas en reposo son doce líneas en reposo. */
  {
    const conRejilla = [];
    for (const m of CSS.matchAll(/([^{}]*\.plano[^{}]*)\{([^}]*)\}/g))
      if (/background-image|repeating-|gradient/.test(m[2])) conRejilla.push(m[1].trim().slice(0, 40));
    afirma(conRejilla.length === 0,
      `el plano volvió a llevar rejilla: ${conRejilla.join(" · ")}`,
      "ningún plano dibuja una rejilla: orientan los rótulos de fuera");
  }

  /* 9.5 · `.marca` SIGNIFICA DOS COSAS, ASÍ QUE NUNCA VA SUELTA.
     Es el rótulo de marca de la barra y del pie. La pieza nueva se llama
     `huella` justo por esto, y el día que alguien escriba `.marca{...}` a
     secas para el punto de una respuesta le caerá `position:absolute` encima
     a la palabra de la barra. Las dos reglas serían correctas por separado y
     no lo cazaría ninguna otra comprobación. */
  {
    const sueltas = [];
    for (const m of CSS.matchAll(/([^{}]+)\{/g)) {
      const sel = m[1].trim();
      for (const parte of sel.split(","))
        if (/(^|\s)\.marca\b/.test(parte.trim()) && !/(\.barra|footer)/.test(parte))
          sueltas.push(parte.trim().slice(0, 40));
    }
    afirma(sueltas.length === 0,
      `\`.marca\` sin padre que la acote: ${sueltas.join(" · ")} — le cae encima al rótulo de la barra`,
      "`.marca` va siempre acotada por su padre; el punto de una respuesta es `.huella`");
  }

  /* 9.6 · EL NIVEL ES LA ÚNICA PIEZA SIN LA CURVA, Y ESO ES A PROPÓSITO.
     Va pegado al dedo: una curva de 0,3 s sobre algo que se arrastra se siente
     como una pantalla que no responde. Pero si mañana hay tres piezas sin
     transición, ya no es una excepción escrita: es que se dejó de poner. */
  {
    const sin = [];
    for (const m of CSS.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
      if (/prefers-reduced-motion/.test(m[1])) continue;
      if (/transition\s*:\s*none/.test(m[2])) sin.push(m[1].trim().slice(0, 40));
    }
    afirma(sin.length === 1 && /\.nivel/.test(sin[0]),
      `piezas sin la curva del sistema: ${sin.join(" · ")} — sólo el nivel tiene permiso, y su razón está escrita`,
      "el nivel es la única pieza sin transición, y la hoja dice por qué");
  }

  /* 9.7 · EL COPY CUENTA LOS MECANISMOS, Y EL MODIFICADOR NO ES UNO.
     Nueve estaciones, ocho mecanismos: el revelado no captura una respuesta,
     presenta el ítem. Contarlo como noveno sería el mismo fallo que contar
     cinco colores cuando hay seis. */
  {
    const NUMS = { siete: 7, ocho: 8, nueve: 9, diez: 10 };
    const problemas = [];
    for (const p of ESTACIONES) {
      const t = leer(p);
      const todas = [...t.matchAll(/data-mec="/g)].length;
      const mods = [...t.matchAll(/data-modificador/g)].length;
      const mec = todas - mods;
      const visible = t.replace(/<script[\s\S]*?<\/script>/g, " ")
                       .replace(/<!--[\s\S]*?-->/g, " ")
                       .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      for (const m of visible.matchAll(/\b(siete|ocho|nueve|diez)\s+(mecanismos|formas)\b/gi))
        if (NUMS[m[1].toLowerCase()] !== mec)
          problemas.push(`${p}: «${m[0]}» y hay ${mec} mecanismos en ${todas} estaciones`);
      if (mods !== 1)
        problemas.push(`${p}: ${mods} modificadores marcados, y el revelado tiene que ser exactamente uno`);
    }
    afirma(problemas.length === 0,
      `el copy cuenta mal los mecanismos → ${[...new Set(problemas)].join(" · ")}`,
      "donde el copy cuenta mecanismos, no cuenta el modificador como uno");
  }

  /* 9.8 · LOS SIETE ENTERRADOS SIGUEN ENTERRADOS, Y SU RECUENTO CUADRA.
     Cada uno tiene su lápida a la vista en la página, con qué era y por qué se
     fue. Si vuelve como estación, la lápida miente. */
  {
    const MUERTOS = ["E", "G", "I", "K", "L", "M", "O"];
    const revividos = [];
    let lapidas = 0;
    for (const p of ESTACIONES) {
      const t = leer(p);
      for (const c of MUERTOS)
        if (t.includes(`data-mec="${c}"`)) revividos.push(`${p}: ${c}`);
      lapidas = [...t.matchAll(/Era · [A-Z]</g)].length;
    }
    afirma(revividos.length === 0 && lapidas === MUERTOS.length,
      revividos.length ? `un mecanismo enterrado volvió como estación: ${revividos.join(" · ")}`
                       : `hay ${lapidas} lápidas a la vista y los enterrados son ${MUERTOS.length}`,
      `los ${MUERTOS.length} enterrados siguen enterrados y cada uno tiene su lápida a la vista`);
  }

  /* 9.10 · NINGUNA PALABRA DE UN MECANISMO POR DEBAJO DEL SUELO LEÍBLE.
     La escalera de esta hoja lo dice de sí misma: «el suelo de lo LEÍBLE es
     --t65: por debajo sólo vive lo decorativo — ni una etiqueta de
     formulario, ni un error, ni un legal». `--t30` mide 1,93 y `--t65` mide
     5,22.

     Esta comprobación nace de un fallo propio: la primera versión de la
     página puso `ink-30` en 42 sitios —el rótulo del ítem, los rótulos de
     eje, el número de orden, el aviso de que las cifras son de demostración—
     y los 42 llevaban INFORMACIÓN, no adorno. En escritorio se veía pálido;
     en un teléfono el aviso de demostración desaparecía, que es la peor de
     las 42 porque es justo la frase que evita leer datos de ejemplo como
     datos medidos.

     No lo cazó nada: la ficha estaba bien usada y el contraste escrito era
     correcto. Lo que estaba mal era PARA QUÉ se usaba. */
  {
    const bajos = [];
    for (const p of ESTACIONES) {
      const t = leer(p).replace(/<!--[\s\S]*?-->/g, " ");
      for (const m of t.matchAll(/class="([^"]*\bink-30\b[^"]*)"[^>]*>\s*([^<]{2,40})/g))
        bajos.push(`${p}: «${m[2].trim().slice(0, 28)}»`);
    }
    afirma(bajos.length === 0,
      `texto por debajo del suelo leíble (--t30 mide 1,93) → ${bajos.slice(0, 4).join(" · ")}${bajos.length > 4 ? ` y ${bajos.length - 4} más` : ""}`,
      "ninguna palabra de un mecanismo baja del suelo leíble: todo va en --t65 o mejor");
  }

  /* 9.11 · NADA SE ESTIRA SOBRE HUECO MUERTO.
     La otra que salió de mirar la página y no de medirla. Una rejilla estira
     sus hijos al alto de la fila por omisión, así que el panel de medida
     salía como media tarjeta de superficie vacía en las nueve estaciones. El
     CSS era correcto, el marcado era correcto y el contraste era correcto.
     Es la misma regla que `.tres` ya cumple con su fila de `1fr`. */
  {
    afirma(/\.estacion\s*>\s*\.medida\{[^}]*align-self:\s*start/.test(CSS),
      "el panel de medida vuelve a estirarse al alto de la estación: media tarjeta de superficie sobre hueco muerto",
      "el panel de medida no se estira: acaba donde acaba su contenido");
  }

  /* 9.12 · LA VOZ · ESPAÑOL NEUTRO DE LATAM, NUNCA RIOPLATENSE.
     La razón entera está en `CLAUDE.md`, sección LA VOZ, y la corta es que en
     un ítem el registro es parte de la medida: si el evaluado tropieza con la
     redacción, lo que se registra es su respuesta MÁS el ruido de una frase
     que le suena ajena.

     Esta nace de un fallo propio y bien tonto. Los dos prototipos de `Test/`
     traen 17 formas rioplatenses; Seeds estaba limpio, cero en sus siete
     páginas; y al unificar se arrastraron SIETE, cuatro de ellas dentro de los
     ítems de muestra. No lo cazó nada porque no es contraste, ni marcado, ni
     color: es prosa, que es justo lo que este archivo existe para leer.

     LA LISTA ES CERRADA Y CURADA, a propósito. Un patrón general de acentos
     finales cazaría «está», «acá», «aquí», «también» y «café», y una
     comprobación que grita sin razón enseña a ignorar el rojo — que es peor
     que no tenerla. Aquí sólo van formas que no existen fuera del Río de la
     Plata. «Dale» y «acá» NO entran: se usan igual en Chile. */
  {
    const RIOPLATENSE = [
      "vos", "sos", "tenés", "querés", "podés", "sabés", "hacés", "decís",
      "venís", "estás vos", "andá", "mirá", "probá", "probálos", "probalos",
      "fijate", "acordate", "avisame", "decime", "pegame", "contame",
      "mandame", "elegí", "repartí", "repartilos", "ordená", "pintá",
      "sostené", "mantené", "marcá", "dibujá", "arrastrá", "deslizá",
      "inclinalo", "interactuá", "calculá", "compará", "revisá", "usá",
      "dejá", "pasá", "tomá", "poné", "hacé", "buscá", "cerrá", "abrí",
      "escribí", "subí", "bajá", "apretá", "soltá", "aguantá",
    ];
    const visible = (f) => leer(f)
      .replace(/<style>[\s\S]*?<\/style>/g, " ")
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ");
    const pillados = [];
    for (const p of PAGINAS) {
      const t = visible(p);
      for (const forma of RIOPLATENSE) {
        const re = new RegExp("(?<![\\wáéíóúñ])" + forma + "(?![\\wáéíóúñ])", "iu");
        if (re.test(t)) pillados.push(`${p}: «${forma}»`);
      }
    }
    /* Y el guion también, porque escribe rótulos que se leen en pantalla. */
    if (hay("mecanismos.js")) {
      const j = leer("mecanismos.js");
      for (const forma of RIOPLATENSE) {
        const re = new RegExp('["\'`][^"\'`]*(?<![\\wáéíóúñ])' + forma + "(?![\\wáéíóúñ])", "iu");
        if (re.test(j)) pillados.push(`mecanismos.js: «${forma}»`);
      }
    }
    afirma(pillados.length === 0,
      `voseo rioplatense en texto que alguien lee → ${[...new Set(pillados)].join(" · ")}`,
      "ninguna forma rioplatense en el texto visible: la voz es neutra de LATAM");
  }

  /* 9.9 · CADA ESTACIÓN SE CONTESTA CON TECLADO Y DICE CUÁNDO MIENTE.
     Dos cosas en una comprobación porque las dos van del mismo sitio: un ítem
     que sólo acepta ratón es un ítem que una persona con teclado no puede
     contestar, y un test que no se puede contestar no mide. Y un panel que
     enseña cifras de ejemplo sin decirlo está enseñando datos inventados como
     si fueran medidos. */
  {
    const cojas = [];
    for (const p of ESTACIONES) {
      const t = leer(p);
      for (const m of t.matchAll(/<article[^>]*data-mec="([^"]+)"([\s\S]*?)<\/article>/g)) {
        const cuerpo = m[2];
        if (!/tabindex="0"|<button|<input/.test(cuerpo)) cojas.push(`${p}·${m[1]}: sin control enfocable`);
        if (!/data-demo/.test(cuerpo)) cojas.push(`${p}·${m[1]}: su panel no avisa de que es demostración`);
      }
    }
    afirma(cojas.length === 0,
      `estaciones incompletas → ${cojas.join(" · ")}`,
      "cada estación se contesta con teclado y avisa de que sus cifras son de demostración");
  }
}

/* ═══ EL VEREDICTO ════════════════════════════════════════════════════════ */
console.log("\n" + "─".repeat(72));
if (fallos === 0)
  console.log(`\x1b[32m  ${mirado} afirmaciones comprobadas. Ninguna es falsa.\x1b[0m\n`);
else
  console.log(`\x1b[31m  ${fallos} de ${mirado} afirmaciones son FALSAS. Están arriba, con su sitio.\x1b[0m\n`);
process.exit(fallos === 0 ? 0 : 1);
