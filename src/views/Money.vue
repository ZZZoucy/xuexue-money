<template>
    <div class-prefix="layout">
        <div class="money-header">
            <router-link to="/detail">
                <Icon name="back" class="back" />
            </router-link>
            <!-- Tabs是支出与收入按钮 -->
            <Tabs class="x" :data-source="recordTypeList" :value.sync="record.type" />
        </div>
        <div class="createdAt">
            <FormItem field-name="日期" type="date" placeholder="在这里输入日期" :value.sync="record.createdAt" />
        </div>
        <div class="notes">
            <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes" />
        </div>
        <Tags @update:value="record.tags = $event" />
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
    get recordList() {
        return this.$store.state.recordList;
    }
    recordTypeList = recordTypeList;
    record: RecordItem = {
        tags: [],
        notes: "",
        type: "-",
        amount: 0,
        createdAt: new Date().toISOString(),
    };
    created() {}
    onUpdateNotes(value: string) {
        this.record.notes = value;
    }
    saveRecord() {
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
        this.$store.commit("createRecord", this.record);
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
    .selected {
        border-bottom: 2px solid black;
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
