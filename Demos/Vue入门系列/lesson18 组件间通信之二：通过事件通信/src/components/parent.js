import Vue from 'vue/dist/vue.esm';
import Child from './child';

export default Vue.component('parent', {
  data() {
    return {
      num: 0,
    };
  },
  components: {
    Child
  },
  created() {
    this.$on('add', function (n) {
      this.num = this.num + n
    })
  },
  methods: {
    addChild() {
      this.$refs.child.$emit('add', 5)
    },
  },
  template: `
    <div>
      <div>父级
      num：{{num}}
      <br/><input type="button" value="子级num1 + 5" @click="addChild" />
      <child ref="child" :parent="this"></child>
    </div>
  `
});
