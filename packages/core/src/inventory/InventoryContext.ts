import { createContext, useContext } from 'react'
import type { InventoryContextValue } from '../types/inventory.js'

export const InventoryContext = createContext<InventoryContextValue | null>(null)
InventoryContext.displayName = 'Surte.InventoryContext'

export function useInventoryContext(): InventoryContextValue {
  const ctx = useContext(InventoryContext)
  if (!ctx) throw new Error('[useInventoryContext] must be used inside <Inventory>')
  return ctx
}
