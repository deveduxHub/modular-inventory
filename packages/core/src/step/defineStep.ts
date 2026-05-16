import type { StepDefinition } from '../types/step.js'

export function defineStep(spec: StepDefinition): StepDefinition {
  return Object.freeze(spec)
}
