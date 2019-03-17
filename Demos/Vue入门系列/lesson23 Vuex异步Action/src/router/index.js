import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Index2 from '@/components/Index2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/index2',
      name: 'index2',
      component: Index2
    }
  ]
})
