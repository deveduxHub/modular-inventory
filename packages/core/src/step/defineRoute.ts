import type { Route } from '../types/step.js'

export function defineRoute(spec: Route): Route {
  return Object.freeze(spec)
}
