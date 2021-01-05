import 'styled-components'

interface IFontSizes {
  small: number
  medium: number
  large: number
}

interface IWidthSizes {
  desktop: number
  smDesktop: number
  tablet: number
  smTable: number
  phone: number
  smPhone: number
}

declare module 'styled-components' {
  export interface DefaultTheme {
    lineHeight: number
    fontFamily: string
    fontSize: number
    fontWeight: number
    fontFamily: string
    fontSizes: IFontSizes
    widthSizes: IWidthSizes
    colors: {
      main: string
      default: string
      primary: string
      disabled: string
      background: string
    }
  }
}
