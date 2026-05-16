---
name: solid
description: Valida SRP, OCP, LSP, ISP, DIP en componentes y módulos.
scope: Fase 0..N
---

# SOLID Evaluator

## S — Single Responsibility
- Un componente = una razón para cambiar. Si su nombre necesita "y" o "manejador" → split.
- Archivos ≤ 200 LoC. Si más, dividir.
- Cero `*Manager`, `*Helper`, `*Utils` genéricos.

## O — Open/Closed
- Extensión vía props/slots/composition, NO modificando el archivo del componente.
- Variantes nuevas se añaden por config (`cva`, lookup tables), no por `if (variant === 'x')` ramificado.

## L — Liskov Substitution
- Si `<Button asChild>` envuelve un `<Link/>`, el `<Link/>` debe aceptar todas las props que `<Button/>` promete (onClick, disabled-equivalente, etc.).
- Subtypes no pueden lanzar errores donde el supertype no lo hace.

## I — Interface Segregation
- Props interfaces pequeñas y específicas. NO `ButtonProps extends AllProps`.
- Si una prop solo aplica a un subset de variantes → discriminated union.
  ```ts
  type ButtonProps =
    | { variant: 'icon'; iconLabel: string }
    | { variant: 'text'; children: ReactNode };
  ```

## D — Dependency Inversion
- Componentes UI no importan de `infrastructure/` ni de servicios concretos.
- Recibir adapters/clients como prop o context (DI manual).
- En tests, inyectar mocks sin tocar el componente.

## Bloqueos comunes
- `Button.tsx` que llama directo `fetch()` o `localStorage`.
- Componente con 12 props y todas opcionales (ISP fail).
- Variantes manejadas con `switch(props.variant)` largo (OCP fail).

## Output
```json
{ "ok": false, "violations": [{ "principle": "SRP", "component": "ProductCard", "evidence": "renderiza UI + fetchea data + valida form", "fix": "split into ProductCard (UI) + useProductData (hook) + productSchema" }] }
```
