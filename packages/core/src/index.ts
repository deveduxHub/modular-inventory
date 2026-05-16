// Types — capability
export type { CapabilityToken } from './types/capability.js'

// Types — slot
export type { LayoutSlot } from './types/slot.js'

// Types — pattern
export type {
  SlotKind,
  ResolvedContext,
  PatternSpec,
  PatternInstanceOptions,
  PatternInstance,
  PatternDefinition,
} from './types/pattern.js'

// Types — view
export type {
  PatternsResolver,
  LayoutViewSpec,
  RenderViewSpec,
  ViewKind,
  ViewDefinition,
} from './types/view.js'

// Types — step
export type {
  Route,
  Guard,
  GuardContext,
  GuardResult,
  StepDefinition,
} from './types/step.js'

// Types — provider
export type { ProviderDefinition, ProviderInstance } from './types/provider.js'

// Types — adapter
export type { RouterAdapter } from './types/adapter.js'

// Types — inventory
export type {
  InventoryProps,
  InventoryError,
  InventoryContextValue,
} from './types/inventory.js'

// Factories
export { definePattern } from './pattern/definePattern.js'
export { defineLayoutView } from './view/defineLayoutView.js'
export { defineRenderView } from './view/defineRenderView.js'
export { defineProvider } from './provider/defineProvider.js'
export { defineRoute } from './step/defineRoute.js'
export { defineStep } from './step/defineStep.js'

// Runtime
export { InventoryContext, useInventoryContext } from './inventory/InventoryContext.js'
export { Inventory } from './inventory/Inventory.js'
export { PatternRenderer } from './inventory/PatternRenderer.js'
export { ViewRenderer } from './inventory/ViewRenderer.js'
