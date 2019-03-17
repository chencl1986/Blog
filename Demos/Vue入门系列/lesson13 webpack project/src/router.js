// 引入VueRouter模块
import VueRouter from 'vue-router';

// 引入组件
import Header from './components/header';
import Home from './components/home';
import News from './components/news1';

export default new VueRouter({
  routes: [
    {
      path: '/index', // 路由的路径
      name: 'index',  // 路由名称，可选属性，定义后可以用其实现跳转
      components: { // 通过components属性显示多个组件
        header: Header,  // 命名视图，对应<router-view name="header"></router-view>
        default: Home  // 默认视图，对应<router-view></router-view>
      }
    },
    {
      path: '/news',
      name: 'news',
      components: {
        header: Header,
        default: News
      }
    }
  ]
})
