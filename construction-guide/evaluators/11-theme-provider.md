---
name: theme-provider
description: ThemeProvider implementado correctamente · CSS vars + context + dark mode toggle.
scope: Fase 0 · src/ui/ds/ThemeProvider.tsx
---

# Theme Provider Evaluator

## Especificación

### Arquitectura
1. **Tokens como única fuente:** `src/ui/ds/tokens.ts` exporta objeto JS con todos los tokens (color, spacing, radius, shadow, motion).
2. **CSS vars generadas:** `tokens.css` se genera desde `tokens.ts` (build script o `@layer base`).
3. **`<ThemeProvider>`** React component que:
   - Inyecta CSS vars en `<html>` o `<:root>` (un solo lugar).
   - Provee `useTheme()` hook con `{ theme, setTheme, tokens }`.
   - Persiste preferencia en localStorage clave `ds-theme`.
4. **Tailwind config** importa `tokens.ts` y los mapea a `theme.extend.colors`, etc.

### API
```tsx
<ThemeProvider defaultTheme="light" storageKey="ds-theme">
  <App />
</ThemeProvider>

function MiComponente() {
  const { theme, setTheme, tokens } = useTheme();
  // theme: 'light' | 'dark' | 'system'
  // tokens: typed object (autocomplete por TS)
}
```

### Reglas

1. **Cero hex/rgb literales** fuera de `tokens.ts`.
2. **Dark mode opt-in vía clase `.dark` en `<html>`** (ver `07-tailwind.md` rule 9).
3. **`prefers-color-scheme`** respetado SOLO si `theme === 'system'`.
4. **No re-render cascade:** `setTheme` solo escribe la clase en `<html>` y la key en localStorage. Los componentes leen via CSS vars (no via context para color), context expone solo el setter.
5. **SSR-safe:** primera pintura sin flash → script inline en `<head>` que lee localStorage antes del hydrate.
6. **Tokens tipados:**
   ```ts
   export const tokens = { color: { brand: { primary: '#A86250' } } } as const;
   export type Tokens = typeof tokens;
   ```

### Bloqueos
- Hex en JSX de cualquier feature.
- `useState<'light'|'dark'>` reinventado fuera de ThemeProvider.
- Setear color en JS leyendo del context (debe ser via CSS var).

## Output
```json
{ "ok": false, "violations": [{ "file": "Sidebar.tsx", "rule": "1-no-hex", "evidence": "background-color: #1F2528", "fix": "Use bg-ink-900 (Tailwind token)" }] }
```
