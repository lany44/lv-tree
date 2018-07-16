/*
 * @Author: yanglan 
 * @Date: 2018-07-16 23:32:05 
 * @Last Modified by: yanglan
 * @Last Modified time: 2018-07-17 00:19:32
 */

import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss';
import uglify from 'rollup-plugin-uglify';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/lv-tree.min.js',
        format: 'cjs',
        name: 'LvTree'
    },
    plugins: [
        vue({
            styleToImports: true
        }),
        scss({
            output: 'dist/lv-tree.css',
            outputStyle: 'compressed'
        }),
        babel({
            presets: [['env', {modules: false}], 'stage-3'],
            exclude: 'node_modules/**',
            plugins: ['external-helpers'],
            babelrc: false
        }),
        uglify()
    ]
};
