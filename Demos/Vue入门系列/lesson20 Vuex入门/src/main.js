// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// 1. vuex-引入
import Vuex from 'vuex'

// vue-cli自带的编译配置
Vue.config.productionTip = false

// 1. vuex-在Vue中使用Vuex，让Vuex中的操作挂载到Vue中。
Vue.use(Vuex)

// 3. vuex-声明store对象
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 严格模式：防止直接修改state，只能用Mutations操作，由于strict模式是通过对象深度匹配进行，生产模式打开会严重影响性能。
  state: {a: 12, b: 5}, // 核心：数据
  mutations: { // 定义Mutations，通过action触发并更新state，Vue Devtool可以监听到数据的修改情况。
    add (state, n) { // 第一个参数为旧state，第二个参数为action中commit传入的参数。
      state.a += n
    }
  },
  actions: { // 定义actions，actions被触发后，将数据提交给Mutations进行处理并更新state。
    add ({ commit }, n) { // 第一个参数为context对象，它不是store本身，可以通过context.commit提交一个Mutation。第二个参数为用于更新state的参数。
      commit('add', n)
    }
  },
  getters: {}, // 类似于computed
  modules: {} // 将store拆分成多个命名空间，分开使用。
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 将store挂载到Vue实例中。
  components: { App },
  template: '<App/>'
})
