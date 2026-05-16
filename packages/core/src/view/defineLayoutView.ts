import type { LayoutViewSpec, ViewDefinition } from '../types/view.js'
import type { PatternInstance } from '../types/pattern.js'

export function defineLayoutView(spec: LayoutViewSpec): ViewDefinition {
  const entries = Object.values(spec.layout) as (PatternInstance | PatternInstance[])[]
  const patterns: PatternInstance[] = entries.flatMap((v) =>
    Array.isArray(v) ? v : [v],
  )

  return Object.freeze<ViewDefinition>({
    id:       spec.id,
    kind:     'layout',
    layout:   spec.layout,
    patterns,
  })
}
