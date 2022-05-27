<template>
  <main v-if="!$route.meta.hidenfooter">
    <van-nav-bar title="个人中心" :fixed="true" class="van-hairline--bottom"/>
    <section>
      <div class="userinfo">
        <div class="logobox">
          <img src="../../../public/userLogo.png" alt="">
        </div>
        <div class="isLogin">
          <span @click="$router.push('/sign')" v-if="!userinfo.code">点击登录/注册</span>
          <span v-if="userinfo.data">{{userinfo.data['username']}}</span>
          <i class="iconfont icon-icon_xinyong_xianxing_jijin-183" @click="signOut" v-if="userinfo.data"></i>
        </div>
      </div>
      <div class="serve">
        <van-cell-group inset>
          <van-cell title="维修订单" is-link to="/person/order"/>
          <van-cell title="购物车" is-link to="/person/shopcar"/>
          <van-cell title="优惠券" is-link to="/person/discount"/>
          <van-cell title="地址管理" is-link to="/person/address" />
          <van-cell title="客服电话: 18306824961 (05:00-23:00)" is-link />
          <van-cell title="招兵买马" is-link />
          <van-cell title="关注公众号和微博" is-link />
          <van-cell title="关注有品" is-link />
          <van-cell title="设置" is-link />
        </van-cell-group>
      </div>
    </section>
  </main>
  <router-view v-else></router-view>
</template>

<script>
import {mapState} from "vuex"
import { NavBar,Image as VanImage,Cell, CellGroup} from 'vant'
export default {
  name:"Person",
  components:{
    [NavBar.name]:NavBar,
    [VanImage.name]:VanImage,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
  },
  data() {
    return {
      demo:''
    }
  },
  watch:{
    userinfo(){
      this.$nextTick(()=>{
        this.demo = this.userinfo
      })
    }
  },
  computed:{
    ...mapState(["userinfo"])
  },
  methods:{
    signOut(){
      const xhr = new XMLHttpRequest()
      xhr.open("GET","/api/signout")
      xhr.responseType = 'json'
      xhr.send()
      xhr.onreadystatechange = ()=>{
        if(xhr.readyState===4){
          if(xhr.status>=200 && xhr.status<300){
            if(xhr.response.code===1){
              this.$store.commit("reset_userinfo")
              this.$router.replace("/person")
            }
          }
        }
      }
    }
  },
  mounted(){
    this.$store.dispatch('getUserInfo')
  },
  beforeRouteEnter(to,from,next){
    // console.log(to,from)
    next()
  },
  beforeRouteLeave(to,from,next){
    // console.log(to,from)
    next()
  }
}
</script>

<style lang="less" scoped>
@import url("../../common/css/mixin.less");
main{
  height: 100vh;
  .number{
    font-family: "macfont";
    letter-spacing: 1px;
  }
  section{
    padding: 0 12px;
    .userinfo{
      width: 100%;
      padding: 20px 0;
      background-color: #fff;
      margin-top: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-radius: 8px;
      margin-bottom: 16px;
      .logobox{
        width: 64px;
        height: 64px;
        padding: 1px;
        box-shadow: 0 0 18px rgba(255, 0, 0, 64%);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        img{
          width: 64px;
          border-radius: 50%;
        }
      }
      .isLogin{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin: 10px 0;
        span{
          font-size: 16px;
          margin-right: 10px;
          font-family: "苹方";
        }
        i{
          margin-top: 4px;
          font-size: 16px;
          color: @success;
        }
      }
    }
    .serve{
      padding: 20px 0;
      border-radius: 8px;
      background-color: #fff;
      .van-cell{
        padding: 10px 0;
      }
    }
  }
}
</style>