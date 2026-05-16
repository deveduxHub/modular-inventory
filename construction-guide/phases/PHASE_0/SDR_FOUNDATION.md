# SDR-001: Inventory Foundation — Hello World

> Estado: REVISED (post-critique v2)  
> Objetivo: `pnpm dev` → "Hello World" renderizado a través de `<Inventory />` con ThemeProvider desde el layout del app, routing adaptado, zero lógica de dominio.

---

## 1. Scope

| Package | Nombre npm | Rol |
|---|---|---|
| `packages/design-system` | `@surte/design-system` | ThemeProvider + token system |
| `packages/core` | `@surte/core` | `<Inventory>` + contratos públicos |
| `packages/shell-runtime` | `@surte/shell-runtime` | NextjsAdapter + StepRouter mínimo |
| `apps/web` | `@surte/web` | App Next.js 15 con Hello World |

**Regla de dependencia (hard — no negociable):**
```
@surte/tsconfig  ←  @surte/design-system  ←  @surte/shell-runtime  ←  @surte/web
                                           ←  @surte/core           ←  @surte/web
```
`@surte/core` NO depende de `@surte/design-system`. Son pares, no cadena.

**Fuera de scope:**
- Componentes UI (Button, Input, etc.)
- Domain packages
- GuardGate / guards reales
- Sidebar / topbar chrome
- Storybook, tests, ESLint configs
- `definePattern`, `defineLayoutView`, `defineRenderView`
- i18n, layout config, experimental flags

---

## 2. Contracts

### 2.1 `@surte/design-system`

```ts
// ── Tokens ─────────────────────────────────────────────────────────
export interface DesignTokens {
  // Color
  'color-primary':        string   // css: --surte-color-primary
  'color-primary-hover':  string
  'color-bg-base':        string
  'color-bg-surface':     string
  'color-bg-elevated':    string
  'color-text-primary':   string
  'color-text-secondary': string
  'color-text-disabled':  string
  'color-border':         string
  'color-border-strong':  string
  'color-danger':         string
  'color-success':        string
  'color-warning':        string
  // Radius
  'radius-sm':            string
  'radius-md':            string
  'radius-lg':            string
  // Shadow
  'shadow-sm':            string
  'shadow-md':            string
  // Typography
  'font-sans':            string
  'font-mono':            string
  'font-size-xs':         string
  'font-size-sm':         string
  'font-size-base':       string
  'font-size-lg':         string
  'font-size-xl':         string
  'font-size-2xl':        string
  'font-size-3xl':        string
  'font-weight-normal':   string
  'font-weight-medium':   string
  'font-weight-semibold': string
  'font-weight-bold':     string
  'line-height-tight':    string
  'line-height-normal':   string
  'line-height-relaxed':  string
}

export type ThemeOverrides = Partial<DesignTokens>

export type ThemeMode = 'light' | 'dark' | 'system'

// ── Context value (retornado por useTheme) ─────────────────────────
export interface ThemeContextValue {
  mode:         ThemeMode           // el prop recibido
  resolvedMode: 'light' | 'dark'   // 'system' resuelto via matchMedia
  tokens:       DesignTokens        // tokens del resolvedMode + overrides
  setMode:      (mode: ThemeMode) => void
  setOverrides: (overrides: ThemeOverrides) => void
}

// ── ThemeProvider ───────────────────────────────────────────────────
// 'use client' — solo funciona en Client Components
// Responsabilidades:
//   1. Crear ThemeContext con resolvedMode y tokens
//   2. Escribir CSS vars (--surte-*) en el elemento DOM objetivo
//   3. Escribir data-theme="light|dark" en document.documentElement
//   4. Escuchar cambios de prefers-color-scheme cuando mode='system'
export interface ThemeProviderProps {
  theme?:     ThemeMode      // default: 'system'
  overrides?: ThemeOverrides // se mergean sobre los tokens del resolvedMode
  children:   React.ReactNode
}

export declare function ThemeProvider(props: ThemeProviderProps): JSX.Element

// ── useTheme ────────────────────────────────────────────────────────
// Throws si se llama fuera de ThemeProvider con mensaje claro
export declare function useTheme(): ThemeContextValue

// ── Tailwind preset ─────────────────────────────────────────────────
// Todos los valores referencian var(--surte-*), cero hex hardcodeado
export declare const surtePreset: import('tailwindcss').Config
```

**`package.json` exports:**
```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./tailwind": "./tailwind.config.ts",
    "./styles": "./src/styles/globals.css"
  }
}
```

**deps:** ninguna  
**peerDeps:** `react@^19.0.0`, `tailwindcss@^3.4.0`

---

### 2.2 `@surte/core`

```ts
// ── Capability ─────────────────────────────────────────────────────
export type CapabilityToken = `${string}:${'read' | 'write' | 'stream'}`

// ── Provider ───────────────────────────────────────────────────────
export interface ProviderDefinition {
  readonly id:           string
  readonly capabilities: ReadonlyArray<CapabilityToken>
  readonly Provider:     React.ComponentType<{ children: React.ReactNode; config: unknown }>
}

export interface ProviderInstance {
  readonly definition: ProviderDefinition
  readonly config:     unknown
}

export declare function defineProvider(spec: ProviderDefinition): ProviderDefinition

// ── Router Adapter (contrato puro — sin implementación en core) ────
export interface RouterAdapter {
  useCurrentPath(): string
  push(url: string): void | Promise<void>
  replace(url: string): void | Promise<void>
  prefetch?(url: string): void
}

// ── Route ──────────────────────────────────────────────────────────
export interface Route {
  readonly id:   string
  readonly path: string  // '/products' | '/products/:id'
}

export declare function defineRoute(spec: Route): Route

// ── Guard ──────────────────────────────────────────────────────────
export type GuardResult =
  | { readonly decision: 'allow' }
  | { readonly decision: 'replace';  readonly withStep: string }
  | { readonly decision: 'redirect'; readonly url: string }
  | { readonly decision: 'deny';     readonly reason: string }

export interface GuardContext {
  readonly path:   string
  readonly params: Readonly<Record<string, string>>
}

export interface Guard {
  readonly id:  string
  readonly run: (ctx: GuardContext) => GuardResult | Promise<GuardResult>
}

// ── Step ───────────────────────────────────────────────────────────
export interface StepDefinition {
  readonly route:       Route
  readonly guards:      ReadonlyArray<Guard>
  readonly view:        React.ComponentType
  readonly transitions: Readonly<Record<string,
    | { readonly stepId: string; readonly params?: ReadonlyArray<string> }
    | { readonly url: string }
  >>
}

export declare function defineStep(spec: StepDefinition): StepDefinition

// ── Inventory ──────────────────────────────────────────────────────
// NOTA: Inventory NO wrappea ThemeProvider.
// El app layout.tsx es responsable de wrappear con ThemeProvider de DS.
// Inventory es un shell de composición: registra providers, expone contexto.
export interface InventoryProps {
  providers?:  ReadonlyArray<ProviderInstance>  // [] si omitido
  steps?:      ReadonlyArray<StepDefinition>    // [] si omitido
  onReady?:    () => void                       // llamado tras mount exitoso
  onError?:    (err: InventoryError) => void    // llamado ante error de bootstrap
  children?:   React.ReactNode
}

export interface InventoryError {
  readonly kind:    'provider.duplicate' | 'step.route-conflict' | 'bootstrap.failed'
  readonly message: string
  readonly cause?:  unknown
}

// Behavior cuando steps=[]:
//   → renderiza children directamente
//   → onReady() se llama tras primer render
// Behavior cuando steps=[...]:
//   → StepRouter (de shell-runtime) decide qué renderizar según pathname
//   → children se renderizan siempre (slot global para modals/toasts)
export declare function Inventory(props: InventoryProps): JSX.Element

// ── InventoryContext (para hooks internos) ─────────────────────────
// Exportado para que shell-runtime pueda leer el estado de Inventory
export interface InventoryContextValue {
  readonly steps:     ReadonlyArray<StepDefinition>
  readonly providers: ReadonlyArray<ProviderInstance>
}

export declare const InventoryContext: React.Context<InventoryContextValue | null>
export declare function useInventoryContext(): InventoryContextValue
```

**`package.json` exports:**
```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```

**deps:** ninguna  
**peerDeps:** `react@^19.0.0`

---

### 2.3 `@surte/shell-runtime`

```ts
// ── RouterAdapter implementation para Next.js ──────────────────────
// 'use client' — solo en Client Components
// Internamente: usePathname() + useRouter() de next/navigation
// buildTrie y la lógica de matching son INTERNOS (no exportados)
export declare function useNextjsAdapter(): RouterAdapter

// ── StepRouter ─────────────────────────────────────────────────────
// 'use client'
// Lee InventoryContext (pasos registrados)
// Llama useNextjsAdapter() para obtener pathname actual
// Hace match en Trie interno
// Si no hay match → renderiza null (la app puede usar not-found.tsx)
// Si hay match → ejecuta guards → renderiza step.view
// Guards en Hello World: no hay (steps=[]) → path de no-op
export declare function StepRouter(): JSX.Element | null
```

**`package.json` exports:**
```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```

**deps:** `@surte/core: workspace:*`  
**peerDeps:** `next@^15.0.0`, `react@^19.0.0`

---

## 3. Árbol de archivos

```
packages/
├── tsconfig/                          (ya existe ✓)
│
├── design-system/
│   ├── package.json
│   ├── tailwind.config.ts             (exporta surtePreset)
│   ├── tsconfig.json
│   ├── tsup.config.ts                 (banner: "use client", entry: src/index.ts)
│   └── src/
│       ├── index.ts                   (re-exports ThemeProvider, useTheme, types)
│       ├── styles/
│       │   └── globals.css            (--surte-* CSS vars: :root light + .dark overrides)
│       └── theme/
│           ├── tokens/
│           │   ├── types.ts           (DesignTokens interface)
│           │   ├── light.ts           (DesignTokens objeto light)
│           │   └── dark.ts            (DesignTokens objeto dark — solo overrides)
│           ├── ThemeContext.ts        (createContext<ThemeContextValue | null>(null))
│           ├── ThemeProvider.tsx      ('use client' — escribe CSS vars + data-theme)
│           └── useTheme.ts            (use(ThemeContext), throws si null)
│
├── core/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsup.config.ts                 (entry: src/index.ts, format: esm+cjs, dts: true)
│   └── src/
│       ├── index.ts
│       ├── types/
│       │   ├── capability.ts          (CapabilityToken)
│       │   ├── provider.ts            (ProviderDefinition, ProviderInstance)
│       │   ├── step.ts                (Route, Guard, GuardResult, GuardContext, StepDefinition)
│       │   ├── inventory.ts           (InventoryProps, InventoryError, InventoryContextValue)
│       │   └── adapter.ts             (RouterAdapter interface)
│       ├── provider/
│       │   └── defineProvider.ts
│       ├── step/
│       │   ├── defineRoute.ts
│       │   └── defineStep.ts
│       └── inventory/
│           ├── InventoryContext.ts    (createContext + useInventoryContext)
│           └── Inventory.tsx          (registra providers, expone contexto, renderiza children)
│
├── shell-runtime/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsup.config.ts                 (banner: "use client")
│   └── src/
│       ├── index.ts
│       ├── trie.ts                    (INTERNO: buildTrie, TrieNode, matchPath)
│       ├── adapters/
│       │   └── nextjs.ts              (useNextjsAdapter — usePathname + useRouter)
│       └── StepRouter.tsx             ('use client' — usa adapter + trie interno + InventoryContext)
│
apps/
└── web/
    ├── package.json
    ├── next.config.ts                 (transpilePackages: ['@surte/core', '@surte/design-system', '@surte/shell-runtime'])
    ├── tailwind.config.ts             (presets: [surtePreset], content: app/**/*.tsx + packages/**/*.tsx)
    ├── postcss.config.mjs             (postcss-import → tailwindcss → autoprefixer)
    ├── tsconfig.json                  (extends @surte/tsconfig/react.json)
    └── app/
        ├── globals.css                (@tailwind base/components/utilities + @import tokens fallback)
        ├── layout.tsx                 (RSC — html+body, suppressHydrationWarning, <ThemeProvider>)
        ├── [[...path]]/
        │   └── page.tsx               ('use client' — <StepRouter /> — maneja /*, no interfiere con /)
        └── (hello-world)/             (Next.js route group — no afecta URL)
            └── page.tsx               (<Inventory><h1>Hello World</h1></Inventory>)
```

> **Nota sobre routing en `/`:**  
> `app/(hello-world)/page.tsx` es el route group para `/` (sin prefijo de URL).  
> `app/[[...path]]/page.tsx` captura todo lo demás.  
> No hay conflicto: Next.js prioriza rutas estáticas sobre catch-all.

---

## 4. Dependency Graph

```
@surte/tsconfig        (sin deps)
      ↑
@surte/design-system   (peerDeps: react, tailwindcss — SIN deps de @surte)
      ↑                          ↑
@surte/core            ──────────┘
(peerDeps: react — SIN dep en DS)
      ↑
@surte/shell-runtime   (deps: @surte/core — peerDeps: next, react)
      ↑
@surte/web             (deps: todos los anteriores)
```

---

## 5. Comportamiento de `<Inventory>`

```
<Inventory providers={[]} steps={[]}>
  <h1>Hello World</h1>
</Inventory>

→ Monta InventoryContext con { steps: [], providers: [] }
→ Llama onReady() tras mount (useEffect)
→ Renderiza children directamente (steps vacío)
→ NO wrappea ThemeProvider (eso es responsabilidad de layout.tsx)
```

**ThemeProvider en layout.tsx:**
```tsx
// app/layout.tsx — RSC
export default function RootLayout({ children }) {
  return (
    <html lang="es-PE" suppressHydrationWarning>
      <body>
        <ThemeProvider theme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

`suppressHydrationWarning` en `<html>`: ThemeProvider escribe `data-theme` en `document.documentElement` vía `useEffect` en client. El atributo no existe en el SSR HTML — Next.js lanzaría hydration warning sin esta prop.

---

## 6. globals.css — Estrategia PostCSS

`apps/web/app/globals.css` NO importa desde node_modules directamente.  
En su lugar:
1. `@tailwind base` — reset de Tailwind
2. `:root { --surte-* }` — tokens light hardcodeados como fallback SSR (copiados de `light.ts` en build)
3. `.dark { --surte-* }` — overrides dark
4. `@tailwind components`
5. `@tailwind utilities`

`postcss.config.mjs`:
```js
export default {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 7. tsup configs

**`@surte/design-system`:**
```ts
defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
  banner: { js: '"use client"' },
})
```

**`@surte/core`:**
```ts
defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  // Sin banner "use client" — core tiene archivos server-safe
})
```

**`@surte/shell-runtime`:**
```ts
defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'next'],
  banner: { js: '"use client"' },
})
```

---

## 8. Gates de Aceptación

| Gate | Check | Verificación |
|---|---|---|
| G0-TS | `pnpm typecheck` sin errores | `pnpm -r typecheck` |
| G0-BUILD | Todos los packages buildean | `pnpm build` |
| G0-DEV | App arranca sin crash | `pnpm dev` → localhost:3000 |
| G0-RENDER | "Hello World" visible en `http://localhost:3000` | manual/browser |
| G0-THEME | `data-theme="light"` en `<html>` tras hydration | devtools |
| G0-NODEPS | `@surte/core` no importa de `@surte/design-system` | `pnpm ls @surte/design-system --filter @surte/core` → no aparece |
| G0-NOIMPLICIT | Sin `noImplicitAny` violations | parte de G0-TS (ya en tsconfig.base.json) |
