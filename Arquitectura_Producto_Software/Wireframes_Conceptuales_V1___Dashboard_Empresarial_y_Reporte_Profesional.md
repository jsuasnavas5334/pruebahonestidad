# WIREFRAMES CONCEPTUALES V1
## Dashboard Empresarial + Reporte Profesional de Riesgos

## 1. Objetivo

Diseñar la experiencia empresarial para que un profesional pueda:

- crear procesos;
- configurar cargos;
- invitar candidatos;
- reutilizar evaluaciones vigentes;
- identificar qué información falta;
- comprar/desbloquear reportes;
- interpretar riesgos;
- comparar candidatos;
- profundizar en entrevista;
- descargar reportes;
- gestionar créditos y usuarios.

La experiencia debe transmitir:

**control + claridad + rigor + rapidez.**

No debe sentirse como una plataforma psicométrica compleja.

---

# BLOQUE A
# ACCESO EMPRESARIAL

## Pantalla E01 – Login empresarial

```text
┌────────────────────────────────────┐
│              LOGO                  │
│                                    │
│     Acceso para organizaciones     │
│                                    │
│ Correo                             │
│ [____________________________]     │
│                                    │
│ Contraseña                         │
│ [____________________________]     │
│                                    │
│ [ INICIAR SESIÓN ]                 │
│                                    │
│ Continuar con SSO                   │
│ Recuperar contraseña               │
│                                    │
└────────────────────────────────────┘
```

---

# BLOQUE B
# ONBOARDING EMPRESARIAL

## Pantalla E02 – Bienvenida

```text
┌──────────────────────────────────────┐
│ Hola, George                         │
│                                      │
│ Crea tu primer proceso de selección  │
│ y configura qué riesgos necesitas    │
│ evaluar.                             │
│                                      │
│ [ CREAR PRIMER PROCESO ]             │
│                                      │
│ Omitir por ahora                     │
└──────────────────────────────────────┘
```

---

# BLOQUE C
# DASHBOARD PRINCIPAL

## Pantalla E03 – Dashboard

Desktop-first para la empresa.

```text
┌────────────────────────────────────────────────────┐
│ LOGO | Procesos | Candidatos | Talento | Reportes │
│                                Créditos: 184       │
├────────────────────────────────────────────────────┤
│                                                    │
│ Buenos días, George                                │
│                                                    │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│ │ 8        │ │ 24       │ │ 6        │            │
│ │ Procesos │ │ Candid.  │ │ Reportes │            │
│ │ activos  │ │ activos  │ │ pendientes│           │
│ └──────────┘ └──────────┘ └──────────┘            │
│                                                    │
│ ┌──────────┐ ┌──────────┐                         │
│ │ 3        │ │ 2        │                         │
│ │ Alertas  │ │ Vencen   │                         │
│ │ críticas │ │ pronto   │                         │
│ └──────────┘ └──────────┘                         │
│                                                    │
│ Procesos recientes                                 │
│ ─────────────────────────────────────────────────  │
│ Gerente Comercial     8 candidatos   Ver proceso  │
│ Cajeros Quito        14 candidatos   Ver proceso  │
│ Compras               6 candidatos   Ver proceso  │
│                                                    │
│ [ + CREAR PROCESO ]                                │
└────────────────────────────────────────────────────┘
```

### Objetivo

En menos de 10 segundos debe responder:

- qué procesos tengo;
- qué está pendiente;
- dónde hay alertas;
- qué debo hacer.

---

# BLOQUE D
# CREACIÓN DE PROCESO

## Pantalla E04 – Nuevo proceso

```text
┌──────────────────────────────────────┐
│ ← Nuevo proceso                      │
│                                      │
│ Nombre del proceso                   │
│ [ Gerente Comercial 2027________ ]   │
│                                      │
│ Cargo                                │
│ [ Gerente Comercial______________ ]  │
│                                      │
│ País                                 │
│ [ Ecuador ▼ ]                        │
│                                      │
│ Unidad                               │
│ [ Comercial ▼ ]                      │
│                                      │
│ [ CONTINUAR ]                        │
└──────────────────────────────────────┘
```

---

# BLOQUE E
# PERFIL DE CARGO

## Pantalla E05 – Descripción del puesto

```text
┌─────────────────────────────────────────────────┐
│ Configura el perfil                             │
│                                                 │
│ Puedes seleccionar una plantilla o pegar        │
│ la descripción del cargo.                       │
│                                                 │
│ [ Seleccionar plantilla ▼ ]                     │
│                                                 │
│ o                                               │
│                                                 │
│ Descripción del puesto                          │
│ ┌─────────────────────────────────────────────┐ │
│ │ Responsable de ventas corporativas...      │ │
│ │                                             │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ [ ANALIZAR PERFIL ]                             │
└─────────────────────────────────────────────────┘
```

---

# BLOQUE F
# RECOMENDACIÓN DE DIMENSIONES

## Pantalla E06 – Configuración sugerida

```text
┌────────────────────────────────────────────────────┐
│ Configuración recomendada                          │
│                                                    │
│ Cargo: Gerente Comercial                           │
│                                                    │
│ Nivel de puesto:  [ 5 — Jefatura/Gerencia de Área ▼]│
│ ¿Tiene personal a cargo?:  ( ) Sí   (•) No         │
│                                                    │
│ DIMENSIÓN          RECOMENDADA                     │
│ Robo              ✓                                │
│ Mentira           ✓                                │
│ Fraude            ✓                                │
│ Irresponsabilidad ✓                                │
│ Soborno           ✓                                │
│                                                    │
│ Adicionales                                       │
│                                                    │
│ Deslealtad        ✓                                │
│ Favoritismo       ✓                                │
│ Impunidad         ✓                                │
│                                                    │
│ [+ AGREGAR DIMENSIÓN]                             │
│                                                    │
│ [ GUARDAR CONFIGURACIÓN ]                         │
└────────────────────────────────────────────────────┘
```

### Ayuda contextual

Al lado de cada dimensión:

**ⓘ ¿Por qué se recomienda?**

Ejemplo:

> Soborno se recomienda por el nivel de negociación, interacción con clientes y manejo de acuerdos comerciales.

**Resuelto (2026-09-16): George confirmó retirar el dial de "exigencia" por dimensión.** Esta pantalla usaba originalmente un dial de exigencia (1-6) independiente por cada dimensión; el modelo de cálculo vigente usa exclusivamente un único **nivel de puesto (1-6)** por proceso, con un ajuste por "¿tiene personal a cargo?" (Sí/No), aplicado al PRB agregado del Núcleo (DECISIONS.md punto 27) — no una exigencia distinta por dimensión. La pantalla se rediseñó arriba con los dos campos vigentes (nivel de puesto + personal a cargo) en vez de la columna de exigencia por dimensión.

---

# BLOQUE G
# ELIMINAR UNA DIMENSIÓN RECOMENDADA

## Modal E07

```text
┌────────────────────────────────────┐
│ ¿Eliminar Soborno?                 │
│                                    │
│ Esta dimensión suele ser relevante │
│ para cargos con negociación y      │
│ manejo de terceros.                │
│                                    │
│ La decisión final corresponde al   │
│ profesional.                       │
│                                    │
│ [ MANTENER ]                       │
│ [ ELIMINAR DE TODAS FORMAS ]       │
└────────────────────────────────────┘
```

---

# BLOQUE H
# AGREGAR CANDIDATOS

## Pantalla E08

```text
┌──────────────────────────────────────────────┐
│ Agregar candidatos                          │
│                                              │
│ [ + Agregar manualmente ]                   │
│ [ Importar Excel / CSV ]                    │
│ [ Copiar enlace de invitación ]             │
│ [ Mostrar QR ]                              │
│                                              │
│ Invitaciones                                │
│                                              │
│ Correo     WhatsApp     Estado              │
│ ...                                         │
└──────────────────────────────────────────────┘
```

---

# BLOQUE I
# CANDIDATO EXISTENTE

## Pantalla E09 – Perfil detectado

Esta pantalla es clave.

```text
┌──────────────────────────────────────────────────┐
│ Juan Pérez                                       │
│                                                  │
│ Arquetipo: El Guardián                           │
│ ✓ Identidad verificada                           │
│                                                  │
│ Evaluación base                                  │
│ ✓ Vigente hasta 14 Mar 2027                      │
│                                                  │
│ Dimensiones Base                                 │
│                                                  │
│ ✓ Robo                Vigente                    │
│ ✓ Mentira             Vigente                    │
│ ✓ Fraude              Vigente                    │
│ ✓ Irresponsabilidad   Vigente                    │
│ ✓ Soborno             Vigente                    │
│                                                  │
│ Dimensiones Contextuales (aparte del IGI)        │
│                                                  │
│ ✓ Impulsividad        Vigente                    │
│ ⚠ Deudas              Vencida                    │
│ – Violencia           No evaluada                │
│                                                  │
│ Podemos reutilizar 6 resultados existentes.      │
│                                                  │
│ [ CONTINUAR CON DATOS VIGENTES ]                 │
│ [ CONFIGURAR ACTUALIZACIONES ]                   │
└──────────────────────────────────────────────────┘
```

No muestra riesgos antes del pago.

---

# BLOQUE J
# ACTUALIZAR VARIABLE

## Pantalla E10

```text
┌────────────────────────────────────────────┐
│ Deudas                                    │
│                                            │
│ Última evaluación: 10 Ene 2026             │
│ Estado: Vencida                            │
│                                            │
│ Recomendamos actualizar esta dimensión.    │
│                                            │
│ ○ Reutilizar resultado vencido             │
│ ● Solicitar nueva evaluación               │
│                                            │
│ [ CONTINUAR ]                              │
└────────────────────────────────────────────┘
```

Si utiliza vencida:

se registra decisión.

---

# BLOQUE K
# VISTA DE PROCESO

## Pantalla E11 – Proceso activo

```text
┌─────────────────────────────────────────────────────────┐
│ Gerente Comercial 2027                                  │
│                                                         │
│ 12 candidatos | 8 completados | 2 pendientes | 2 inicio │
│                                                         │
│ [ INVITAR CANDIDATO ]        [ COMPARAR ]               │
│                                                         │
│ Candidato       Estado       Verif.     Reporte         │
│ Juan Pérez      Completado    ✓          Ver            │
│ Ana Ruiz        Completado    ✓          Comprar        │
│ Luis Mora       Iniciado      ✓          —              │
│ Pedro Solís     Invitado      —          —              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

# BLOQUE L
# PERFIL GRATUITO EMPRESARIAL

## Pantalla E12

Antes de comprar el reporte.

```text
┌──────────────────────────────────────────────────┐
│ Juan Pérez                                       │
│                                                  │
│            EL GUARDIÁN                           │
│            [PERSONAJE]                           │
│                                                  │
│ ✓ Evaluación verificada                          │
│ Vigente hasta 14 Mar 2027                        │
│                                                  │
│ Perfil general                                   │
│                                                  │
│ Descripción gratuita del arquetipo...            │
│                                                  │
│ Dimensiones Base                                 │
│ ✓ Disponibles (5)                                │
│                                                  │
│ Dimensiones Contextuales (aparte del IGI)        │
│ ✓ Impulsividad                                   │
│ ✓ Violencia                                      │
│                                                  │
│ El reporte profesional incluye:                  │
│                                                  │
│ • IGI (Índice General de Integridad), 0–95       │
│ • 6 niveles de integridad + semáforo             │
│ • alertas                                        │
│ • preguntas para entrevista                      │
│ • interpretación profesional                     │
│ • advertencia de uso responsable                 │
│                                                  │
│ [ DESBLOQUEAR REPORTE PROFESIONAL ]              │
└──────────────────────────────────────────────────┘
```

---

# BLOQUE M
# COMPRA / DESBLOQUEO

## Modal E13

```text
┌────────────────────────────────────────────┐
│ Desbloquear reporte profesional           │
│                                            │
│ Candidato: Juan Pérez                      │
│                                            │
│ Este reporte utilizará:                    │
│                                            │
│ ✓ 5 dimensiones base                      │
│ ✓ 3 dimensiones adicionales               │
│                                            │
│ Costo: 10 créditos                         │
│                                            │
│ Saldo actual: 184 créditos                 │
│                                            │
│ [ DESBLOQUEAR ]                            │
│                                            │
└────────────────────────────────────────────┘
```

El número es solo ejemplo conceptual.

---

# BLOQUE N
# REPORTE PROFESIONAL – RESUMEN

## Pantalla E14

Este debe ser el corazón del producto empresarial.

```text
┌──────────────────────────────────────────────────────────┐
│ Juan Pérez                     Gerente Comercial         │
│                                                          │
│ EL GUARDIÁN                                               │
│ ✓ Verificado       Vigente hasta 14 Mar 2027             │
│                                                          │
│ Puesto evaluado: Nivel 4 de 6                            │
│ Ajuste por personal a cargo: Sí                          │
│                                                          │
│ RESUMEN EJECUTIVO                                        │
│                                                          │
│         IGI (Índice General de Integridad)               │
│                 78 / 95                                  │
│         IC 95%: [Pendiente de dato piloto]               │
│                                                          │
│   Nivel 5 de 6 – Integridad Alta        🟢 Verde         │
│                                                          │
│   Percentil calculado contra el Baremo General (n=612)  │
│                                                          │
│       [ GRÁFICA GENERAL DEL PERFIL ]                     │
│                                                          │
│ Atención general                                         │
│                                                          │
│ ● Favorable                                              │
│                                                          │
│ Principales alertas                                      │
│                                                          │
│ ⚠ Soborno        Nivel 3/6 (Amarillo)                    │
│ ⚠ Mentira        Nivel 4/6 (Amarillo)                    │
│                                                          │
│ Validez del protocolo                                    │
│ ✓ Sin indicadores de validez activados                   │
│                                                          │
│ Calidad de aplicación                                    │
│ ✓ Adecuada                                                │
│                                                          │
│ ⚠ El IGI nunca debe ser el único criterio para           │
│   decisiones de contratación, promoción o                │
│   desvinculación.                                        │
│                                                          │
│ [ VER DETALLE ]   [ DESCARGAR PDF ]                      │
└──────────────────────────────────────────────────────────┘
```

### Nota sobre validez

Si alguno de los 5 indicadores de validez (Azarosidad, Omisión, Aquiescencia, Contradicción, Deseabilidad Social) invalida el protocolo o una dimensión específica, el número **nunca se oculta ni se recalcula**: se muestra en **gris** junto con una advertencia visible.

### Nota sobre niveles y semáforo

6 niveles de integridad: Nivel 1 = Muy Baja, Nivel 2 = Baja, Nivel 3-4 = Media (Amarillo), Nivel 5-6 = Alta/Muy Alta (Verde). Semáforo: Rojo = niveles 1-2, Amarillo = niveles 3-4, Verde = niveles 5-6. Los valores de nivel mostrados arriba son ilustrativos; los cortes exactos dependen del baremo real.

---

# BLOQUE O
# GRÁFICA GENERAL

No debe depender solo de un radar.

Recomiendo barras comparables.

```text
Robo              ███████████████░  84 / 100
Mentira           ███████████░░░░░  67 / 100
Fraude            █████████████░░░  78 / 100
Irresponsabilidad ██████████████░░  82 / 100
Soborno           █████████░░░░░░░  55 / 100
```

Visualmente:

**más puntaje = mayor integridad.**

Debe dejarse clarísimo.

### Nota de escalas

El puntaje de cada dimensión se calcula en escala **0–100**. El IGI (el índice general que combina las dimensiones Núcleo del puesto) se calcula en escala **0–95**. Son dos escalas distintas y nunca deben confundirse.

---

# BLOQUE P
# SEIS NIVELES DE INTEGRIDAD

El puntaje y el nivel deben mostrarse separados.

Ejemplo conceptual:

```text
Soborno

Puntaje dimensional
55 / 100

Nivel de integridad
3 de 6 (Amarillo)

████ ████
```

Recordar la dirección: **más alto = más íntegro**. Nivel 1-2 = Rojo, 3-4 = Amarillo, 5-6 = Verde. Evitar que el usuario crea que:

55 = 55% de probabilidad de sobornar.

Debe existir ayuda:

**ⓘ ¿Qué significa este puntaje?**

---

# BLOQUE Q
# DIMENSIONES BASE

## Pantalla E15

```text
┌─────────────────────────────────────────────┐
│ Dimensiones base                           │
│                                             │
│ Robo                              84 / 100  │
│ Nivel de integridad 6/6 (Verde)             │
│ ███████████████░                            │
│ Alta consistencia frente al manejo...      │
│                                   [ VER ]   │
│                                             │
│ Mentira                           67 / 100  │
│ Nivel de integridad 4/6 (Amarillo)          │
│ ███████████░░░░░                            │
│ Presenta ciertas condiciones...            │
│                                   [ VER ]   │
│                                             │
│ ...                                         │
└─────────────────────────────────────────────┘
```

---

# BLOQUE R
# DIMENSIONES ADICIONALES

## Pantalla E16

Separada visualmente.

```text
Dimensiones adicionales / contextuales
(sección aparte del IGI)

Impulsividad          73 / 100
Nivel de integridad 5/6 (Verde)

Violencia             87 / 100
Nivel de integridad 6/6 (Verde)

Deudas
⚠ Resultado vencido
Última evaluación: 10 Ene 2026
```

---

# BLOQUE S
# DETALLE DE DIMENSIÓN

## Pantalla E17 – Ejemplo Soborno

```text
┌───────────────────────────────────────────────────┐
│ ← Soborno                                         │
│                                                   │
│ Puntaje dimensional                               │
│ 55 / 100                                          │
│                                                   │
│ Nivel de integridad                               │
│ 3 / 6 (Amarillo)                                  │
│                                                   │
│ Interpretación                                    │
│                                                   │
│ El patrón de respuestas muestra una mayor         │
│ flexibilidad frente a determinadas situaciones    │
│ donde existe beneficio personal o presión...      │
│                                                   │
│ Factores detectados                               │
│                                                   │
│ • mayor tolerancia a excepciones                  │
│ • racionalización de beneficios                   │
│ • sensibilidad a presión externa                  │
│                                                   │
│ Reactivos representativos                         │
│                                                   │
│ “...”                         Respuesta: ...       │
│ “...”                         Respuesta: ...       │
│                                                   │
│ Preguntas sugeridas para entrevista               │
│                                                   │
│ 1. Cuéntame una situación en la que...            │
│ 2. ¿Qué harías si un proveedor...?                │
│                                                   │
└───────────────────────────────────────────────────┘
```

---

# BLOQUE T
# ALERTA CRÍTICA

## Componente E18

```text
┌─────────────────────────────────────────────┐
│ ⚠ REQUIERE PROFUNDIZACIÓN                  │
│                                             │
│ Esta dimensión presenta indicadores que     │
│ justifican profundizar durante entrevista.  │
│                                             │
│ Esto no significa automáticamente que el    │
│ candidato realizará una conducta indebida.  │
│                                             │
│ [ VER FACTORES ]                            │
└─────────────────────────────────────────────┘
```

Esto protege de interpretaciones simplistas.

---

# BLOQUE U
# CALIDAD DE APLICACIÓN

## Pantalla / card E19

```text
Calidad de aplicación

✓ Adecuada

Indicadores de validez
✓ Azarosidad            Sin alerta
✓ Omisión               Sin alerta
✓ Aquiescencia          Sin alerta
✓ Contradicción         Sin alerta
✓ Deseabilidad Social   Sin alerta

Verificación de identidad
✓ Correcta

Eventos técnicos
2 cambios de pestaña registrados
```

Si hay observaciones:

**Con observaciones**

No mostrar detalles irrelevantes.

### Regla de invalidación

Si algún indicador de validez se activa, el IGI y/o la dimensión afectada se muestran en **gris** con una advertencia visible. La invalidación **nunca** oculta ni recalcula el valor real.

---

# BLOQUE V
# EVIDENCIA FOTOGRÁFICA

## Pantalla E20

Solo usuarios autorizados.

```text
Verificación durante la aplicación

[ FOTO 1 ] [ FOTO 2 ] [ FOTO 3 ] [ FOTO 4 ]

[ FOTO 5 ] [ FOTO 6 ] [ FOTO 7 ] [ FOTO 8 ]

IA de verificación:
✓ Sin anomalías relevantes
```

Si IA detecta algo:

> Posible anomalía detectada. Revisión recomendada.

Nunca:

> “El candidato mintió.”

---

# BLOQUE W
# RECOMENDACIÓN GLOBAL

## Pantalla E21

```text
Conclusión de evaluación

[ REVISIÓN RECOMENDADA ]

El perfil presenta resultados favorables en la mayoría
de dimensiones evaluadas, con áreas específicas que
conviene profundizar durante entrevista.

Principales áreas:

• Soborno
• Mentira

Sugerimos utilizar las preguntas de entrevista incluidas
antes de tomar una decisión final.

⚠ El IGI no debe ser el único criterio de la decisión
final de contratación, promoción o desvinculación.
```

No:

**APROBADO / RECHAZADO**

---

# BLOQUE X
# COMPARADOR

## Pantalla E22

```text
Comparación – Gerente Comercial

                 Juan     Ana      Luis
IGI (0–95)        78       84       69

Robo (0–100)      84       90       75
Mentira           67       82       61
Fraude            78       88       65
Irresponsabilidad 82       85       71
Soborno           55       76       60

Alertas            2        0        3

Calidad          Buena    Buena    Obs.
```

### Regla

Solo comparar dimensiones equivalentes. El IGI se calcula en escala 0–95; los puntajes por dimensión, en escala 0–100 — nunca combinar ambas escalas en un mismo eje visual.

---

# BLOQUE Y
# CONFIGURACIÓN DE COMPARACIÓN

## Modal E23

```text
¿Qué deseas comparar?

☑ IGI
☑ Robo
☑ Mentira
☑ Fraude
☑ Irresponsabilidad
☐ Soborno

[ APLICAR ]

Esta configuración quedará registrada.
```

---

# BLOQUE Z
# HISTORIAL DE REPORTES

## Pantalla E24

```text
Juan Pérez – Historial

14 Sep 2026
Reporte profesional
Vigente
Versión instrumento 2.1
[ VER ]

10 Feb 2026
Reporte profesional
Histórico
Versión instrumento 1.8
[ VER ]
```

Nunca sobrescribir.

---

# BLOQUE AA
# DIMENSIÓN VENCIDA ACEPTADA

## Componente E25

```text
⚠ Resultado vencido

Dimensión: Deudas

Última aplicación:
10 Ene 2026

La plataforma recomendó realizar una nueva evaluación.

Este resultado fue utilizado por decisión del profesional.

[ ACTUALIZAR DIMENSIÓN ]
```

---

# BLOQUE AB
# CRÉDITOS

## Pantalla E26

```text
Créditos

Saldo actual
184

Uso este mes
38

Reportes
24

Buscador de talento
8

Otros
6

[ COMPRAR CRÉDITOS ]
```

---

# BLOQUE AC
# USUARIOS Y PERMISOS

## Pantalla E27

```text
Usuarios

George Suasnavas
Administrador

Andrea Ruiz
RR. HH.
Puede:
✓ crear procesos
✓ ver reportes
✓ descargar PDF
✕ comprar créditos

Carlos Pérez
Solo lectura
```

---

# BLOQUE AD
# AUDITORÍA

## Pantalla E28

```text
Actividad del reporte

14 Sep 10:32
Andrea Ruiz
Abrió reporte

14 Sep 10:38
Andrea Ruiz
Descargó PDF

15 Sep 08:21
George Suasnavas
Consultó dimensión Soborno
```

---

# BLOQUE AE
# BUSCADOR DE TALENTO

## Pantalla E29

```text
Buscar talento

Cargo
[ Gerente Comercial ]

Ubicación
[ Quito ]

Experiencia
[ 5+ años ]

Industria
[ Tecnología ]

Arquetipo
[ Todos ]

Evaluación
[ Vigente y verificada ]

[ BUSCAR ]
```

---

# BLOQUE AF
# RESULTADOS ANONIMIZADOS

## Pantalla E30

```text
128 perfiles encontrados

Perfil #A8392

Gerente Comercial
Quito
8 años experiencia

Arquetipo: El Guardián

✓ Evaluación vigente
✓ Verificado

Dimensiones disponibles: 8

[ VER PERFIL ]
```

No mostrar nombre ni contacto inicialmente.

---

# BLOQUE AG
# DESBLOQUEAR TALENTO

## Pantalla E31

```text
Perfil #A8392

¿Quieres desbloquear este candidato?

Incluye:

✓ Nombre
✓ Datos de contacto
✓ Perfil profesional

El reporte de riesgos se adquiere por separado.

[ DESBLOQUEAR PERFIL ]
```

---

# BLOQUE AH
# PDF

## Estructura recomendada

### Página 1

- candidato;
- empresa;
- cargo;
- fecha;
- verificación;
- vigencia;
- arquetipo;
- gráfica general;
- resumen ejecutivo.

### Página 2

Cinco dimensiones base.

### Página 3

Dimensiones adicionales.

### Página 4+

Solo dimensiones que necesiten explicación adicional.

### Última página

- preguntas de entrevista;
- calidad de aplicación;
- advertencias;
- versión del instrumento.

Evitar PDFs de 30 páginas salvo necesidad.

---

# PRINCIPIOS UX DEL REPORTE

## 1. Resumen antes que detalle

El profesional debe entender el caso antes de leer diez páginas.

## 2. El IGI, el nivel y el semáforo son cosas distintas

Siempre distinguir:

**IGI 0–95** (con su IC 95% y el baremo contra el que se calculó cualquier percentil)

de

**Nivel de integridad 1–6 + semáforo (Rojo/Amarillo/Verde).**

Los puntajes por dimensión se calculan aparte, en escala 0–100.

## 3. Más puntaje siempre significa mejor

Mantener la misma dirección en todo el sistema: más alto = más íntegro, tanto en el IGI como en cada dimensión y en sus niveles.

## 4. No depender exclusivamente del color

Usar:

- texto;
- números;
- iconos;
- etiquetas.

## 5. Alertas deben ser accionables

Toda alerta debe responder:

**¿Qué significa?**

**¿Qué debo investigar?**

## 6. Nunca decidir automáticamente contratación

El profesional conserva la decisión.

## 7. Explicar sin revelar scoring

La empresa entiende el resultado, pero no las claves exactas.

---

# NAVEGACIÓN EMPRESARIAL

Menú principal recomendado:

**Inicio**

**Procesos**

**Candidatos**

**Talento**

**Reportes**

**Analytics**

**Configuración**

En esquina:

**Créditos**

**Cuenta**

---

# PROTOTIPO EMPRESARIAL MÍNIMO

Para probar el concepto empresarial en Figma no necesitamos diseñar todo.

Construir primero:

1. Dashboard.
2. Crear proceso.
3. Recomendación de dimensiones.
4. Candidato existente.
5. Perfil gratuito.
6. Desbloqueo.
7. Resumen ejecutivo.
8. Detalle de dimensión.
9. Comparación.
10. PDF preview.

Con estas diez vistas podemos probar prácticamente toda la propuesta de valor B2B.

---

# TEST UX CON PROFESIONALES

Preguntas que debemos observar, no preguntar únicamente:

### Dashboard

¿Encuentra rápidamente candidatos pendientes?

### Configuración

¿Entiende el nivel de puesto (1–6) y el ajuste por personal a cargo?

### Perfil existente

¿Comprende qué información puede reutilizar?

### Perfil gratuito

¿Entiende por qué debe pagar?

### Reporte profesional

¿Diferencia el IGI, los niveles de integridad y el semáforo?

### Alerta

¿Sabe qué hacer después?

### Comparador

¿Evita interpretar “primero = contratar”?

### PDF

¿Podría presentarlo internamente sin explicación adicional?

---

# MÉTRICAS UX EMPRESARIALES

Medir:

- tiempo para crear primer proceso;
- abandono durante configuración;
- dimensiones modificadas;
- tiempo hasta primer candidato;
- conversión de arquetipo gratuito a reporte pagado;
- tiempo de lectura del reporte;
- dimensiones abiertas;
- preguntas de entrevista consultadas;
- PDF descargados;
- comparaciones realizadas;
- segunda compra/reutilización.

---

# RESULTADO

Con este documento quedan definidas las dos experiencias principales del producto:

**Candidato**

y

**Empresa.**

A partir de aquí ya existe suficiente detalle para comenzar simultáneamente:

- prototipo UX en Figma;
- arquitectura de datos;
- especificación técnica;
- diseño del reporte;
- definición psicométrica del scoring.

---

Nota de reconciliación (2026-09-16): textos de pantalla ajustados para coincidir con el modelo de resultado y las reglas de producto vigentes (DECISIONS.md).