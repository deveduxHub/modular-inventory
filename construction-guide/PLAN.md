# PLAN.md — Sistema de Inventario para Mayoristas
> Versión 1.0 · 2026-05-11 · Fuente de verdad del producto

---

## 1. ¿Qué estamos construyendo?

Un **sistema web de control de inventario** para mayoristas establecidos.  
Acceso por navegador (desktop + mobile responsive). Sin app nativa por ahora.  
Un solo rol: **Administrador**. Sin multi-usuario en esta etapa.

### Problema real que resuelve
Hoy los mayoristas operan de memoria o en cuadernos. No saben:
- Qué productos están por vencer
- Cuánto stock real tienen
- Qué productos les generan más ganancia
- Cuándo reponer mercadería

### Lo que NO haremos
- Facturación electrónica / SUNAT
- App móvil nativa
- Multi-sucursal
- Multi-usuario / roles
- Integraciones con terceros

---

## 2. Scope del producto (los 7 módulos del mindmap)

El scope TOTAL está definido por el mindmap del socio. Ni más, ni menos.

| # | Módulo | Sub-módulos | Descripción |
|---|---|---|---|
| 1 | **Control de Productos** | Info básica, Costos/precios, Unidades, Proveedores | Catálogo maestro de productos |
| 2 | **Control de Existencias** | Entradas, Salidas, Existencia actual, Movimientos | Movimientos de stock |
| 3 | **Control de Vencimientos** | Fechas, Alertas automáticas, Reportes | El wedge — alertas antes de perder mercadería |
| 4 | **Gestión de Compras** | Requisiciones, Órdenes de compra, Recepción | Proceso de compra a proveedores |
| 5 | **Ventas e Ingresos** | Ventas, Ingresos, Clientes, Devoluciones | Registro de salidas por venta |
| 6 | **Reportes e Inteligencia** | Básicos, Avanzados, Financiero, Dashboards | Decisiones basadas en datos |
| 7 | **Configuración y Seguridad** | Usuarios, Seguridad, Config general | Parámetros del sistema |

---

## 3. Fases de construcción

Cada módulo del mindmap = una fase. El orden respeta dependencias de datos.

```
PHASE 1: Control de Productos    ← Estamos aquí
   └── Sin esto, nada existe. Es el catálogo maestro.

PHASE 2: Control de Existencias
   └── Requiere: Phase 1 (necesita productos para registrar entradas/salidas)

PHASE 3: Control de Vencimientos
   └── Requiere: Phase 2 (las alertas leen la fecha_vencimiento de cada entrada)

PHASE 4: Gestión de Compras
   └── Requiere: Phase 1 (productos) + Phase 1.4 (proveedores)

PHASE 5: Ventas e Ingresos
   └── Requiere: Phase 2 (necesita stock para validar disponibilidad)

PHASE 6: Reportes e Inteligencia
   └── Requiere: Phases 1-5 (lee datos de todos los módulos)

PHASE 7: Configuración y Seguridad
   └── Paralelo a todo. Se construye en fragmentos junto a cada fase.
```

---

## 4. Lógica de negocio central

### 4.1 El ciclo de vida de un producto

```
Crear producto (Phase 1)
     ↓
Registrar entrada con cantidad + fecha vencimiento (Phase 2)
     ↓
Stock sube → Sistema calcula stock disponible
     ↓
Alertas automáticas si vence pronto (Phase 3)
     ↓
Registrar venta / salida (Phase 5)
     ↓
Stock baja → Ganancia calculada (precio venta - costo adquisición)
     ↓
Reportes + dashboards (Phase 6)
```

### 4.2 Reglas de negocio inmutables

1. **Stock nunca puede ser negativo.** Sistema bloquea salida si no hay stock suficiente.
2. **Toda salida tiene motivo:** venta, merma, devolución, muestra. No existe salida sin motivo.
3. **Ganancia = Precio de venta - Costo de adquisición.** Simple. Sin impuestos por ahora.
4. **Fecha de vencimiento obligatoria** para productos perecederos (flag `es_perecedero`).
5. **SKU es único** dentro del sistema. No puede haber dos productos con el mismo SKU.
6. **Un producto puede tener múltiples proveedores**, pero solo uno "preferido".
7. **Conversión de unidades:** si el producto se compra en cajas y se vende en unidades, el sistema convierte automáticamente.

### 4.3 Alertas de vencimiento (Phase 3 — el wedge)

| Umbral | Severidad | Acción sugerida |
|---|---|---|
| ≤ 2 días | 🔴 Error crítico | Rematar precio / Devolver proveedor |
| ≤ 7 días | 🟠 Warning alto | Promocionar / Alertar equipo |
| ≤ 15 días | 🟡 Warning medio | Revisar rotación |
| ≤ 30 días | 🔵 Info | Monitorear |
| Stock ≤ stock_mínimo | 🟠 Warning | Solicitar reposición |

---

## 5. Tech stack

| Capa | Decisión | Razón |
|---|---|---|
| Lenguaje | HTML + CSS + React (JSX via Babel) | Consistente con design system |
| Estilos | `design-system/tokens.css` + `design-system/components.css` | Regla DS-001..DS-010 |
| Estado | `localStorage` como single source of truth | Sin backend en esta etapa |
| Tipografías | Manrope + JetBrains Mono (Google Fonts) | DS-003 |
| Iconos | Lucide (CDN) | DS-006 |
| Datos fake | `state.js` — seed data realista (productos peruanos reales) | Validación visual real |
| Responsive | Mobile-first. Breakpoints: 375px / 768px / 1024px / 1440px | DS-005 |

---

## 6. Arquitectura de UI

```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR (280px fijo en desktop, drawer en mobile)      │
│  Logo + nav items (uno por módulo/fase)                 │
├─────────────────────────────────────────────────────────┤
│  TOPBAR (título de sección + acciones primarias)        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  CONTENT AREA (flexible)                                │
│  Cada módulo define su propio layout aquí               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Navegación en mobile:** bottom nav bar con íconos de los módulos principales.

---

## 7. Cómo opera el Builder Guide

El builder guide es el conjunto de documentos que permite construir cualquier módulo sin intervención humana. Su estructura:

```
builder-guide/
├── ORCHESTRATOR.xml          → el agente coordinador
├── memory/                   → decisiones inmutables (DS + producto)
├── evaluators/               → gates reutilizables (visual, UX, state, responsive, perf)
└── phases/
    └── PHASE_N/
        ├── README.xml        → spec de la fase (qué construir + por qué)
        ├── CONTRACT.xml      → entidades de datos con tipos y validaciones
        ├── gates.xml         → gates de aceptación a nivel de fase
        └── modules/
            └── M_N.xml       → spec completa de cada sub-módulo
```

### El principio contract-first

**Nadie construye sin CONTRACT.xml definido.**  
El contrato define:
- Entidades (qué campos existen, qué tipo, si es requerido, validaciones)
- Relaciones entre entidades
- Invariantes del sistema (reglas que nunca se rompen)
- Estado inicial (seed data)

### El flujo de construcción

```
1. Leer PLAN.md + memory/*.xml            ← contexto global
2. Leer PHASE_N/CONTRACT.xml              ← qué datos maneja esta fase
3. Leer PHASE_N/README.xml                ← qué construir
4. Para cada módulo M:
   a. Leer PHASE_N/modules/M_N.xml        ← spec detallada
   b. Construir el artefacto HTML/JSX
   c. Correr evaluators (visual, UX, state, responsive)
   d. Si falla → fix → repetir desde c
   e. Si pasa → marcar módulo completo
5. Correr gates de fase (gates.xml)
6. Si todos pasan → fase completa
```

---

## 8. Decisiones abiertas (pendientes de respuesta del usuario)

| ID | Pregunta | Impacto |
|---|---|---|
| PA-001 | ¿Las ventas se registran con precio real o solo como movimiento de salida? | Scope Phase 5 |
| PA-002 | ¿Gestión de Compras (Phase 4) incluye flujo de aprobación o solo Recepción? | Scope Phase 4 |
| PA-003 | ¿Configuración y Seguridad incluye login con contraseña o es acceso abierto? | Scope Phase 7 |
