---
name: react-patterns
description: Valida que cada componente del DS use patrones React idiomáticos.
scope: Fase 0..N · .tsx files
---

# React Patterns Evaluator

## Checks (todos deben pasar)

1. **Componentes funcionales únicamente.** Cero `class Component`.
2. **Hooks reglas:**
   - Llamados solo en top-level (no dentro de loops/if).
   - Solo desde componentes o hooks custom.
   - Custom hooks prefijo `use`.
3. **Keys correctas:**
   - `key` en listas siempre estable y único.
   - Nunca `key={index}` si la lista se ordena/filtra.
4. **Memoization criteriosa:**
   - `useMemo`/`useCallback` SOLO si la prop baja a un `memo`-ed child o entra en deps de un effect costoso.
   - No "memoize-by-default" — penaliza por sobre-optimización.
5. **Refs solo cuando necesario:**
   - `useRef` para DOM imperative o valor mutable no-render.
   - Nunca refs para state derivable.
6. **Sin `useEffect` para state derivado.** Si se puede calcular en render → calcular en render.
7. **`children` tipado** con `ReactNode`, no `JSX.Element`.
8. **`forwardRef`** en cualquier componente que envuelva un nodo DOM focusable (button, input).
9. **Sin `dangerouslySetInnerHTML`** salvo justificación explícita en JSDoc.
10. **Display name** en componentes con `forwardRef` o `memo`.

## Output
```json
{ "ok": true|false, "violations": [{ "file": "Button.tsx", "rule": "8-forwardRef", "line": 42, "fix": "Wrap with forwardRef<HTMLButtonElement, ButtonProps>" }] }
```
