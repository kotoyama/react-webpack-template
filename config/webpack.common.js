const DotenvPlugin = require('dotenv-webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const paths = require('./paths')
const { moduleFileExtensions } = require('./paths')

module.exports = {
  entry: paths.appIndexJs,
  output: {
    publicPath: paths.publicUrlOrPath,
    assetModuleFilename: 'assets/[name].[hash:8].[ext]',
  },
  resolve: {
    modules: [
      paths.appNodeModules,
      paths.appSrc,
    ],
    extensions: moduleFileExtensions.map((extension) => `.${extension}`),
    plugins: [new TsconfigPathsPlugin({ configFile: paths.appTsConfig })],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          compact: false,
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10000,
          },
        },
        generator: {
          filename: 'assets/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            dependency: { not: ['url'] },
            use: [require.resolve('@svgr/webpack'), require.resolve('new-url-loader')],
          },
          {
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10000,
              },
            },
            generator: {
              filename: 'assets/[name].[contenthash:8][ext]'
            }
          },
        ]
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
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: paths.appTsConfig,
      },
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      eslintPath: require.resolve('eslint'),
      context: paths.appSrc,
      cwd: paths.appPath,
      resolvePluginsRelativeTo: __dirname,
      cache: true,
    }),
  ],
  performance: {
    hints: false,
  },
  stats: {
    modules: false,
    chunks: false,
    children: false,
    timings: false,
    version: false,
  },
}
