# WIREFRAMES CONCEPTUALES V1
## Flujo crítico del candidato

## 1. Criterio general de diseño

La experiencia debe diseñarse primero para teléfono móvil.

Principios:

- una acción principal por pantalla;
- textos cortos;
- botones grandes;
- mínimo esfuerzo cognitivo;
- sensación de avance constante;
- diseño profesional, no clínico;
- interacción rápida;
- cámara y privacidad explicadas con claridad;
- arquetipo como momento visual principal;
- información técnica de riesgo reservada para empresas.

---

# WIREFRAME 01
## Landing de evaluación

### Objetivo

Conseguir que la persona comience sin sobreexplicar el producto.

```text
┌─────────────────────────────┐
│          LOGO               │
│                             │
│   Descubre tu perfil        │
│      de integridad          │
│                             │
│ Conoce cómo tiendes a       │
│ actuar frente a diferentes  │
│ situaciones laborales.      │
│                             │
│  ⏱ 10–15 min                │
│  ✓ Resultado personal       │
│  🔒 Evaluación segura       │
│                             │
│ [ COMENZAR EVALUACIÓN ]     │
│                             │
│      Ya tengo una cuenta    │
│                             │
└─────────────────────────────┘
```

### Si viene de empresa

Agregar arriba:

**Empresa ABC te invita a completar esta evaluación**

Logo pequeño de empresa + logo de plataforma.

### CTA

**Comenzar evaluación**

---

# WIREFRAME 02
## País + privacidad

Puede resolverse en dos pasos cortos.

### Paso 1

```text
┌─────────────────────────────┐
│ ←                           │
│                             │
│ ¿Desde dónde realizas       │
│ la evaluación?              │
│                             │
│ Detectamos:                 │
│                             │
│ 🇪🇨 Ecuador                 │
│                             │
│ [ CONFIRMAR ]               │
│                             │
│ Estoy en otro país          │
│                             │
└─────────────────────────────┘
```

### Regla

El país es un dato **obligatorio**: se captura automáticamente (WhatsApp / configuración de la empresa) o se confirma/selecciona en la web, y no se puede continuar sin él. A diferencia de país, otros datos demográficos (edad, género, educación, industria) y de bio-data (nivel de estudios, años de experiencia, tiempo en el empleo actual, número de empleos en 5 años, personal a cargo, situación laboral) son siempre opcionales.

### Paso 2 – Privacidad

```text
┌─────────────────────────────┐
│ ←                           │
│                             │
│ Antes de comenzar           │
│                             │
│ Usaremos tus datos para     │
│ gestionar tu evaluación,    │
│ verificar tu identidad      │
│ cuando corresponda y        │
│ generar tus resultados.     │
│                             │
│ Qué recopilamos       ›     │
│ Quién puede acceder   ›     │
│ Cómo protegemos datos ›     │
│ Tus derechos          ›     │
│                             │
│ □ He leído y acepto         │
│   las condiciones           │
│                             │
│ [ ACEPTAR Y CONTINUAR ]     │
│                             │
│ Ver política completa       │
└─────────────────────────────┘
```

### Regla

El botón permanece deshabilitado hasta aceptar.

---

# WIREFRAME 03
## Registro

```text
┌─────────────────────────────┐
│ ←                           │
│                             │
│ Crea tu perfil              │
│                             │
│ Nombre                      │
│ [_______________________]   │
│                             │
│ Apellido                    │
│ [_______________________]   │
│                             │
│ Correo                      │
│ [_______________________]   │
│                             │
│ Teléfono                    │
│ [ +593 _________________ ]  │
│                             │
│ [ CONTINUAR ]               │
│                             │
└─────────────────────────────┘
```

### UX

El prefijo telefónico se selecciona automáticamente según país.

### Caso duplicado

No crear cuenta nueva automáticamente.

Mostrar:

> Ya encontramos un perfil asociado a estos datos.

CTA:

**Continuar con mi perfil**

---

# WIREFRAME 04
## Código de validación

```text
┌─────────────────────────────┐
│                             │
│ Confirma tu correo          │
│                             │
│ Enviamos un código a        │
│ j***@gmail.com              │
│                             │
│     [_] [_] [_] [_] [_] [_]│
│                             │
│ [ VERIFICAR ]               │
│                             │
│ Reenviar código             │
│ Cambiar correo              │
│                             │
└─────────────────────────────┘
```

### Éxito

Animación breve:

**✓ Correo confirmado**

Avance automático.

---

# WIREFRAME 05
## Decisión de cámara

Esta es una pantalla crítica.

No debe sentirse invasiva.

```text
┌─────────────────────────────┐
│                             │
│ Verifica tu evaluación      │
│                             │
│ La cámara permite confirmar │
│ que tú eres quien realiza   │
│ esta evaluación.            │
│                             │
│ Si la verificas:            │
│                             │
│ ✓ Podrás usar el resultado  │
│   en procesos empresariales │
│                             │
│ ✓ Tu perfil aparecerá como  │
│   verificado                │
│                             │
│ [ VERIFICAR MI EVALUACIÓN ] │
│                             │
│ Continuar sin cámara        │
│                             │
│ Sin cámara recibirás tu     │
│ arquetipo, pero el resultado│
│ no será válido como perfil  │
│ empresarial verificado.     │
│                             │
└─────────────────────────────┘
```

### Evaluación empresarial

Eliminar la opción:

**Continuar sin cámara**

y reemplazar título por:

**Esta evaluación requiere verificación de identidad**

---

# WIREFRAME 06
## Captura inicial

```text
┌─────────────────────────────┐
│                             │
│ Verificación rápida         │
│                             │
│        ┌───────────┐        │
│        │           │        │
│        │   ROSTRO  │        │
│        │           │        │
│        └───────────┘        │
│                             │
│ Coloca tu rostro dentro     │
│ del marco.                  │
│                             │
│ ✓ Buena iluminación         │
│ ✓ Una sola persona          │
│ ✓ Rostro visible            │
│                             │
│ [ TOMAR FOTOGRAFÍA ]        │
│                             │
└─────────────────────────────┘
```

### Resultado

**✓ Identidad verificada**

o

**No pudimos verificarte. Intenta nuevamente.**

---

# WIREFRAME 07
## Instrucciones previas

```text
┌─────────────────────────────┐
│                             │
│ Todo listo                  │
│                             │
│ ⏱ 10–15 minutos            │
│                             │
│ Algunas preguntas describen │
│ situaciones que pueden      │
│ darse tanto en tu vida      │
│ personal como en tu         │
│ trabajo. Aunque no te haya  │
│ pasado exactamente así,     │
│ respondé imaginando qué     │
│ harías si estuvieras en esa │
│ situación.                  │
│                             │
│ No hay respuestas correctas │
│ o incorrectas: lo importante│
│ es tu reacción más sincera. │
│                             │
│ → Una vez respondida una    │
│   pregunta no podrás volver │
│                             │
│ ◉ Evita interrupciones      │
│                             │
│ 📷 Mantén activa la cámara │
│    si tu evaluación está    │
│    verificada               │
│                             │
│ [ COMENZAR ]                │
│                             │
└─────────────────────────────┘
```

### Regla

Este bloque de instrucción aparece **una sola vez**, antes del primer reactivo, y no se repite durante la batería.

---

# WIREFRAME 08
## Reactivo principal

Debe ser extremadamente limpio.

```text
┌─────────────────────────────┐
│ ███████░░░░░░░░░░          │
│                             │
│                             │
│ Cuando una regla me parece  │
│ poco práctica, considero    │
│ aceptable hacer una         │
│ excepción.                  │
│                             │
│                             │
│ Totalmente en desacuerdo    │
│                             │
│ 🔴○  🟠○  🟡○  🟢○  🔵○   │
│                             │
│ Totalmente de acuerdo       │
│                             │
│                             │
│      ? Reportar pregunta    │
│                             │
└─────────────────────────────┘
```

### Escala

Escala Likert de **5 niveles** ("Totalmente en desacuerdo" ... "Totalmente de acuerdo"), cada opción con ícono + color propio (refuerzo visual, no decorativo) manteniendo siempre las etiquetas de texto visibles. No usar 3, 4 ni 6 opciones.

### Interacción

Al tocar respuesta:

- feedback visual de 200–300 ms;
- guarda;
- transición;
- siguiente reactivo.

No utilizar:

**Siguiente**

salvo que el formato lo requiera.

Eso mejora ritmo.

---

# WIREFRAME 09
## Reactivo situacional

```text
┌─────────────────────────────┐
│ █████████░░░░░░░░          │
│                             │
│ Imagina esta situación:     │
│                             │
│ Un compañero utiliza un     │
│ recurso de la empresa para  │
│ un asunto personal.         │
│                             │
│ Nadie parece verse          │
│ perjudicado.                │
│                             │
│ ¿Qué se acerca más a lo     │
│ que pensarías?              │
│                             │
│ ┌─────────────────────────┐ │
│ │ No es importante si     │ │
│ │ ocurre ocasionalmente   │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ Sigue siendo un uso     │ │
│ │ incorrecto del recurso  │ │
│ └─────────────────────────┘ │
│                             │
└─────────────────────────────┘
```

### Diseño

Las opciones deben funcionar como cards completas clicables.

### Regla de coexistencia

Este formato de opciones concretas se usa solo en **3 de los 10 reactivos** de cada dimensión. Los otros 7 reactivos de la dimensión usan la escala Likert de 5 niveles del Wireframe 08. Ambos formatos **coexisten**; el de opciones concretas nunca sustituye a la escala Likert de 5 niveles.

---

# WIREFRAME 10
## Microinteracción de progreso

```text
┌─────────────────────────────┐
│                             │
│          ✓                  │
│                             │
│     Vas avanzando           │
│        muy bien             │
│                             │
│ Continúa respondiendo       │
│ de forma natural.           │
│                             │
│ [ CONTINUAR ]               │
│                             │
└─────────────────────────────┘
```

Máximo unas pocas veces durante la prueba.

---

# WIREFRAME 11
## Cámara perdida

Overlay sobre la aplicación.

```text
┌─────────────────────────────┐
│                             │
│      📷                     │
│                             │
│ Necesitamos recuperar       │
│ la cámara                   │
│                             │
│ Para continuar con esta     │
│ evaluación verificada,      │
│ activa nuevamente tu cámara.│
│                             │
│ [ REACTIVAR CÁMARA ]        │
│                             │
└─────────────────────────────┘
```

La prueba queda congelada.

No se muestra siguiente reactivo.

---

# WIREFRAME 12
## Procesamiento del resultado

```text
┌─────────────────────────────┐
│                             │
│          ◌                  │
│                             │
│ Estamos analizando          │
│ tus respuestas              │
│                             │
│ Estamos construyendo        │
│ tu perfil...                │
│                             │
└─────────────────────────────┘
```

2–3 segundos cuando sea posible.

Transición visual hacia el personaje.

---

# WIREFRAME 13
## Revelación del arquetipo

Esta debe ser una de las mejores pantallas del producto.

```text
┌─────────────────────────────┐
│                             │
│      TU PERFIL ES           │
│                             │
│       EL GUARDIÁN           │
│                             │
│       [PERSONAJE]           │
│                             │
│ Consistencia y respeto por  │
│ las reglas suelen orientar  │
│ tus decisiones.             │
│                             │
│ [ CONOCER MI PERFIL ]       │
│                             │
└─────────────────────────────┘
```

### Objetivo

Crear:

- identificación;
- curiosidad;
- recordación;
- ganas de compartir.

No mostrar números.

---

# WIREFRAME 14
## Perfil gratuito del arquetipo

```text
┌─────────────────────────────┐
│ ←     EL GUARDIÁN           │
│                             │
│ [personaje pequeño]         │
│                             │
│ Así tiendes a actuar        │
│                             │
│ Lorem ipsum descripción     │
│ conductual breve...         │
│                             │
│ Tus fortalezas              │
│                             │
│ [ Consistencia ]            │
│ [ Responsabilidad ]         │
│ [ Criterio ]                │
│                             │
│ Áreas de atención           │
│                             │
│ [ Flexibilidad ]            │
│ [ Presión externa ]         │
│                             │
│ Comportamiento bajo presión │
│                         ›   │
│                             │
│ Relación con las normas     │
│                         ›   │
│                             │
└─────────────────────────────┘
```

### Navegación

Scroll vertical.

No hacer 15 pantallas diferentes para un perfil corto.

---

# WIREFRAME 15
## Estado de verificación y vigencia

Integrado dentro del perfil.

```text
┌─────────────────────────────┐
│ Tu evaluación               │
│                             │
│ ✓ Identidad verificada      │
│                             │
│ Realizada                   │
│ 14 Sep 2026                 │
│                             │
│ Vigente hasta               │
│ 14 Mar 2027                 │
│                             │
│ Podrás reutilizar esta      │
│ evaluación base mientras    │
│ permanezca vigente.         │
│                             │
└─────────────────────────────┘
```

Si no verificó cámara:

**Perfil personal – identidad no verificada**

---

# WIREFRAME 16
## Compartir resultado

```text
┌─────────────────────────────┐
│                             │
│ Comparte tu arquetipo       │
│                             │
│ ┌─────────────────────────┐ │
│ │      EL GUARDIÁN        │ │
│ │                         │ │
│ │      [PERSONAJE]        │ │
│ │                         │ │
│ │ Consistencia y criterio │ │
│ └─────────────────────────┘ │
│                             │
│ □ Incluir mi nombre         │
│                             │
│ [ WHATSAPP ]                │
│ [ COMPARTIR ]               │
│                             │
│ Copiar enlace               │
│ Mostrar QR                  │
│ Descargar tarjeta           │
│                             │
└─────────────────────────────┘
```

---

# WIREFRAME 17
## Perfil compartido visto por empresa

Esta pantalla tiene doble objetivo:

1. mostrar resultado gratuito;
2. convertir empresa a pago.

```text
┌─────────────────────────────┐
│                             │
│       EL GUARDIÁN           │
│       [PERSONAJE]           │
│                             │
│ Evaluación verificada ✓     │
│ Vigente hasta 14 Mar 2027   │
│                             │
│ Descripción general...      │
│                             │
│ Dimensiones Base disponibles│
│                             │
│ ✓ Robo, Mentira, Fraude,    │
│   Irresponsabilidad,        │
│   Soborno                   │
│                             │
│ Dimensiones Contextuales    │
│ (sección aparte del IGI)    │
│                             │
│ ✓ Impulsividad              │
│ ✓ Violencia                 │
│ ⚠ Deudas – vencida         │
│                             │
│ ┌─────────────────────────┐ │
│ │ Ver reporte profesional │ │
│ │      de riesgos         │ │
│ └─────────────────────────┘ │
│                             │
│ El reporte profesional      │
│ incluye el IGI, sus niveles,│
│ alertas e interpretación.   │
│                             │
└─────────────────────────────┘
```

CTA principal empresarial:

**Ver reporte profesional de riesgos**

---

# WIREFRAME 18
## Candidato existente recibe nueva solicitud

```text
┌─────────────────────────────┐
│                             │
│ Nueva evaluación            │
│                             │
│ Empresa ABC                 │
│                             │
│ Cargo: Gerente Comercial    │
│                             │
│ ✓ Tu evaluación base está  │
│   vigente                   │
│                             │
│ No necesitas repetirla.     │
│                             │
│ Necesitamos evaluar         │
│ 3 dimensiones adicionales.  │
│                             │
│ Tiempo estimado: 6 minutos  │
│                             │
│ [ CONTINUAR ]               │
│                             │
└─────────────────────────────┘
```

Esto debe transmitir eficiencia.

---

# WIREFRAME 19
## Dashboard personal

```text
┌─────────────────────────────┐
│ Hola, George                │
│                             │
│ ┌─────────────────────────┐ │
│ │ EL GUARDIÁN             │ │
│ │ [personaje]             │ │
│ │ Ver mi perfil        ›  │ │
│ └─────────────────────────┘ │
│                             │
│ ✓ Evaluación verificada     │
│ Vigente hasta 14 Mar 2027   │
│                             │
│ [ Compartir mi perfil ]     │
│                             │
│ Mis evaluaciones        ›   │
│ Mis dimensiones         ›   │
│ Oportunidades laborales ›   │
│ Mi cuenta              ›    │
│                             │
└─────────────────────────────┘
```

---

# WIREFRAME 20
## Evaluación no interpretable

```text
┌─────────────────────────────┐
│                             │
│ Necesitamos una             │
│ nueva aplicación            │
│                             │
│ Encontramos condiciones     │
│ durante la evaluación que   │
│ no permiten generar un      │
│ resultado suficientemente   │
│ confiable.                  │
│                             │
│ No hemos generado un        │
│ perfil ni conclusiones      │
│ sobre tus respuestas.       │
│                             │
│ [ REALIZAR NUEVAMENTE ]     │
│                             │
│ Contactar soporte           │
│                             │
└─────────────────────────────┘
```

Nunca utilizar:

“Fallaste”.

---

# SISTEMA DE NAVEGACIÓN

## Durante registro

Usar:

**←**

solo antes de empezar evaluación.

## Durante evaluación

Eliminar navegación hacia atrás.

Mantener únicamente:

- barra progreso;
- soporte/reportar;
- estado de conexión.

## Después de evaluación

Bottom navigation móvil:

**Inicio**

**Mi perfil**

**Compartir**

**Cuenta**

---

# COMPONENTES REUTILIZABLES

## Componente 1 – Barra de progreso

Sin número obligatorio.

```text
████████░░░░░░░
```

## Componente 2 – Badge de verificación

**✓ Verificado**

## Componente 3 – Badge de vigencia

**Vigente**

**Próximo a vencer**

**Vencido**

## Componente 4 – Card de respuesta

Toda el área debe ser clicable.

## Componente 5 – Alertas técnicas

- conexión;
- cámara;
- respuestas rápidas.

## Componente 6 – Personaje

Debe poder renderizarse en:

- pantalla completa;
- avatar;
- tarjeta social;
- PDF;
- QR profile.

---

# JERARQUÍA VISUAL

## Nivel 1

Arquetipo.

## Nivel 2

Pregunta actual.

## Nivel 3

CTA principal.

## Nivel 4

Información secundaria.

Evitar competir visualmente con demasiados elementos.

---

# TONO DE LA INTERFAZ

Debe ser:

- claro;
- humano;
- profesional;
- directo.

Evitar:

- lenguaje clínico;
- lenguaje acusatorio;
- infantilización;
- exceso de “¡felicidades!”;
- gamificación exagerada.

Ejemplo correcto:

> Continúa respondiendo con naturalidad.

No:

> ¡WOW! ¡Lo estás haciendo increíble! 🔥🔥🔥

---

# DISEÑO DE LA CÁMARA

La cámara nunca debe ocupar permanentemente media pantalla durante la prueba.

Puede existir:

- indicador pequeño;
- icono verde;
- estado “Verificación activa”.

Ejemplo:

```text
📷 Verificación activa
```

El candidato sabe que existe, pero no distrae.

---

# DISEÑO DEL ARQUETIPO

Cada personaje necesita versiones:

1. Full body / hero.
2. Medio cuerpo.
3. Avatar.
4. Icono.
5. Tarjeta social.
6. Fondo transparente.
7. Versión monocromática para documentos.

El nombre debe poder leerse independientemente del personaje.

---

# DISEÑO RESPONSIVE

Aunque mobile-first, debe adaptarse a:

### Tablet

Contenido centrado con ancho máximo.

### Desktop

No estirar preguntas a todo el monitor.

Área recomendada:

aproximadamente 600–800 px de ancho.

Ejemplo:

```text
        ┌─────────────────────┐
        │                     │
        │      REACTIVO       │
        │                     │
        │      OPCIONES       │
        │                     │
        └─────────────────────┘
```

---

# ORDEN DE PROTOTIPADO EN FIGMA

El diseñador debería construir primero:

1. Landing.
2. Privacidad.
3. Registro.
4. OTP.
5. Cámara.
6. Instrucciones.
7. Reactivo escala.
8. Reactivo situacional.
9. Estado de interrupción.
10. Procesamiento.
11. Revelación de arquetipo.
12. Perfil.
13. Compartir.
14. Vista empresarial del perfil.
15. Dashboard personal.

Con estas 15 pantallas puede probarse prácticamente todo el flujo crítico antes de diseñar el resto.

---

# PRIMER PROTOTIPO TESTEABLE

El primer prototipo UX no necesita scoring real.

Puede simular:

**Landing**

↓

**Registro**

↓

**Cámara**

↓

**5 reactivos demo**

↓

**Procesamiento**

↓

**Arquetipo ficticio**

↓

**Compartir**

El objetivo de ese prototipo será medir:

- comprensión;
- fricción;
- percepción de cámara;
- facilidad de respuesta;
- atractivo del resultado;
- intención de compartir.

Todavía no medir psicometría.

---

# MÉTRICAS DEL TEST UX

En pruebas de usuario debemos observar:

### Landing

¿Entiende qué va a hacer?

### Privacidad

¿Comprende qué acepta?

### Cámara

¿Acepta o rechaza?

¿Por qué?

### Reactivos

¿Entiende cómo responder sin explicación?

### Progreso

¿Siente que avanza?

### Arquetipo

¿Entiende el resultado?

¿Se identifica?

### Compartir

¿Lo compartiría?

### Empresa

¿Entiende que existe un reporte profesional distinto?

---

# SALIDA DE ESTA FASE

Con estos wireframes ya puede comenzar:

**Figma → prototipo clickeable → prueba con usuarios → ajustes UX.**

La siguiente pieza de diseño no debería ser más pantallas del candidato.

Debería ser el **wireframe del dashboard empresarial y del reporte profesional de riesgos**, porque esa es la segunda experiencia crítica y la que directamente monetizamos.

---

Nota de reconciliación (2026-09-16): textos de pantalla ajustados para coincidir con el modelo de resultado y las reglas de producto vigentes (DECISIONS.md).