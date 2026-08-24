import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('webpack').Configuration} */
export default {
  mode: 'production',
  entry: resolve(__dirname, 'src/js/app.js'),
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build/js'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  },
  devtool: false,
  performance: {
    hints: false,
  },
  stats: 'minimal',
};
