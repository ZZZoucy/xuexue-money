<template>
    <div>
        <label class="formItem">
            <span class="name">{{this.fieldName}} </span>   
            <template v-if="type === 'date'">
                <input class="date" :type="type || 'text'" 
                    :value="x(value)" 
                    @input="onValueChange($event.target.value)" 
                    :placeholder="this.placeholder">
            </template>    
            <template v-else>
                <input class="notes" :type="type || 'text'" 
                    :value="value" 
                    @input="onValueChange($event.target.value)" 
                    :placeholder="this.placeholder">
                <div></div>
            </template>      
        </label>
    </div>
</template>

<script lang="ts">
    import dayjs from 'dayjs';
    import Vue from 'vue';

    // TS 从 vue-property-decorator 库中引入装饰器 @Component
    // 那么导入内容的地方的 数据会自动转为 data，方法会自动转为 methods
    import { Component, Prop, Watch } from 'vue-property-decorator';
    @Component

    // TS 导入组件的写法，要写class，并且传入的参数都得声明类型
    export default class FormItem extends Vue{
        @Prop({default:''}) readonly value!: string;

        @Prop({required:true}) fieldName!: string;
        @Prop() placeholder?: string;
        @Prop() type?: string;

        // methods
        onValueChange(value:string){
            this.$emit('update:value',value);
        }
        x(isoString:string){
            return dayjs(isoString).format('YYYY-MM-DD')
        }
    }
</script>

<style lang="scss" scoped>
    .formItem{
        font-size: 14px;
        display: flex;
        align-items: center;
        padding: 8px 0px 8px 16px;
        border-bottom: 1px solid #e6e6e6;
        .name{
            padding-right: 12px;
            font-weight: bold;
        }
        input{
            flex-grow: 1;
            background: transparent;
            &.notes{
                border: 1px solid #ddd;
                border-radius: 3px;
                height: 30px;
                margin-right: 16px;
                padding-left: 8px;
            }
            &.date{
                border: 1px solid #ddd;
                border-radius: 5px;
                height: 30px;
                margin-right: 16px;
                margin-top: 5px;
            }
        }
    }
</style>