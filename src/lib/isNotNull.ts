export const isNotNull = <T>(v: T): v is Exclude<T, null> => v !== null
