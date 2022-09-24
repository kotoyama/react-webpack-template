import { fireEvent, render, screen } from '@testing-library/react'
import { fork, Scope } from 'effector'
import { Provider } from 'effector-react/scope'
import { FC, PropsWithChildren } from 'react'
import { describe, beforeEach, expect, it, vi } from 'vitest'

import { increment, decrement } from '../model'
import { Counter } from './Counter'

let scope: Scope

beforeEach(() => {
  scope = fork()
})

const selectors = {
  counterLabel: async () => screen.getByTestId(/counter/i),
  incrementBtn: async () => screen.getByTestId(/increment/i),
  decrementBtn: async () => screen.getByTestId(/decrement/i),
}

const Wrapper: FC<PropsWithChildren> = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
)

describe('Counter', () => {
  const incrementFn = vi.fn()
  const decrementFn = vi.fn()

  increment.watch(incrementFn)
  decrement.watch(decrementFn)

  beforeEach(() => {
    incrementFn.mockReset()
    decrementFn.mockReset()
  })

  it('should render properly with default states', async () => {
    render(<Counter />, { wrapper: Wrapper })

    const incrementBtn = await selectors.incrementBtn()
    const decrementBtn = await selectors.decrementBtn()
    const counterLabel = await selectors.counterLabel()

    expect(incrementBtn).toBeInTheDocument()
    expect(decrementBtn).toBeInTheDocument()
    expect(counterLabel).toBeInTheDocument()
    expect(counterLabel).toHaveTextContent('0')
    expect(incrementBtn).toHaveTextContent('+')
    expect(decrementBtn).toHaveTextContent('-')
    expect(incrementBtn).toHaveAttribute('type', 'button')
    expect(decrementBtn).toHaveAttribute('type', 'button')
  })

  it('should render properly with increment', async () => {
    render(<Counter />, { wrapper: Wrapper })

    const incrementBtn = await selectors.incrementBtn()
    const counterLabel = await selectors.counterLabel()

    fireEvent.click(incrementBtn)

    expect(incrementFn).toHaveBeenCalledTimes(1)
    expect(counterLabel).toHaveTextContent('1')
  })

  it('should render properly with decrement', async () => {
    render(<Counter />, { wrapper: Wrapper })

    const decrementBtn = await selectors.decrementBtn()
    const counterLabel = await selectors.counterLabel()

    fireEvent.click(decrementBtn)

    expect(decrementFn).toHaveBeenCalledTimes(1)
    expect(counterLabel).toHaveTextContent('-1')
  })
})
