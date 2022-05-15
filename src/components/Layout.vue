<template>
    <div class="layout-wrapper">
        <!-- :class 代表动态传入的class数据 -->
        <div class="content" :class="classPrefix && `${classPrefix}-content`">
            <slot />
        </div>
        <Nav></Nav>
    </div>
</template>

<script lang="ts">
export default {
    // classPrefix 代表 给 class 加前缀
    props: ["classPrefix"],
    name: "Layout",
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.content {
    overflow: auto;
    flex-grow: 1;
}
</style>
