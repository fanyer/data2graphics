export default {
    entry: 'index.js',
    dest: 'bin/data2grahics',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
    external: ['fs', 'path', 'data2grahics'],
    paths: {
        acorn: '../dist/data2grahics.js'
    }

}
