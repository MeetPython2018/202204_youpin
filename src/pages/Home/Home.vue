<template>
  <div class="home-top-nav">
    <van-tabs v-model="active" :sticky="true" @change="onChange">
      <van-tab title="推荐">
        <Recommend :recommends="recommends"/>
      </van-tab>
      <van-tab title="苹果" name='1'>
        <Product :category="categorys[0]"/>
      </van-tab>
      <van-tab title="安卓" name='2'>
        <Product :category="categorys[1]"/>
      </van-tab>
      <van-tab title="平板" name="3">
        <Product :category="categorys[2]"/>
      </van-tab>
      <van-tab title="电脑" name="4">
        <Product :category="categorys[3]"/>
      </van-tab>
      <van-tab title="数码家电" name="5">
        <Product :category="categorys[4]"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {Tab,Tabs} from 'vant';
import {mapState} from 'vuex'
import Recommend from "../Home/Recommend.vue"
import Product from "../Home/Product.vue"
export default {
  name:"Home",
  components:{
    [Tabs.name]:Tabs,
    [Tab.name]:Tab,
    Recommend,
    Product
  },
  data() {
    return {
      active:0,
    }
  },
  computed:{
    ...mapState(["categorys","recommends"])
  },
  methods:{
    onChange(name){
      this.$store.dispatch("getQueryByType",name)
    }
  }
}
</script>

<style lang="less" scoped>
  .home-top-nav{
    min-height: 100vh;
  }
</style>
