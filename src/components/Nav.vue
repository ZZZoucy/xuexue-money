<template>
    <nav>
        <!-- active-class 路由激活 ： 意思就是选中该路由的时候高亮 -->
        <router-link to="/detail" class="item" active-class="selected">
            <Icon name="money" />
            明细
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="statistics" />
            图表
        </router-link>
        <router-link to="/money" class="item write" active-class="selected">
            <div></div>
            <Icon name="jia" />
            <p>记一笔</p>
        </router-link>
        <router-link to="/financial" class="item" active-class="selected">
            <Icon name="financial" />
            理财
        </router-link>
        <router-link to="/me" class="item" active-class="selected">
            <Icon name="me" />
            我的
        </router-link>
    </nav>
</template>

<script lang="ts">
export default {
    name: "Nav",
};
</script>

<style lang="scss" scoped>
/* css/sass可以用 “～@/目录名” 的方式引入文件（ @=src ） */
@import "~@/assets/style/helper.scss";
nav {
    /* @extend 继承 */
    @extend %outerShadow;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    background: #fff;
    color: #000;
    > .item {
        padding: 2px 0;
        width: 33.3333%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .icon {
            width: 32px;
            height: 32px;
        }
    }
    > .item.selected {
        /* $ 变量 */
        color: $color-highlight;
    }
    .write {
        position: relative;
        .icon {
            position: absolute;
            top: -30%;
            left: 25%;
            background-color: #9ccac0;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            padding: 8px;
        }
        div {
            position: absolute;
            border: 1px solid;
            border-color: #ccc #ccc transparent #ccc;
            border-radius: 50%;
            width: 54px;
            height: 54px;
            top: -38%;
            left: 19%;
        }
        div::after {
            content: "";
            position: absolute;
            border-radius: 50%;
            background: white;
            width: 52px;
            height: 49px;
            top: 7%;
        }
        p {
            position: absolute;
            bottom: 6%;
        }
    }
}
</style>
