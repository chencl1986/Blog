import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// vuex3-声明store对象
export default new Vuex.Store({
  strict: process.env.NODE_ENV != 'production', // 严格模式：防止直接修改state
  state: { // 核心：数据
    a: 12,
    b: 5
  },
  mutations: {
    addA (state, n) {
      state.a += n
    },
    addB (state, n) {
      state.b += n
    }
  },
  actions: {
    addA ({commit}, n) {
      commit('addA', n)
    },
    addB ({commit}, n) {
      commit('addB', n)
    }
  },
  getters: {
    count (state) {
      return state.a + state.b
    }
  }
})
