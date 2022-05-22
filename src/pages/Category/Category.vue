<template>
  <router-view></router-view>
</template>

<script>
// import {Search,Sidebar, SidebarItem,Image as VanImage} from "vant"
import CategoryAll from "../../components/Category/CategoryAll.vue"
import FilterCategory from "../../components/Category/FilterCategory.vue"

export default {
  name:"Category",
  components:{CategoryAll,FilterCategory},
  data() {
    return {
      value:'',
      active: 0,
      items: [
        { text: '苹果' },
        { text: '安卓' },
        { text: '平板' },
        { text: '电脑' },
        { text: '数码家电' },
        { text: '配件' },
        { text: '耳机' },
        { text: '穿戴' },
        { text: '钟表' },
        { text: '运动户外' },
        { text: '奢侈品' },
        { text: '美妆' },
        { text: '生活百货' },
        { text: '尾货清仓' }
      ],
      demoData:28,
      demoTitle:"手机",
      activeKey:0
    }
  },
  methods:{
    onChange(index) {
      this.demoData = Math.round(Math.random()*10)+10
      this.demoTitle = this.items[index].text
    },
  }
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    height: 100%;
  }
  
</style>