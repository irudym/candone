const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
      test: /\.css$/,
      loaders: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }
    ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
    'style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        includePaths: [path.resolve(__dirname, 'node_modules')],
      },
    },
  ],
},
	  {
		test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
    	loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
	  }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Cosmos'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['manifest']
    })
  ]
}
