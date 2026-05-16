'use client'
import { useMemo, useEffect, type JSX } from 'react'
import { ThemeProvider } from '@surte/design-system'
import type { InventoryProps } from '../types/inventory.js'
import { InventoryContext } from './InventoryContext.js'
import { InternalStepRouter } from './InternalStepRouter.js'

export function Inventory({
  providers = [],
  steps = [],
  theme,
  adapter,
  onReady,
  onError: _onError,
  children,
}: InventoryProps): JSX.Element {
  const value = useMemo(
    () => ({ steps, providers }),
    [steps, providers],
  )

  useEffect(() => {
    onReady?.()
  }, [onReady])

  return (
    <ThemeProvider {...(theme !== undefined ? { theme } : {})}>
      <InventoryContext.Provider value={value}>
        {adapter !== undefined && <InternalStepRouter adapter={adapter} />}
        {children}
      </InventoryContext.Provider>
    </ThemeProvider>
  )
}
