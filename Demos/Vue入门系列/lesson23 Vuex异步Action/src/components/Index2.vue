<template>
  <div>
    <input type="button" value="显示隐藏" @click="b=!b">
    <!--<transition name="fadeUp">
      <div class="box" v-if="b"></div>
    </transition>-->

    <input type="button" name="" value="添加1项" @click="arr.push(Math.random())">

    <transition-group name="bounce" tag="ul" class="list">
      <li v-for="item,index in arr" :key="item">
        {{index}}. {{item}} <a href="#" @click="del(index)">删除</a>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      b: true,
      arr: [12,5,8,9,33,27]
    }
  },
  methods: {
    del(index){
      this.arr.splice(index, 1);
    }
  },
  components: {

  }
}
</script>

<style scoped>
.list li {
  width: 40px; height: 40px; background:#CCC; margin:10px; list-style: none;
  animation-duration: 10s;
}
</style>
