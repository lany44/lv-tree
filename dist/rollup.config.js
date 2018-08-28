'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rollupPluginBabel = require('rollup-plugin-babel');

var _rollupPluginBabel2 = _interopRequireDefault(_rollupPluginBabel);

var _rollupPluginNodeResolve = require('rollup-plugin-node-resolve');

var _rollupPluginNodeResolve2 = _interopRequireDefault(_rollupPluginNodeResolve);

var _rollupPluginVue = require('rollup-plugin-vue');

var _rollupPluginVue2 = _interopRequireDefault(_rollupPluginVue);

var _rollupPluginScss = require('rollup-plugin-scss');

var _rollupPluginScss2 = _interopRequireDefault(_rollupPluginScss);

var _rollupPluginUglify = require('rollup-plugin-uglify');

var _rollupPluginUglify2 = _interopRequireDefault(_rollupPluginUglify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    input: 'src/index.js',
    output: {
        file: 'dist/lv-tree.min.js',
        format: 'cjs',
        name: 'LvTree'
    },
    plugins: [(0, _rollupPluginNodeResolve2.default)({
        extensions: ['.js', '.json', '.vue']
    }), (0, _rollupPluginVue2.default)({
        styleToImports: true
    }), (0, _rollupPluginScss2.default)({
        output: 'dist/lv-tree.css',
        outputStyle: 'compressed'
    }), (0, _rollupPluginBabel2.default)({
        presets: [['env', { modules: false }], 'stage-3'],
        exclude: 'node_modules/**',
        plugins: ['external-helpers'],
        babelrc: false
    }), (0, _rollupPluginUglify2.default)()]
}; /*
    * @Author: yanglan 
    * @Date: 2018-07-16 23:32:05 
    * @Last Modified by: yanglan
    * @Last Modified time: 2018-07-17 00:19:32
    */
//# sourceMappingURL=rollup.config.js.map