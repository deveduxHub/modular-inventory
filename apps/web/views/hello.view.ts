import { defineLayoutView } from '@surte/core'
import { helloWorldPattern } from '../patterns/hello-world.pattern'

export const helloView = defineLayoutView({
  id:     'view.hello',
  layout: {
    'main': helloWorldPattern.instance(),
  },
})
