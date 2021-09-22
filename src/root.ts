import { createDomain } from 'effector'

import { isBrowser } from 'lib/isBrowser'

export const root = createDomain('root')

if (process.env.NODE_ENV === 'development' && isBrowser) {
  import('effector-logger/attach').then(({ attachLogger }) => {
    attachLogger(root, {
      reduxDevtools: 'enabled',
      inspector: 'disabled',
      console: 'disabled',
    })
  })
}
