export default {
  state: {
    str: 'store_a'
  },
  mutations: {
    'mod_a.setStr': function (state, s){
      alert('a的setStr');
      state.str=s;
    }
  },
  actions: {
    'mod_a.setStr': function ({commit}, s){
      commit('mod_a.setStr', s);
    }
  }
}
