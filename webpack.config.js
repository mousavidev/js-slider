const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/slider.js',
  output: {
    filename: 'slider.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
