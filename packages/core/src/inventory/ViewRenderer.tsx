'use client'
import { type JSX, type ReactNode } from 'react'
import type { ViewDefinition, PatternsResolver } from '../types/view.js'
import type { PatternInstance, ResolvedContext } from '../types/pattern.js'
import { PatternRenderer } from './PatternRenderer.js'

interface ViewRendererProps {
  readonly view:   ViewDefinition
  readonly ctx:    ResolvedContext
  readonly params: Readonly<Record<string, string>>
}

export function ViewRenderer({ view, ctx }: ViewRendererProps): JSX.Element | null {
  if (view.kind === 'layout') return <LayoutViewRenderer view={view} ctx={ctx} />
  return <RenderViewRenderer view={view} ctx={ctx} />
}

function LayoutViewRenderer({
  view,
  ctx,
}: {
  readonly view: ViewDefinition
  readonly ctx:  ResolvedContext
}): JSX.Element {
  const slots = Object.entries(view.layout ?? {}) as [
    string,
    PatternInstance | PatternInstance[],
  ][]

  return (
    <>
      {slots.map(([slot, instances]) => {
        const list: PatternInstance[] = Array.isArray(instances) ? instances : [instances]
        return list.map((inst) => (
          <PatternRenderer
            key={`${slot}:${inst._instanceKey}`}
            instance={inst}
            ctx={ctx}
          />
        ))
      })}
    </>
  )
}

function RenderViewRenderer({
  view,
  ctx,
}: {
  readonly view: ViewDefinition
  readonly ctx:  ResolvedContext
}): JSX.Element | null {
  if (!view.render) return null

  const resolver: PatternsResolver = {
    render(patternId: string): ReactNode {
      const inst = view.patterns.find((p) => p._patternId === patternId)
      if (!inst) return null
      return <PatternRenderer instance={inst} ctx={ctx} />
    },
  }

  return <>{view.render({ patterns: resolver, ctx })}</>
}
