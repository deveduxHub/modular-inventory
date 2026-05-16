# Builder Guide — Claude Design + Advanced Context Engineering
> Sistema de inventario para mayoristas | Arquitectura con Memory Agents, State Agents, Orchestrator Workers

---

## Premisa

En Code usas **spec-driven prompting + evaluators + subagents**. En Design podemos hacer exactamente lo mismo, pero optimizado para **iteración visual + flujos interactivos**, no para APIs y bases de datos.

El flujo:
```
ORCHESTRATOR (tú, vía este guide) 
  ├── SPEC AGENT (define requisitos visuales)
  ├── MEMORY AGENT (recuerda decisiones de diseño)
  ├── STATE AGENT (maneja fake data y flujos)
  ├── COMPONENT CONTRACTORS (construyen UI reutilizable)
  └── EVALUATORS (validan UX, consistencia, flujos)
```

---

## 1. Spec Agent — Requisitos visuales (Module Prompting)

### Input: PLAN.md + Decisiones de diseño

```md
# SPEC: Dashboard del Sistema de Inventario

## Requisito Funcional
Mostrar Triángulo de Valor (Inversión / Movimiento / Ganancia) con selector de período.

## Requisito Visual
- Layout: 3 cards grandes lado a lado (Flex, 1/3 cada una)
- Colores: Inversión=Indigo, Movimiento=Cyan, Ganancia=Amarillo
- Tipografía: Título 48px Manrope Bold, valor 24px JetBrains Mono
- Espaciado: padding 32px, gap 24px
- Responsive: En mobile, stack vertical

## Requisito de Datos
- Calcula sobre período seleccionado (hoy/semana/mes/año)
- Inversión = SUM(entrada.total_invertido)
- Movimiento = SUM(venta.total_vendido)
- Ganancia = Movimiento - Inversión

## Gates de Aceptación
- [ ] KPIs visibles sin scroll
- [ ] Período cambia valores en <200ms
- [ ] Sin valores negativos (excepto ganancia si hay pérdida)
- [ ] Colores match design system exactamente
```

### Quién ejecuta: Component Contractor (yo, como Claude Design)

---

## 2. Memory Agent — Decisiones de Diseño (Context Persistence)

### State que persiste en comentarios HTML

```html
<!-- MEMORY AGENT SNAPSHOT -->
<!-- 
  DECISIONES CRÍTICAS:
  - Color primario: #0693E3 (Cyan) para acciones
  - Sidebar fijo 280px left, content area flexible
  - Espaciado base: 8px (múltiplos: 8, 16, 24, 32, 40)
  - Tipografía: Manrope (display/body), JetBrains Mono (numbers)
  - Iconografía: Lucide, stroke 1.75px
  - Componentes reutilizables: Card, Button, Badge, Alert, DataTable
  - Flujo datos: localStorage como "BD fake"
  - Validación: No vender más de stock, alertas de vencimiento a 7 días
-->
```

### Dónde vive: Top del archivo HTML principal

**Propósito:** Si tú o yo volvemos a abrir el proyecto en 2 semanas, sabemos exactamente qué se decidió sin releer todo.

---

## 3. State Agent — Gestión de Datos Fake (State Orchestration)

### Arch: Single Source of Truth en `state.js`

```js
// state.js — Memory Agent + State Agent combinados
const DESIGN_DECISIONS = {
  colors: {
    primary: '#0693E3',
    dark: '#020381',
    highlight: '#FCB900',
    error: '#CF2E2E'
  },
  spacing: {
    xs: 8, sm: 16, md: 24, lg: 32, xl: 40
  },
  typography: {
    display: 'Manrope',
    body: 'Manrope',
    mono: 'JetBrains Mono'
  }
};

const STATE = {
  // Período actual
  period: 'today', // 'today' | 'week' | 'month' | 'year'
  
  // Datos crudos (como si viniera de BD)
  productos: [...],
  entradas: [...],
  ventas: [...],
  
  // Derivados calculados (Memory Agent)
  calculados: {
    inversión: 0,
    movimiento: 0,
    ganancia: 0
  },
  
  // UI state
  ui: {
    sidebarOpen: true,
    panelActivo: 'dashboard'
  }
};

// State Agent: métodos puros que recalculan
function calcularKPIs(period) {
  const filtered = filterByPeriod(STATE.entradas, STATE.ventas, period);
  STATE.calculados = {
    inversión: sumInversión(filtered.entradas),
    movimiento: sumMovimiento(filtered.ventas),
    ganancia: sumGanancia(filtered.ventas, filtered.entradas)
  };
  persistToLocalStorage();
  notifyObservers(); // UI se actualiza
}

// Contractores usan esto
export { STATE, calcularKPIs };
```

---

## 4. Component Contractors — Reutilizables (Modular Prompting)

### Spec clara para cada componente

```jsx
// components.jsx
/**
 * KPICard
 * @prop {string} label - "Inversión" | "Movimiento" | "Ganancia"
 * @prop {number} value - valor en soles
 * @prop {string} color - hex color from DESIGN_DECISIONS.colors
 * @prop {bool} isLoading - spinner mientras calcula
 * 
 * DESIGN SPEC:
 * - Card: padding 32px, rounded 12px, shadow light
 * - Label: 14px, uppercase, gray-600
 * - Value: 48px JetBrains Mono, bold, color del prop
 * - Responsive: min-width 200px
 */
export function KPICard({ label, value, color, isLoading = false }) {
  return (
    <div className="kpi-card" style={{ borderTopColor: color }}>
      {isLoading ? <Spinner /> : (
        <>
          <div className="kpi-label">{label}</div>
          <div className="kpi-value" style={{ color }}>
            S/. {value.toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * DataTable
 * @prop {array} headers - [{ key, label, type: 'text'|'number'|'date' }]
 * @prop {array} rows - datos
 * @prop {func} onRowClick - navegación o edición
 * 
 * DESIGN SPEC:
 * - Header: bold, 12px uppercase, bg gray-100
 * - Rows: striped (alternate gray), hover highlight
 * - Numbers: right-aligned, JetBrains Mono
 * - Dates: formato DD/MM/YYYY
 */
export function DataTable({ headers, rows, onRowClick }) { ... }

/**
 * Alert
 * @prop {'info'|'warning'|'error'|'success'} type
 * @prop {string} message
 * @prop {bool} closeable
 * 
 * DESIGN SPEC:
 * - Colores: info=Cyan, warning=Amarillo, error=Rojo, success=Verde
 * - Icon + mensaje + close button (si closeable)
 * - Padding 16px, rounded 8px, border-left 4px
 */
export function Alert({ type, message, closeable = true }) { ... }
```

**Patrón:** Cada componente tiene su **SPEC en comentario JSDoc** → no hay ambigüedades cuando se reutiliza.

---

## 5. Orchestrator Worker — Orquestación de pantallas

### Spec Drive Requirements: Cada pantalla es un "módulo"

```
ORCHESTRATOR (yo, Claude Design):
  "Construir Dashboard siguiendo SPEC_DASHBOARD.md"
  
  ├─ MEMORY AGENT verifica: ¿qué se decidió en diseño global?
  ├─ STATE AGENT prepara datos fake: calcularKPIs()
  ├─ COMPONENT CONTRACTORS ensamblan: KPICard + PeriodSelector + Alerts
  ├─ EVALUATOR valida: ¿todos los KPIs se ven? ¿responsive?
  └─ OUTPUT: dashboard.html listo
```

### Spec para Dashboard (ejemplo)

```md
# SPEC_DASHBOARD.md

## Pantalla: Dashboard (M6)

### Layout
- Sidebar 280px fijo (izquierda)
- Content area: max-width 1240px, centrado, padding 40px
- Grid de secciones:
  - Sección A: Triángulo de Valor (3 cols)
  - Sección B: Period Selector (encima de A)
  - Sección C: Alertas (full width)
  - Sección D: Movimiento por producto (DataTable)
  - Sección E: Proyección (mini-chart o stat)

### Datos requeridos
```js
STATE.calculados = {
  inversión: number,
  movimiento: number,
  ganancia: number
}
STATE.alertas = [
  { type: 'warning', message: 'Aceite vence en 3 días', producto: 'Aceite Primor' },
  { type: 'error', message: 'Stock crítico: Arroz < 5 sacos', producto: 'Arroz Costeño' }
]
STATE.movimientoPorProducto = [
  { nombre: 'Arroz Costeño', vendido: 10, ganancia: 200, inversión: 800 }
]
```

### Gates de Aceptación
- [ ] KPIs visibles sin scroll (viewport 1920x1080)
- [ ] Period selector cambia KPIs en <200ms
- [ ] Alertas renderean correctamente, closeable
- [ ] DataTable scroll horizontal en mobile
- [ ] Colores match DESIGN_DECISIONS exactamente
- [ ] Tipografía match Manrope + JetBrains Mono
- [ ] localStorage persiste estado al recargar
```

---

## 6. Evaluators — Validación Automatizada (Gate-based)

### Evaluator 1: Visual Consistency

```js
// evaluators/visual-consistency.js
function evaluateVisualConsistency(htmlElement) {
  const issues = [];
  
  // Gate 1: Colores
  const computedColor = window.getComputedStyle(htmlElement).color;
  if (!isValidColor(computedColor)) {
    issues.push('❌ Color no match con DESIGN_DECISIONS');
  }
  
  // Gate 2: Tipografía
  const fontFamily = window.getComputedStyle(htmlElement).fontFamily;
  if (!fontFamily.includes('Manrope') && !fontFamily.includes('JetBrains')) {
    issues.push('❌ Font no es Manrope o JetBrains Mono');
  }
  
  // Gate 3: Espaciado
  const padding = window.getComputedStyle(htmlElement).padding;
  if (!isValidSpacing(padding)) {
    issues.push(`⚠️ Padding ${padding} no es múltiplo de 8px`);
  }
  
  return { passed: issues.length === 0, issues };
}
```

### Evaluator 2: UX Flows

```js
// evaluators/ux-flows.js
function evaluateUXFlow(scenario) {
  // scenario = { name: 'vender_arroz', steps: [...] }
  
  const checks = [
    { gate: 'Stock validation', test: () => !canSellMoreThanAvailable() },
    { gate: 'Alert visibility', test: () => alertsRenderCorrectly() },
    { gate: 'Period selector works', test: () => changePeriodRecalculates() },
    { gate: 'localStorage persists', test: () => stateRestoresOnReload() }
  ];
  
  return checks.map(c => ({
    gate: c.gate,
    passed: c.test(),
    evidence: captureScreenshot()
  }));
}
```

### Evaluator 3: Responsiveness

```js
// evaluators/responsiveness.js
function evaluateResponsiveness() {
  const viewports = [
    { name: '1920x1080 (desktop)', width: 1920, height: 1080 },
    { name: '768x1024 (tablet)', width: 768, height: 1024 },
    { name: '375x812 (mobile)', width: 375, height: 812 }
  ];
  
  return viewports.map(vp => {
    resizeWindow(vp.width, vp.height);
    return {
      viewport: vp.name,
      issues: checkLayout(), // overflow, text cut off, buttons clickable, etc.
      screenshot: takeScreenshot()
    };
  });
}
```

---

## 7. Flujo de Construcción (Con Gates y Evaluators)

### Iteración 1: Dashboard

```
PROMPT (Orchestrator):
"""
Construir Dashboard (M6) siguiendo SPEC_DASHBOARD.md.

Requirements:
- Triángulo de Valor: Inversión (Indigo), Movimiento (Cyan), Ganancia (Amarillo)
- Period Selector: hoy/semana/mes/año
- Alertas: vencimiento + stock crítico
- DataTable: movimiento por producto

GATES:
1. ✅ Todos los KPIs visibles sin scroll (1920x1080)
2. ✅ Period selector recalcula en <200ms
3. ✅ Colores exactos de DESIGN_DECISIONS
4. ✅ Tipografía: Manrope + JetBrains Mono
5. ✅ localStorage persiste estado
6. ✅ Responsive en 3 viewports

EVALUATORS:
- evaluators/visual-consistency.js
- evaluators/ux-flows.js (scenario: 'cambiar_periodo')
- evaluators/responsiveness.js

Si algún gate falla, describe el error y propón fix.
"""
```

**Yo (Claude Design) ejecuto** → construyo dashboard.html → corro evaluators → reporto gates passed/failed.

---

### Iteración 2: Entrada de Productos

```
PROMPT (Orchestrator):
"""
Construir Entrada de Productos (M2) siguiendo SPEC_ENTRADA.md.

Requirements:
- Form: Seleccionar proveedor → seleccionar producto del catálogo → ingresar detalles
- Validación: fecha vencimiento obligatoria, cantidad > 0, precio > 0
- Al guardar: actualizar STATE.entradas + STATE.stock + recalcular Dashboard
- Feedback: toast "Entrada registrada" + redirect a Dashboard

GATES:
1. ✅ Form renderiza todos los campos
2. ✅ Validaciones funcionan (no permite guardar incompleto)
3. ✅ localStorage refleja nueva entrada
4. ✅ Dashboard recalcula KPIs correctamente
5. ✅ Responsive en mobile

EVALUATORS:
- evaluators/form-validation.js
- evaluators/state-consistency.js (entrada → stock → dashboard)
- evaluators/responsiveness.js
"""
```

---

## 8. Sub-agents & Contractors Pattern

### Pattern: "Contractor First"

En lugar de decir "construir todo Dashboard de una", divido en **contractors especializados**:

```
DASHBOARD = 
  KPICardContractor 
  + PeriodSelectorContractor 
  + AlertBannerContractor 
  + DataTableContractor 
  + ChartContractor
```

Cada uno con su propia **SPEC + EVALUATOR**:

```js
// contractors/kpi-card.contractor.js
/**
 * KPICardContractor
 * 
 * SPEC:
 * - Recibe: { label, value, color }
 * - Renderiza: card con label + value formateado
 * - Colores: match DESIGN_DECISIONS
 * 
 * TESTS (Evaluators):
 * - Value formateado con comas (1000 → 1.000)
 * - Color exacto
 * - Responsive: min-width 200px, max-width 400px
 */

export function buildKPICard(spec) {
  const { label, value, color } = spec;
  
  // validate
  if (!DESIGN_DECISIONS.colors[color] && !isHexColor(color)) {
    throw new Error(`Color "${color}" no en DESIGN_DECISIONS`);
  }
  
  // render
  return `
    <div class="kpi-card" style="border-top-color: ${color}">
      <div class="kpi-label">${label}</div>
      <div class="kpi-value">${formatNumber(value)}</div>
    </div>
  `;
}

// Test
runTests('KPICardContractor', [
  { name: 'Format value', test: () => formatNumber(4200) === '4.200' },
  { name: 'Color validation', test: () => isValidColor('#0693E3') },
  { name: 'Responsive width', test: () => ... }
]);
```

---

## 9. Memory Patterns — What to Remember Across Iterations

### Document evergreen:

```md
# MEMORY CHECKPOINT — Sistema de Inventario

## Decisiones Críticas (inmutables)
- Sidebar 280px fijo ← decisión de layout, no cambiar
- Colores del DS ← no inventar colores nuevos
- Flujo: Entrada → Stock → Dashboard ← orden crítico

## Componentes Reutilizables (viven en components.jsx)
- KPICard: Inversión, Movimiento, Ganancia
- Alert: para vencimientos, stock crítico, deudas
- DataTable: movimiento por producto, historial
- Button: primary (Cyan), secondary, danger (Rojo)
- Form: input + validation

## Datos Fake Realistas (State Agent)
- Productos: Arroz Costeño, Aceite Primor, Azúcar Castillo (no "Producto 1")
- Fechas: hoy, ayer, 7 días atrás (no random)
- Números: S/. 4,200 (inversión realista), S/. 2,600 (ganancia realista)

## Flujos Validados
✅ Entrada → stock sube
✅ Venta → stock baja + ganancia se calcula
✅ Período → KPIs recalculan sin lag
❌ NO permite vender más de stock
❌ NO acepta fechas vencimiento en pasado

## Next Steps
- [ ] Integración proveedores (M5)
- [ ] Catálogo configuración (M1)
- [ ] Tweak colors + period selector
```

**Lugar:** Top del archivo HTML + comentario en state.js

---

## 10. CI/CD para Prototipos (Automatizado)

### Pre-commit Checks

```bash
# Antes de guardar cambios
npm run validate

├─ ✅ HTML canonical (tags cerrados, atributos quoted)
├─ ✅ CSS: variables de DESIGN_DECISIONS usadas
├─ ✅ JS: state.js es single source of truth
├─ ✅ Components: cada uno tiene SPEC en JSDoc
├─ ✅ Evaluators: todos los gates pasan
├─ ✅ localStorage: se persiste correctamente
└─ ✅ Responsive: 3 viewports validan sin overflow
```

Si alguno falla → describe el issue → propón fix.

---

## 11. Flujo Completo (De inicio a fin)

```
USUARIO (tú) crea este documento (BUILDER_GUIDE.md)
  ↓
TÚ: "Contruir Dashboard con este guide"
  ↓
ORCHESTRATOR (yo, Claude Design):
  1. Leo PLAN.md + BUILDER_GUIDE.md
  2. Activo MEMORY AGENT → recuerdo decisiones
  3. Activo STATE AGENT → preparo datos fake
  4. Contrato COMPONENT CONTRACTORS → KPICard, PeriodSelector, etc.
  5. Corro EVALUATORS → visual, ux flows, responsive
  6. Si gates fallan → describo + propongo fix
  7. Si gates pasan → entrego dashboard.html listo
  ↓
TÚ: "Ahora Entrada de Productos"
  ↓
ORCHESTRATOR (mismo process, iterativo)
  ↓
... (repite para cada módulo)
  ↓
FINAL: Prototipo completo navegable + documentado
  ↓
HANDOFF a Claude Code con:
  - HTML estructura exacta
  - state.js (estructura de datos)
  - components.jsx (reutilizables)
  - BUILDER_GUIDE.md (para que Code lo use)
  - Test suite (evaluators como referencia)
```

---

## 12. Cómo usar este guide (para tí)

### Para cada módulo que quieras que construya:

```md
# Construir [MÓDULO_NAME]

Seguir BUILDER_GUIDE.md:

1. SPEC AGENT: Leer SPEC_[MÓDULO].md
2. MEMORY AGENT: Verificar PLAN.md + decisiones previas
3. STATE AGENT: Preparar datos fake en state.js
4. CONTRACTORS: Ensamblar componentes existentes o crear nuevos
5. EVALUATORS: Correr gates antes de entregar

GATES (el módulo no es válido si alguno falla):
- [ ] [Gate 1]
- [ ] [Gate 2]
- [ ] [Gate 3]

Si gates fallan, describir + proponer fix.
```

### Ejemplo de prompt:

```
Construir Entrada de Productos (M2) usando BUILDER_GUIDE.md.

SPEC: 
- Form con: Proveedor (select/new) → Productos (multi-select) → Detalles (cantidad, precio, vencimiento)
- Al guardar: actualizar STATE.entradas + STATE.stock
- Validaciones: cantidad > 0, precio > 0, fecha vencimiento futuro

GATES:
1. Form renderiza correctamente
2. Validaciones previenen guardado incompleto
3. Estado actualiza en localStorage
4. Dashboard recalcula automáticamente
5. Responsive en mobile

EVALUATORS:
- form-validation.js
- state-consistency.js
- responsiveness.js

Describe gates passed/failed + propón fix si es necesario.
```

---

## Resumen: Advanced Context Engineering para Design

| Técnica | En Code | En Design |
|---|---|---|
| **Spec-driven** | API specs | Visual + UX specs (JSDoc) |
| **Module prompting** | `buildAuthModule()` | `buildDashboard()`, contractors |
| **Memory agents** | Decisiones tech | Decisiones de diseño (MEMORY CHECKPOINT) |
| **State agents** | DB state | fake data state (localStorage) |
| **Evaluators** | Tests unitarios | Visual consistency, UX flows, responsive |
| **Gates** | CI/CD checks | Pre-commit validations |
| **Contractors** | Specialized builders | Component builders con SPEC |
| **Orchestrators** | Orquestador central | Yo (Claude Design) coordino todo |

---

*Usa este guide para que yo construya el prototipo completo sin pedir clarificaciones cada 2 pasos. Cada módulo tiene su SPEC claro, sus gates, y sus evaluators.*
