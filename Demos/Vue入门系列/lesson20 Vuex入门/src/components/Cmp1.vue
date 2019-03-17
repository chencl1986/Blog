<template lang="html">
  <div class="">
    <input type="button" value="+5" @click="fn()">
  </div>
</template>

<script>
export default {
  name: 'cmp1',
  methods: {
    fn(){
      // this.$store.state.a+=5; // 在严格模式下，直接修改state可以成功，但会报错
      // this.$store.commit('add', 5);  // 直接触发一个Mutation其实也可行，且不会报错，但这其实违背了Vuex设计的初衷。
      this.$store.dispatch('add', 5);  // 触发一个action，实现数据修改。
    }
  }
}
</script>

<style lang="css" scoped>
</style>
