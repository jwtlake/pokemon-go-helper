var webpack = require('webpack');
 
module.exports = {
  entry: './src/client/index.js',
  output: { 
    path: './src/client/public', 
    filename: 'bundle.js' 
  },
  resolve: {
    extensions: ['', '.js', '.jsx','.json']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          // plugins: ["transform-object-rest-spread","transform-class-properties"],
          presets: ['es2015', 'react']
        }
      },
      {
	test: /\.json$/, 
	loader: "json",
	exclude: /node_modules/
      }
    ]
  },
};
