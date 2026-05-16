# 03 — Product Lead Critique

> **Rol:** Product Lead (Design/Engineering). Foco: ejecución, calidad de UX, deuda técnica, velocidad de iteración.
> **Postura:** Crítico-constructivo. Mi trabajo es traducir el roadmap a artefactos ejecutables sin perder calidad.

---

## 🎨 Mi crítica a lo que tenemos

### 1. El BUILDER_GUIDE.md original es bueno conceptualmente, pero le falta:
- **Estructura de carpetas concreta** — el guide habla de orchestrator/memory/state pero no muestra DÓNDE viven los archivos.
- **Formato XML / schemas** — para que un agente lea specs sin ambigüedad, necesitamos schemas tipados.
- **Graph agents** — el guide no aborda dependencias entre módulos (M3 depende de M2, etc.).
- **Context windows manejados** — no hay política de cuándo "snippear", cuándo persistir a archivo.
- **Definición de "auto-ejecutable"** — qué significa que un agente complete sin intervención humana.

→ **Mi propuesta:** Re-arquitecturar el builder-guide como una **carpeta** (`/builder-guide/`) con sub-carpetas por fase y archivos XML por agente.

### 2. El design system **no existe todavía** — y todo lo demás depende de él.
No hay tokens, no hay componentes definidos, no hay primitives. Cada módulo va a re-inventar el botón.

→ **Prioridad #1:** Construir `design-system/` como artefacto entregable HOY.

### 3. El estado se está acoplando a la UI.
El guide propone `state.js` como single source of truth — bien. Pero la UI React se acopla a STATE global. Eso escala mal cuando llegue Fase 3 (marketplace = multi-usuario).

→ **Propuesta:** Separar 3 capas desde el día 1:
   - `domain/` — entidades puras (Producto, Entrada, Venta) sin UI
   - `state/` — observable store + selectores
   - `ui/` — componentes React que consumen selectores

### 4. No hay sistema de "tweaks" para iteración rápida.
Cuando E1 nos dice "mejor 1 mes antes" para alertas, ¿cómo cambiamos eso sin tocar código? → **Tweaks panel** desde el primer prototipo.

---

## 🏗️ Arquitectura de Agentes (mi propuesta refinada)

```
┌───────────────────────────────────────────────────────────────┐
│                       ORCHESTRATOR                            │
│  (lee builder-guide/, decide qué fase ejecutar, gestiona ctx) │
└──────────┬──────────────────────────────────────┬─────────────┘
           │                                      │
   ┌───────▼────────┐                  ┌─────────▼────────┐
   │  SPEC AGENT    │                  │  GRAPH AGENT     │
   │ (lee SPEC.xml) │                  │ (resuelve deps   │
   │                │                  │  entre módulos)  │
   └───────┬────────┘                  └─────────┬────────┘
           │                                      │
           └──────────────┬───────────────────────┘
                          │
              ┌───────────▼────────────┐
              │   MEMORY AGENT         │
              │ (persiste decisiones   │
              │  en /memory/*.xml)     │
              └───────────┬────────────┘
                          │
              ┌───────────▼────────────┐
              │   STATE AGENT          │
              │ (estructura datos      │
              │  fake en state.js)     │
              └───────────┬────────────┘
                          │
       ┌──────────────────┼──────────────────┐
       │                  │                  │
┌──────▼──────┐  ┌────────▼──────┐  ┌────────▼──────┐
│ CONTRACTOR  │  │  CONTRACTOR    │  │  CONTRACTOR   │
│  (UI comp)  │  │  (Form/Flow)   │  │  (Data viz)   │
└──────┬──────┘  └────────┬──────┘  └────────┬──────┘
       │                  │                  │
       └──────────────────┼──────────────────┘
                          │
              ┌───────────▼────────────┐
              │   EVALUATOR AGENT      │
              │ (corre gates: visual,  │
              │  ux, state, perf)      │
              └───────────┬────────────┘
                          │
              ┌───────────▼────────────┐
              │   CONTEXT WINDOW MGR   │
              │ (decide qué snippear,  │
              │  qué cargar)           │
              └────────────────────────┘
```

### Reglas de oro para auto-ejecución sin intervención humana

1. **Cada agente tiene un contrato XML estricto** (input schema, output schema). No "interpreta" texto libre.
2. **Memory Agent es append-only.** Las decisiones nunca se borran, solo se versionan. Esto evita drift.
3. **Graph Agent decide el orden de ejecución.** Si M3 depende de M2, no ejecuta M3 hasta que M2 pase gates.
4. **Evaluator es bloqueante.** Si un gate falla, el orchestrator NO avanza; en su lugar, emite un `FixRequest` que el contractor relevante consume.
5. **Context window manager** decide qué cargar al inicio de cada step (lazy loading de specs).
6. **Idempotencia:** correr el orchestrator dos veces produce el mismo resultado.

---

## 📐 Mis estándares de calidad innegociables

### Performance
- Time-to-interactive en mobile: <2s en conexión 3G
- Cualquier interacción de UI: respuesta visual en <100ms
- Cambio de período en dashboard: recálculo en <200ms

### UX
- Hit targets: ≥44px en mobile
- Texto mínimo: 16px (no 14, no 12)
- Contraste: WCAG AA (4.5:1 mínimo)
- Inputs numéricos: teclado numérico nativo
- Cualquier acción destructiva: confirmación de 2 pasos

### Visual
- Espaciado: SOLO múltiplos de 8px
- Color: SOLO tokens del design system, NUNCA hex hardcoded en componentes
- Tipografía: máximo 2 familias en uso simultáneo
- Iconos: SOLO Lucide, stroke 1.75px

### Código
- Cada componente con SPEC en JSDoc al inicio
- Cada módulo con archivo `SPEC.xml` propio
- Sin estado global no observado (todo a través del store)
- Comentarios en español (idioma del producto), código en inglés

---

## 🔁 Loop de iteración esperado

```
1. Orchestrator lee PHASE_N/README.xml
2. Graph Agent resuelve qué módulo construir primero
3. Spec Agent carga SPEC del módulo
4. Memory Agent valida decisiones previas
5. State Agent prepara fake data
6. Contractors ensamblan UI usando design system
7. Evaluator corre gates
8. Si falla → FixRequest → vuelve al paso 6
9. Si pasa → Memory Agent registra nueva decisión
10. Context Window Mgr decide qué snippear antes de Module N+1
```

---

## 🚨 Lo que CANCELO o REFACTORIZO del builder-guide original

| Item original | Decisión | Razón |
|---|---|---|
| `state.js` como archivo único | **Refactorizo a `/state/` con submódulos** | Va a crecer mucho |
| `components.jsx` único | **Refactorizo a `/components/` con un archivo por componente** | Mejor edición + lazy load |
| Memory en comentarios HTML | **Muevo a `/memory/*.xml`** | Estructurado, parseable |
| Evaluators sueltos | **Estructuro en `/evaluators/` con un schema común** | Reusabilidad |
| "12 secciones del guide" | **Convierto a carpetas reales** | Navegable, no monolítico |

---

## 📋 Mi entregable de hoy (qué construyo ahora mismo)

1. **`/design-system/`** completo:
   - `tokens.css` — colores, spacing, type, shadows, radii
   - `DESIGN_SYSTEM.html` — showcase interactivo de todos los componentes
   - Primitives: Button, Input, Card, Badge, Alert, Modal, BottomSheet, ListItem, KPICard, DataTable, EmptyState, Toast

2. **`/builder-guide/`** completo (estructura de carpetas + XMLs por agente y fase)

3. **`/index.html`** — Navegador maestro del proyecto

→ Siguiente: `04_NORTH_STAR_AND_MOAT.md`
