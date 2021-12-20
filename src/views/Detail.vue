<template>
    <div class="a">
        <!-- 支出收入按钮 -->
        <Tabs class="tabs" class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
        <section class="icon_div" v-if="groupedList.length === 0">
            <Icon name="none" />
            <money-key />
        </section>
        <section class="jilu">
            <ol v-if="groupedList.length !== 0">
                <li v-for="(group, index) in groupedList" :key="index">
                    <h3 class="title">
                        {{ beautify(group.title) }} <span>￥{{ group.total }}</span>
                    </h3>
                    <ol>
                        <li v-for="item in group.items" :key="item.id" class="record">
                            <div class="zi">
                                <span>{{ tagString(item.tags) }}</span>
                                <span class="notes">{{ item.notes }}</span>
                                <span class="notes" v-if="item.notes === ''">无备注</span>
                            </div>
                            <span class="qian">￥{{ item.amount }}</span>
                        </li>
                    </ol>
                </li>
            </ol>
        </section>
        <Nav class="nav"></Nav>
    </div>
</template>

<script lang="ts">
import TypeSection from "@/components/common/TypeSection/TypeSection.vue";
import CategorySection from "@/views/Home/childComps/Money/CategorySection.vue";
import MoneyKey from "@/components/common/MoneyKey/MoneyKey.vue";
import day from "dayjs";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import _ from "lodash";

@Component({
    components: { TypeSection, Tabs, MoneyKey },
})
export default class Detail extends Vue {
    // getCategory(category: string) {
    //     this.category = category;
    // }
    tagString(tags: Tag[]) {
        return tags.length === 0 ? "无" : tags.map((t) => t.name).join("，");
    }
    // mounted() {
    //     const div = this.$refs.chartWrapper as HTMLDivElement;
    //     div.scrollLeft = div.scrollWidth;
    // }

    beautify(string: string) {
        const day = dayjs(string);
        const now = dayjs();
        if (day.isSame(now, "day")) {
            return "今天";
        } else if (day.isSame(now.subtract(1, "day"), "day")) {
            return "昨天";
        } else if (day.isSame(now.subtract(2, "day"), "day")) {
            return "前天";
        } else if (day.isSame(now, "year")) {
            return day.format("M月D日");
        } else {
            return day.format("YYYY年M月D日");
        }
    }

    get keyValueList() {
        const today = new Date();
        const array = [];
        for (let i = 0; i <= 29; i++) {
            // this.recordList = [{date:7.3, value:100}, {date:7.2, value:200}]
            const dateString = day(today)
                .subtract(i, "day")
                .format("YYYY-MM-DD");
            const found = _.find(this.groupedList, {
                title: dateString,
            });
            array.push({
                key: dateString,
                value: found ? found.total : 0,
            });
        }
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
.a {
    background-color: #fefefe;
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.tabs {
    height: 70px;
}
.nav {
    height: 54px;
}
.jilu {
    overflow-y: auto;
    flex: 1;
    margin: 10px 0;
}
.jilu::-webkit-scrollbar {
    display: none;
}
.icon_div {
    .icon {
        width: 148px;
        height: 148px;
        position: relative;
    }
    margin-top: 80px;
    padding: 20px;
    text-align: center;
    font-size: 24px;
}
.btn {
    padding: 8px;
    font-size: 20px;
    font-weight: bold;
    background-color: #a1decf;
    border-radius: 12px;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
%item {
    padding: 4px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
}
.title {
    @extend %item;
    color: #9ccac0;
    font-weight: bold;
    margin: 4px;
    font-size: 20px;
}
.record {
    border-radius: 8px;
    background-color: #f9faf5;
    margin: 6px 12px;
    line-height: 32px;
    font-size: 18px;
    font-weight: bold;
    @extend %item;
    .zi {
        display: flex;
        flex-direction: column;
    }
    .qian {
        height: 64px;
        line-height: 64px;
        font-size: 20px;
    }
}
.notes {
    margin-right: auto;
    color: #999;
    font-size: 16px;
    font-weight: normal;
}
</style>
