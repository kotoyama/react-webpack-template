const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const ManifestPlugin = require('webpack-manifest-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const paths = require('./paths')
const devServerConfig = require('./webpack.server')

// Check if TypeScript is setup.
const useTypeScript = fs.existsSync(paths.appTsConfig)

const shouldUseSourceMap = false

const isEnvDevelopment = process.env.NODE_ENV === 'development'
const isEnvProduction = process.env.NODE_ENV === 'production'

// common function to get style loaders
const getStyleLoaders = (cssOptions) => {
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
        sourceMap: isEnvProduction && shouldUseSourceMap,
      },
    },
  ].filter(Boolean)

  return loaders
}

module.exports = {
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  devServer: devServerConfig,
  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : isEnvDevelopment && 'cheap-module-source-map',
  entry: ['react-hot-loader/patch', paths.appIndexJs],
  output: {
    path: paths.appBuild,
    pathinfo: isEnvDevelopment,
    filename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].js'
      : isEnvDevelopment && 'static/js/bundle.js',
    chunkFilename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : isEnvDevelopment && 'static/js/[name].chunk.js',
    publicPath: paths.publicUrlOrPath,
  },
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        sourceMap: shouldUseSourceMap,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: shouldUseSourceMap
            ? {
                inline: false,
                annotation: true,
              }
            : false,
        },
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src'),
    ],
    extensions: paths.moduleFileExtensions
      .map((ext) => `.${ext}`)
      .filter((ext) => useTypeScript || !ext.includes('ts')),
    plugins: [PnpWebpackPlugin],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  module: {
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(ts|tsx|js|jsx)$/,
        enforce: 'pre',
        include: paths.appSrc,
        use: [
          {
            loader: require.resolve('eslint-loader'),
            options: {
              cache: true,
              eslintPath: require.resolve('eslint'),
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        include: paths.appSrc,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              compact: isEnvProduction,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: isEnvProduction && shouldUseSourceMap,
        }),
      },
      {
        test: /\.(jpg|jpeg|png|webp)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
          },
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: paths.appHtml,
        },
        isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined,
      ),
    ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new Dotenv(),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    isEnvProduction && new CleanWebpackPlugin(),
    isEnvProduction &&
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '..', 'public', 'favicon.ico'),
            to: './',
          },
          {
            from: path.resolve(__dirname, '..', 'public', 'manifest.json'),
            to: './',
          },
        ],
      }),
    isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
    isEnvDevelopment &&
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: ['Application is running here http://localhost:3000'],
        },
      }),
    isEnvDevelopment &&
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/, // exclude node_modules
        failOnError: false, // show a warning when there is a circular dependency
      }),
    isEnvDevelopment && new ErrorOverlayPlugin(),
    isEnvProduction &&
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: paths.publicUrlOrPath,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path
          return manifest
        }, seed)
        const entrypointFiles = entrypoints.main.filter(
          (fileName) => !fileName.endsWith('.map'),
        )

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        }
      },
    }),
    useTypeScript && new ForkTsCheckerWebpackPlugin(),
    // isEnvProduction && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
}
