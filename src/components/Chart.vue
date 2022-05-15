<template>
    <div class="wrapper" ref="wrapper">Chart</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import echarts, { EChartOption, ECharts } from "echarts";

@Component
export default class Chart extends Vue {
    // 传递一下 options 参数 ?: 代表可以为空
    @Prop() options?: EChartOption;
    chart?: ECharts;
    mounted() {
        // 创建前进行初始化
        if (this.options === undefined) {
            return console.error("options 为空");
        }
        this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
        this.chart.setOption(this.options);
    }
    // watch 监听options 如果内容变了就重新获取新的数据进行更新，同步显示在chart图表
    @Watch("options")
    onOptionsChange(newValue: EChartOption) {
        this.chart!.setOption(newValue);
    }
}
</script>

<style lang="scss">
.wrapper {
    height: 280px;
}
</style>
