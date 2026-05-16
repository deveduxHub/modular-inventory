# 04 — North Star & Moat

> Consolidación de los critiques de CEO, PM y PL en una sola tesis ejecutable.

---

## 🌟 North Star Statement

> **"Le damos a cada mayorista del Perú una herramienta mobile-first, gratis para empezar, que registra mercadería por audio + foto en segundos y que evita la pérdida #1 del rubro: productos vencidos. Una vez instalada en un mercado entero, encendemos el marketplace B2B local y monetizamos el comercio que generamos."**

---

## 🎯 North Star Metric (NSM)

**"Productos activos siendo trackeados diariamente, por mayorista activo, por mercado geográfico."**

Esta métrica captura:
- Producto (productos trackeados) → uso real
- Adopción (mayoristas activos) → tracción
- Geografía (por mercado) → densidad para marketplace
- Diariamente → hábito = retención

---

## 🏰 Moat (capas de defensibilidad, en orden cronológico)

| Capa | Cuándo aparece | Qué la hace defensible |
|---|---|---|
| **Datos de inventario** | Fase 1 | Cada mayorista nos confía su stock — alta switching cost |
| **Hábito diario (alertas)** | Fase 1-2 | Notificación diaria útil = app abierta diariamente |
| **Catálogo enriquecido por uso** | Fase 2 | Cada SKU registrado mejora el reconocimiento de fotos/audio para todos |
| **Liquidez de marketplace geo** | Fase 3 | Network effect: cada mayorista nuevo aumenta valor para todos en su mercado |
| **Predicción de demanda** | Fase 4 | Datos cruzados de N mayoristas = mejor predicción que cualquier mayorista solo |
| **Brand / "El sistema de mi mercado"** | Fase 4+ | Identidad geo-local: "el sistema del Avelino" |

---

## 🚀 Modelo de Negocio (refinado)

### Stream 1 — Freemium / Suscripción
- **Free forever:** Inventario + 1 alerta diaria + 50 SKUs
- **Pro (~S/. 49-79/mes):** SKUs ilimitados + alertas avanzadas + reportes + analytics + WhatsApp summary
- **Business (~S/. 149-249/mes):** Multi-sucursal + multi-usuario + API + soporte priorizado

### Stream 2 — Marketplace take-rate
- **1-2% sobre transacciones B2B gestionadas** dentro del marketplace
- Solo cobramos sobre **órdenes confirmadas** (no leads)
- Cero comisión los primeros 6 meses post-lanzamiento del marketplace (para crear liquidez)

### Stream 3 — Listings premium (futuro)
- Proveedores mayoristas pagan para destacar en búsquedas
- Modelo Mercado Libre adaptado a B2B local

---

## 📊 Targets de 12 meses

| Mes | Mayoristas activos | MRR | Mercado(s) cubierto(s) |
|---|---|---|---|
| 3 | 5 (piloto familia + cercanos) | S/. 0 | El Avelino (núcleo) |
| 6 | 30 (un mercado entero) | S/. 0 | El Avelino |
| 9 | 100 | S/. 2K-5K | El Avelino + 1 nuevo |
| 12 | 300 | S/. 15K-30K | 3 mercados de Lima |

---

## 🎯 ICP (Ideal Customer Profile) v1

### Demográfico
- **Edad:** 35-60 años
- **Ubicación:** Mercado mayorista de Lima (El Avelino, Caquetá, Manzanilla, etc.)
- **Stock mensual:** S/. 50K a S/. 500K
- **Empleados:** 1-5 personas
- **Smartphone:** Sí, Android (gama media)

### Psicográfico
- Lleva 5+ años en el rubro
- Vende a otros bodegueros (no consumidor final mayormente)
- Tiene "memoria viva" de su stock pero pierde productos cada mes por vencimiento
- Ya intentó Excel o un sistema y "lo dejó por tedioso"
- Comprometido con su negocio (no buscando salida)

### Behavioral
- Usa WhatsApp diariamente para clientes
- Cobra mayormente en efectivo + transferencia (Yape/Plin)
- Acepta tecnología si: 1) es claramente útil, 2) no roba tiempo, 3) le hace ganar plata visible
- Recela de pagar suscripción sin ver ROI

---

## 🛡️ Riesgos Estratégicos & Mitigaciones

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Competidor con más capital copia | MEDIA | Velocidad + densidad geo. Para cuando copien, ya tenemos el mercado |
| Mayoristas no adoptan mobile | BAJA-MEDIA | Validar en 5 más antes de codear. Plan B: WhatsApp Bot |
| Marketplace no genera liquidez | ALTA | NO construir hasta Fase 3 + tener 30 mayoristas activos. Simulacro con "proveedores destacados" antes |
| Pérdida de datos del usuario | CRÍTICA | Offline-first + sync + backups + export a CSV/PDF |
| Regulación (SUNAT, datos personales) | MEDIA | No tocar facturación electrónica directamente. Datos: cumplir Ley de Protección de Datos |

---

## ✅ Checklist de Listo-para-Construir

- [x] Insights de campo cristalizados (`00_INSIGHTS.md`)
- [x] CEO critique completa (`01_CEO_CRITIQUE.md`)
- [x] PM critique completa (`02_PRODUCT_MANAGER_CRITIQUE.md`)
- [x] PL critique completa (`03_PRODUCT_LEAD_CRITIQUE.md`)
- [x] North Star + Moat definidos (este documento)
- [ ] Design System construido → siguiente entregable
- [ ] Builder Guide reorganizado por fases con XMLs → siguiente
- [ ] 5 entrevistas adicionales con desconocidos → tarea de campo (no técnica)

---

→ Avanzar a: construir `/design-system/` y `/builder-guide/`
