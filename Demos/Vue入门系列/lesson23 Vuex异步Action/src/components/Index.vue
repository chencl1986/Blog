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
    ...mapActions(['addA', 'addB', 'setOnline', 'readUsers']),
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
    ...mapGetters(['count', 'onlineUsers'])
  }
}
</script>

<style scoped>
</style>
