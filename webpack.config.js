var path = require('path')

module.exports = {
  entry: './app/indexMg.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')        
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.ts', '.webpack.js', '.web.js', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true // IMPORTANT! use transpileOnly mode to speed-up compilation
        }
      }
    ],
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}
