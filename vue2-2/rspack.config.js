const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { rspack } = require('@rspack/core');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
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
    new ModuleFederationPlugin({
      name: 'vue2-2',
      filename: 'remoteEntry.js',
      remotes: {
        vue2App: {
          external: 'vue2App@http://localhost:3001/remoteEntry.js',
          from: 'webpack'
        }
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^2.7.0'
        }
      }
    }),
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, './index.html')
    })
  ],
  devServer: {
    port: 3003,
  },
};