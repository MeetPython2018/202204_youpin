<template>
  <main>
    <van-nav-bar title="购物车" :fixed="true">
      <template #left>
        <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      </template>
    </van-nav-bar>
    <section>
      <div class="unsign" v-if="!userinfo.code">
        <van-empty description="登录后查看车车情况！">
          <van-button round type="danger" class="bottom-button" to="/sign">转去登录</van-button>
        </van-empty>
      </div>
      <div class="signed" v-else>
        <div v-if="shopcar.length===0" class="carNull">
          <img src="../../assets/empty.svg" alt="">
          <van-button type="primary" to="/home" round>去首页逛逛</van-button>
        </div>
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <div class="shopmincard" v-for="(items,index) in shopcar" :key="index">
            <van-checkbox :name="items.price"></van-checkbox>
            <div class="img-box">
              <van-image
                width="100%"
                height="70"
                :src="items.photo[0]"
              />
            </div>
            <div class="info">
              <p class="title van-multi-ellipsis--l3">
                <span v-for="(item,index) in items.title" :key="index">{{item}}</span>
              </p>
              <p class="price">
                <i class="iconfont icon-renminbi1"></i>
                <span>{{items.price}}</span>
              </p>
            </div>
            <i class="iconfont icon-guanbi" @click="onDelete(items['_id'])"></i>
          </div>
        </van-checkbox-group> 
      </div>
    </section>
    <van-submit-bar :price="totalMoney" button-text="埋单" button-color="#ee0a24" class="van-hairline--top" @submit="onSubmit">
      <van-checkbox v-model="resultC"></van-checkbox>
      <span style="margin-left:8px" @click="checkAll">全选</span>
      <template #tip>
        已选<span>{{result.length}}</span>件商品
      </template>
    </van-submit-bar>
  </main>
</template>

<script>
import {mapState} from "vuex"
import {NavBar,Empty,Button,SubmitBar,Checkbox,CheckboxGroup,Toast,Image as VanImage,Tag} from "vant"
export default {
  name:"ShopCar",
  components:{
    [NavBar.name]:NavBar,
    [Empty.name]:Empty,
    [Button.name]:Button,
    [SubmitBar.name]:SubmitBar,
    [Checkbox.name]:Checkbox,
    [CheckboxGroup.name]:CheckboxGroup,
    [Toast.name]:Toast,
    [VanImage.name]:VanImage,
    [Tag.name]:Tag
  },
  data() {
    return {
      result:[],
      totalMoney:0,
    }
  },
  watch:{
    result(value){
      console.log(value)
      if(value.length>0){
        this.totalMoney = value.map(x=>x*1).reduce((x,y)=>x+y)*100;
      }else{
        this.totalMoney = 0
      }
    }
  },
  computed:{
    resultC:{
      get(){
        return document.getElementsByClassName("shopmincard").length===this.result.length && this.result.length>0
      },
      set(value){
        console.log(value)
      }
    },
    ...mapState(["shopcar",'userinfo'])
  },
  methods: {
    onSubmit(){
      Toast.success("账是记在那的,一旦收到款,立马发货.")
    },
    checkAll(){
      this.$refs.checkboxGroup.toggleAll()
    },
    onDelete(val){
      const res = this.shopcar.filter((ele)=>{
        if(ele["_id"]!==val){
          return true
        }
      })
      this.$store.commit("updataCar",res)
    }
  },
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    height: 100vh;
    display: flex;
    flex-direction: column;
    .icon-fanhui{
      font-size: 18px;
    }
    section{
      padding: 0 12px;
        .signed,.unsign{
        padding: 64px 0;
        flex: 1;
        .shopmincard{
          padding: 16px 8px;
          background-color: #fff;
          margin-bottom: 16px;
          border-radius: 8px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .img-box{
            width: 17%;
            margin: 0 8px;
          }
          .info{
            flex: 1;
            font-size: 14px;
            p{
              opacity: .7;
              color: #000;
              margin: 0;
              padding: 4px 0;
            }
            span{
              margin-right: 3px;
            }
            .price{
              font-family: "macfont";
              color: @red;
              font-weight: 600;
              letter-spacing: 1px;
            }
          }
          .icon-guanbi{
            font-weight: 600;
            opacity: .7;
            align-self: flex-start;
          }
        }
        .carNull{
          display: flex;
          flex-direction: column;
          align-items: center;
          img{
            width: 120px;
            margin-bottom: 32px;
          }
        }
      }
    }
    .van-submit-bar__price{
      font-family: "macfont";
      letter-spacing: 1px;
    }
  }
</style>