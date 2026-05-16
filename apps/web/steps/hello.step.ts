import { defineStep } from '@surte/core'
import { helloView } from '../views/hello.view'

export const helloStep = defineStep({
  route:       { id: 'hello', path: '/' },
  guards:      [],
  view:        helloView,
  transitions: {},
})
