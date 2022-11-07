const { VueLoaderPlugin } = require('vue-loader');

const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: ['vue-style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [new VueLoaderPlugin()],
  });
};
