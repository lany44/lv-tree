/*
 * @Author: yanglan 
 * @Date: 2018-07-16 16:31:33 
 * @Last Modified by: yanglan
 * @Last Modified time: 2018-07-17 00:22:13
 */

<template>
    
    <div class="lv-tree-wrap">
        <ul :class="{'root': isRoot}" class="lv-tree">
            <li v-for="item in renderData" :key="item.$$uid" class="tree-node">
                <lv-tree-node :node="item" :options="options" @drag="onDrag" @drop="onDrop">
                    <template slot="fold-icon">
                        <slot name="fold-icon" :node="item" :parent="item.$$parent"></slot>
                    </template>

                    <template slot="content">
                        <slot :node="item" :parent="item.$$parent"></slot>
                    </template>
                    
                    <renderChildTree
                        v-if="hasChildren(item)"
                        slot="children"
                        :options="options"
                        :data="item.children"
                        :scoped-slots="$scopedSlots"
                        :listeners="$listeners"/>
                </lv-tree-node>
            </li>
        </ul>
    </div>

</template>

<script>

    import {preOrderTreeList, cloneTreeList} from './helper';

    import LvTreeNode from './lv-tree-node';

    const renderChildTree = {
        props: {
            data: Array,
            options: Object,
            scopedSlots: Object,
            listeners: Object
        },

        render(createEle) {
            const {data, options, scopedSlots, listeners} = this;

            return createEle('lv-tree', {
                props: {
                    data,
                    options
                },
                scopedSlots,
                on: {
                    ...listeners
                }
            });
        }
    };

    let Uid = 0;
    let DraggingNode = null;

    export default {
        name: 'LvTree',

        components: {
            LvTreeNode,
            renderChildTree
        },

        props: {
            data: {
                type: Array,
                default: () => []
            },

            options: {
                type: Object,
                default: () => ({
                    enableDrag: false,
                    foldDeep: null
                })
            }
        },
        
        computed: {
            isRoot() {
                const vm = this;

                return vm.data.length > 0 && vm.data.every(node => !node.$$parent);
            },

            renderData() {
                const vm = this;
                const {isRoot, data = [], options: {foldDeep = null}} = vm;
                let renderData = data;

                if (isRoot) {
                    const rec = (node, deep, parent) => {
                        vm.$set(node, '$$uid', Uid++);
                        vm.$set(node, '$$rootData', data);
                        vm.$set(node, '$$isDragging', false);
                        vm.$set(node, '$$isDraggingOver', false);
                        vm.$set(node, '$$deep', deep);
                        vm.$set(node, '$$parent', parent);
                        if (typeof node.$$isFold === 'boolean') {
                            const isFold = node.$$isFold;
                            delete node.$$isFold;
                            vm.$set(node, '$$isFold', isFold);
                        } else {
                            vm.$set(node, '$$isFold', foldDeep ? Boolean(node.$$deep >= foldDeep) : false);
                        }

                        if (node.children.length === 0) return;

                        node.children.forEach(child => rec(child, deep + 1, node));
                    };

                    renderData.forEach(node => rec(node, 1, null));
                }

                return renderData;
            }
        },

        methods: {
            hasChildren(node) {
                return node.children && node.children.length > 0;
            },

            onDrag(node) {
                DraggingNode = node;
            },

            onDrop(dropNode) {
                const vm = this;
                if (dropNode.$$isDragging || DraggingNode.$$parent === dropNode) return;
                const rootDataCopy = cloneTreeList(DraggingNode.$$rootData);
                let draggingNodeCopy;
                let dropNodeCopy;

                preOrderTreeList(rootDataCopy, (node) => {
                    if (node.$$uid === DraggingNode.$$uid) draggingNodeCopy = node;
                    if (node.$$uid === dropNode.$$uid) dropNodeCopy = node;

                    node.$$isDragging = false;
                    node.$$isDraggingOver = false;
                });

                const spliceList = draggingNodeCopy.$$parent
                    ? draggingNodeCopy.$$parent.children
                    : draggingNodeCopy.$$rootData;

                spliceList.splice(spliceList.indexOf(draggingNodeCopy), 1);
                draggingNodeCopy.$$parent = dropNodeCopy;
                draggingNodeCopy.$$deep = dropNodeCopy.$$deep + 1;
                dropNodeCopy.children.push(draggingNodeCopy);

                vm.$emit('drag', {
                    dragNode: draggingNodeCopy,
                    dropNode: dropNodeCopy,
                    afterData: rootDataCopy
                });
                DraggingNode = null;
            }
        }
    }

</script>

<style lang="scss" scoped>

    .lv-tree {
        margin: 0;
        padding: 0;

        &:not(.root) {
            margin-left: 40px;
        }

        li {
            list-style: none;
        }
    }

</style>


