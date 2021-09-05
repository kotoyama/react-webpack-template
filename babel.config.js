const isTest = process.env.NODE_ENV === 'test'
const isDevelopment =
  process.env.WEBPACK_DEV_SERVER === 'true' ||
  process.env.NODE_ENV === 'development'

const presetReact = {
  useBuiltIns: true,
  runtime: 'automatic',
}

const presetEnv = {
  loose: true,
  useBuiltIns: 'entry',
  corejs: 3,
  modules: false,
  shippedProposals: true,
  targets: {
    node: '12',
    browsers: [
      'last 2 Chrome versions',
      'last 2 Firefox versions',
      'last 2 Safari versions',
      'last 1 Edge versions',
    ],
  },
}

const presetTypescript = {
  isTSX: true,
  allExtensions: true,
}

const pluginEffector = { addLoc: true }

module.exports = {
  presets: [
    ['@babel/preset-env', presetEnv],
    ['@babel/preset-react', presetReact],
    ['@babel/preset-typescript', presetTypescript],
  ],
  plugins: [
    isDevelopment && 'react-refresh/babel',
    isTest && '@babel/plugin-transform-modules-commonjs',
    ['effector/babel-plugin', pluginEffector],
  ].filter(Boolean),
}
