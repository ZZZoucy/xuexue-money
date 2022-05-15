<template>
    <div class="tags">
        <div class="new">
            <button @click="createTag">新增标签</button>
            &nbsp;&nbsp;&nbsp;
            <router-link to="/labels">
                <button>标签管理</button>
            </router-link>
        </div>
        <!-- 显示已有的标签 -->
        <ul class="current">
            <!-- v-for 遍历标签列表，:key每一个标签都要有一个序号，@click鼠标单击事件（选中或取消选中），:class动态绑定样式（选中的标签就有selected样式） -->
            <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag)" :class="{ selected: selectedTags.indexOf(tag) >= 0 }">{{ tag.name }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
// TagHelper文件：判断标签输入是否正确
import TagHelper from "@/mixins/tagHelper";
import Vue from "vue";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

@Component
export default class Tags extends mixins(TagHelper) {
    // 意思是一个字符串数组，初始赋值是空数组
    selectedTags: string[] = [];

    get tagList() {
        return this.$store.state.tagList;
    }

    created() {
        this.$store.commit("fetchTags");
    }

    // selectedTags 是选中的标签数组
    // 如果该标签没被选中，则从数组中删除
    // 如果该标签被选中了，则加到数组中
    toggle(tag: string) {
        const index = this.selectedTags.indexOf(tag);
        if (index >= 0) {
            this.selectedTags.splice(index, 1);
        } else {
            this.selectedTags.push(tag);
        }
        this.$emit("update:value", this.selectedTags);
    }

    // 创建标签
    create() {
        const name = window.prompt("请输入标签名");
        if (!name) {
            return window.alert("标签名不能为空");
        }
        // 把获取到的标签名发送至 createTag 函数，函数在 tagHelper 中
        this.$store.commit("createTag", name);
    }
}
</script>

<style lang="scss" scoped>
.tags {
    background: white;
    flex-grow: 1;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    > .current {
        display: flex;
        flex-wrap: wrap;
        > li {
            $bg: #b7dcd3;
            background: $bg;
            $h: 24px;
            height: $h;
            line-height: $h;
            border-radius: $h/2;
            padding: 0 16px;
            margin-right: 12px;
            margin-top: 4px;
            &.selected {
                background: darken($bg, 80%);
                color: $bg;
            }
        }
    }
    > .new {
        padding-top: 16px;
        button {
            background: transparent;
            border: none;
            color: rgb(74, 74, 74);
            border-bottom: 1px solid;
            padding: 0 4px;
        }
    }
}
</style>
