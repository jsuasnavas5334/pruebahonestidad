# MATRIZ RACI + ROADMAP EJECUTIVO V1

## 1. Objetivo

Definir claramente:

- quién decide;
- quién ejecuta;
- quién valida;
- quién debe ser consultado;
- qué frentes avanzan en paralelo;
- qué hitos deben alcanzarse antes del piloto.

La intención es evitar que durante desarrollo aparezcan decisiones contradictorias entre producto, tecnología, psicometría, UX, legal y comercial.

---

# 2. Roles principales

## PO – Product Owner

Responsable de visión, alcance y priorización.

Decide:

- qué entra al producto;
- qué entra al MVP;
- prioridades;
- experiencia general;
- reglas funcionales.

---

## PSY – Psicometría

Responsable técnico del instrumento.

Decide o valida:

- reactivos;
- dimensiones;
- scoring;
- calidad;
- cortes;
- normas;
- arquetipos;
- interpretación psicométrica.

---

## TECH – Tech Lead / Arquitectura

Responsable tecnológico.

Decide:

- arquitectura;
- backend;
- frontend;
- seguridad técnica;
- datos;
- integraciones;
- escalabilidad.

---

## UX – UX/UI

Responsable de:

- experiencia candidato;
- experiencia empresa;
- wireframes;
- prototipos;
- design system;
- pruebas de usabilidad.

---

## DEV – Desarrollo

Responsable de:

- implementación;
- tests;
- integraciones;
- correcciones.

---

## QA – Quality Assurance

Responsable de:

- pruebas;
- regresión;
- validación funcional;
- E2E;
- defectos.

---

## LEGAL – Legal / Privacidad

Responsable de validar:

- privacidad;
- consentimientos;
- cámara;
- documento;
- datos sensibles;
- jurisdicciones;
- términos.

---

## COM – Comercial

Responsable de:

- precios;
- paquetes;
- créditos;
- pilotos;
- feedback empresarial.

---

## OPS – Operaciones / Soporte

Responsable de:

- incidencias;
- usuarios;
- reaplicaciones;
- soporte;
- operación diaria.

---

# 3. Significado RACI

**R – Responsible**

Ejecuta.

**A – Accountable**

Tiene la responsabilidad final y aprueba.

**C – Consulted**

Debe ser consultado.

**I – Informed**

Debe estar informado.

---

# 4. Matriz RACI principal

| Área | PO | PSY | TECH | UX | DEV | QA | LEGAL | COM | OPS |
|---|---|---|---|---|---|---|---|---|---|
| Visión del producto | A | C | C | C | I | I | C | C | I |
| Alcance MVP | A | C | C | C | I | I | C | C | I |
| Banco de reactivos | C | A/R | I | C | I | I | C | I | I |
| Scoring | C | A/R | C | I | R | C | I | I | I |
| Seis niveles de riesgo | C | A/R | C | I | R | C | I | I | I |
| Quality Engine | C | A/R | C | I | R | C | I | I | C |
| Arquetipos | A | R | C | R | I | C | I | C | I |
| UX candidato | A | C | C | R | I | C | C | I | C |
| UX empresa | A | C | C | R | I | C | I | C | C |
| Arquitectura técnica | C | C | A/R | I | R | C | C | I | I |
| Modelo de datos | C | C | A/R | I | R | C | C | I | I |
| Seguridad | I | C | A/R | I | R | C | C | I | I |
| Privacidad | C | C | C | C | I | I | A/R | I | I |
| Cámara | C | C | R | R | R | C | A | I | C |
| Reporte profesional | A | R | C | R | R | C | C | C | I |
| PDF | A | C | R | R | R | C | I | C | I |
| Créditos | A | I | C | C | R | C | C | R | I |
| Pricing | A | I | I | I | I | I | C | R | I |
| Piloto psicométrico | C | A/R | C | C | I | C | C | I | C |
| Piloto empresarial | A | C | C | C | I | C | C | R | R |
| Soporte | C | I | C | C | R | C | I | I | A |
| Analytics | A | C | R | C | R | C | C | C | I |
| Release final | A | C | R | C | R | R | C | C | C |

---

# 5. Decisiones que nunca debe tomar desarrollo solo

Desarrollo no puede decidir unilateralmente:

- cambiar scoring;
- modificar un corte;
- cambiar peso psicométrico;
- alterar vigencia;
- modificar significado de un arquetipo;
- eliminar una dimensión;
- cambiar privacidad;
- exponer nuevos datos a empresas;
- transformar una alerta en decisión automática.

Debe existir aprobación correspondiente.

---

# 6. Decisiones que psicometría no debe tomar sola

Psicometría tampoco debe definir unilateralmente:

- precio;
- UX;
- arquitectura;
- flujo de pago;
- estructura empresarial;
- permisos;
- prioridades comerciales.

El instrumento es central, pero forma parte de un producto mayor.

---

# 7. Comité técnico de producto

Para decisiones críticas:

- PO;
- PSY;
- TECH.

Cuando corresponda:

- LEGAL;
- UX.

Este comité aprueba:

- cambios de scoring;
- cambios de instrumento;
- nuevos risk bands;
- modificaciones metodológicas;
- nuevas dimensiones productivas;
- cambios relevantes de interpretación.

---

# 8. Roadmap ejecutivo

El roadmap se organiza en siete grandes hitos.

No en decenas de documentos.

---

# HITO 1
## Núcleo técnico

### Objetivo

Demostrar que el sistema funciona de extremo a extremo.

Construir:

- registro;
- OTP;
- privacidad;
- evaluación demo;
- persistencia;
- scoring demo;
- resultado demo.

### Resultado

**Vertical Slice 0.1**

---

# HITO 2
## Evaluación Base

Incorporar:

- 5 dimensiones (las 5 Base: Robo, Mentira, Fraude, Irresponsabilidad, Soborno);
- 50 reactivos (subconjunto ya escrito y validado del banco cerrado de 210 reactivos × 5 variantes — ver DECISIONS.md; esto es contenido existente que hay que cargar/administrar, no contenido pendiente de crear);
- controles (Deseabilidad Social, Azarosidad, bio-data, también ya escritos);
- randomización;
- Quality Engine (5 indicadores de validez: Azarosidad, Omisión, Aquiescencia, Contradicción, Deseabilidad Social);
- score 0–95;
- 6 bandas (niveles de resultado).

### Resultado

**Psychometric Alpha**

---

# HITO 3
## Experiencia candidato

Incorporar:

- cámara;
- arquetipo;
- perfil;
- vigencia;
- compartir;
- recuperación de sesión.

### Resultado

**Candidate Alpha**

---

# HITO 4
## Producto empresarial

Incorporar:

- organizaciones;
- procesos;
- cargos;
- exigencia 1–6;
- invitaciones;
- perfil gratuito;
- reporte profesional.

### Resultado

**Enterprise Alpha**

---

# HITO 5
## Monetización

Incorporar:

- créditos;
- desbloqueo;
- pago;
- PDF;
- historial.

### Resultado

**Commercial Alpha**

---

# HITO 6
## Seguridad y operación

Incorporar:

- backoffice;
- auditoría;
- soporte;
- permisos;
- backups;
- hardening;
- analytics.

### Resultado

**Pilot Ready**

---

# HITO 7
## Piloto

### Candidato

Validar:

- finalización;
- tiempos;
- cámara;
- comprensión;
- arquetipo.

### Psicometría

Validar:

- reactivos;
- confiabilidad;
- discriminación;
- scoring;
- arquetipos.

### Empresa

Validar:

- reporte;
- utilidad;
- entrevistas;
- disposición de pago.

### Resultado

**Release Candidate**

---

# 9. Frentes paralelos

Durante desarrollo deben avanzar simultáneamente cuatro frentes.

## Producto / UX

- Figma;
- textos;
- pruebas de usuario.

## Tecnología

- plataforma;
- scoring;
- infraestructura.

## Psicometría

- reactivos;
- claves;
- cortes;
- arquetipos.

## Negocio / Legal

- pilotos;
- pricing;
- privacidad;
- contratos.

---

# 10. Gate 1 – Antes de programar scoring real

Debe existir:

- banco base (ya existe: 210 reactivos × 5 variantes + 63 alternativos × 5 variantes + controles de Deseabilidad Social/Azarosidad/bio-data — ver DECISIONS.md; no es un entregable pendiente de psicometría, es contenido ya cerrado que debe integrarse al sistema);
- claves;
- dirección de reactivos;
- fórmula del IGI (ya definida y no es provisional: PRB → multiplicador de nivel de puesto → riesgo ajustado → IGI = (1 − riesgo_ajustado) × 100 × 0.95, tope 95);
- cortes/umbrales de las 6 bandas (estos sí siguen siendo provisionales hasta la calibración con datos del piloto);
- regla de normalización.

Sin esto:

no cerrar Scoring V1.

---

# 11. Gate 2 – Antes de mostrar resultados reales

Debe existir:

- Quality Engine;
- 6 bandas provisionales;
- reglas de arquetipo;
- textos controlados.

---

# 12. Gate 3 – Antes del piloto empresarial

Debe existir:

- privacidad;
- cámara;
- seguridad;
- tenant isolation;
- auditoría;
- reporte congelado.

---

# 13. Gate 4 – Antes de cobrar

Debe existir:

- producto estable;
- reporte usable;
- créditos;
- pago;
- registro financiero;
- soporte mínimo.

---

# 14. Gate 5 – Antes de escalar

Debe existir evidencia de:

- uso recurrente;
- valor empresarial;
- estabilidad;
- desempeño psicométrico;
- conversión comercial.

Solo después tiene sentido invertir fuerte en:

- WhatsApp completo;
- buscador;
- API;
- SSO;
- ATS;
- HRIS;
- white-label.

---

# 15. Qué NO hacer todavía

No priorizar ahora:

- 21 dimensiones totalmente productivas;
- API pública;
- buscador de talento;
- machine learning;
- evaluación adaptativa;
- multi-cloud;
- arquitectura compleja de microservicios;
- expansión masiva regional.

Primero demostrar el núcleo.

---

# 16. Indicadores ejecutivos

El proyecto debe poder resumirse con diez indicadores.

### Producto

1. Completion Rate.
2. Tiempo medio de evaluación.

### Calidad

3. Non-Interpretable Rate.

### Candidato

4. Camera Acceptance.
5. Share Rate.

### Empresa

6. Report Unlock Rate.
7. Repeat Usage.

### Comercial

8. Revenue / Reports.

### Tecnología

9. Error Rate.

### Psicometría

10. Reliability / desempeño de reactivos.

---

# 17. Reuniones recomendadas

## Weekly Product

PO + UX + TECH + PSY.

30–45 min.

Objetivo:

bloqueos y decisiones.

## Sprint Planning

Equipo técnico.

## Psychometric Review

PSY + PO + TECH cuando existan cambios metodológicos.

## Pilot Review

Producto + psicometría + comercial.

Evitar reuniones innecesarias.

---

# 18. Ownership final

### Producto

Product Owner.

### Instrumento

Psicometría.

### Plataforma

Tech Lead.

### Experiencia

UX/UI.

### Seguridad técnica

Tech Lead.

### Privacidad

Legal.

### Comercial

Commercial Lead.

### Operación

Operations.

---

# 19. Regla de escalamiento

Una decisión se escala únicamente si afecta:

- medición;
- datos;
- privacidad;
- seguridad;
- arquitectura;
- precio;
- experiencia central.

No escalar detalles menores de ejecución.

---

# 20. Roadmap resumido

```text id="qxhj1m"
0.1 Vertical Slice
      ↓
0.2 Evaluación Base
      ↓
0.3 Candidate Alpha
      ↓
0.4 Enterprise Alpha
      ↓
0.5 Commercial Alpha
      ↓
0.6 Pilot Ready
      ↓
Pilot
      ↓
1.0 Release Candidate
```

---

# 21. Resultado

Con la matriz RACI queda definido:

**quién manda en cada decisión.**

Con el roadmap queda definido:

**qué debe construirse primero.**

Esto reduce:

- duplicidad;
- decisiones improvisadas;
- discusiones entre áreas;
- desarrollo innecesario;
- cambios sin aprobación.

A partir de este punto el proyecto ya puede pasar a ejecución con un equipo real.

---

**Nota de reconciliación (2026-09-16):** ajustado para coincidir con el banco de reactivos y el modelo de cálculo vigentes (DECISIONS.md).