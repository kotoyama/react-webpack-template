export const isDefined = <T>(v: T): v is Exclude<T, undefined> =>
  v !== undefined

export const isNotNull = <T>(v: T): v is Exclude<T, null> => v !== null

export const isNotNil = <T>(v: T): v is Exclude<T, undefined | null> =>
  isDefined(v) && isNotNull(v)

export const isNumber = (v: unknown): v is number => typeof v === 'number'

export const isString = (v: unknown): v is string => typeof v === 'string'
