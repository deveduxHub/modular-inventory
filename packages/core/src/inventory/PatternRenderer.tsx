'use client'
import { Suspense, type JSX } from 'react'
import type { PatternInstance, ResolvedContext } from '../types/pattern.js'

interface PatternRendererProps {
  readonly instance: PatternInstance
  readonly ctx:      ResolvedContext
}

export function PatternRenderer({ instance, ctx }: PatternRendererProps): JSX.Element | null {
  const { _spec: spec, _config: config } = instance

  if (!spec.visibility(ctx)) return null

  for (const cap of spec.requires) {
    if (!(cap in ctx)) return null
  }

  const props = spec.selector(ctx, config)
  const Component = spec.Component as React.ComponentType<typeof props>

  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  )
}
