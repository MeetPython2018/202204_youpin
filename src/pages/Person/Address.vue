<template>
  <div>
    <main v-if="$route.meta.hidenfooter&&fatherHidden">
      <van-nav-bar :title="title">
        <template #left>
          <i class="iconfont icon-fanhui" @click="$router.back()"></i>
        </template>
      </van-nav-bar>
      <section>
        <div class="unsign" v-if="!userinfo.code">
          <van-empty description="登录后可管理收货地址">
            <van-button round type="danger" class="bottom-button" to="/sign">转去登录</van-button>
          </van-empty>
        </div>
        <div class="signed" v-else>
          <div class="addressNull" v-if="address.length===0">
            <van-empty description="没有收录地址">
              <van-button round type="danger" class="bottom-button" to="/person/address/addsite" @click="firstAdd">新增收货地址</van-button>
            </van-empty>
          </div>
          <div class="addressList">
            <div class="item van-hairline--bottom" v-for="(item,index) in address" :key="index">
              <p>
                <span>{{item.province}}</span><span>{{item.city}}</span><span>{{item.county}}</span>
              </p>
              <p>{{item.addressDetail}}</p>
              <div>
                <span class="name">{{item.name}}</span>
                <span class="tel">{{item.tel.slice(0,3)}}****{{item.tel.slice(-4)}}</span>
                <i class="iconfont icon-xiugai" @click="onEdit(item._id)"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="add" v-if="userinfo.code">
        <van-button round type="danger" @click="onAdd"><i class="iconfont icon-jiahao"></i>新建收货地址</van-button>
      </div>
    </main>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex"
import {NavBar,Empty,Button,Toast } from "vant"
export default {
  name:"Address",
  components:{
    [NavBar.name]:NavBar,
    [Empty.name]:Empty,
    [Button.name]:Button,
    [Toast.name]:Toast
  },
  data() {
    return {
      hidden: true,
      title:"地址管理",
      chosenAddressId: 0,
      fatherHidden:true
    }
  },
  watch:{
    updateIP(val){
      if(val){
        this.$store.dispatch("getAddress",this.userinfo.data._id)
      }
    }
  },
  computed:{
    ...mapState(["address",'userinfo','updateIP'])
  },
  methods: {
    firstAdd(){
      this.fatherHidden = false
    },
    demo(){
      this.fatherHidden = true
    },
    onEdit(val){
      this.fatherHidden = false
      this.$store.commit("updateIp",false)
      this.$router.push("/person/address/editaddress?_id="+val)
    },
    onAdd(){
      this.fatherHidden = false
      this.$store.commit("updateIp",false)
      this.$router.push("/person/address/addsite")
    }
  },
  mounted() {
    this.$bus.$on("close",this.demo)
    if(this.userinfo.code===1){
      this.$nextTick(()=>{
        this.$store.dispatch("getAddress",this.userinfo.data._id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    height: 100vh;
    display: flex;
    flex-direction: column;
    .van-nav-bar{
      position: sticky;
      background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
      .icon-fanhui{
        font-size: 18px;
      }
    }
    section{
      padding: 0 12px;
      flex: 1;
      background: #fff;
      .unsign,.signed{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          width: 120px;
          margin-bottom: 32px;
        }
        .van-address-list{
          width: 100%;
        }
        .addressList{
          width: 100%;
          height: 300px;
          .item{
            font-size: 14px;
            color: gray;
            padding: 10px 0;
            p{
              margin: 0;
            }
            p:nth-child(2){
              font-size: 15px;
              color: #000;
              margin: 6px 0;
            }
            div{
              display: flex;
              align-items: center;
              .name{
                flex: 0 0 26%;
              }
              .tel{
                flex: 1;
                font-family: "macfont";
                letter-spacing: 1px;
              }
              i{
                font-size: 18px;
                font-weight: 600;
              }
            }
          }
        }
      }
      .van-tab__pane{
        padding: 0 12px;
      }
    }
    .add{
      width: 100%;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      button{
        flex: 0 0 64%;
      }
    }
  }
</style>