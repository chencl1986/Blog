import Vue from 'vue';
// 主入口组件
import App from './App.vue';
// 引入路由配置
import router from './routers';

let vm=new Vue({
  el: '#div1',
  data: {},
  components: {App},
  router, // 将路由表挂载到Vue实例，在组件中可以直接使用路由组件和功能
  template: `
    <App/>
  `
})
