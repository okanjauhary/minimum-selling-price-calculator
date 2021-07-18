const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify',
    'vuex-persist'
  ],
  configureWebpack: {
    resolve: {

      alias: {
        '@': path.resolve(__dirname, 'src'),
        'Components': path.resolve(__dirname, 'src/components'),
        'Utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  }
}
