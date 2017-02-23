var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// unless webpack(config,cb), the path should be harmonize with package.json
module.exports = {
    entry: './index.js',
    output: {
        filename: './bin/data2graphics.webpack.js',
        umdNamedDefine: true,
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: [/node_modules/],
            query: {
                presets: 'es2015'
            }

        }, {
            test: /\.css$/, // Only .css files
            loader: 'style!css' // Run both loaders
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            d3: 'd3'
        }),
        new ExtractTextPlugin('../style.css')
    ]

}
