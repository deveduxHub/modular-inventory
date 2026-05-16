---
name: tailwind
description: Tailwind config + uso disciplinado · tokens via theme, no arbitrary values, cn() merge.
scope: Fase 0..N · .tsx + tailwind.config.ts
---

# Tailwind Evaluator

## Setup esperado
- `tailwind.config.ts` con `theme.extend` consumiendo tokens del DS (NO redefinir paleta dentro de Tailwind, importar `tokens.ts`).
- `tailwind-merge` (`tw-merge`) + `clsx` empaquetados en helper `cn()` que se usa SIEMPRE para combinar classes.
- Plugin `@tailwindcss/forms`, `@tailwindcss/typography`, `tailwindcss-animate`.

## Reglas de uso

1. **Cero arbitrary values** salvo justificación documentada. Bloqueado: `w-[137px]`, `text-[#A86250]`.
2. **Cero colores hex en JSX.** Solo `bg-terracotta-500`, `text-ink-900`, etc.
3. **Variantes con `cva`** (class-variance-authority):
   ```ts
   const button = cva('inline-flex items-center', {
     variants: { variant: { primary: 'bg-brand-primary…', ghost: '…' } },
     defaultVariants: { variant: 'primary' },
   });
   ```
4. **`cn()` siempre.** Bloqueado: ``className={`${a} ${b}`}`` con concatenación manual.
5. **Order de clases ordenado** por prettier-plugin-tailwindcss.
6. **`@apply` PROHIBIDO** salvo en `globals.css` para resets puntuales. NO `@apply` para componer componentes.
7. **Sin `important: true`** global.
8. **Responsive sin breakpoints custom** salvo decisión nueva DS-NNN.
9. **Dark mode** vía `class="dark"` en `<html>` (toggled by ThemeProvider), nunca `media`.

## Tailwind config mínimo esperado
```ts
import { tokens } from './design-system/tokens';
export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: { extend: { colors: tokens.colors, spacing: tokens.spacing, /*…*/ } },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
};
```

## Output
```json
{ "ok": false, "violations": [{ "file": "Button.tsx", "rule": "1-no-arbitrary", "evidence": "w-[137px]", "fix": "Use w-32 or add to theme.extend.spacing" }] }
```
