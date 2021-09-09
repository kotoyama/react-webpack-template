import React from 'react'
import { useStore, useEvent } from 'effector-react/ssr'

import './Counter.css'
import { $counter, increment, decrement } from './model'

export const Counter: React.FC = () => {
  const counter = useStore($counter)
  const incrementFn = useEvent(increment)
  const decrementFn = useEvent(decrement)

  return (
    <div className="counter hero__counter">
      <button
        type="button"
        data-testid="increment"
        className="counter__button"
        aria-label="Increment value"
        onClick={() => incrementFn()}
      >
        +
      </button>
      <span data-testid="counter" className="counter__label">
        {counter}
      </span>
      <button
        type="button"
        data-testid="decrement"
        className="counter__button"
        aria-label="Decrement value"
        onClick={() => decrementFn()}
      >
        -
      </button>
    </div>
  )
}
