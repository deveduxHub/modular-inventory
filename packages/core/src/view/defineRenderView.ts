import type { RenderViewSpec, ViewDefinition } from '../types/view.js'

export function defineRenderView(spec: RenderViewSpec): ViewDefinition {
  return Object.freeze<ViewDefinition>({
    id:       spec.id,
    kind:     'render',
    patterns: spec.patterns,
    render:   spec.render,
  })
}
