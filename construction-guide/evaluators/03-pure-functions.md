---
name: pure-functions
description: Garantiza determinismo y ausencia de side-effects en utils/helpers/selectors.
scope: Fase 0..N · *.ts (no React) + reducers + selectors
---

# Pure Functions Evaluator

## Reglas

1. **Determinismo.** Misma entrada → misma salida. Cero `Date.now()`, `Math.random()`, `window.*` dentro de funciones de dominio sin inyectar como parámetro.
2. **Sin mutación de parámetros.** Arrays/objetos de entrada quedan intactos. Usar spread, `structuredClone`, `Object.freeze` en seed data.
3. **Sin escritura a state externo.** Cero `localStorage.setItem`, fetch, console.log dentro de funciones puras.
4. **Sin singleton oculto.** Funciones que cachean (memoización) deben tomar la cache como parámetro o exponer `clear()`.
5. **Composables.** Funciones pequeñas (≤30 LoC) que se componen con `pipe`/`flow`.
6. **Reducers puros 100%.** Si necesita side-effect → mover a thunk/middleware/effect.
7. **Selectores idempotentes.** `selectStock(state) === selectStock(state)` siempre referencialmente igual si el estado relevante no cambió (memoizar con reselect/createSelector).
8. **TypeScript `readonly`** en parámetros de arrays/objetos cuando representen entrada.

## Sospechosos comunes (bloqueados)
- `arr.sort()` sin clonar (muta).
- `arr.push/splice/pop` dentro de selector.
- `obj.x = …` reasignación.
- `new Date()` dentro de pricing/margin.

## Output
```json
{ "ok": false, "violations": [{ "file": "calcMargin.ts", "rule": "1-determinism", "line": 12, "evidence": "Date.now() inside calcMargin", "fix": "Inject now: number as param" }] }
```
