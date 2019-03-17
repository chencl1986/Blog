<template lang="html">
  <table class="table">
    <thead>
      <tr>
        <th v-for="field in fields">{{field.text}}</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in datas">
        <td v-for="field in fields">{{data[field.name]}}</td>
        <td>
          <a href="#" class="btn btn-danger" @click="fn_del(data.ID)">删除</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: ['fields', 'datas', 'parent'],
  methods: {
    fn_del(id){
      console.log('delete', id);

      this.parent.del(id);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
