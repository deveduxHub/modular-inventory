'use client'
import { useMemo, useEffect, useState, type JSX } from 'react'
import type { GuardResult } from '../types/step.js'
import type { RouterAdapter } from '../types/adapter.js'
import { buildTrie } from '../trie.js'
import { useInventoryContext } from './InventoryContext.js'
import { ViewRenderer } from './ViewRenderer.js'

interface InternalStepRouterProps {
  readonly adapter: RouterAdapter
}

export function InternalStepRouter({ adapter }: InternalStepRouterProps): JSX.Element | null {
  const { steps } = useInventoryContext()
  const pathname = adapter.useCurrentPath()

  const match = useMemo(() => {
    if (steps.length === 0) return null
    const trie = buildTrie(steps)
    return trie(pathname)
  }, [steps, pathname])

  const [guardResult, setGuardResult] = useState<GuardResult | null>(null)

  useEffect(() => {
    if (!match) {
      setGuardResult(null)
      return
    }
    setGuardResult(null)

    let cancelled = false
    const currentMatch = match
    const ctx = { path: pathname, params: currentMatch.params }

    async function runGuards() {
      for (const guard of currentMatch.step.guards) {
        const result = await guard.run(ctx)
        if (cancelled) return
        if (result.decision !== 'allow') {
          setGuardResult(result)
          if (result.decision === 'redirect') {
            adapter.replace(result.url)
          } else if (result.decision === 'replace') {
            const target = steps.find((s) => s.route.id === result.withStep)
            if (target) adapter.replace(target.route.path)
          }
          return
        }
      }
      if (!cancelled) setGuardResult({ decision: 'allow' })
    }

    runGuards()
    return () => { cancelled = true }
  }, [match, pathname, adapter, steps])

  if (!match) return null
  if (!guardResult) return null
  if (guardResult.decision !== 'allow') return null

  return (
    <ViewRenderer
      view={match.step.view}
      ctx={{}}
      params={match.params}
    />
  )
}
