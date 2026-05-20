import { defineLayoutView } from '@surte/core'
import { designSystemPattern } from '../patterns/design-system.pattern'

export const designSystemView = defineLayoutView({
  id:     'view.design-system',
  layout: {
    'main': designSystemPattern.instance(),
  },
})
