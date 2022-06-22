import React from 'react'
import { render } from 'react-dom'
import { fork } from 'effector'
import { Provider } from 'effector-react/ssr'

import { loadPolyfills } from './polyfills'
import { App } from './app'
import './ui/index.css'

loadPolyfills()

const scope = fork()

render(
  <Provider value={scope}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
