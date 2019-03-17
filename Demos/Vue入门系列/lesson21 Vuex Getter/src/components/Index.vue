<template>
  <div>
    <div>a: {{a}}</div>
    <div>b: {{b}}</div>
    <div>count from getters: {{$store.getters.count}}</div>
    <div>count from computed: {{countFromComputed}}</div>
    <div>count from computed: {{countFromComputedSet}}</div>
    <div>count: {{count}}</div>
    <input type="button" value="count+5" @click="addCount(5)" />
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
  methods: {
    addCount(value) {
      this.countFromComputedSet += 5
    },
  },
  components: {
    Table, Cmp1
  },
  computed: {
    a() {
      return this.$store.state.a
    },
    b() {
      return this.$store.state.b
    },
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
  }
}
</script>

<style scoped>
</style>
