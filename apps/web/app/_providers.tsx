'use client'
import { Inventory } from '@surte/core'
import { useNextjsAdapter } from '@surte/shell-runtime'
import { helloStep } from '../steps/hello.step'
import { designSystemStep } from '../steps/design-system.step'

export function AppProviders(): React.JSX.Element {
  const adapter = useNextjsAdapter()
  return (
    <Inventory
      theme="light"
      steps={[helloStep, designSystemStep]}
      adapter={adapter}
    />
  )
}
