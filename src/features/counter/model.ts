import { createEvent, createStore } from 'effector'
import { MouseEvent } from 'react'

export const increment = createEvent<MouseEvent<HTMLButtonElement>>()
export const decrement = createEvent<MouseEvent<HTMLButtonElement>>()

export const $counter = createStore(0)
  .on(increment, (count) => count + 1)
  .on(decrement, (count) => count - 1)
