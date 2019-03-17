import Vue from 'vue';
import Router from 'vue-router';

// 引入页面组件 
import Index from '@/index.vue';
import News from '@/news.vue';

// 全局使用Router
Vue.use(Router);

// 配置路由
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/news',
      name: 'news',
      component: News
    }
  ]
})
