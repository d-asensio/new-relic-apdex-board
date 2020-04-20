const path = require('path')

const {
  LoaderOptionsPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin
} = require('webpack')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function isDevelopment () {
  const { NODE_ENV = 'development' } = process.env
  return NODE_ENV === 'development'
}

const SRC_PATH = path.resolve(__dirname, 'src')
const ENTRY_FILE = path.join(__dirname, 'src/index.js')

const DATA_PATH = path.resolve(__dirname, 'data')

const BUILD_DIR = path.join(__dirname, 'build')
const MAIN_HTML_FILE = path.join(__dirname, 'public/index.html')

module.exports = {
  mode: (
    isDevelopment()
      ? 'development'
      : 'production'
  ),
  entry: {
    bundle: ENTRY_FILE
  },
  output: {
    path: BUILD_DIR,
    filename: (
      isDevelopment()
        ? '[name].js'
        : '[name][hash:6].js'
    )
  },
  devtool: (
    isDevelopment()
      ? 'source-map'
      : 'none'
  ),
  watch: isDevelopment(),
  watchOptions: {
    aggregateTimeout: 300
  },
  resolve: {
    extensions: ['*', '.js']
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.(js)?$/,
        loaders: ['babel-loader'],
        include: [SRC_PATH]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopment()
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: SRC_PATH,
        output: {
          path: BUILD_DIR
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: (
        isDevelopment()
          ? '[name].css'
          : '[name].[hash:6].css'
      ),
      chunkFilename: (
        isDevelopment()
          ? '[id].css'
          : '[id].[hash:6].css'
      )
    }),
    new HtmlWebpackPlugin({
      template: MAIN_HTML_FILE,
      filename: 'index.html'
    }),
    new CopyPlugin([
      {
        context: DATA_PATH,
        from: '**/*',
        to: path.join(BUILD_DIR, 'data')
      }
    ]),
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin()
  ]
}
