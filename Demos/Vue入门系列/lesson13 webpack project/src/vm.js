// 引入Vue的es module模块，使用vue-cli时，因为配置了alias，所以可以直接引用vue
import Vue from 'vue/dist/vue.esm';
// 引入VueRouter模块
import VueRouter from 'vue-router';

// 引入路由配置
import router from './router';

// 引入项目样式表
import '../css/main.css';

// 安装VueRouter插件
Vue.use(VueRouter);

// 配置Vue应用
const vm=new Vue({
  el: '#app',
  data: {},
  router
});
