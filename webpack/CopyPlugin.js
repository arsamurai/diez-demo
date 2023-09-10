const CopyPlugin = require('copy-webpack-plugin')

module.exports = () =>
  new CopyPlugin({
    patterns: [
      {
        from: './src/assets/other',
        to: '../dist/other',
      },
    ],
  })
