---
name: ci-formatting
description: ESLint + Prettier + TypeScript strict + commits + tests + lint en CI.
scope: Fase 0..N · repo root
---

# CI / Formatting Evaluator

## Tooling esperado

### TypeScript
- `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`.
- Cero `any` (warn → error).
- Cero `// @ts-ignore` sin comentario explicativo.
- Path aliases: `@/domain`, `@/application`, `@/infrastructure`, `@/ui`.

### ESLint
- Base: `@typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, `eslint-plugin-tailwindcss`, `eslint-plugin-import`.
- Reglas críticas:
  - `import/order` ordenado.
  - `react-hooks/exhaustive-deps: error`.
  - `tailwindcss/no-custom-classname: warn`.
  - `jsx-a11y/*` recommended.
  - `no-restricted-imports`: bloquea `ui/` ⟶ `infrastructure/`.

### Prettier
- `printWidth: 100`, `singleQuote: true`, `trailingComma: 'all'`.
- Plugin `prettier-plugin-tailwindcss` para ordenar classes.

### Pre-commit
- `husky` + `lint-staged` corre eslint + prettier + tsc --noEmit sobre staged files.

### Conventional Commits
- `commitlint` enforcing `feat|fix|refactor|chore|docs|style|test|perf|build|ci(scope?): subject`.

### Tests
- `vitest` + `@testing-library/react` + `@testing-library/user-event`.
- Coverage mínimo Fase 0: 80% en `domain/` puro, 60% en componentes.

### Storybook CI
- `test-storybook` corre interactions + a11y como gate.

### CI Pipeline (GitHub Actions)
```
1. install (cache)
2. tsc --noEmit
3. eslint .
4. prettier --check .
5. vitest run --coverage
6. build storybook
7. test-storybook
8. build app
```
**Cualquier paso ❌ → bloquea merge.**

## Output
```json
{ "ok": false, "violations": [{ "tool": "tsc", "errors": 3, "files": ["Modal.tsx","useDisclosure.ts"], "fix": "Run tsc --noEmit locally and resolve" }] }
```
