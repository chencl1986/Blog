import Vue from 'vue/dist/vue.esm';

export default Vue.component('parent', {
  props: ['parent'],
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    addParent() {
      this.parent.$emit('add', 5)
    },
  },
  created() {
    this.$on('add', function (n) {
      this.num = this.num + n
    })
  },
  template: `
    <div>
      子级
      num：{{num}}
      <br/><input type="button" value="父级num1 + 5" @click="addParent" />
    </div>
  `
});
