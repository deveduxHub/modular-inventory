---
name: design-patterns
description: Verifica aplicación correcta de patrones (Factory, Adapter, Strategy, Observer, Provider).
scope: Fase 0..N
---

# Design Patterns Evaluator

## Patrones esperados

### Factory
- Creación de variantes vía `cva` (class-variance-authority) o tabla lookup.
- NUNCA chain de `if/else` para variantes.

### Adapter
- Servicios externos (localStorage, fetch, indexedDB) detrás de interface `Repository<T>`.
- Componentes UI nunca llaman storage directo.

### Strategy
- Algoritmos intercambiables (ordenamiento de productos, cálculo de margen) como funciones puras pasables como prop/config.
- Ej: `<Table sortStrategy={alphabetical}>`.

### Observer / Pub-Sub
- Event bus solo para cross-cutting (toasts, error tracking). NO para data flow normal (eso es state lifting o context).

### Provider (Context)
- Para tema, i18n, auth, queryClient. NO para data de dominio (eso es state manager dedicado).
- Provider expone hook `useX()` con error claro si fuera del provider.

### Compound Components
- Para Card, Tabs, Accordion, Menu. Ver `02-composition.md`.

### Builder
- Para queries complejos / form schemas. Ej: `formBuilder().field('sku').required().mono().build()`.

## Anti-patrones bloqueados
- God Object (un store con todo).
- Singleton mutable sin reset (rompe tests).
- Service Locator (busca dependencias por string).
- Mediator que mete acoplamiento entre 5 componentes.

## Output
```json
{ "ok": false, "violations": [{ "pattern": "Factory", "file": "Button.tsx", "evidence": "switch(variant) with 4 cases", "fix": "use cva() with variants config" }] }
```
