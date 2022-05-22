<template>
  <main>
    <div class="swipe-wrap">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
        <van-swipe-item v-for="value in 4" :key="value">
          <van-image src="" radius="8" width="100%" height="150">
             <template v-slot:loading>
              <van-loading type="spinner" size="20" /> 
             </template> 
          </van-image>
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            <div :class="{active:1===active}"></div>
            <div :class="{active:2===active}"></div>
            <div :class="{active:3===active}"></div>
            <div :class="{active:0===active}"></div>
          </div>
        </template>
      </van-swipe>
    </div>
    <div class="promise">
      <div>
        <i class="iconfont icon-wancheng"></i>
        <span>3天无理由</span>
      </div>
      <div>
        <i class="iconfont icon-wancheng"></i>
        <span>180天质保</span>
      </div>
      <div>
        <i class="iconfont icon-wancheng"></i>
        <span>国行正品</span>
      </div>
      <div>
        <i class="iconfont icon-wancheng"></i>
        <span>小白直营</span>
      </div>
    </div>
    <div class="category-wrap">
      <ul>
        <van-row type="flex" justify="space-between" align="space-between">
            <van-col span="4" @click="$router.push('/category/filtercategory/6')">
              <i class="iconfont icon-chongdian"></i>
              <span class="font-size-sm">配件</span>
            </van-col>
            <van-col span="4" >
              <i class="iconfont icon-dianchi"></i>
              <span class="font-size-sm">换电池</span>
            </van-col>
            <van-col span="4">
              <i class="iconfont icon-xunhuan8"></i>
              <span class="font-size-sm">回收</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/7')">
              <i class="iconfont icon-ziyuan"></i>
              <span class="font-size-sm">耳机</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/8')">
              <i class="iconfont icon-VR"></i>
              <span class="font-size-sm">穿戴</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/9')">
              <i class="iconfont icon-shoubiao"></i>
              <span class="font-size-sm">钟表</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/11')">
              <i class="iconfont icon-tibao" ></i>
              <span class="font-size-sm">奢侈品</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/10')">
              <i class="iconfont icon-huwai"></i>
              <span class="font-size-sm">运动户外</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/13')">
              <i class="iconfont icon-riyongbaihuo"></i>
              <span class="font-size-sm">生活百货</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/12')">
              <i class="iconfont icon-huazhuangpin"></i>
              <span class="font-size-sm">美妆</span>
            </van-col>
        </van-row>
      </ul>
    </div>
    <div class="ad">
      <van-image src="" radius="8" width="100%" height="110">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
    <div class="newgoods">
      <van-row type="flex" justify="space-between" align="top">
        <van-col span="11">
          <div class="tip">
            <span>每日上新</span>
          </div>
          <ul>
            <li v-for="(item,index) in asyncData.slice(0,5)" :key="index" >
              <GoodsCard :asyncData="item" @click.native="onSend(item)">
                <span class="more">看相似</span>
              </GoodsCard>
            </li>
          </ul>
        </van-col>
        <van-col span="11">
          <ul>
            <li v-for="(item,index) in asyncData.slice(5)" :key="index">
              <GoodsCard :asyncData="item">
                <span class="more">看相似</span>
              </GoodsCard>
            </li>
          </ul>
        </van-col>
      </van-row>
    </div>
  </main>
</template>
<script>
import { Col, Row,Swipe, SwipeItem, Image as VanImage ,Loading,Tag,Step, Steps  } from 'vant';
import GoodsCard from "../../components/PublicComponents/GoodsCard.vue"
export default {
  name:"Recommend",
  components:{
    [Col.name]:Col,
    [Row.name]:Row,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem,
    [VanImage.name]:VanImage,
    [Loading.name]:Loading,
    [Step.name]:Step,
    [Steps.name]:Steps,
    [Tag.name]:Tag,
    GoodsCard
  },
  data() {
    return {
      current: 0,
      gridData:[
        {id:"001",text:"配件"},
        {id:"002",text:"换电池"},
        {id:"003",text:"回收"},
        {id:"004",text:"耳机"},
        {id:"005",text:"穿戴"},
        {id:"006",text:"钟表"},
        {id:"007",text:"奢侈品"},
        {id:"008",text:"运动户外"},
        {id:"009",text:"生活百货"},
        {id:"010",text:"美妆"},
      ],
      asyncData:[]
    }
  },
  computed:{
    active(){
      return (this.current+1)%4
    },
  },
  methods:{
    onChange(index) {
      this.current = index;
    },
    onSend(val){
      this.$router.push('/detailpage')
      this.$store.commit("PullData",val)
      this.$nextTick(()=>{
        this.$bus.$emit("sendData",val)
      })
    }
  },
  mounted(){
    if(!JSON.parse(sessionStorage.getItem("recommend_data"))){
      const xhr = new XMLHttpRequest()
      xhr.open("GET","http://8.219.72.10:9000/pullgoods")
      const asyncPull = new Promise((resolve,reject)=>{
        xhr.send()
        xhr.onreadystatechange = function(){
          if(xhr.readyState===4){
            if(xhr.status>=200 && xhr.status<300){
              resolve(JSON.parse(xhr.response))
            }
          }
        }
      })
      asyncPull.then((val)=>{
        this.asyncData.push(...val)
        sessionStorage.setItem("recommend_data",JSON.stringify(this.asyncData))
        console.log(this.asyncData)
      })
    }else{
      this.asyncData.push(...JSON.parse(sessionStorage.getItem("recommend_data")))
    }
  }
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  .custom-indicator {
    width: 40%;
    position: absolute;
    right: 0;
    left: 0;
    margin: 0 auto;
    bottom: 5px;
    padding: 0 5px;
    font-size: 12px;
    display: flex;
    justify-content: space-evenly;
    .active{
      background-color: @red;
    }
    div{
      width: 23%;
      height: 2px;
      background-color: #ccc;
    }
  }
  main{
    padding: 16px 12px 6px;
    font-family: @base-font-family;
    font-size: @font-size-lg;
    .swipe-wrap{
      width: 100%;
      margin-bottom: 16px;
      .van-swipe-item{
        background-color: #fff;
        border-radius: 8px;
        .van-image{
          vertical-align: bottom;
        }
      }
    }
    .promise{
      width: 100%;
      height: 32px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div{
        i{
          color: @red;
          font-size: @font-size-md;
          margin-right: 5px;
        }
        span{
          color: #000;
          opacity: .7;
          font-size: @font-size-sm;
        }
      }
    }
    .category-wrap{
      margin-bottom: 16px;
      ul{
        width: 100%;
        border-radius: 8px;
        background-color: #fff;
        padding: 10px 0;
        box-sizing: border-box;
        .van-row{
          display: flex;
          justify-content: center;
          align-items: center;
          .van-col{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px 0;
            flex-shrink: 0;
            flex: 1 0 20%;
            i{
              font-size: 21px;
              margin-bottom: 5px;
              color: @red
            }
            span{
              font-size: 13px;
            }
          }
        }
      }
    }
    .ad{
      margin-bottom: 16px;
    }
    .newgoods{
      .van-row{
        width: 100%;
        .van-col{
          width: 48%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          .tip{
            width: 100%;
            text-align: center;
            padding: 12px 0;
            border-radius: 8px;
            margin-bottom: 16px;
            background-color: #fff;
            span{
              font-size: @font-size-lg;
            }
          }
          ul{
            margin-top: -16px;
            li{
              width: 100%;
              border-radius: 8px;
              margin: 16px 0;
              background-color: #fff;
            }
          }
        }
      }
    }
  }

</style>