import React from 'react'
import { useUnit } from 'effector-react'

import { $counter, increment, decrement } from '../model'
import styles from './Counter.module.css'

export const Counter = () => {
  const [counter, incFn, decFn] = useUnit([$counter, increment, decrement])

  return (
    <div className={styles.counter}>
      <button
        type="button"
        data-testid="increment"
        className={styles.button}
        aria-label="Increment value"
        onClick={() => incFn()}
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
        onClick={() => decFn()}
      >
        -
      </button>
    </div>
  )
}
