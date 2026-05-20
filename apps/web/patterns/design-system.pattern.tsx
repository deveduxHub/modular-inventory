import { definePattern } from '@surte/core'
import { lazy } from 'react'

export const designSystemPattern = definePattern<object, object>({
  id:         'pattern.design-system',
  slotKind:   'layout',
  requires:   [],
  Component:  lazy(() =>
    import('./DesignSystemShowcaseComponent').then((m) => ({
      default: m.DesignSystemShowcaseComponent,
    })),
  ),
  selector:   (_ctx, _config): object => ({}),
  visibility: () => true,
})
