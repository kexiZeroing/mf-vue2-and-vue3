const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { rspack } = require('@rspack/core');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    // Automatically determine the URL from which the main JavaScript file is loaded.
    // It allows federated modules to load correctly based on where the app is hosted.
    publicPath: 'auto'
  },
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'builtin:swc-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.css$/,
        use: [
          rspack.CssExtractRspackPlugin.loader,
          'css-loader',
        ],
        type: 'javascript/auto'
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new rspack.CssExtractRspackPlugin({
      filename: '[name].css',
    }),
    // https://juejin.cn/post/7146855277063569438
    new ModuleFederationPlugin({
      name: 'vue2App',
      filename: 'remoteEntry.js',
      exposes: {
        './vue2': './node_modules/vue/dist/vue',
        './Button': './src/components/Button',
      },
      // use in vue2-2 host
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^2.7.0',
          eager: true,  // Bundles vue inside the remote, so it doesn’t depend on a host.
        }
      },
    }),
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, './index.html')
    })
  ],
  devServer: {
    port: 3001,
  },
};