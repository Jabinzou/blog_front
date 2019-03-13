const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.prod.conf')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const config = merge(base, {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ['babel-polyfill', './src/entry-client.js'],
    vendor: ['vue', 'quill', 'muse-ui', 'muse-ui-toast']
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin()
  ]
})
module.exports = config

