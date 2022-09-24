import { fork, allSettled } from 'effector'
import { describe, expect, it, vi } from 'vitest'

import { $counter, increment, decrement } from './model'

describe('counter', () => {
  it('should increment/decrement counter', async () => {
    const triggerInc = vi.fn()
    const triggerDec = vi.fn()

    increment.watch(triggerInc)
    decrement.watch(triggerDec)

    const scopeInc = fork()
    const scopeDec = fork()

    await allSettled(increment, { scope: scopeInc })
    await allSettled(decrement, { scope: scopeDec })

    expect(triggerInc).toHaveBeenCalledTimes(1)
    expect(triggerDec).toHaveBeenCalledTimes(1)
    expect(scopeInc.getState($counter)).toBe(1)
    expect(scopeDec.getState($counter)).toBe(-1)
    expect($counter.getState()).toBe(0)
  })
})
