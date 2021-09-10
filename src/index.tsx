import React from 'react'
import { render } from 'react-dom'
import { fork } from 'effector'
import { Provider } from 'effector-react/ssr'

import './index.css'
import { App } from './app'

const scope = fork()

render(
  <Provider value={scope}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
