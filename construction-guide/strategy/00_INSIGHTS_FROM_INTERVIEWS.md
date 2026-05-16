# 00 — Insights de Entrevistas (Discovery)

> Síntesis cruda de 6 entrevistas a mayoristas/bodegueros del mercado.
> **Propósito:** No avanzar a estrategia sin tener evidencia de campo cristalizada.

---

## Perfiles entrevistados

| # | Perfil | Nivel de digitalización | Tipo |
|---|---|---|---|
| E1 | Mamá (bodeguera/mayorista pequeña) | 0 — Todo en cabeza | Sin sistema |
| E2 | Edwin (mayorista mediano) | 1 — Mixto papel/computadora | Inventario manual mensual |
| E3 | Comerciante (entrevistado breve) | 0 — No hace inventario | "Difícil" |
| E4 | Mayorista experimentado | 1 — Tiene sistema, no lo usa | Manual por tedio |
| E5 | Mayorista grande / formal | 4 — Sistema cloud completo | Kardex + facturación + clientes |
| E6 | Hermano/socio (Pablo) | — | Visión de empresa grande |

---

## 🔥 Pain Points Recurrentes (Frequency × Severity)

### P1 — "No sé cuánto tengo" (Inventario invisible)
- **E1:** "No los registro" / "Siempre" vende lo que no tiene
- **E3:** No hace inventario, lo considera "difícil"
- **E4:** Tiene sistema pero "es tedioso", no lo usa
- **Solo E2 y E5** dicen saber su stock — pero E2 actualiza cada mes y E5 paga sistema cloud
- **Severidad: ALTA** — afecta ventas perdidas + sobrecompra

### P2 — Vencimientos descontrolados
- **E1:** "Trato que no se venza" (no es control, es esperanza)
- **E2:** Lo tiene "mecanizado en la mente"
- **E3:** Se entera "al hacer limpieza"
- **E4:** "Si te vence ya tienes que botarlo"
- **TODOS sin excepción** dijeron que les gustaría **alertas de vencimiento**
- **E1 específicamente pidió: "un mes antes"**
- **Severidad: ALTA** — pérdida directa de dinero + grandes empresas (Backus, etc.) ya no aceptan cambio

### P3 — Precios sin lógica clara
- **E1:** Margen mínimo del 5% (no baja de ahí)
- **E2:** "Depende del porcentaje que suba"
- **E4:** Variable por rotación (alta rotación = margen bajo 2-3%, baja rotación = margen alto 10-20%)
- **E5:** Habla de "utilidad antes de impuestos e intereses" — sofisticación contable real
- **Severidad: MEDIA** — saben improvisar, pero no saben cuánto ganan en realidad por SKU

### P4 — Comparar proveedores es manual
- **TODOS:** Sí comparan precios entre proveedores
- **TODOS:** Han comprado caro al menos una vez por falta de opciones
- **TODOS:** Quieren ver más opciones más fácil
- **E4:** Acepta diferencias mínimas (relación con proveedor importa), no exageradas
- **Severidad: ALTA** — oportunidad clara de marketplace

### P5 — Querer crecer sin vendedores físicos
- **E4:** Abierto a redes sociales para promocionarse
- **E5:** Pagaría suscripción si aumentan ventas — "costo-beneficio"
- **E6 (Pablo/hermano):** "Es como pagar un impuesto si hay ganancia" — willingness-to-pay validado
- **E4 + E5:** Idea de "plataforma del mercado de Avelino" resonó fuerte
- **Severidad: OPORTUNIDAD** — esto es el modelo de negocio

---

## 💡 Insights No-Obvios

1. **El sistema actual (E5) ya hace todo el "core" — y aun así el cliente quiere más.**
   E5 tiene kardex, alertas de stock, facturación, clientes con morosidad… y lo que pide es **CRM proactivo** ("qué clientes ya no me compran"). → El inventario no es el moat; el **insight de cliente y mercado** sí.

2. **La fricción no es funcionalidad, es UX.**
   E4 tiene un sistema y NO lo usa porque es "tedioso". E5 admite que necesita capacitación. → La barrera de adopción es la curva de aprendizaje, no la falta de features.

3. **El audio es un wedge potencial.**
   E4 saltó cuando le mencionaron registro por audio. Los mayoristas no quieren teclear — quieren hablar mientras desempacan cajas.

4. **Hay dos segmentos muy distintos en una sola palabra ("mayorista"):**
   - **Bodegueros informales (E1, E3):** Quieren simplicidad extrema. Free or freemium.
   - **Mayoristas establecidos (E4, E5):** Quieren ventaja competitiva. Suscripción con ROI claro.
   - Esto fuerza decisión de **ICP** desde el día 1.

5. **"El Avelino" como mercado virtual fue mencionado espontáneamente.**
   Network effects geo-localizados. Un mayorista solo no compra; un mercado entero migra junto.

---

## 🎯 Jobs To Be Done (JTBD)

| Cuando estoy… | Quiero… | Para… |
|---|---|---|
| Recibiendo mercadería | Registrar lo que entra rápido (sin teclear) | No perder tiempo + tener stock al día |
| Por la mañana abriendo el negocio | Ver qué se vence pronto | Rematarlo antes de perder dinero |
| Atendiendo un cliente | Saber si tengo el producto y a qué precio | No prometer lo que no tengo |
| Decidiendo qué reponer | Ver qué se mueve y qué no | Comprar inteligente, no por intuición |
| Buscando proveedor | Comparar precios sin llamar a 5 personas | Comprar más barato sin perder calidad |
| Queriendo crecer | Que me encuentren clientes nuevos | Aumentar ventas sin contratar vendedores |

---

## ⚠️ Anti-Patterns (Lo que NO hacer)

- ❌ Construir "otro ERP completo": E5 ya tiene uno y aún así sufre.
- ❌ UI con muchos campos: E1, E3 no tocarían un form de 12 inputs.
- ❌ Asumir que saben "margen de ganancia" como concepto: E1 dice "5%" pero E4 piensa por rotación. Diseñar la UX en lenguaje natural ("¿Cuánto ganas por cada saco?").
- ❌ Cobrar antes de demostrar ROI: E5 y E6 pagan **solo si** las ventas suben.

---

## ✅ Validaciones para North Star

- [x] Hay pain real (no inventado) — 6/6 entrevistas confirman
- [x] Hay willingness-to-pay — E5 y E6 explícitos
- [x] Hay un wedge de adopción (alertas de vencimiento) — 6/6 dijeron "sí me gustaría"
- [x] Hay un moat futuro (marketplace geo) — surgió espontáneamente
- [ ] **Falta validar:** ¿qué % de mayoristas tiene smartphone como herramienta de trabajo?
- [ ] **Falta validar:** ¿cuánto pagarían por mes? (E5/E6 no dieron número)

→ Siguiente paso: `01_CEO_CRITIQUE.md`
