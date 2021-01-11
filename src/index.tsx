import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { ThemeProvider } from 'styled-components'
import { lightTheme, GlobalStyles } from 'styles'

import App from './app'

const history = createBrowserHistory()

render(
  <Router history={history}>
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById('root'),
)
