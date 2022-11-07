const { VueLoaderPlugin } = require('vue-loader');

console.log('WEBPACK CONFIG LOAD !!! 🚀');

module.exports = function (options) {
  return {
    ...options,
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ],
    },
    plugins: [new VueLoaderPlugin()],
  };
};
