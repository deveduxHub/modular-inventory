# 01 — CEO Critique

> **Rol:** CEO. Foco: viabilidad de negocio, mercado, moat, capital, riesgo.
> **Postura:** Adversarial. Mi trabajo es matar la idea si no resiste.

---

## 🧨 Lo que me incomoda de lo que tenemos hoy

### 1. **No tenemos un ICP. Tenemos un "tipo de negocio".**
"Mayoristas y bodegueros" no es un segmento, es un mercado. La mamá del entrevistador (E1) y el mayorista cloud-savvy (E5) **no comprarían el mismo producto**, ni al mismo precio, ni por el mismo canal.

→ **Decisión forzada:** ¿ICP es **mayorista establecido con S/. 50K-500K stock mensual** (Edwin, E4, E5) o **bodeguero/micro-mayorista** (E1, E3)?
→ **Recomendación:** Empezar con **mayorista establecido**. Razones:
   - Tienen dinero para pagar
   - Tienen dolor real cuantificable (mercadería que se vence en cantidades grandes)
   - Si funciona ahí, baja al micro-mayorista con plan freemium
   - El micro-mayorista NO genera datos suficientes para entrenar el marketplace

### 2. **El moat real es el marketplace, no el inventario.**
Inventario es **commodity** — E5 ya tiene un sistema cloud completo, hay 30 SaaS de inventario en el mercado peruano, Excel funciona "suficientemente bien".

El moat es: **liquidez de proveedores ↔ mayoristas en una geografía concreta** (ej. Mercado El Avelino). Esto sí es network effect, sí es defensible, sí escala.

→ **El inventario es el caballo de Troya** para entrar al negocio. El marketplace es la moneda.

### 3. **El willingness-to-pay está condicionado, no confirmado.**
E5 y E6 dijeron "pagaría suscripción si aumenta mis ventas". Eso **no es validación**, es promesa. Hasta no tener un piloto con 5 mayoristas que paguen por 3 meses consecutivos, no tenemos PMF.

→ **No invertir en infraestructura cloud hasta validar pago.**

### 4. **El equipo no es una startup, es un proyecto familiar todavía.**
Veo que entrevistaron a la mamá y al hermano. Eso es bueno para iniciar pero **peligroso para escalar** — los sesgos de cariño van a inflar resultados. Cada decisión de PMF debe venir de **al menos 3 entrevistas con desconocidos** que NO conozcan al fundador.

### 5. **No hay análisis de competencia documentado.**
¿Qué pasa con Bsale, Defontana, Siigo, Loyverse, Vendus? ¿Qué pasa con WhatsApp Business + Excel (el competidor real)? Antes de gastar 1 sol en construir, necesitamos un mapa de competencia con precio + features + por qué fallan en ESTA geografía.

---

## ✅ Lo que sí me convence

- **El insight de "alertas de vencimiento" es un wedge perfecto.** 6/6 entrevistas lo confirman. Es la "función puerta" — el feature que justifica abrir la app y crea hábito diario.
- **El audio como input es diferenciador real.** Nadie en el mercado peruano lo está haciendo bien para inventario.
- **"El Avelino" mencionado espontáneamente** = thesis del marketplace geo-localizado tiene calle.

---

## 🎯 Tesis del CEO (lo que validaría con plata)

> **"Construimos un sistema de inventario mobile-first, ridículamente simple (audio + foto), gratuito por 6 meses, dirigido a mayoristas establecidos del Mercado El Avelino (o equivalente). Una vez que 30 mayoristas lo usan diariamente, encendemos el marketplace B2B entre ellos y cobramos un take-rate del 1-2% sobre transacciones gestionadas + suscripción premium para analytics."**

**Por qué esta tesis:**
- Wedge: alertas de vencimiento (validado 6/6)
- Diferenciador: audio + foto (no teclear)
- Adopción gratis: elimina barrera #1 (E4 no usa el suyo porque cuesta)
- Geo-concentración: garantiza liquidez del marketplace cuando llegue
- Modelo dual: take-rate + premium = upside grande

---

## 🚫 Lo que CANCELO desde el día 1

1. **Cancelo construir facturación electrónica (SUNAT).** Eso es comodity, hay 100 proveedores, no es nuestro problema. Integramos con uno cuando haya tracción.
2. **Cancelo "control de personal" y "control de transporte"** (mencionados por E6). Scope creep desde la primera reunión. NO.
3. **Cancelo desktop / web first.** Mobile-only o muerte. Estos clientes están en el mercado físico, no detrás de una laptop.
4. **Cancelo features "porque las pidieron":** E1 pidió que el sistema le calcule precios. Eso es nice-to-have, no wedge. Lo dejamos para Fase 3+.

---

## 📋 Mis 3 KPIs para los próximos 90 días

1. **Activación:** 20 mayoristas usando la app **al menos 4 días/semana** durante 4 semanas consecutivas.
2. **Retención:** 70% siguen activos al día 60 (sin pagar todavía).
3. **Señal de pago:** Al menos 5 mayoristas dicen explícitamente "te pago" cuando les anuncias el fin del periodo gratuito.

Si estos 3 KPIs no se cumplen, **pivot o muerte**. No más features.

---

## 💸 Capital requerido (back-of-envelope)

- Fase 0-1 (Discovery + MVP): **$0 — bootstrap con Claude + GitHub Pages + Vercel free**
- Fase 2 (Beta cerrada con 30 mayoristas): **~$2K** — Supabase pago, dominio, WhatsApp Business API, 1 community manager part-time
- Fase 3 (Marketplace + cobro): **~$15-25K** — incorporar 1 backend dev, pasarela de pagos, escalar infra
- Fase 4 (Expansión geo): **Levantar ronda seed cuando haya MRR de $5K+**

→ Siguiente paso: `02_PRODUCT_MANAGER_CRITIQUE.md`
