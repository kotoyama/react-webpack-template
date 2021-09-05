/* eslint-disable effector/no-getState */
import { fork, allSettled } from 'effector'

import { domain, $counter, increment, decrement } from './model'

describe('counter', () => {
  test('should increment/decrement counter', async () => {
    const triggerInc = jest.fn()
    const triggerDec = jest.fn()

    increment.watch(triggerInc)
    decrement.watch(triggerDec)

    const scopeInc = fork(domain)
    const scopeDec = fork(domain)

    await allSettled(increment, { scope: scopeInc })
    await allSettled(decrement, { scope: scopeDec })

    expect(triggerInc).toHaveBeenCalledTimes(1)
    expect(triggerDec).toHaveBeenCalledTimes(1)
    expect(scopeInc.getState($counter)).toBe(1)
    expect(scopeDec.getState($counter)).toBe(-1)
    expect($counter.getState()).toBe(0)
  })
})
