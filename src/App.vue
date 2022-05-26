<template>
  <div id="ln">
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
    <footer v-if="!$route.meta.hidenfooter">
      <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" :placeholder="false" :route="true">
        <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/category/categoryall">分类</van-tabbar-item>
        <van-tabbar-item icon="cash-back-record" to="/sell">闲置换钱</van-tabbar-item>
        <van-tabbar-item icon="chat-o" to="/callcenter">客服</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/person">我的</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
import {Tabbar,TabbarItem} from 'vant'
export default {
  name: 'App',
  components: {
    [Tabbar.name]:Tabbar,
    [TabbarItem.name]:TabbarItem
  },
  data() {
    return {
      active:0
    }
  },
  created(){
    this.$store.commit("receive_category",JSON.parse(window.localStorage.getItem("aliveCategory")))
    this.$store.commit("cacheDetail",JSON.parse(window.localStorage.getItem("aliveDetail")))
    window.addEventListener("beforeunload",()=>{
      window.localStorage.setItem("aliveCategory",JSON.stringify(this.$store.state.categorys))
      window.localStorage.setItem("aliveDetail",JSON.stringify(this.$store.state.detailpage))
    })
  },
  mounted(){
    this.$store.dispatch("getCommendGoods")
    this.$store.dispatch("getCategory")
  }
}
</script>

<style>
  #ln{
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    position: relative;
  }
</style>
