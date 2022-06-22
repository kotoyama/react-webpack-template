import React from 'react'
import { render } from 'react-dom'
import { fork } from 'effector'
import { Provider } from 'effector-react/ssr'

import '~/shared/ui/index.css'

import { loadPolyfills } from './polyfills'
import { App } from './app'

loadPolyfills()

const scope = fork()

render(
  <Provider value={scope}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
