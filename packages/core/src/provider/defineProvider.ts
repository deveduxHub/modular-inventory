import type { ProviderDefinition } from '../types/provider.js'

export function defineProvider(spec: ProviderDefinition): ProviderDefinition {
  return Object.freeze(spec)
}
