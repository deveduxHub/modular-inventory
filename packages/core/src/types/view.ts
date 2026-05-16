import type { ReactNode } from 'react'
import type { LayoutSlot } from './slot.js'
import type { PatternInstance, ResolvedContext } from './pattern.js'

export interface PatternsResolver {
  render(patternId: string): ReactNode
}

export interface LayoutViewSpec {
  readonly id:             string
  readonly lazy?:          boolean
  readonly layout:         Partial<Record<LayoutSlot, PatternInstance | PatternInstance[]>>
  readonly errorBoundary?: { readonly fallback: ReactNode }
}

export interface RenderViewSpec {
  readonly id:             string
  readonly lazy?:          boolean
  readonly patterns:       ReadonlyArray<PatternInstance>
  readonly render:         (api: {
    readonly patterns: PatternsResolver
    readonly ctx:      ResolvedContext
  }) => ReactNode
  readonly errorBoundary?: { readonly fallback: ReactNode }
}

export type ViewKind = 'layout' | 'render'

export interface ViewDefinition {
  readonly id:       string
  readonly kind:     ViewKind
  readonly layout?:  Partial<Record<LayoutSlot, PatternInstance | PatternInstance[]>>
  readonly patterns: ReadonlyArray<PatternInstance>
  readonly render?:  (api: {
    readonly patterns: PatternsResolver
    readonly ctx:      ResolvedContext
  }) => ReactNode
}
