/**
 * @author lany44
 * @date 2018/8/28-上午11:23
 * @file helper
 */

const PreOrder = 'PreOrder';
const PostOrder = 'PostOrder';

const genTraverseTreeListFunc = order => (treeList, handle) => {
    const rec = (node) => {
        if (order === PreOrder) handle(node);

        if (node.children && node.children.length > 0) {
            node.children.forEach(element => rec(element));
        }

        if (order === PostOrder) handle(node);
    };

    treeList.forEach(node => rec(node));

    return treeList;
};

export const preOrderTreeList = genTraverseTreeListFunc(PreOrder);

export const postOrderTreeList = genTraverseTreeListFunc(PostOrder);

// https://stackoverflow.com/questions/40291987/javascript-deep-clone-object-with-circular-references
const deepClone = (obj, hash) => {
    // Do not try to clone primitives or functions
    if (Object(obj) !== obj || obj instanceof Function) return obj;
    if (hash.has(obj)) return hash.get(obj);

    let result;
    try {
        result = new obj.constructor();
    } catch (error) {
        result = Object.create(Object.getPrototypeOf(obj));
    }

    hash.set(obj, result);
    return Object.assign(result, ...Object.keys(obj).map(key => ({[key]: deepClone(obj[key], hash)})));
};

export const cloneTreeList = (treeList) => {
    const copyList = [];
    const hash = new WeakMap();
    hash.set(treeList, copyList);

    treeList.forEach(tree => copyList.push(deepClone(tree, hash)));
    return copyList;
};

