---
name: ddd
description: Arquitectura por capas DDD · domain / application / infrastructure / ui.
scope: Fase 1..N · estructura de carpetas
---

# DDD Evaluator

## Estructura obligatoria
```
src/
├── domain/                ← entidades, value objects, invariantes
│   └── product/
│       ├── Product.ts             (entity + factory)
│       ├── Sku.ts                 (value object)
│       ├── Money.ts               (value object)
│       └── productInvariants.ts   (reglas puras)
├── application/           ← casos de uso, orquestación
│   └── product/
│       ├── createProduct.ts       (use case)
│       └── listProducts.ts
├── infrastructure/        ← adapters: localStorage, fetch, indexedDB
│   └── product/
│       └── productRepository.ts   (impl LocalStorageProductRepository)
└── ui/                    ← React: pages, features, ds, shared
    ├── ds/                        (design system)
    ├── features/product/
    └── pages/
```

## Reglas

1. **`domain/` no importa de NADA externo** (ni React, ni storage, ni fetch). Pure TS.
2. **`application/` orquesta `domain/` + recibe adapters de `infrastructure/` por inyección.**
3. **`infrastructure/` implementa interfaces declaradas en `domain/` o `application/`.**
4. **`ui/` consume `application/` vía hooks (`useCreateProduct()`); jamás importa `infrastructure/` directo.**
5. **Value Objects inmutables.** `Sku`, `Money`, `Stock` son clases o branded types con validación al construir.
6. **Entidades con identidad.** `Product.id` no cambia, equality por id.
7. **Invariantes en el constructor.** Imposible construir un `Product` inválido.
8. **Repositorios devuelven entidades, no DTOs crudos.** Adapter mapea `{id, sku}` → `new Product(...)`.

## Bloqueos
- Import de `infrastructure/` desde `domain/` o `ui/` directo → FAIL.
- Validación de SKU duplicada en 3 lugares → exige extraer a `Sku.create(value)`.
- Hex/literal de configuración fuera de `domain/` o `config/` → FAIL.

## Output
```json
{ "ok": false, "violations": [{ "file": "ui/features/product/ProductForm.tsx", "rule": "4-ui-direct-infra", "evidence": "import localStorage helper directly", "fix": "use useCreateProduct() from application/" }] }
```
