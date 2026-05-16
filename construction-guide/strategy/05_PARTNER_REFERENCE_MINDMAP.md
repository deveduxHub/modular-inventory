# Referencia del Socio — Estructura Funcional de Inventario

> **Fuente:** Mindmap compartido por socio el 2026-05-11.
> **Propósito:** Capturar la visión "completa" del scope funcional como referencia. NO es el scope del MVP — sirve para mapear qué entra en cada fase.

---

## 🎯 Objetivo Principal (según socio)

Tener control total del inventario para:
- Evitar pérdidas
- Aumentar ganancias
- Tomar decisiones inteligentes
- Resolver problemas del día a día

**Clave del éxito:** Información clara + actualizada + fácil de usar = Control total y negocio rentable

---

## 🗂️ Los 7 Pilares de la Estructura Completa

### 1. Control de Productos
- **1.1 Información básica:** nombre, SKU/código, categoría, marca, presentación
- **1.2 Costos y precios:** costo de adquisición, precio de venta, margen, impuestos
- **1.3 Unidades y medidas:** unidad de medida, conversión, peso/volumen
- **1.4 Proveedores:** nombre, contacto, condiciones de compra

### 2. Control de Existencias
- **2.1 Entradas:** fecha, cantidad, costo, proveedor, documento
- **2.2 Salidas:** fecha, cantidad, motivo (venta, merma, etc.), documento
- **2.3 Existencia actual:** stock disponible, reservado, mínimo, óptimo
- **2.4 Movimientos:** historial, trazabilidad, auditoría

### 3. Control de Vencimientos
- **3.1 Fechas importantes:** vencimiento, fabricación, vida útil
- **3.2 Alertas automáticas:** productos por vencer (30/15/7 días), vencidos, notificaciones
- **3.3 Reportes de vencimientos:** próximos a vencer, vencidos, rotación

### 4. Gestión de Compras
- **4.1 Requisiciones:** productos necesarios, cantidades, aprobaciones
- **4.2 Órdenes de compra:** proveedor, productos, cantidades, fechas, estado
- **4.3 Recepción:** validación, cantidades recibidas, calidad, almacenamiento

### 5. Ventas e Ingresos
- **5.1 Ventas:** registro, productos, cantidades, precios, clientes
- **5.2 Ingresos:** total ventas, impuestos, descuentos, pagos recibidos, saldo
- **5.3 Clientes:** datos, historial, crédito disponible, contacto
- **5.4 Devoluciones:** productos devueltos, motivo, reintegro, ajustes

### 6. Reportes e Inteligencia
- **6.1 Reportes básicos:** inventario actual, entradas/salidas, ventas, compras
- **6.2 Reportes avanzados:** rotación, top vendidos / menos vendidos, rentabilidad
- **6.3 Análisis financiero:** ganancias por período, costos, margen, impuestos
- **6.4 Dashboards:** KPIs, gráficos, resúmenes visuales, alertas importantes

### 7. Configuración y Seguridad
- **7.1 Usuarios y roles:** crear, roles (admin/vendedor/etc.), permisos
- **7.2 Seguridad:** accesos seguros, respaldos, auditoría
- **7.3 Configuración general:** empresa, impuestos, monedas, almacenes, parámetros

---

## 🎯 Problemas que resuelve (según socio)

- Pérdidas por vencimiento ✅
- Falta de control de existencias ✅
- Desorden en compras ✅
- No saber qué productos son rentables ✅
- Errores humanos ✅
- Falta de reportes claros ✅
- Problemas con impuestos
- Falta de información para decisiones ✅

## 🎁 Beneficios para el usuario (según socio)

- Ahorra tiempo
- Evita pérdidas
- Aumenta ganancias
- Control total del negocio
- Decisiones basadas en datos
- Negocio más organizado
- Crecimiento sostenible

---

## 🔄 Mapeo de los 7 pilares a NUESTRAS fases

> Aplicamos el criterio del CEO/PM: **NO construir todo el ERP**. Mapeamos cada pilar a la fase donde aterriza.

| Pilar del socio | Sub-elementos prioritarios | Fase nuestra | Justificación |
|---|---|---|---|
| **1. Productos** | 1.1 Info básica + 1.3 Unidades + 1.4 Proveedores | **Fase 1 (M2 Catálogo)** | Esencial para registrar entradas |
| **1. Productos** | 1.2 Costos y precios | **Fase 2 (M8 Ganancia)** | Requiere registro de ventas activo |
| **2. Existencias** | 2.1 Entradas + 2.3 Stock disponible | **Fase 1 (M3, M4)** | Core del MVP |
| **2. Existencias** | 2.2 Salidas | **Fase 2 (M7 Ventas)** | Stream paralelo a ventas |
| **2. Existencias** | 2.4 Movimientos / trazabilidad | **Fase 4** | Avanzado, no wedge |
| **3. Vencimientos** | 3.1 + 3.2 + 3.3 completo | **Fase 1 (M5 Alertas)** | ✨ EL WEDGE — máxima prioridad |
| **4. Compras** | 4.1 Requisiciones + 4.2 Órdenes | **Fase 3 (Marketplace)** | El marketplace ES esto, digitalizado |
| **4. Compras** | 4.3 Recepción | **Fase 1 (M3 Entrada)** | Es parte de "registrar entrada" |
| **5. Ventas** | 5.1 Ventas + 5.2 Ingresos | **Fase 2 (M7, M8)** | Stream 2 |
| **5. Ventas** | 5.3 Clientes con crédito | **Fase 2 (M9 Deudas)** | Validado por entrevista E5 |
| **5. Ventas** | 5.4 Devoluciones | **Fase 4** | Edge case, no wedge |
| **6. Reportes** | 6.1 + 6.4 Dashboards básicos | **Fase 1 (M6)** + **Fase 2 (M10 WhatsApp)** | Sí |
| **6. Reportes** | 6.2 Top vendidos / rotación | **Fase 2** | Requiere histórico |
| **6. Reportes** | 6.3 Análisis financiero | **Fase 3+** | Premium feature |
| **7. Config** | 7.1 Multi-usuario | **Fase 3 (premium tier "Business")** | Validado por E5 (sucursales) |
| **7. Config** | 7.2 Seguridad / respaldos | **Fase 2** | Auth WhatsApp + sync Supabase |
| **7. Config** | 7.3 Empresa / impuestos | **Fase 4** | Integración SUNAT — externalizable |

---

## ⚖️ Decisión: cómo usamos esto sin perder foco

**ACEPTAMOS** este mindmap como el **"árbol del producto completo a 24 meses"**.

**RECHAZAMOS** construirlo todo de una vez. El CEO critique sigue vigente:
> "El moat real es el marketplace, no el ERP de inventario. Inventario es el caballo de Troya."

**MOVIDA:** Usar este mindmap como **checklist de cobertura por fase**, no como roadmap. Cada vez que cerremos una fase, evaluamos contra estos 7 pilares cuánto cubrimos y qué falta.

---

## 🆕 Decisiones nuevas que el mindmap introduce (a añadir a memory)

- **PD-013:** Multi-almacén (pilar 7.3) — añadir como diferenciador del tier "Business" en Fase 3, **no Fase 1**. Validado implícitamente por E5 (sistema cloud con sucursales).
- **PD-014:** Stock mínimo + óptimo (pilar 2.3) — el sistema sugiere reposición cuando stock cae bajo mínimo. Aterriza en **Fase 2** porque requiere histórico de salidas.
- **PD-015:** Motivos de salida (pilar 2.2) — además de "venta", trackear "merma" como motivo separado. **Fase 2.** Insight clave: merma ≠ venta para el cálculo de ganancia real.
- **PD-016:** Stock reservado (pilar 2.3) — útil cuando el marketplace exista (cliente pidió pero no pagó). **Fase 3.**

---

→ Este documento es referencia. El North Star + roadmap de fases siguen mandando.
