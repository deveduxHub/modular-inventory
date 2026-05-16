import type { ViewDefinition } from './view.js'

export interface Route {
  readonly id:   string
  readonly path: string
}

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

export interface StepDefinition {
  readonly route:       Route
  readonly guards:      ReadonlyArray<Guard>
  readonly view:        ViewDefinition
  readonly transitions: Readonly<Record<string,
    | { readonly stepId: string; readonly params?: ReadonlyArray<string> }
    | { readonly url: string }
  >>
}
