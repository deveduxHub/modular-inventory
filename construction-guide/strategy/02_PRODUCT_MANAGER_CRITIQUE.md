# 02 — Product Manager Critique

> **Rol:** Product Manager. Foco: roadmap, priorización, scope, métricas de producto, riesgos de entrega.
> **Postura:** Pragmático. Mi trabajo es hacer aterrizar la tesis del CEO en entregables semanales.

---

## 🎯 Aceptando la tesis del CEO, traduzco a producto

**ICP:** Mayorista establecido (S/. 50K-500K stock mensual), ubicado en mercado concentrado geográficamente, con smartphone Android.

**Wedge:** Alertas de vencimiento + registro por audio.

**North Star Metric:** **Productos activos siendo trackeados diariamente** (proxy de hábito + dato para marketplace).

---

## ⚠️ Mis Top 5 Riesgos de Producto

### R1 — El registro por audio NO funciona bien en español peruano + ruido de mercado
Probabilidad: ALTA. Impacto: KILLER del wedge.

**Mitigación:**
- Validar con Whisper API (OpenAI) o Google Speech-to-Text usando 10 audios reales grabados EN el mercado (con ruido)
- Si fallan, fallback a **OCR de foto de boleta/factura del proveedor** (más confiable)
- Plan B: input por foto + tap rápido en grilla de productos frecuentes

### R2 — La gente NO sabe leer fechas de vencimiento de productos viejos
Algunos productos peruanos tienen fecha de producción + lote, no vencimiento directo.

**Mitigación:**
- Permitir input flexible: "vence en X días/semanas/meses desde hoy"
- Catálogo precargado con vida útil estándar por categoría (lácteos=30 días, abarrotes secos=180 días, etc.)
- Asumir vida útil estándar cuando no se ingresa

### R3 — El catálogo de productos es un problema irresoluble desde el día 1
Hay 50,000 SKUs en un mayorista. Si pedimos al usuario que registre cada uno desde cero, abandona en 5 minutos.

**Mitigación:**
- Catálogo precargado con **top 500 SKUs del Perú** (Costeño, Gloria, Primor, Pilsen, etc.)
- Búsqueda fuzzy por nombre o marca
- Si no existe → "Crear producto rápido" con solo 3 campos (nombre, marca, unidad)
- Usar imágenes de etiquetas de productos para reconocer (Vision API)

### R4 — Las alertas serán ignoradas (notification blindness)
Si bombardeamos con notificaciones, las silencian → muere el wedge.

**Mitigación:**
- Máximo **1 notificación diaria consolidada** (8am: "Tienes 3 productos por vencer y 2 con stock crítico")
- Notificaciones push solo para urgencia real (vencimiento en <48h)
- Resumen semanal por WhatsApp Business

### R5 — Marketplace sin liquidez = ciudad fantasma
Si lanzamos marketplace antes de tener 30+ mayoristas activos, será un cementerio.

**Mitigación:**
- Marketplace NO se construye hasta Fase 3
- Mientras tanto, simular liquidez con "proveedores destacados" (manuales) para validar interés
- Tracker de "búsquedas de productos no disponibles" para saber qué proveedores reclutar primero

---

## 📦 Roadmap por Fases (Product View)

### **Fase 0 — Discovery + Design** (Semanas 1-2)
- Síntesis de entrevistas ✅ (hecho)
- Critique estratégico ✅ (en progreso)
- Design System completo ⏳
- Validar con 5 mayoristas adicionales (no familiares)
- Prototipo navegable (HTML/React)

**Output:** Prototipo clickable + design system + spec definitivo de MVP

### **Fase 1 — MVP "Solo Inventario"** (Semanas 3-6)
**Scope:**
- M1: Onboarding (3 pantallas máx)
- M2: Catálogo precargado + búsqueda
- M3: Entrada de mercadería (audio + foto + manual)
- M4: Vista de stock actual
- M5: Alertas de vencimiento (la función puerta)
- M6: Dashboard ultra-simple (3 KPIs)

**Out of scope:** Ventas, deudas, proveedores, marketplace

**Métrica de éxito:** 20 mayoristas registrando entradas 4+ días/semana

### **Fase 2 — "Vendí y Cobré"** (Semanas 7-10)
- M7: Registro de ventas (rápido, por audio o tap)
- M8: Cálculo automático de ganancia por producto
- M9: Cuentas por cobrar (deudas de clientes)
- M10: Reporte semanal por WhatsApp

**Métrica de éxito:** 30 mayoristas registrando ventas. 5 dispuestos a pagar.

### **Fase 3 — Marketplace B2B** (Semanas 11-16)
- M11: Perfil de mayorista público (catálogo visible)
- M12: Buscador de proveedores por producto + ubicación
- M13: Chat / pedido entre mayoristas
- M14: Modelo de cobro: take-rate sobre transacciones gestionadas (1-2%)
- M15: Suscripción premium (analytics + alertas avanzadas)

**Métrica de éxito:** MRR de $1,000+ + 10 transacciones B2B/semana

### **Fase 4 — Inteligencia + Expansión** (Semanas 17+)
- M16: Sugerencias de reposición basadas en histórico
- M17: Predicción de demanda
- M18: Expansión a 2do mercado (validar repetibilidad)
- M19: API para integraciones (POS, contabilidad)

---

## 🧪 Hipótesis a Validar (Pre-MVP)

| # | Hipótesis | Cómo validar | Resultado esperado |
|---|---|---|---|
| H1 | Alertas de vencimiento generan hábito diario | 5 mayoristas usan prototipo 1 semana | 4/5 abren la app diario |
| H2 | Registro por audio reduce fricción >50% | A/B con 5 vs 5 mayoristas | Audio: 30s/entrada vs Manual: 90s |
| H3 | Mayoristas pagarían $20-50 USD/mes | Anuncio de "pre-orden" con compromiso | 5/30 dicen sí |
| H4 | Mayoristas usarían marketplace para pedir a otros mayoristas | Mockup + intent survey | 40% dicen "lo usaría" |
| H5 | El catálogo precargado cubre 80% de productos de un mayorista | Análisis de SKUs reales en bodega de E2 o E5 | Cobertura >70% |

---

## 🛠️ Decisiones de Producto Forzadas

| Decisión | Opción A | Opción B | **Mi elección** | Razón |
|---|---|---|---|---|
| Plataforma | Web PWA | App nativa | **PWA mobile-first** | Cero fricción de instalación, actualización inmediata |
| Auth | Email + password | WhatsApp OTP | **WhatsApp OTP** | Es el canal que ya usan |
| Datos offline | Sync diaria | Offline-first | **Offline-first** | Conectividad de mercado es inestable |
| Idioma | Solo español PE | Multi | **Español PE neutro** | "Saco", "lata", "fardo" — vocabulario local |
| Onboarding | Tutorial largo | "Aprende usando" | **Aprende usando** | E4 abandonó su sistema por tedio |

---

## 🎚️ Definition of Done (por feature)

Una feature NO se considera "done" hasta:
- [ ] Spec escrita en `SPEC_[MODULO].xml` (formato del builder-guide)
- [ ] Componentes existen en design system o se añaden
- [ ] State agent: estructura de datos + métodos puros
- [ ] Evaluator: visual + UX + responsive + state-consistency
- [ ] Tested con al menos 1 mayorista real (no familiar)
- [ ] Memory agent actualizado (decisiones nuevas registradas)

---

→ Siguiente: `03_PRODUCT_LEAD_CRITIQUE.md`
