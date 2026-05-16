---
name: overriding
description: Estrategia de override de estilos y comportamiento en componentes del DS.
scope: Fase 0..N · DS components
---

# Overriding Strategy Evaluator

## Estrategia oficial del DS

### 1. `className` merge via `cn()` (tw-merge + clsx)
Todo componente acepta `className` y lo combina con sus clases base:
```tsx
function Button({ className, variant, ...rest }: Props) {
  return <button className={cn(buttonVariants({ variant }), className)} {...rest} />;
}
```
- `tailwind-merge` resuelve conflictos (último gana correctamente para clases Tailwind).
- **PROHIBIDO:** concatenar con backticks sin `cn()`.

### 2. `asChild` para cambiar el elemento renderizado
Cuando un consumidor necesita el comportamiento del componente pero distinto tag:
```tsx
<Button asChild><Link to="/x">Ir</Link></Button>
```
Implementación via Radix `Slot` o equivalente.

### 3. Slots para sub-partes
Card, Modal, Form exponen `Card.Header`, `Card.Body`, `Card.Footer`. El consumidor compone, no override.

### 4. Variant API cerrada
- `variant`, `size`, `tone` son enums whitelisted.
- Variante nueva → spec XML + decisión DS-NNN. JAMÁS hardcoded en consumidor.

### 5. Theme override (global)
Cambiar tokens del tema = via `ThemeProvider` o CSS vars en `<html data-theme="…">`. No por componente.

## Bloqueado

- `style={{ ... }}` con valores que existen como token (`color: '#A86250'` → FAIL, usar token).
- `!important` en CSS de consumidor (rompe ts-merge).
- Override por selector CSS específico (`.my-page .ds-button { ... }`) — fragile.
- Forking del componente para una variante one-off — proponer en builder-guide primero.

## Casos permitidos de `style={{}}`
- Valores computados en runtime (transform, % dinámico).
- Sombras one-off documentadas con comentario.

## Output
```json
{ "ok": false, "violations": [{ "file": "Productos.tsx", "rule": "blocked-style-inline", "evidence": "style={{ background: '#A86250' }}", "fix": "className=\"bg-brand-primary\"" }] }
```
