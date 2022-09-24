import { lazy as lazyLoad } from 'react'

/**
 * React.lazy with named export
 * @example
 * ```ts
 * const Component = namedLazy(() => import('./component'), 'ComponentName')
 * ```
 */
export const lazy = <T extends Record<string, React.FunctionComponent>>(
  loader: () => Promise<T>,
  name: keyof T,
) =>
  lazyLoad(async () => {
    const module = await loader()
    return { default: module[name] }
  })
