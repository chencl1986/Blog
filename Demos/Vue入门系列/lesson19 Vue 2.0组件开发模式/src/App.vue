// 此处书写template模板，支持html等多种语言，等同于Vue.component中的template属性
<template lang="html">
  <div>
    <!-- 将组件写入模板，两种写法都兼容 -->
    <CmpTest />
    <cmp-test />
    <!-- 路由跳转链接，由于路由已经在入口index.js中挂载，组件中可以直接使用 -->
    <router-link :to="{ name: 'index', params: {} }">首页</router-link>
    <router-link :to="{ name: 'news', params: {} }">新闻</router-link>
    <router-view/>
  </div>
</template>

// 此处书写JavaScript代码，等同于Vue.component代码
<script>
// 引入其他组件
import CmpTest from './components/cmp.vue'

// 默认导出Vue组件
export default {
  name: 'app',  // name属性为组件提供了一个ID，调试时的报错信息将显示该名称
  data(){
    return {a: 12}
  },
  components: {
    CmpTest
  }
}
</script>

// 此处书写样式，支持css、less等其他语言
<style lang="css" scoped>
</style>
