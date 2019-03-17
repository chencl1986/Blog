import Vue from 'vue/dist/vue.esm';
import Cmp1 from './cmp1';
import MyDialog from './my-dialog';

/*
// 实例化组件，主要用于测试
let cmp=new Cmp1({
  propsData: {
    name: '张三',
    list: [88, 99, 27]
  }
});

// 生成虚拟vm对象
let vm=cmp.$mount();

// vm.$el中存储了DOM，但不渲染在页面中
console.log(vm.$el);

// 测试代码
if(vm.$el.querySelector('li').innerHTML=='88'){
  console.log('正确');
}else{
  console.log('失败');
}
*/

let vm=new Vue({
  el: '#div1',
  data: {
    type: 'cmp1'
  },
  // 局部组件
  // 组件可以直接引入，也可以通过通用component组件引入，当is属性为特定组件名时，渲染相应组件。
  template: `
<div>
  可以尝试输入cmp1或my-dialog
  <input type="text" v-model="type" />
  <cmp1 name="Lee Chen" age="18" :list="[1, 2, 3]" />
  <component :is="type" name="Lee Chen" age="18" :list="[1, 2, 3]" />
  <my-dialog>
    <!-- 名为title的插槽内容 -->
    <template slot="title">标题</template>
    一些文字文字文字
    <!-- 默认插槽内容 -->
    <ul>
      <li>asdfas</li>
      <li>asdfas</li>
    </ul>
  </my-dialog>
</div>
`
})
