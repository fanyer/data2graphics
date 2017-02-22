var dependencies = require("./package.json").dependencies;
var version = require('./package.json').version;

var banner =
    '/*!\n' +
    ' * data2grahics.js v' + version + '\n' +
    ' * (c) 2017-' + new Date().getFullYear() + ' Yeer Fan\n' +
    ' * Released under the MIT License.\n' +
    ' */'


export default {
    entry: 'index.js',
    dest: 'bin/data2graphics.rollup.js',
    banner: banner,
    moduleName: 'data2grahics',
    format: 'umd',
    external: Object.keys(dependencies),
    // paths: {
    //     d3: 'https://d3js.org/d3.v4.min.js'
    // }
    globals: {
        'd3': 'D3'
    }
}
