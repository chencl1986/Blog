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
      //this.$store.state.a+=5;
      //this.$store.commit('add', 5);
      this.$store.dispatch('add', 7);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
