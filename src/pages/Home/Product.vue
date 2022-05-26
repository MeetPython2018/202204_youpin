<template>
  <main>
    <div class="nav-wrap">
      <van-row>
        <van-col span="5" v-for="(item,index) in category['items'].slice(0,7)" :key="index">
          <div class="iconbox">
            <van-image src="">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
           </div>
          <div class="title">
            <span>{{item}}</span>
          </div>
        </van-col>
        <van-col span="5">
          <div class="iconbox">
            <i class="iconfont icon-zhankai"></i>
           </div>
          <div class="title">
            <span>查看全部</span>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="good-wrap">
      <ul>
        <li v-for="(item,index) in recommends" :key="index" >
          <GoodsCard :asyncData="item" @click.native="onSend(item)">
            <span class="more">看相似</span>
          </GoodsCard>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import {mapState} from "vuex"
import {Row,Col,Image as VanImage,Loading,Tag} from "vant"
import GoodsCard from "../../components/PublicComponents/GoodsCard.vue"
export default {
  name:"Product",
  props:["category"],
  data() {
    return {
      
    }
  },
  components:{
    [Row.name]:Row,
    [Col.name]:Col,
    [VanImage.name]:VanImage,
    [Loading.name]:Loading,
    [Tag.name]:Tag,
    GoodsCard,
  },
  computed:{
    ...mapState(["recommends"])
  },
  methods:{
    onSend(val){
      this.$router.push('/detailpage')
      this.$store.commit("cacheDetail",val)
      this.$nextTick(()=>{
        this.$bus.$emit("sendData",val)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    padding: 0 12px;
    .nav-wrap{
      width: 100%;
      border-radius: 8px;
      margin-top: 16px;
      padding: 10px;
      box-sizing: border-box;
      margin-bottom: 16px;
      background-color: #fff;
      .van-row{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .van-col{
          flex: 1 0 22%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 12px;
          .iconbox{
            width: 80%;
            height: 50px;
            text-align: center;
            vertical-align: middle;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8px;
            i{
              font-size: 24px;
              color: #333;
              opacity: .7;
            }
          }
          .title{
            width: 80%;
            height: 32px;
            text-align: center;
            line-height: 1.2;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "macfont";
            span{
              color: #333;
              opacity: .7;
              font-size: @font-size-md;
            }
          }
        }
      }
    }
    .good-wrap{
      ul{
        display: flex;
        justify-content: space-between;
        margin-top: -16px;
        flex-wrap: wrap;
        li{
          flex: 0 0 48%;
          box-shadow: 0 0 8px rgba(0, 0, 0, 8%);
          border-radius: 8px;
          margin: 16px 0 0;
          a{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            font-size: @font-size-md;
            color: #000;
            .imgwrap{
              width: 80%;
              height: 140px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #f5f5f5;
              margin-bottom: 16px;
            }
            .title{
              margin-bottom: 8px;
              .van-tag{
                border-radius: 5px;
                margin-right: 5px;
              }
            }
            .price{
              width: 100%;
              display: flex;
              justify-content: space-between;
              span:first-child{
                color: @red;
                font-family: "macfont";
              }
              span:last-child{
                opacity: .7;
              }
            }
          }
        }
      }
    }
  }
</style>