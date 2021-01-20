const isTest = process.env.NODE_ENV === 'test'
const isDevelopment =
  process.env.WEBPACK_DEV_SERVER === 'true' ||
  process.env.NODE_ENV === 'development'

const presetReact = {
  development: isDevelopment,
  useBuiltIns: true,
  runtime: 'automatic',
}

const presetEnv = {
  useBuiltIns: 'usage',
  corejs: 3,
  modules: isTest ? 'commonjs' : 'auto',
}

const presetTypescript = {
  isTSX: true,
  allExtensions: true,
  onlyRemoveTypeImports: true,
}

const pluginEffector = { addLoc: true }

const pluginStyledComponents = {
  displayName: isDevelopment,
  pure: true,
}

module.exports = {
  presets: [
    ['@babel/preset-env', presetEnv],
    ['@babel/preset-react', presetReact],
    ['@babel/preset-typescript', presetTypescript],
  ],
  plugins: [
    ['babel-plugin-styled-components', pluginStyledComponents],
    ['effector/babel-plugin', pluginEffector],
    isDevelopment && 'react-refresh/babel',
  ].filter(Boolean),
}
