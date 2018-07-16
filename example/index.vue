/*
 * @Author: yanglan 
 * @Date: 2018-07-16 17:06:43 
 * @Last Modified by: yanglan
 * @Last Modified time: 2018-07-17 00:21:38
 */

<template>

    <div class="demo">
        <lv-tree :data="forest">
            <i slot-scope="scope" slot="fold-icon" class="icon-arrow-right" @click="changeFold(scope.node)"></i>
            <div slot-scope="scope" class="tree-node">{{ scope.node.name }}</div>
        </lv-tree>
    </div>
    
</template>

<script>

    import Vue from "vue";
    import LvTree from "../src/index";

    Vue.use(LvTree);

    const FOREST = [
        {
            id: 1,
            name: "node-1",
            children: [
            {
                id: 3,
                name: "node-1-1",
                children: [
                {
                    id: 7,
                    name: "node-1-1-1",
                    children: []
                },
                {
                    id: 8,
                    name: "node-1-1-2",
                    children: []
                }
                ]
            },
            {
                id: 4,
                name: "node-1-1",
                children: [
                {
                    id: 9,
                    name: "node-1-1-1",
                    children: []
                },
                {
                    id: 10,
                    name: "node-1-1-2",
                    children: []
                }
                ]
            }
            ]
        },
        {
            id: 2,
            name: "node-2",
            children: [
            { id: 5, name: "node-2-1", children: [] },
            { id: 6, name: "node-2-2", children: [] }
            ]
        }
    ];

    export default {
        name: "Demo",

        data() {
            return {
            forest: FOREST
            };
        },

        methods: {
            changeFold(node) {
                node.$$isFold = !node.$$isFold;
            }
        }
    };

</script>

<style lang="scss" scoped>

    @font-face {
        font-family: "icon";
        src: url("./icon-right.woff") format("woff");
        font-weight: normal;
        font-style: normal;
    }

    [class^="icon-"]:before,
    [class*="icon-"]:before {
        font-family: "icon", sans-serif !important;
        line-height: 1;
        font-style: normal;
        font-variant: normal;
        text-transform: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }


    .icon-arrow-right:before { content: "\eaa8"; }

    .tree-node {
        height: 30px
    }

</style>
