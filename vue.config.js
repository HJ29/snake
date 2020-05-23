module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/snake/'
    : '/',

  pluginOptions: {
    quasar: {
      importStrategy: 'manual',
      rtlSupport: true
    }
  },

  transpileDependencies: [
    'quasar'
  ]
}
