var webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './basic.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: '/node_modules/'

        }, {
            test: /\.css$/, // Only .css files
            loader: 'style!css' // Run both loaders
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'd3': 'd3'
        }),
        new ExtractTextPlugin('*.css')
    ]


}
