import React from 'react'
import { render } from '@testing-library/react'
import { App } from './app'

describe('App', () => {
  test('should render learn effector link', () => {
    const { getByText } = render(<App />)
    const linkElement = getByText(/learn effector/i)
    expect(linkElement).toBeInTheDocument()
  })
})
