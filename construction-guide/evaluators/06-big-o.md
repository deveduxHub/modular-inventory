---
name: big-o
description: Detecta complejidad algorítmica injustificada en utils y selectores.
scope: Fase 0..N · *.ts files con loops
---

# Big-O Evaluator

## Reglas

1. **Documentar complejidad** en JSDoc de toda función que itera:
   ```ts
   /** @complexity O(n) where n = products.length */
   export function getActiveProducts(products: Product[]): Product[]
   ```

2. **Bloqueos automáticos:**
   - `O(n²)`+ sin justificación → FAIL.
   - `arr.find()` dentro de `arr.map()` (cuadrático oculto) → FAIL, sugerir `Map`/`Record`.
   - `JSON.parse(JSON.stringify(x))` para deep-clone → FAIL, usar `structuredClone`.
   - `arr.includes()` dentro de loop → FAIL, usar `Set`.

3. **Selectores de lista grande** (>100 items previsibles) deben:
   - Indexar por id en `Map<string, T>` al cargar.
   - Memoizar con `createSelector` o `useMemo` con deps mínimas.

4. **Búsqueda en autocomplete** (proveedor selector, producto search):
   - Debounce 200ms.
   - Filtro O(n) sobre lista ya cargada en memoria; si lista >1000 → exigir índice invertido o fuzzy index (Fuse.js, etc.).

5. **Render lists virtualizadas** cuando >50 items visibles simultáneamente (TanStack Virtual o equivalente).

## Output
```json
{ "ok": false, "violations": [{ "file": "selectInventory.ts", "complexity": "O(n*m)", "evidence": "products.map(p => suppliers.find(s => s.id === p.supplierId))", "fix": "Build Map<id, Supplier> once; lookup O(1)" }] }
```
