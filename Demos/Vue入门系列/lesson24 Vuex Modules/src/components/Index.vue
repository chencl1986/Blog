<template>
  <div>
    <div>a: {{a}}</div>
    <div>b: {{b}}</div>
    <div>count from getters: {{$store.getters.count}}</div>
    <div>count from computed: {{countFromComputed}}</div>
    <div>count from computed: {{countFromComputedSet}}</div>
    <div>count: {{count}}</div>
    <input type="button" value="count+5" @click="addCount(5)" />
    <input type="button" value="a+5" @click="addA(5)" />
    <input type="button" value="b+3" @click="addB(3)" />

    <br>
    str: {{$store.state.str}}<br>
    a_str: {{$store.state.mod_a.str}}<br>
    b_str: {{$store.state.mod_b.str}}<br>
    a_str: {{str_a}}<br>
    b_str: {{str_b}}<br>
    <input type="button" value="设置A" @click="setA('aa')">
    <input type="button" value="设置B" @click="setB('bb')"><br/>
    <input type="button" value="设置A" @click="set_a('aaa')">
    <input type="button" value="设置B" @click="set_b('bbb')">
    <br>

    <input type="button" value="张三出现" @click="setOnline(5)" />
    <ul>
      <li :key="user.name" v-for="user in onlineUsers">
        名字：{{user.name}}
        年龄：{{user.age}}
      </li>
    </ul>
  </div>
</template>

<script>
import Table from '@/components/common/Table';
import Cmp1 from '@/components/Cmp1';
import {mapState, mapActions, mapGetters} from 'vuex';

export default {
  name: 'Index',
  data () {
    return {
      
    }
  },
  async created(){
    await this.readUsers();
  },
  methods: {
    // addA(n) {
    //   this.$store.dispatch('addA', n)
    // },
    // addB(n) {
    //   this.$store.dispatch('addA', n)
    // },
    addCount(value) {
      this.countFromComputedSet += 5
    },
    ...mapActions(['addA', 'addB', 'setOnline', 'readUsers', 'mod_a.setStr', 'mod_b.setStr']),
    //...mapActions(['setStr'])
    ...mapActions({
      set_a: 'mod_a.setStr',
      set_b: 'mod_b.setStr'
    }),
    setA(str) {
      this['mod_a.setStr'](str)
    },
    setB(str) {
      this['mod_b.setStr'](str)
    },
    // set_a(){
    //   this.$store.dispatch('mod_a.setStr', 'aaa');
    // },
    // set_b(){
    //   this.$store.dispatch('mod_b.setStr', 'bbb');
    // }
  },
  components: {
    Table, Cmp1
  },
  computed: {
    countFromComputed() {
      return this.$store.getters.count
    },
    countFromComputedSet: {
      get() {
        return this.$store.getters.count
      },
      set(value) {
        this.$store.dispatch('addA', 5)
      },
    },
    ...mapState(['a', 'b']),
    ...mapState({
      str_a: state=>state.mod_a.str,
      str_b: state=>state.mod_b.str,
    }),
    ...mapGetters(['count', 'onlineUsers'])
  }
}
</script>

<style scoped>
</style>
