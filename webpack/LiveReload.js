const LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = () =>
  new LiveReloadPlugin({
    appendScriptTag: process.env.NODE_ENV !== 'production',
  })
