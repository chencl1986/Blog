import Vue from 'vue/dist/vue.esm';

// 通过Vue.component注册一个组件
export default Vue.component('cmp1', {
  props: ['name', 'age', 'list'],  // 定义要传入的props，在Vue中只有已定义的props才可以被组件接收到
  data(){ // 组件的data必须是函数，为了保证组件的data作用域独立
    return {a: 77, b: 55};
  },
  // 组件模板
  template: `
<div>
  姓名：{{name}}<br/>
  年龄：{{age}}<br/>
  <ul>
    <li v-for="item in list">{{item}}</li>
  </ul>
</div>
`
});
