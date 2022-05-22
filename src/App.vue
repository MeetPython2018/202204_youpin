<template>
  <div id="ln">
    <router-view></router-view>
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

export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      active:0
    }
  },
  created(){
    if(window.localStorage.getItem("demodata")){
      this.$store.commit("PullData",JSON.parse(window.localStorage.getItem("demodata")))
      // this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(window.localStorage.getItem("demodata"))))
    }
    window.addEventListener("beforeunload",()=>{
      window.localStorage.setItem("demodata",JSON.stringify(this.$store.state.goodsdata))
    })
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
