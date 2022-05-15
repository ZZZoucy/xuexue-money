<template>
    <!-- 封装 icon 组件 -->
    <svg class="icon" @click="$emit('click', $event)">
        <!-- 使用 use 标签时，只需用 name 属性确定需要使用的 icon 文件  -->
        <use :xlink:href="'#' + name" />
    </svg>
</template>

<script lang="ts">
// import 一整个 assets/icons 目录
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {
    importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
    console.log(error);
}

export default {
    // props 组件间需要通信的数据，name 即 icon 的文件名
    props: ["name"],
    name: "Icon",
};
</script>

<style lang="scss" scoped>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
