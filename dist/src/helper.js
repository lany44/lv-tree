'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @author lany44
 * @date 2018/8/28-上午11:23
 * @file helper
 */

var PreOrder = 'PreOrder';
var PostOrder = 'PostOrder';

var genTraverseTreeListFunc = function genTraverseTreeListFunc(order) {
    return function (treeList, handle) {
        var rec = function rec(node) {
            if (order === PreOrder) handle(node);

            if (node.children && node.children.length > 0) {
                node.children.forEach(function (element) {
                    return rec(element);
                });
            }

            if (order === PostOrder) handle(node);
        };

        treeList.forEach(function (node) {
            return rec(node);
        });

        return treeList;
    };
};

var preOrderTreeList = exports.preOrderTreeList = genTraverseTreeListFunc(PreOrder);

var postOrderTreeList = exports.postOrderTreeList = genTraverseTreeListFunc(PostOrder);

// https://stackoverflow.com/questions/40291987/javascript-deep-clone-object-with-circular-references
var deepClone = function deepClone(obj, hash) {
    // Do not try to clone primitives or functions
    if (Object(obj) !== obj || obj instanceof Function) return obj;
    if (hash.has(obj)) return hash.get(obj);

    var result = void 0;
    try {
        result = new obj.constructor();
    } catch (error) {
        result = Object.create(Object.getPrototypeOf(obj));
    }

    hash.set(obj, result);
    return Object.assign.apply(Object, [result].concat(_toConsumableArray(Object.keys(obj).map(function (key) {
        return _defineProperty({}, key, deepClone(obj[key], hash));
    }))));
};

var cloneTreeList = exports.cloneTreeList = function cloneTreeList(treeList) {
    var copyList = [];
    var hash = new WeakMap();
    hash.set(treeList, copyList);

    treeList.forEach(function (tree) {
        return copyList.push(deepClone(tree, hash));
    });
    return copyList;
};
//# sourceMappingURL=helper.js.map