<template>
    <div class="layout">
        <div class="content">
            <ShowMoney>
                <span slot="title_slot" class="title">今日支出</span>
                <span slot="pay_slot" class="pay">{{expenses}}</span>
                <span slot="income_slot" class="income">本月收入 {{}}</span>
            </ShowMoney>
            <money-key />
        </div>
        <Nav class="footer" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import MoneyKey from "@/components/common/MoneyKey/MoneyKey.vue";
import day from "dayjs";
import clone from "@/lib/clone";
import ShowMoney from "@/components/common/ShowMoney/ShowMoney.vue";

@Component({
    components: { ShowMoney, MoneyKey },
})
export default class Home extends Vue {
    get expenses() {
      const today = day(new Date()).format('DD');
      return (this.$store.getters.expensesMoney(today) as number[]).reduce((preMoney, amount) => {
        return preMoney += amount;
      }, 0);
    }
    
}
</script>

<style lang="scss" scoped>
.money-link {
    margin: 28px auto 0;
    background-color: #a1decf;
    font-size: 18px;
    font-weight: 700;
    border-radius: 10px;
    padding: 14px;
    max-width: 141px;
    text-align: center;
}
.layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
