import React from 'react'
import { useStore } from 'effector-react'

import { $counter, increment, decrement } from './model'
import './Counter.css'

export const Counter: React.FC = () => {
  const counter = useStore($counter)

  return (
    <div className="counter hero__counter">
      <button
        type="button"
        className="counter__button"
        aria-label="Increment value"
        onClick={() => increment()}
      >
        +
      </button>
      <span className="counter__label">{counter}</span>
      <button
        type="button"
        className="counter__button"
        aria-label="Decrement value"
        onClick={() => decrement()}
      >
        -
      </button>
    </div>
  )
}
