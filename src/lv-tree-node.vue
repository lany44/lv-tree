/*
 * @Author: yanglan 
 * @Date: 2018-07-16 16:39:34 
 * @Last Modified by: yanglan
 * @Last Modified time: 2018-07-16 23:20:20
 */

<template>
    <div
        :class="{
            'is-root': !node.$$parent,
            'is-last-child': isLastChild
        }"
        class="lv-tree-node">
        <div
            :class="{
                'is-root': !node.$$parent,
                'is-first-child': isFirstChild,
                'extended-horizontal': !hasChildren
            }"
            class="node-el">
            <div  class="change-fold">
                <slot name="fold-icon" v-if="hasChildren" :class="{'is-unfold': !isFold}" @click="changeFold"></slot>
            </div>

            <div :draggable="options.enableDrag"
                 :class="{
                    'is-dragging': node.$$isDragging,
                    'is-dragging-over': node.$$isDraggingOver
                 }"
                 @dragstart="onDragStart(node)"
                 @dragend="onDragEnd(node)"
                 @dragenter.prevent="onDragOver(node)"
                 @dragover.prevent="onDragOver(node)"
                 @dragleave="onDragLeave(node)"
                 @drop="onDrop(node)"
            >
                <slot name="content"></slot>
            </div>
        </div>

        <div v-if="!isFold" class="child-tree-wrap">
            <slot name="children"></slot>
        </div>
    </div>
</template>

<script type="text/babel" scoped>

    import {preOrderTreeList} from './helper';

    export default {
        name: 'LvTreeNode',

        props: {
            node: {
                type: Object,
                required: true
            },

            options: {
                type: Object,
                default: () => {}
            }
        },

        computed: {
            isLastChild() {
                const vm = this;
                const {node: {$$parent}, node} = vm;

                return $$parent && $$parent.children[$$parent.children.length - 1] === node;
            },

            isFirstChild() {
                const vm = this;
                const {node: {$$parent}, node} = vm;

                return $$parent && $$parent.children[0] === node;
            },

            hasChildren() {
                const vm = this;

                return vm.node.children.length > 0;
            },

            isFold() {
                const vm = this;

                return vm.node.$$isFold;
            }
        },

        methods: {
            changeFold() {
                const vm = this;
                vm.node.$$isFold = !vm.node.$$isFold;
            },

            onDragStart(node) {
                const vm = this;

                preOrderTreeList([node], nodeItem => (nodeItem.$$isDragging = true));
                vm.$emit('drag', node);
            },

            onDragEnd(node) {
                preOrderTreeList([node], nodeItem => (nodeItem.$$isDragging = false));
            },

            onDragOver(node) {
                if (!node.$$isDragging) {
                    node.$$isDraggingOver = true;
                }
            },

            onDragLeave(node) {
                node.$$isDraggingOver = false;
            },

            onDrop(node) {
                const vm = this;

                node.$$isDraggingOver = false;
                vm.$emit('drop', node);
            }
        }
    };

</script>

<style lang="scss">
    
    $primary: #304ffe !default;
    $primary-lighter: #c5cae9 !default;

    $gray-lighter: #f3f3f3 !default;
    $gray-light: #e0e0e0 !default;
    $gray: #bdbdbd !default;
    $gray-dark: #616161 !default;
    $gray-darker: #212121 !default;

    .lv-tree-node {
        position: relative;

        &:not(.is-root) {
            &:after { // vertical
                position: absolute;
                content: "";
                height: 100%;
                left: calc(-40px + 10px);
                top: 0;
                border-left: 1px solid $gray-light;
            }

            &.is-last-child:after {
                display: none;
            }
        }

        .node-el {
            display: flex;
            align-items: center;
            justify-content: left;
            position: relative;

            &:not(.is-root) {
                &:before { // horizontal
                    position: absolute;
                    content: "";
                    width: 30px;
                    top: 50%;
                    left: calc(-40px + 10px);
                    border-top: 1px solid $gray-light;
                }

                &:after { // vertical
                    position: absolute;
                    content: "";
                    height: 100%;
                    left: calc(-40px + 10px);
                    top: -50%;
                    border-left: 1px solid $gray-light;
                }

                &.is-first-child:after {
                    height: calc(100% - 8px);
                    top: calc(-50% + 8px);
                }

                &.extended-horizontal {
                    &:before {
                        width: 50px;
                    }
                }
            }

            .change-fold {
                width: 25px;

                i.icon-arrow-right {
                    display: inline-block;
                    color: $gray-dark;
                    font-size: 20px;
                    cursor: pointer;
                    border-radius: 3px;

                    &:hover {
                        background-color: $gray-light;

                        i {
                            color: $primary;
                        }
                    }

                    &.is-unfold {
                        &:before {
                            display: inline-block;
                            transform-origin: center center;
                            transform: rotate(90deg);
                        }
                    }
                }
            }

            .is-dragging {
                * {
                    color: $gray-light;
                }
            }

            .is-dragging-over {
                background-color: $primary-lighter;
            }
        }
    }

</style>