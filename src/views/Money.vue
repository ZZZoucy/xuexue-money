<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tags @update:value="record.tags = $event"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes"/>
    </div>
    
    <div class="createdAt">
      <FormItem field-name="日期" type="date" placeholder="在这里输入日期" :value.sync="record.createdAt"/>
    </div>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs, Tags, FormItem, NumberPad},
  })
  
  export default class Money extends Vue {
    get recordList() {
      return this.$store.state.recordList;
    }
    recordTypeList = recordTypeList;
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0, createdAt:new Date().toISOString()
    };
    created() {
    }
    onUpdateNotes(value: string) {
      this.record.notes = value;
    }
    saveRecord() {
      if(!this.record.tags || this.record.tags.length === 0){
        return window.alert('请至少选择一个标签');
      }
      if(this.record.amount === 0){
        const result = window.confirm('金额为0，确定记账吗？');
        if(result === true){
          this.record.notes = '';
        }else{
          return;
        }
      }
      this.$store.commit('createRecord', this.record);
      if(this.$store.state.createRecordError === null){
        window.alert('已保存');
        this.record.notes = '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes {
    padding: 5px 0;
    background: #fff;
  }
  .createdAt{
    background: #fff;
  }
</style>