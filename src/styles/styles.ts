import { createGlobalStyle, css } from 'styled-components'
import { resetStyles } from './reset'

export default createGlobalStyle`
  ${resetStyles};

  html {
    ${({ theme }) => css`
      font-weight: ${theme.fontWeight};
      font-size: ${theme.fontSize}px;
      line-height: ${theme.lineHeight};
      color: ${theme.colors.main};

      @media screen and (max-width: ${theme.widthSizes.desktop}px) {
        font-size: 16px;
      }
      @media screen and (max-width: ${theme.widthSizes.tablet}px) {
        font-size: 15px;
      }
      @media screen and (max-width: ${theme.widthSizes.phone}px) {
        font-size: 14px;
      }
    `};
  }

  body {
    ${({ theme }) => css`
      font-family: ${theme.fontFamily};
      background-color: ${theme.colors.background};
    `};
  }

  html,
  body {
    height: 100%;
  }
`
