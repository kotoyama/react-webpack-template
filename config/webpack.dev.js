const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const postcssNormalize = require('postcss-normalize')

const webpack = require('webpack')
const { merge } = require('webpack-merge')

const paths = require('./paths')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    pathinfo: true,
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  },
  devServer: {
    hot: true,
    open: true,
    quiet: true,
    compress: true,
    watchContentBase: true,
    contentBase: paths.appPublic,
    contentBasePublicPath: paths.publicUrlOrPath,
    publicPath: paths.publicUrlOrPath.slice(0, -1),
    clientLogLevel: 'none',
    stats: 'errors-only',
    host: 'localhost',
    port: 3000,
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: [
                  [
                    require.resolve('postcss-preset-env'),
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  postcssNormalize(),
                ],
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
             options: {
              postcssOptions: {
                plugins: [
                  [
                    require.resolve('postcss-preset-env'),
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  postcssNormalize(),
                ],
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
  ],
})
