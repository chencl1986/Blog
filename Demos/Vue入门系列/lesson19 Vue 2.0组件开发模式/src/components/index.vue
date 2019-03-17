<template lang="html">
  <div class="">
    首页
  </div>
</template>

<script>
export default {
  name: 'index',
  data(){
    return {}
  },
  async created(){
    //let {data}=await this.axios.get('http://localhost:8080/data/1.json');
    //let {data}=await this.$http.get('http://localhost:8080/data/1.json');
    let res=await fetch('http://localhost:8080/data/1.json');
    let data=await res.json();

    console.log(data);
  }
}
</script>

<style lang="css" scoped>
</style>
