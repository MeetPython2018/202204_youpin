<template>
  <div class="home-top-nav">
    <van-tabs v-model="active" :sticky="true">
      <van-tab title="推荐">
        <Recommend :asyncData="asyncData"/>
      </van-tab>
      <van-tab title="苹果">
        <Product :navData="iphoneData"/>
      </van-tab>
      <van-tab title="安卓">
        <Product :navData="androidData"/>
      </van-tab>
      <van-tab title="平板">
        <Product :navData="padData"/>
      </van-tab>
      <van-tab title="电脑">
        <Product :navData="pcData"/>
      </van-tab>
      <van-tab title="数码家电">
        <Product :navData="digitalProductData"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Recommend from "../Home/Recommend.vue"
import Product from "../Home/Product.vue"
export default {
  name:"Home",
  components:{Recommend,Product},
  data() {
    return {
      active:0,
      iphoneData:[
        {id:"001",text:"iPhone SE3"},
        {id:"002",text:"iPhone 13 Pro Max"},
        {id:"003",text:"iPhone 13 Pro"},
        {id:"004",text:"iPhone 13"},
        {id:"005",text:"iPhone 13 mini"},
        {id:"006",text:"iPhone 12 Pro Max"},
        {id:"007",text:"iPhone 12 Pro"},
      ],
      androidData:[
        {id:"001",text:"华为"},
        {id:"002",text:"荣耀"},
        {id:"003",text:"OPPO"},
        {id:"004",text:"小米"},
        {id:"005",text:"VIVO"},
        {id:"006",text:"一加"},
        {id:"007",text:"真我"},
      ],
      padData:[
        {id:"001",text:"Apple pencil"},
        {id:"002",text:"联想平板"},
        {id:"003",text:"华为平板"},
        {id:"004",text:"三星平板"},
        {id:"005",text:"荣耀平板"},
        {id:"006",text:"小米平板"},
        {id:"007",text:"OPPO平板"},
      ],
      pcData:[
        {id:"001",text:"显示器"},
        {id:"002",text:"键盘鼠标"},
        {id:"003",text:"外设产品"},
        {id:"004",text:"硬盘"},
        {id:"005",text:"声卡"},
        {id:"006",text:"苹果"},
        {id:"007",text:"华为"},
      ],
      digitalProductData:[
        {id:"001",text:"游戏机"},
        {id:"002",text:"戴森"},
        {id:"003",text:"剃须刀"},
        {id:"004",text:"料理机"},
        {id:"005",text:"手机云台"},
        {id:"006",text:"电子书"},
        {id:"007",text:"挂烫机"},
      ],
      asyncData:[]
    }
  },
  mounted() {
    // const xhr = new XMLHttpRequest()
    // xhr.open("GET","http://8.219.72.10:9000/pullgoods")
    // const asyncData = new Promise((resolve,reject)=>{
    //   xhr.send()
    //   xhr.onreadystatechange = function(){
    //     if(xhr.readyState===4){
    //       if(xhr.status>=200 && xhr.status<300){
    //         resolve(JSON.parse(xhr.response))
    //       }
    //     }
    //   }
    // })
    // asyncData.then((val)=>{
    //   this.asyncData = val
    //   console.log(this.asyncData)
    // })
  }
}
</script>

<style lang="less" scoped>

</style>