const DotenvPlugin = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const paths = require('./paths')

module.exports = {
  context: paths.appPath,
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    publicPath: paths.publicUrlOrPath,
  },
  resolve: {
    modules: [
      paths.appNodeModules,
      paths.appSrc,
    ],
    extensions: paths.moduleFileExtensions.map((extension) => `.${extension}`),
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: paths.appSrc,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'assets/[name].[contenthash:8].[ext]',
        },
      },
      {
        test: /\.svg$/,
        use: [
          require.resolve('babel-loader'),
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              ref: true,
              memo: true,
              babel: false,
              prettier: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
            },
          },
        ],
      },
    ],
    strictExportPresence: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      favicon: paths.appFavicon,
    }),
    new DotenvPlugin({
      path: paths.dotenv,
      expand: true,
      systemvars: true,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      context: paths.appSrc,
    }),
  ],
}
