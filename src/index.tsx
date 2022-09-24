import { fork } from 'effector'
import { Provider } from 'effector-react/scope'
import { createRoot } from 'react-dom/client'

import '~/shared/ui/index.css'

import { App } from './app'

const scope = fork()

const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)

root.render(
  <Provider value={scope}>
    <App />
  </Provider>,
)
