<template>
  <main>
    <van-nav-bar title="购物车" :fixed="true">
      <template #left>
        <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      </template>
    </van-nav-bar>
    <van-empty
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="这里都落灰了..."
      v-if="carEmpty"
    >
    <van-button type="primary" to="/home">去首页逛逛</van-button>
    </van-empty>
    <section>
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="shopmincard">
          <van-checkbox name="3899"></van-checkbox>
          <div class="img-box">
            <van-image
              width="100%"
              height="70"
              src=""
            />
          </div>
          <div class="info">
            <p class="title van-multi-ellipsis--l3">
              <span>90新</span>
              <span>iPhone 13</span>
              <span>远峰蓝</span>
              <span>128G</span>
              <span>国行</span>
              <span>90%电池</span>
              <span>带包装配件</span>
            </p>
            <p class="price">
              <i class="iconfont icon-renminbi1"></i>
              <span>3899</span>
            </p>
          </div>
          <i class="iconfont icon-guanbi"></i>
        </div>
        <div class="shopmincard">
          <van-checkbox name="7899"></van-checkbox>
          <div class="img-box">
            <van-image
              width="100%"
              height="70"
              src=""
            />
          </div>
          <div class="info">
            <p class="title van-multi-ellipsis--l3">
              <span>95新</span>
              <span>iPhone 13 Pro</span>
              <span>远峰蓝</span>
              <span>256G</span>
              <span>国行</span>
              <span>100%电池138次充电</span>
              <span>带包装配件</span>
              <span>官方保修到2022年10月9号</span>
            </p>
            <p class="price">
              <i class="iconfont icon-renminbi1"></i>
              <span>7899</span>
            </p>
          </div>
          <i class="iconfont icon-guanbi"></i>
        </div>
      </van-checkbox-group> 
    </section>
    <van-submit-bar :price="totalMoney" button-text="埋单" button-color="#ee0a24" class="van-hairline--top" @submit="onSubmit">
      <van-checkbox v-model="resultC"></van-checkbox>
      <span @click="toggleAll" style="margin-left:8px">全选</span>
      <template #tip>
        已选<span>{{result.length}}</span>件商品
      </template>
    </van-submit-bar>
  </main>
</template>

<script>
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
      carEmpty:true,
      result:[],
      totalMoney:0
    }
  },
  watch:{
    result(value){
      if(value.length>0){
        this.totalMoney = value.map(x=>x*1).reduce((x,y)=>x+y)*100;
      }else{
        this.totalMoney = 0
      }
    },
    resultC:{
      deep:true,
      immediate:true,
      handler(){
        this.resultC = false
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
  },
  methods: {
    onSubmit(){
      Toast("呵呵")
    },
    checkA(){
      this.$refs.checkboxGroup.toggleAll(true);
    },
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
  },
  mounted() {
    if(this.$route.query.s_id){
      this.carEmpty = false
    }
  },
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    height: 100vh;
    .icon-fanhui{
      font-size: 18px;
    }
    .custom-image{
      padding: 170px 0;
    }
    section{
      padding: 60px 12px 0;
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
    }
    .van-submit-bar__price{
      font-family: "macfont";
      letter-spacing: 1px;
    }
  }
</style>