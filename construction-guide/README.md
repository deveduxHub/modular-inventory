# Builder Guide v2 — Auto-Executable Architecture

> Reorganización del BUILDER_GUIDE original como una **carpeta navegable por agentes** + **fases secuenciales**, diseñada para que un orchestrator pueda ejecutar cada fase sin intervención humana.

---

## 📁 Estructura

```
builder-guide/
├── README.md                      ← este archivo (entrypoint del orchestrator)
├── ORCHESTRATOR.xml               ← contrato del agente coordinador
├── agents/
│   ├── SPEC_AGENT.xml             ← parser de SPECs
│   ├── MEMORY_AGENT.xml           ← persistencia de decisiones
│   ├── STATE_AGENT.xml            ← gestión de datos
│   ├── GRAPH_AGENT.xml            ← resolución de dependencias
│   ├── CONTEXT_AGENT.xml          ← gestión de context window
│   └── EVALUATOR_AGENT.xml        ← validación con gates
├── memory/
│   ├── DESIGN_DECISIONS.xml       ← decisiones inmutables del DS
│   ├── PRODUCT_DECISIONS.xml      ← decisiones del PM (ICP, scope)
│   └── CHANGELOG.xml              ← append-only log de cambios
├── phases/
│   ├── PHASE_0_DISCOVERY/
│   │   ├── README.xml             ← spec de la fase
│   │   ├── gates.xml              ← criterios de aceptación
│   │   └── modules/
│   ├── PHASE_1_MVP/
│   │   ├── README.xml
│   │   ├── gates.xml
│   │   └── modules/
│   │       ├── M1_ONBOARDING.xml
│   │       ├── M2_CATALOGO.xml
│   │       ├── M3_ENTRADA.xml
│   │       ├── M4_STOCK.xml
│   │       ├── M5_ALERTAS.xml
│   │       └── M6_DASHBOARD.xml
│   ├── PHASE_2_VENTAS/
│   ├── PHASE_3_MARKETPLACE/
│   └── PHASE_4_INTELIGENCIA/
└── evaluators/
    ├── visual.xml                 ← consistencia visual
    ├── ux-flow.xml                ← validación de flujos
    ├── state.xml                  ← consistencia de estado
    ├── responsive.xml             ← multi-viewport
    └── perf.xml                   ← performance budget
```

---

## 🚀 Cómo el Orchestrator ejecuta

```
1. read(ORCHESTRATOR.xml)
2. read(memory/*.xml)               ← carga decisiones previas
3. read(phases/PHASE_N/README.xml)  ← spec de la fase activa
4. GRAPH_AGENT.resolveOrder(modules) → lista ordenada de módulos
5. for each module M in order:
   a. SPEC_AGENT.parse(M.xml)
   b. STATE_AGENT.prepare(M.dataNeeds)
   c. contractor.build(M.spec)
   d. EVALUATOR_AGENT.runAll(M.gates)
   e. if fail → emit FixRequest → goto c
   f. if pass → MEMORY_AGENT.append(M.decisions)
   g. CONTEXT_AGENT.compact(M)     ← snip if context >70%
6. phase.gates.runAll()
7. if pass → mark phase complete → next phase
```

---

## 📜 Convención XML (todos los archivos)

Cada archivo XML sigue este esqueleto:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<artifact kind="module|phase|agent|gate|memory" id="..." version="1">
  <meta>
    <owner>orchestrator|spec|memory|state|graph|context|evaluator|contractor</owner>
    <created>YYYY-MM-DD</created>
    <depends-on>id1, id2</depends-on>
  </meta>
  <content>
    <!-- Específico al kind -->
  </content>
  <gates>
    <gate id="..." type="visual|ux|state|perf|responsive">
      <criterion>...</criterion>
      <evidence-required>screenshot|eval-js|state-snapshot</evidence-required>
    </gate>
  </gates>
</artifact>
```

---

## 🧭 Reglas de oro (no negociables)

1. **Nadie inventa colores, spacing o fonts.** Todo viene de `design-system/tokens.css`.
2. **Memory es append-only.** Si una decisión cambia, se versiona, no se borra.
3. **Specs siempre antes de código.** Si no hay XML, contractor no construye.
4. **Gates bloquean.** Un gate fallido detiene el orchestrator hasta el fix.
5. **Context budget = 70%.** Si se pasa, Context Agent fuerza snip antes de seguir.
6. **Idempotencia.** Re-ejecutar el orchestrator produce el mismo output (estado vive en disco).

---

## 🟢 Estado actual

- [x] `/strategy/` completo (insights + 3 critiques + north star)
- [x] `/design-system/` completo (tokens + componentes + showcase)
- [x] `/builder-guide/agents/` definidos
- [x] `/builder-guide/memory/` inicializado con decisiones de DS y producto
- [x] `/builder-guide/phases/PHASE_0..4/` con READMEs
- [x] `/builder-guide/phases/PHASE_1_MVP/modules/M1..M6` especificados
- [ ] Construcción del MVP (Fase 1) — siguiente cuando el usuario diga "ejecutar fase 1"
