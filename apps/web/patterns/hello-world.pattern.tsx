import { definePattern } from '@surte/core'
import { lazy } from 'react'

export const helloWorldPattern = definePattern<object, object>({
  id:         'pattern.hello-world',
  slotKind:   'layout',
  requires:   [],
  Component:  lazy(() =>
    import('./HelloWorldComponent').then((m) => ({ default: m.HelloWorldComponent })),
  ),
  selector:   (_ctx, _config): object => ({}),
  visibility: () => true,
})
