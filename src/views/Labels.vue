<template>
    <Layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click="goBack"/>
            <span class="labels-header">标签管理</span>
            <span class="rightIcon"/>
        </div>
        <div class="tags">
            <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
                <span>{{ tag.name }}</span>
                <Icon name="right" />
            </router-link>
        </div>
        <div class="createTag-wrapper">
            <Button class="createTag" @click="createTag">新建标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/tagHelper";

@Component({
    components: { Button },
})
export default class Labels extends mixins(TagHelper) {
    get tags() {
        return this.$store.state.tagList;
    }

    beforeCreate() {
        this.$store.commit("fetchTags");
    }
    goBack(){
        this.$router.back();
    }
}
</script>

<style lang="scss" scoped>
.tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;
    margin-top: 16px;
    .tag {
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        svg {
            width: 18px;
            height: 18px;
            color: #666;
            margin-right: 16px;
        }
    }
}
.createTag {
    background: #66a596;
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
    &-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;
    }
}
.navBar{
    text-align: center;
    font-size: 22px;
    padding: 12px 16px;
    font-weight: bold;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    > .leftIcon{
        width: 24px;
        height: 24px;
    }
    > .rightIcon{
        width: 24px;
        height: 24px;
    }
}
.labels-header{
    height: 70px;
    font-weight: bold;
    text-align: center;
    line-height: 70px;
}
</style>
