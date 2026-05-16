import type { ThemeMode } from '@surte/design-system'
import type { ProviderInstance } from './provider.js'
import type { StepDefinition } from './step.js'
import type { RouterAdapter } from './adapter.js'

export interface InventoryProps {
  readonly providers?: ReadonlyArray<ProviderInstance>
  readonly steps?:     ReadonlyArray<StepDefinition>
  readonly theme?:     ThemeMode
  readonly adapter?:   RouterAdapter
  readonly onReady?:   () => void
  readonly onError?:   (err: InventoryError) => void
  readonly children?:  React.ReactNode
}

export interface InventoryError {
  readonly kind:    'provider.duplicate' | 'step.route-conflict' | 'bootstrap.failed'
  readonly message: string
  readonly cause?:  unknown
}

export interface InventoryContextValue {
  readonly steps:     ReadonlyArray<StepDefinition>
  readonly providers: ReadonlyArray<ProviderInstance>
}
