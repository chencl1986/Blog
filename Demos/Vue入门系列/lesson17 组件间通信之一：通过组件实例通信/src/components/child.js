import Vue from 'vue/dist/vue.esm';

export default Vue.component('parent', {
  props: ['parent'],
  data() {
    return {
      num1: 0,
      num2: 0,
    };
  },
  methods: {
    add() {
      this.num2++
    },
    addParent1() {
      this.parent.num1++
    },
    addParent2() {
      this.parent.add()
    },
  },
  template: `
    <div>
      子级
      num1：{{num1}}
      num2：{{num2}}
      <br/><input type="button" value="父级num1 +1" @click="addParent1" />
      <br/><input type="button" value="父级num2 +1" @click="addParent2" />
    </div>
  `
});
