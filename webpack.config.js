const CssPlugin = require('./webpack/CssPlugin')
const PugPagesPlugin = require('./webpack/HtmlPlugin')
const LiveReload = require('./webpack/LiveReload')
const Copy = require('./webpack/CopyPlugin')
const BabelLoader = require('./webpack/BabelLoader')
const SassLoader = require('./webpack/SassLoader')
const ImageMinimizer = require('./webpack/ImageMinimizer')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
  mode,
  devtool: 'source-map',
  entry: ['./src/js/app.js', './src/scss/style.scss'],
  devServer: {
    port: 3000,
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    clean: true,
  },
  plugins: [CssPlugin(), LiveReload(), Copy(), ...PugPagesPlugin()],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    // minimizer: [ImageMinimizer()],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      BabelLoader,
      SassLoader,
    ],
  },
}
