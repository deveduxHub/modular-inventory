import type { StepDefinition } from './types/step.js'

interface TrieNode {
  children:  Map<string, TrieNode>
  step:      StepDefinition | null
  paramName: string | null
  isParam:   boolean
  isWildcard: boolean
}

function createNode(): TrieNode {
  return { children: new Map(), step: null, paramName: null, isParam: false, isWildcard: false }
}

export interface MatchResult {
  step:   StepDefinition
  params: Record<string, string>
}

export function buildTrie(
  steps: ReadonlyArray<StepDefinition>,
): (pathname: string) => MatchResult | null {
  const root = createNode()

  for (const step of steps) {
    const segments = step.route.path.split('/').filter(Boolean)
    let node = root

    for (const segment of segments) {
      const key =
        segment.startsWith(':') ? '__param__' :
        segment === '*'         ? '__wildcard__' :
        segment
      if (!node.children.has(key)) {
        const child = createNode()
        if (segment.startsWith(':')) {
          child.isParam    = true
          child.paramName  = segment.slice(1)
        } else if (segment === '*') {
          child.isWildcard = true
        }
        node.children.set(key, child)
      }
      node = node.children.get(key)!
    }

    node.step = step
  }

  return function match(pathname: string): MatchResult | null {
    const segments = pathname.split('/').filter(Boolean)
    const params: Record<string, string> = {}

    function traverse(node: TrieNode, idx: number): StepDefinition | null {
      if (idx === segments.length) return node.step

      const segment = segments[idx]!

      if (node.children.has(segment)) {
        const result = traverse(node.children.get(segment)!, idx + 1)
        if (result) return result
      }

      if (node.children.has('__param__')) {
        const paramNode = node.children.get('__param__')!
        params[paramNode.paramName!] = segment
        const result = traverse(paramNode, idx + 1)
        if (result) return result
        delete params[paramNode.paramName!]
      }

      if (node.children.has('__wildcard__')) {
        const wildcardNode = node.children.get('__wildcard__')!
        params['*'] = segments.slice(idx).join('/')
        return wildcardNode.step
      }

      return null
    }

    const step = traverse(root, 0)
    return step ? { step, params } : null
  }
}
