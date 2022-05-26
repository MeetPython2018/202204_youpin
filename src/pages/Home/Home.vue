<template>
  <div class="home-top-nav">
    <van-tabs v-model="active" :sticky="true">
      <van-tab title="推荐">
        <Recommend :recommends="recommends"/>
      </van-tab>
      <van-tab title="苹果">
        <Product :category="categorys[0]"/>
      </van-tab>
      <van-tab title="安卓">
        <Product :category="categorys[1]"/>
      </van-tab>
      <van-tab title="平板">
        <Product :category="categorys[2]"/>
      </van-tab>
      <van-tab title="电脑">
        <Product :category="categorys[3]"/>
      </van-tab>
      <van-tab title="数码家电">
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
  }
}
</script>

<style lang="less" scoped>

</style>