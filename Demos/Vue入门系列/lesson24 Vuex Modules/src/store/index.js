import Vue from 'vue'
import Vuex from 'vuex'

import ModA from './mod_a'
import ModB from './mod_b'

Vue.use(Vuex)

// vuex3-声明store对象
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 严格模式：防止直接修改state
  state: { // 核心：数据
    a: 12,
    b: 5,
    users: []
  },
  mutations: {
    addA (state, n) {
      state.a += n
    },
    addB (state, n) {
      state.b += n
    },
    setOnline (state, id) {
      state.users.forEach(user => {
        if (user.id === id) {
          user.online = true
        }
      })
    },
    setUsers (state, users) {
      state.users = users
    }
  },
  actions: {
    addA ({commit}, n) {
      commit('addA', n)
    },
    addB ({commit}, n) {
      commit('addB', n)
    },
    setOnline ({commit}, id) {
      commit('setOnline', id)
    },
    async readUsers ({commit}) {
      let res = await fetch('http://localhost:8081/user.txt')
      let users = await res.json()

      commit('setUsers', users)
    }
  },
  getters: {
    count (state) {
      return state.a + state.b
    },
    onlineUsers (state) {
      return state.users.filter(user => user.online)
    }
  },
  modules: {
    mod_a: ModA,
    mod_b: ModB
  }
})
