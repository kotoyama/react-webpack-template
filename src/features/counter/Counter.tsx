import React from 'react'
import { useStore, useEvent } from 'effector-react/ssr'

import { $counter, increment, decrement } from './model'
import styles from './Counter.module.css'

export const Counter: React.FC = () => {
  const counter = useStore($counter)
  const incrementFn = useEvent(increment)
  const decrementFn = useEvent(decrement)

  return (
    <div className={styles.counter}>
      <button
        type="button"
        data-testid="increment"
        className={styles.button}
        aria-label="Increment value"
        onClick={() => incrementFn()}
      >
        +
      </button>
      <span data-testid="counter" className={styles.label}>
        {counter}
      </span>
      <button
        type="button"
        data-testid="decrement"
        className={styles.button}
        aria-label="Decrement value"
        onClick={() => decrementFn()}
      >
        -
      </button>
    </div>
  )
}
