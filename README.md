# 🚀 React Webpack Template

## Stack

- [TypeScript](https://www.typescriptlang.org/)
- [PostCSS](https://github.com/postcss/postcss)
- [Babel](https://github.com/babel/babel)
- [Webpack](https://github.com/webpack/webpack)
- [React](https://github.com/facebook/react) & [React Router](https://reactrouter.com/)
- [Effector](https://github.com/effector/effector)
- [Styled Components](https://github.com/styled-components)
- [ESLint](https://github.com/eslint/eslint) & [Prettier](https://github.com/prettier/prettier)

## Features

- Hot reload
- Pre-commit formatting
- Root alias support

## Available Scripts

In the project directory, you can run:

- `yarn start` - runs the app in the development mode
- `yarn build` - builds the app for production

## Adding fonts

If you need to have fonts support in your project, add this function in `src/styles/styles.ts` file:

```javascript
enum TFontExtension {
  eot = 'eot',
  woff = 'woff',
  woff2 = 'woff2',
  ttf = 'ttf',
  otf = 'otf',
}

export function fontFace(
  name: string,
  src: string,
  weight: string | number = 'normal',
  style = 'normal',
  exts: TFontExtension[] = [TFontExtension.woff2],
): string {
  const formats = {
    eot: 'eot',
    woff: 'woff',
    woff2: 'woff2',
    ttf: 'truetype',
    otf: 'opentype',
  }

  const includes = exts
    .map((ext) => {
      const url = `url(${require(`../assets/fonts/${src}.${ext}`)})`
      const format = formats[ext] ? `format("${formats[ext]}")` : ''
      return `${url} ${format}`
    })
    .join(',')

  return `
    @font-face{
      font-family: "${name}";
      src: ${includes};
      font-display: fallback;
      font-weight: ${weight};
      font-style: ${style};
    }
`
}
```

WARNING: you must have pre-installed fonts in `src/assets/fonts` directory. Usage example:

```javascript
export default createGlobalStyle`
  ${fontFace('GothamPro', 'GothamPro-Light', 300)}
  ${fontFace('GothamPro', 'GothamPro', 'normal')}
  ${fontFace('GothamPro', 'GothamPro-Medium', 500)}
  ${fontFace('GothamPro', 'GothamPro-Bold', 600)}
`
```
