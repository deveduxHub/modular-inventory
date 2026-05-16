import type { ComponentType, ReactNode } from 'react'
import type { CapabilityToken } from './capability.js'

export interface ProviderDefinition {
  readonly id:           string
  readonly capabilities: ReadonlyArray<CapabilityToken>
  readonly Provider:     ComponentType<{ children: ReactNode; config: unknown }>
}

export interface ProviderInstance {
  readonly definition: ProviderDefinition
  readonly config:     unknown
}
