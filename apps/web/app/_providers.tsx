'use client'
import { Inventory } from '@surte/core'
import { useNextjsAdapter } from '@surte/shell-runtime'
import { helloStep } from '../steps/hello.step'

export function AppProviders(): React.JSX.Element {
  const adapter = useNextjsAdapter()
  return (
    <Inventory
      theme="light"
      steps={[helloStep]}
      adapter={adapter}
    />
  )
}
