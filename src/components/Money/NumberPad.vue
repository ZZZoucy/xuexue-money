<template>
    <div class="numberPad">
        <!-- 输出框 -->
        <div class="output">{{ output }}</div>
        <!-- 计算器键盘 -->
        <div class="buttons">
            <!-- @click 表示绑定单击事件 -->
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="remove"><Icon class="delete" name="delete" /></button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="clear">清零</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button @click="ok" class="ok">OK</button>
            <button @click="inputContent" class="zero">0</button>
            <button @click="inputContent">.</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
    // @Prop() 就是告诉 Vue，这里不是 data，是 prop
    // @Prop() 的括号是 Number 告诉 Vue：value 运行时是个 Number
    // 后面的 number 是告诉 Vue：value 编译时是个 Number
    @Prop(Number) readonly value!: number;

    // output 就是键盘中的输出框变量，字符串类型
    output = this.value.toString();

    // 如果调用函数的时候不传参数，那么 Vue 会自动传 event，event 指跟这个事件相关的所有信息
    // 所以按钮上的数字就可以自动传入了，也就不需要在事件后面手动传入参数了
    inputContent(event: MouseEvent) {
        // as 强制指定类型 —— event.target 为 HTML按钮元素
        const button = event.target as HTMLButtonElement;
        const input = button.textContent as string;

        // 限制输出最多16个字符
        if (this.output.length === 16) {
            return;
        }

        // 如果默认 0，然后输入了 0123456789 之一，则替换； 否则(输入.) 则直接连接
        if (this.output === "0") {
            if ("0123456789".indexOf(input) >= 0) {
                this.output = input;
            } else {
                this.output += input;
            }
            return;
        }

        // 如果输出框中已有一个. && 又输入一个.  则return
        if (this.output.indexOf(".") >= 0 && input === ".") {
            return;
        }
        this.output += input;
    }
    remove() {
        if (this.output.length === 1) {
            this.output = "0";
        } else {
            this.output = this.output.slice(0, -1);
        }
    }
    clear() {
        this.output = "0";
    }
    ok() {
        // 获取输出的数值
        const number = parseFloat(this.output);
        // 将数值发送至更新数据以及提交函数
        this.$emit("update:value", number);
        this.$emit("submit", number);
        // 提交之后输出框内容替换成 0
        this.output = "0";
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
    background: #b7dcd3;
    .output {
        @extend %clearFix;
        @extend %innerShadow;
        font-size: 32px;
        font-family: Consolas, monospace;
        padding: 5px 16px;
        text-align: right;
        height: 56px;
        border: 1px solid #000;
        border-radius: 10px;
        margin: 0 0 1px 0;
        background: #fff;
    }
    .buttons {
        @extend %clearFix;
        > button {
            /* 一行四个按钮，宽度分别占25% */
            width: 25%;
            height: 64px;
            font-size: 24px;
            display: float;
            float: left;
            background: transparent;
            border: 1px solid #000;
            background: #fff;
            border-radius: 24px;

            &.ok {
                height: 128px;
                background: #ffcc01;
                float: right;
            }
            &.zero {
                width: 25 * 2%;
            }
            .delete {
                width: 24px;
            }
        }
    }
}
</style>
