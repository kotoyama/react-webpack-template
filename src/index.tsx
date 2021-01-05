import React from 'react'
import { render } from 'react-dom'

import { ThemeProvider } from 'styled-components'
import { lightTheme, GlobalStyles } from 'styles'

import App from './app'

render(
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
)
