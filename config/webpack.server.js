const paths = require('./paths')

module.exports = {
  contentBase: paths.appPublic,
  contentBasePublicPath: paths.publicUrlOrPath,
  publicPath: paths.publicUrlOrPath.slice(0, -1),
  watchContentBase: true,
  hot: true,
  open: true,
  compress: true,
  quiet: true,
  historyApiFallback: {
    disableDotRule: true,
    index: paths.publicUrlOrPath,
  },
  port: 3000,
}
