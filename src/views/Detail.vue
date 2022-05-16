<template>
    <div class="a">
        <!-- 支出收入按钮 -->
        <!-- .sync修饰符，是一个语法糖，它可以快速实现组件间的通信 -->
        <!-- classPrefix 代表 给 class 加前缀 -->
        <Tabs class="tabs" class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
        <section class="icon_div" v-if="groupedList.length === 0">
            <Icon name="none" />
            <money-key />
        </section>
        <section class="jilu">
            <!-- 只有当记录列表长度不为0时，才显示 -->
            <ol v-if="groupedList.length !== 0">
                <!-- 遍历记录组列表 -->
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
/* JS/TS 可以用 “@/目录名” 的方式引入文件（ @=src ） */
import day from "dayjs";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import _ from "lodash";

@Component({
    components: { Tabs },
})
export default class Detail extends Vue {
    tagString(tags: Tag[]) {
        return tags.length === 0 ? "无" : tags.map((t) => t.name).join("，");
    }

    // 统一时间显示格式 函数
    beautify(string: string) {
        const day = dayjs(string);
        const now = dayjs();
        if (day.isSame(now, "day")) {
            return "今天";
            // subtract(1, "day") 意思是减一天
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

    // 获取记录列表
    get recordList() {
        return (this.$store.state as RootState).recordList;
    }

    // 日期排序分组函数
    get groupedList() {
        const { recordList } = this;
        // 对记录数组按创建时间进行排序 得到 newList
        const newList = clone(recordList)
            .filter((r) => r.type === this.type)
            .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
        if (newList.length === 0) {
            return [];
        }

        // 对数组按时间进行分组 同一天放在一组里
        type Result = { title: string; total?: number; items: RecordItem[] }[];
        // result 放结果，[{title:同一时间，items:[记录1,记录2...]}, {title，items}]
        const result: Result = [{ title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"), items: [newList[0]] }];
        // 遍历排过序的记录列表
        for (let i = 1; i < newList.length; i++) {
            // 当前项跟items里的最后一项是否为同一天
            // 如果是同一天，就放进items
            // 如果不是同一天，就放进一个新的对象中
            const current = newList[i];
            const last = result[result.length - 1];
            if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
                last.items.push(current);
            } else {
                result.push({ title: dayjs(current.createdAt).format("YYYY-MM-DD"), items: [current] });
            }
        }
        // 遍历分组后的记录，将一组的 amount金额 计算出一个 总和sum
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
