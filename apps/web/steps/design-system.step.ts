import { defineStep } from '@surte/core'
import { designSystemView } from '../views/design-system.view'

export const designSystemStep = defineStep({
  route:       { id: 'design-system', path: '/design-system' },
  guards:      [],
  view:        designSystemView,
  transitions: {},
})
