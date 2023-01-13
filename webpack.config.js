const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development', // modo desarrollo o producción
  entry: {
    index: './index.ts' // punto de entrada del proyecto
  },
  output: {
    path: path.join(__dirname, '/dist'), // la salida de la traducción
    filename: '[name].js',
    publicPath: '/' // raiz del proyecto
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx', '.ts', '.js'
    ]
  },
  externals: [nodeExternals()]
}
