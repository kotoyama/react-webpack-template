import { root } from '~/root'

export const domain = root.domain('counter')

export const increment = domain.createEvent()
export const decrement = domain.createEvent()

export const $counter = domain
  .createStore(0)
  .on(increment, (count) => count + 1)
  .on(decrement, (count) => count - 1)
