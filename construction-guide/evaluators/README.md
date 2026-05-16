# `builder-guide/evaluators/` — Evaluator Sub-Agents

Cada agente aquí es un **evaluador especializado** que valida una dimensión del código del Design System (y, en cascada, de cualquier feature posterior). Operan como **gates obligatorios**: la fase no cierra hasta que **todos** los agentes relevantes devuelven `OK`.

## Modelo de invocación

```
ORCHESTRATOR
   └─ build → emits artifact (.tsx, .ts, .stories.tsx, .css)
       ├─→ evaluator/01-react-patterns    → OK | FAIL + report
       ├─→ evaluator/02-composition       → OK | FAIL + report
       ├─→ evaluator/03-pure-functions    → OK | FAIL + report
       ├─→ evaluator/04-solid             → OK | FAIL + report
       ├─→ evaluator/05-design-patterns   → OK | FAIL + report
       ├─→ evaluator/06-big-o             → OK | FAIL + report
       ├─→ evaluator/07-tailwind          → OK | FAIL + report
       ├─→ evaluator/08-storybook         → OK | FAIL + report
       ├─→ evaluator/09-ddd               → OK | FAIL + report
       ├─→ evaluator/10-overriding        → OK | FAIL + report
       ├─→ evaluator/11-theme-provider    → OK | FAIL + report
       └─→ evaluator/12-ci-formatting     → OK | FAIL + report

   if any FAIL → emit FixRequest list → halt phase
   if all OK   → MEMORY_AGENT.append(decisions) → mark phase complete
```

## Tabla maestra

| # | Agente | Foco | Bloquea |
|---|--------|------|---------|
| 01 | `react-patterns` | Componentes funcionales, hooks correctos, key, memo, refs | Fase 0..N |
| 02 | `composition` | Slot pattern, compound components, render props | Fase 0..N |
| 03 | `pure-functions` | Determinismo, sin side-effects, sin mutación externa | Fase 0..N |
| 04 | `solid` | SRP/OCP/LSP/ISP/DIP en componentes y utils | Fase 0..N |
| 05 | `design-patterns` | Factory, Adapter, Strategy, Observer aplicados con criterio | Fase 0..N |
| 06 | `big-o` | Loops anidados sin justificación, O(n²)+ no documentados | Fase 0..N |
| 07 | `tailwind` | Tokens via theme, sin arbitrary values, `cn()` helper, no inline duplicado | Fase 0..N |
| 08 | `storybook` | Cada componente tiene `.stories.tsx` con todas variantes + estados + a11y | Fase 0..N |
| 09 | `ddd` | Capas: `domain/`, `application/`, `infrastructure/`, `ui/` separadas | Fase 1..N |
| 10 | `overriding` | Estrategia clara (className merge via `cn`, slots, `asChild` Radix) | Fase 0..N |
| 11 | `theme-provider` | Tokens consumidos via context, dark-mode-ready, sin hex literales | Fase 0..N |
| 12 | `ci-formatting` | ESLint, Prettier, TypeScript strict, conventional commits | Fase 0..N |

## Gate de fase

En `builder-guide/phases/PHASE_0_DESIGN_SYSTEM/README.xml` se añade:

```xml
<gate id="G-DS-AG-UNANIMOUS" type="agents">
  Todos los 12 agentes en builder-guide/evaluators/ devuelven OK sobre los artefactos generados.
  Un solo FAIL bloquea la entrega.
</gate>
```

Y se replica en cada fase siguiente bajo `<gate-category name="agents">` referenciando los mismos 12 agentes (más los específicos de cada fase si aplica).
