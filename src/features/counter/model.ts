import { root } from 'root'

export const domain = root.domain('counter')

export const increment = domain.event()
export const decrement = domain.event()

export const $counter = domain
  .store(0)
  .on(increment, (count) => count + 1)
  .on(decrement, (count) => count - 1)
