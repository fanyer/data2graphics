var webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
            query:{
                presets:'es2015'
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
        new ExtractTextPlugin('style.css')
    ]


}

// module.exports = {
//     entry: './basic.js',
//     output: {
//         filename: './bundle.js'
//     },
//     module: {
//         loaders: [{
//             test: /\.js$/,
//             loader: 'babel',
//             exclude: [/node_modules/],
//             query:{
//                 presets:'es2015'
//             }

//         }, {
//             test: /\.css$/, // Only .css files
//             loader: 'style!css' // Run both loaders
//         }]
//     },
//     plugins: [
//         new webpack.ProvidePlugin({
//             d3: 'd3',
//             $:'jquery'
//         }),
//         new ExtractTextPlugin('style.css')
//     ]


// }
