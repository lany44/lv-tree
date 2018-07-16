/*
 * @Author: yanglan 
 * @Date: 2018-07-16 16:31:33 
 * @Last Modified by: yanglan
 * @Last Modified time: 2018-07-17 00:22:13
 */

<template>
    
    <div class="lv-tree-wrap">
        <ul :class="{'root': isRoot}" class="lv-tree">
            <li v-for="(item, index) in renderData" :key="index" class="tree-node">
                <lv-tree-node :node="item" :options="options">
                    <template slot="fold-icon">
                        <slot name="fold-icon" :node="item" :parent="item.$$parent"></slot>
                    </template>

                    <template slot="content">
                        <slot :node="item" :parent="item.$$parent"></slot>
                    </template>
                    
                    <renderChildTree
                        v-if="hasChildren(item)"
                        slot="children"
                        :scoped-slots="$scopedSlots"
                        :data="item.children"
                        :options="options"/>
                </lv-tree-node>
            </li>
        </ul>
    </div>

</template>

<script>

    import LvTreeNode from './lv-tree-node.vue';

    const renderChildTree = {
        props: {
            data: Array,
            options: Object,
            scopedSlots: Object
        },

        render(createEle) {
            const {data, options, scopedSlots} = this;

            return createEle('lv-tree', {
                props: {
                    data,
                    options
                },
                scopedSlots
            });
        }
    };


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


