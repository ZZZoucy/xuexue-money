<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
        <div class="show_money">
            <span class="titleWrapper">
                <Icon name="chart" />
                支出和收入
            </span>
        </div>
        <div class="chart-wrapper" ref="chartWrapper">
            <!-- :options 在 Chart 组件里接收一下 -->
            <Chart class="chart" :options="chartOptions" />
        </div>
    </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Chart from "@/components/Chart.vue";
import _ from "lodash";
import day from "dayjs";

@Component({
    components: { Tabs, Chart },
})
export default class Statistic extends Vue {
    // 让图表一进入就显示到最近一个日期
    mounted() {
        const div = this.$refs.chartWrapper as HTMLDivElement;
        div.scrollLeft = div.scrollWidth;
    }

    // 计算函数，计算出最近30天的数据，便于下面用于chart图表的数据显示
    get keyValueList() {
        const today = new Date();
        const array = [];
        for (let i = 0; i <= 29; i++) {
            // subtract 是 dayjs 的API，就是用 当前的时间 减去 i天，得到相应的30天
            const dateString = day(today)
                .subtract(i, "day")
                .format("YYYY-MM-DD");
            // 根据记录组的 date时间 来找相对应的 total金额
            const found = _.find(this.groupedList, {
                title: dateString,
            });
            // 把每一组日期和金额 push 到 数组 中
            array.push({
                key: dateString,
                value: found ? found.total : 0,
            });
        }
        // 对日期进行一个比较排序，最新日期在最右边
        array.sort((a, b) => {
            if (a.key > b.key) {
                return 1;
            } else if (a.key === b.key) {
                return 0;
            } else {
                return -1;
            }
        });
        return array;
    }
    // chart属性
    get chartOptions() {
        const keys = this.keyValueList.map((item) => item.key);
        const values = this.keyValueList.map((item) => item.value);
        return {
            // 横轴两头左右贴近头
            grid: {
                left: 0,
                right: 0,
            },
            // 横坐标
            xAxis: {
                type: "category",
                data: keys,
                // 刻度和圆点对齐
                axisTick: { alignWithLabel: true },
                // 刻度线颜色
                axisLine: { lineStyle: { color: "#666" } },
                // 刻度标签的相关设置
                axisLabel: {
                    // 刻度标签的内容格式
                    formatter: function(value: string, index: number) {
                        // 去掉前5个字符，也就是 YYYY-，所以最后显示的只有 MM-DD
                        return value.substr(5);
                    },
                },
            },
            // 纵坐标
            yAxis: {
                type: "value",
                show: false,
            },
            // 圆点
            series: [
                {
                    symbol: "circle",
                    // 圆点大小
                    symbolSize: 12,
                    // 折线样式
                    itemStyle: { borderWidth: 1, color: "#66a596", borderColor: "#66a596" },
                    data: values,
                    type: "line",
                },
            ],
            // 提示框 点击小圆点可以显示数值
            tooltip: {
                show: true,
                triggerOn: "click",
                // 提示框位置
                position: "top",
                // {c} 表示提示框只显示数值
                formatter: "{c}",
            },
        };
    }

    get recordList() {
        return (this.$store.state as RootState).recordList;
    }
    get groupedList() {
        const { recordList } = this;

        const newList = clone(recordList)
            .filter((r) => r.type === this.type)
            .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
        if (newList.length === 0) {
            return [];
        }
        type Result = { title: string; total?: number; items: RecordItem[] }[];
        const result: Result = [{ title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"), items: [newList[0]] }];
        for (let i = 1; i < newList.length; i++) {
            const current = newList[i];
            const last = result[result.length - 1];
            if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
                last.items.push(current);
            } else {
                result.push({ title: dayjs(current.createdAt).format("YYYY-MM-DD"), items: [current] });
            }
        }
        result.map((group) => {
            group.total = group.items.reduce((sum, item) => {
                return sum + item.amount;
            }, 0);
        });
        return result;
    }

    beforeCreate() {
        this.$store.commit("fetchRecords");
    }

    type = "-";
    recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
.chart {
    width: 430%;
    &-wrapper {
        overflow: auto;
        /* 隐藏滚动条 */
        &::-webkit-scrollbar {
            display: none;
        }
    }
}
.show_money {
    margin: 32px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span {
        padding: 5px;
        font-weight: 700;
    }

    .title {
        color: #81b7aa;
    }
    .titleWrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 5px solid #9ccac0;
        font-size: 26px;
        padding: 8px;
        color: #9ccac0;
        & .icon {
            margin-right: 12px;
            width: 38px;
            height: 38px;
            fill: #9ccac0;
        }
    }
}
</style>
