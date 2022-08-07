/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'effector-react/ssr'
import { fork } from 'effector'

import '~/shared/ui/index.css'

import { loadPolyfills } from './polyfills'
import { App } from './app'

loadPolyfills()

const scope = fork()

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <Provider value={scope}>
    <App />
  </Provider>,
)
