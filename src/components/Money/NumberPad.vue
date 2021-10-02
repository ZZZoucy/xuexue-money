<template>
    <div class="numberPad">
        <div class="output">{{output}}</div>
        <div class="buttons">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="remove"><Icon class="delete" name="delete"/></button>
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
    import Vue from 'vue';
    import { Component,Prop } from 'vue-property-decorator';

    @Component
    export default class NumberPad extends Vue{
        @Prop(Number) readonly value!:number;
        output = this.value.toString();

        inputContent(event:MouseEvent){
            const button = (event.target as HTMLButtonElement);
            const input = button.textContent as string;
            if(this.output.length === 16){return;}
            if(this.output === '0'){
                if('0123456789'.indexOf(input)>=0){
                    this.output = input;
                }else{
                    this.output += input;
                }
                return;
            }
            if(this.output.indexOf('.')>=0 && input==='.'){return;}
            this.output += input;
        }
        remove(){
            if(this.output.length === 1){
                this.output = '0';
            }else{
                this.output = this.output.slice(0,-1);
            }
        }
        clear(){
            this.output = '0';
        }
        ok(){
            const number = parseFloat(this.output);
            this.$emit('update:value', number);
            this.$emit('submit', number);
            this.output = '0';
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
    .numberPad{
        background: #B7DCD3;
        .output{
            @extend %clearFix;
            @extend %innerShadow;
            font-size: 32px;
            font-family: Consolas,monospace;
            padding: 5px 16px;
            text-align: right;
            height: 56px;
            border: 1px solid #000;
            border-radius: 10px;
            margin: 0 0 1px 0;
            background: #fff;
        }
        .buttons{
            @extend %clearFix;
            > button{
                width: 25%;
                height: 64px;
                font-size: 24px;
                display: float;
                float: left;
                background: transparent;
                border: 1px solid #000;
                background: #fff;
                border-radius: 24px;
                
                &.ok{
                    height: 128px;
                    background: #FFCC01;
                    float: right;
                }
                &.zero{
                    width: 25*2%;   
                }
                .delete{
                    width: 24px;
                }
            }
        }
    }
</style>