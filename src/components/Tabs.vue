<template>
    <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
        <li v-for="item in dataSource" :key="item.value" class="tabs-item"
            :class="liClass(item)" @click="select(item)">{{item.text}}
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    type DataSourceItem = { text: string, value: string }
    @Component
    export default class Tabs extends Vue {
        @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];
        @Prop(String) readonly value!: string;
        @Prop(String) classPrefix?: string;
        @Prop({type: String, default: '64px'}) height!: string;
        liClass(item: DataSourceItem) {
            return {
                [this.classPrefix + '-tabs-item']: this.classPrefix,
                selected: item.value === this.value
            };
        }
        select(item: DataSourceItem) {
            this.$emit('update:value', item.value);
        }
    }
</script>

<style lang="scss" scoped>
    .tabs {
        background: #f4f4f4;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        height: 54px;
        &-item {
            border-radius: 8px;
            background: rgb(232, 231, 231);
            width: 30%;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 1;
            &.selected::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 32px;
                background: #B7DCD3;
                color: #fff;
                border-radius: 8px;
                z-index: -1;
            }
        }
    }
</style>