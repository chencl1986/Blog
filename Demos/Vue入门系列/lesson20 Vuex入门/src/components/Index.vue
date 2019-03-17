<template>
  <div>
    <!-- 读取Vuex的state -->
    a: {{$store.state.a}}
    <Cmp1/>
    <Table :fields="fields" :datas="datas" :parent="this"/>
  </div>
</template>

<script>
import Table from '@/components/common/Table';
import Cmp1 from '@/components/Cmp1';

export default {
  name: 'Index',
  data () {
    return {
      fields: [
        {name: 'ID', text: 'ID'},
        {name: 'name', text: '姓名'},
        {name: 'age', text: '年龄'},
      ],
      datas: [
        {ID: 1, name: 'lee', age: 18},
        {ID: 2, name: '张三', age: 25},
        {ID: 4, name: '李四', age: 8},
      ]
    }
  },
  methods: {
    del(id){
      this.datas=this.datas.filter(data=>data.ID!=id);
    }
  },
  components: {
    Table, Cmp1
  }
}
</script>

<style scoped>
</style>
