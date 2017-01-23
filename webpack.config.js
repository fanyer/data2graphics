var webpack = require('webpack')
module.exports = {
    entry: './basic.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/

        }, {
            test: /\.css$/, // Only .css files
            loader: 'style-loader!css-loader' // Run both loaders
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'd3': 'd3'
        })
    ]


}
