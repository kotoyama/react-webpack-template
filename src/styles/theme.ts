import { DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
  lineHeight: 1.4,
  fontFamily: "'Montserrat', Helvetica, Arial, sans-serif",
  fontSize: 18,
  fontWeight: 400,
  fontSizes: {
    small: 14,
    medium: 18,
    large: 22,
  },
  widthSizes: {
    desktop: 1280,
    smDesktop: 1024,
    tablet: 768,
    smTable: 640,
    phone: 480,
    smPhone: 320,
  },
  colors: {
    main: '#101010',
    default: '#ffffff',
    primary: '#444ce0',
    disabled: '#999999',
    background: '#ecf3f7',
  },
}
