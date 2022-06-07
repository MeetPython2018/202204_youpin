<template>
  <main>
    <div class="swipe-wrap">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
        <van-swipe-item v-for="(item,index) in bannerImageUrl" :key="index">
          <van-image :src="item" radius="8" width="100%">
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
            <van-col span="4" @click="$router.push('/category/filtercategory/5')">
              <i class="iconfont icon-chongdian"></i>
              <span class="font-size-sm">配件</span>
            </van-col>
            <van-col span="4" >
              <i class="iconfont icon-dianchi"></i>
              <span class="font-size-sm">换电池</span>
            </van-col>
            <van-col span="4">
              <i class="iconfont icon-xunhuan8" @click="$router.push('/sell')"></i>
              <span class="font-size-sm">回收</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/6')">
              <i class="iconfont icon-ziyuan"></i>
              <span class="font-size-sm">耳机</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/7')">
              <i class="iconfont icon-VR"></i>
              <span class="font-size-sm">穿戴</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/8')">
              <i class="iconfont icon-shoubiao"></i>
              <span class="font-size-sm">钟表</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/10')">
              <i class="iconfont icon-tibao" ></i>
              <span class="font-size-sm">奢侈品</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/9')">
              <i class="iconfont icon-huwai"></i>
              <span class="font-size-sm">运动户外</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/12')">
              <i class="iconfont icon-riyongbaihuo"></i>
              <span class="font-size-sm">生活百货</span>
            </van-col>
            <van-col span="4" @click="$router.push('/category/filtercategory/11')">
              <i class="iconfont icon-huazhuangpin"></i>
              <span class="font-size-sm">美妆</span>
            </van-col>
        </van-row>
      </ul>
    </div>
    <div class="ad">
      <van-image src="http://8.219.72.10:9000/siteimg/home/628b3ee7e4b04c32de5ee430.png" radius="8" width="100%" height="100%">
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
          <van-list>
            <a v-for="(item,index) in recommends.slice(0,recommends.length/2)" :key="index">
              <GoodsCard :asyncData="item" @click.native="onSend(item)">
                <span class="more">看相似</span>
              </GoodsCard>
            </a>
          </van-list>
        </van-col>
        <van-col span="11">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="init"
          >
            <a v-for="(item,index) in recommends.slice(recommends.length/2)" :key="index">
              <GoodsCard :asyncData="item" @click.native="onSend(item)">
                <span class="more">看相似</span>
              </GoodsCard>
            </a>
          </van-list>
        </van-col>
      </van-row>
    </div>
  </main>
</template>

<script>
import { Col, Row,Swipe, SwipeItem, Image as VanImage ,Loading,Tag,List} from 'vant';
import GoodsCard from "../../components/PublicComponents/GoodsCard.vue";
import { reqPagingGoods } from "@/api";
import { mapState } from 'vuex';
export default {
  name:"Recommend",
  components:{
    [Col.name]:Col,
    [Row.name]:Row,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem,
    [VanImage.name]:VanImage,
    [Loading.name]:Loading,
    [List.name]:List,
    [Tag.name]:Tag,
    GoodsCard
  },
  data() {
    return {
      current: 0,
      bannerImageUrl:[
        "http://8.219.72.10:9000/siteimg/home/628b66a5e4b04c32de5ee442.jpg",
        "http://8.219.72.10:9000/siteimg/home/628de78be4b04c32de5ee661.jpg",
        "http://8.219.72.10:9000/siteimg/home/6256916ae4b04c32de5ec712.jpg",
        "http://8.219.72.10:9000/siteimg/home/625f8150e4b04c32de5ecbdc.jpg",
      ],
      list: [],
      loading: false,
      finished: false,
      init:false,
      skipIndex:6,
    }
  },
  computed:{
    active(){
      return (this.current+1)%4
    },
    ...mapState(["recommends"])
  },
  methods:{
    onChange(index) {
      this.current = index;
    },
    onSend(val){
      this.$router.push('/detailpage')
      this.$store.commit("cacheDetail",val)
      this.$nextTick(()=>{
        this.$bus.$emit("sendData",val)
      })
    },
    onLoad(){
      reqPagingGoods(this.skipIndex).then((value)=>{
        if(value.length!==0){
          this.loading = false
          this.skipIndex += 6
          this.$store.commit("pushGoodsinfo",value)
        }else{
          this.loading = false
          this.finished = true
        }
      })
    }
  },
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
      padding-bottom: 48px;
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
          .van-list{
            a{
              display: inline-block;
              margin-bottom: 16px;
            }
          }
        }
      }
    }
  }

</style>