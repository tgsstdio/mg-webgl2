var path = require('path')

module.exports = {
  entry: './app/mginit.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
