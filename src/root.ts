import { createDomain } from 'effector'

export const root = createDomain('root')

/** @see https://github.com/effector/logger/issues/59 */
// if (process.env.NODE_ENV === 'development') {
//   import('effector-logger/attach').then(({ attachLogger }) => {
//     attachLogger(root, {
//       reduxDevtools: 'enabled',
//       inspector: 'disabled',
//       console: 'disabled',
//     })
//   })
// }
