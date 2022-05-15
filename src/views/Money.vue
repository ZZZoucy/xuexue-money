<template>
    <div class="d">
        <div class="money-header">
            <!-- 返回按钮 -->
            <div @click="backOne">
                <Icon name="back" class="back" />
            </div>
            <!-- Tabs是支出与收入按钮 -->
            <Tabs class="x" :data-source="recordTypeList" :value.sync="record.type" />
        </div>
        <!-- 日期 -->
        <div class="createdAt">
            <FormItem field-name="日期" type="date" placeholder="在这里输入日期" :value.sync="record.createdAt" />
        </div>
        <!-- 备注 -->
        <div class="notes">
            <!-- .sync 使用：希望组件有初始值，且更新后能够获取最新值 -->
            <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes" />
        </div>
        <!-- 标签 -->
        <Tags @update:value="record.tags = $event" />
        <!-- 计算器 -->
        <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";

@Component({
    components: { Tabs, Tags, FormItem, NumberPad },
})
export default class Money extends Vue {
    // 获取记录列表
    get recordList() {
        return this.$store.state.recordList;
    }

    recordTypeList = recordTypeList;
    //  记录   : RecordItem 是类型声明
    record: RecordItem = {
        tags: [],
        notes: "",
        type: "-",
        amount: 0,
        createdAt: new Date().toISOString(),
    };
    backOne() {
        this.$router.go(-1);
    }
    created() {}
    onUpdateNotes(value: string) {
        this.record.notes = value;
    }
    // 添加记录
    saveRecord() {
        // 对记录进行检查
        // 是否选择标签、记账是否为0、备注是否为空
        if (!this.record.tags || this.record.tags.length === 0) {
            return window.alert("请至少选择一个标签");
        }
        if (this.record.amount === 0) {
            const result = window.confirm("金额为0，确定记账吗？");
            if (result === true) {
                this.record.notes = "";
            } else {
                return;
            }
        }
        // 检查完提交该记录，发送至 createRecord
        this.$store.commit("createRecord", this.record);
        // 如果提交完没有问题，则显示保存
        if (this.$store.state.createRecordError === null) {
            this.$alert("已保存", "记一笔", {
                confirmButtonText: "确定",
            });
            this.record.notes = "";
        }
    }
}
</script>

<style lang="scss" scoped>
.d {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.money-header {
    position: relative;
}
.back {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(-50%, -50%);
}
.x {
    background: #f4f4f4;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    padding: 16px 0;
    &-item {
        border-radius: 8px;
        background: rgb(232, 231, 231);
        width: 25%;
        padding: 4px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 1;
    }
}
.notes {
    padding: 5px 0;
    background: #fff;
}
.createdAt {
    background: #fff;
}
</style>
