const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3000;

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HTMLWebpackPlugin()],

  devServer: {
    host: HOST,
    port: Number(PORT),
    hot: true,
  },
};
