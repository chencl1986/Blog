import Vue from 'vue/dist/vue.esm';
import Child from './child';

export default Vue.component('parent', {
  data() {
    return {
      num1: 0,
      num2: 0,
    };
  },
  components: {
    Child
  },
  methods: {
    add() {
      this.num2++
    },
    addChild1() {
      this.$refs.child.num1++
    },
    addChild2() {
      this.$refs.child.add()
    },
  },
  template: `
    <div>
      <div>父级
      num1：{{num1}}
      num2：{{num2}}
      <br/><input type="button" value="子级num1 +1" @click="addChild1" /><br/><input type="button" value="子级num2 +1" @click="addChild2" /></div>
      <child ref="child" :parent="this"></child>
    </div>
  `
});
