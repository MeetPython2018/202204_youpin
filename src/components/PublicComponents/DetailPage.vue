<template>
  <main>
    <van-nav-bar title="详情" :fixed="true">
      <template #left>
        <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      </template>
      <template #right>
        <i class="iconfont icon-fenxiang" @click="showShare=true"></i>
        <van-share-sheet
          v-model="showShare"
          title="立即分享给好友"
          :options="options"
          @select="onSelect"
        />
      </template>
    </van-nav-bar>
    <section>
      <div class="about">
        <div class="imgbox">
          <van-image
            width="100%"
            height="180"
            src=""
          />
        </div>
        <div class="info">
          <p>
            <van-tag round type="danger">自营</van-tag>
            <span v-for="(item,index) in goodsData.title" :key="index">{{item}}</span>
          </p>
          <div class="price">
            <i class="iconfont icon-renminbi1"></i>
            <span>{{goodsData.price}}</span>
          </div>
        </div>
      </div>
      <div class="site-serve">
        <div class="promise">
          <p><i class="iconfont icon-dunpai"></i><span>服务保障</span></p>
          <p>
          <span>全场包邮</span>·
          <span>一机一拍</span>·
          <span>专业检测</span>·
          <span>24h发货</span>
          </p>
        </div>
        <div class="serve">
          <van-tag round type="danger">活动</van-tag>
          <p>回收手机、钟表、奢侈品黄金,免费估价</p>
          <i class="iconfont icon-xiangyoujiantou"></i>
        </div>
      </div>
      <div class="goods-detail">
        <div class="title">
          <span>产品详情</span>
        </div>
        <div class="other">
          <p class="van-hairline--bottom"><span class="number">IMEI/SN:{{goodsData['IMEI/SN']}}</span></p>
          <p class="van-hairline--bottom"><span>质检报告:</span>{{goodsData.test}}</p>
          <p><span>包装清单:</span>{{goodsData.other}}</p>
        </div>
        <div class="photos">
          <van-image
            width="100%"
            height="230"
            src=""
            v-for="value in 6"
            :key="value"
          />
        </div>
      </div>
    </section>
    <van-goods-action class="van-hairline--top">
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="count" @click="$router.push('/person/shopcar?s_id=1')" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCar" :disabled="disabled" />
      <van-goods-action-button type="danger" text="立即购买" to="/submit" />
    </van-goods-action>
  </main>
</template>

<script>
import {NavBar,ShareSheet,Toast,Image as VanImage,Tag,GoodsAction, GoodsActionIcon, GoodsActionButton} from "vant"
export default {
  name:"DetailPage",
  components:{
    [NavBar.name]:NavBar,
    [ShareSheet.name]:ShareSheet,
    [Toast.name]:Toast,
    [VanImage.name]:VanImage,
    [Tag.name]:Tag,
    [GoodsAction.name]:GoodsAction,
    [GoodsActionIcon.name]:GoodsActionIcon,
    [GoodsActionButton.name]:GoodsActionButton,
  },
  data() {
    return {
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
      count: 0,
      disabled: false,
      goodsData: ''
    }
  },
  watch:{
    goodsData:{
      immediate:true,
      deep:true,
      handler(newVal){
        this.goodsData = newVal
      }
    }
  },
  methods:{
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    addCar(){
      this.count += 1
      this.disabled = true
    }
  },
  mounted(){
    // this.$bus.$off("sendData").$on("sendData",(data)=>{
    //   this.goodsData = data
    // })
    this.goodsData = this.$store.state.goodsdata
    console.log(this.$store.state.goodsdata)
  },
  // beforeDestroy(){
  //   this.$bus.$off("sendData")
  // }
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    .icon-fanhui,.icon-fenxiang{
      font-size: 18px;
    }
    .number{
      font-family: "macfont";
      letter-spacing: 1px;
    }
    section{
      padding: 60px 12px 0;
      font-size: 16px;
      .about{
        box-sizing: border-box;
        margin-bottom: 16px;
        background-color: #fff;
        border-radius: 8px;
        padding: 10px 8px;
        .imgbox{
          .van-image{
            vertical-align: bottom;
          }
        }
        .info{
          font-size: 15px;
          p{
            position: relative;
            .van-tag{
              position: relative;
              top: -1.5px;
            }
            span{
              margin-right: 3px;
            }
          }
          .price{
            font-family: "macfont";
            color: @red;
            span{
              letter-spacing: 1px;
              margin-left: 1px;
            }
          }
        }
      }
      .site-serve{
        padding: 0 0 12px;
        box-sizing: border-box;
        font-size: 13px;
        .promise{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          border-radius: 8px;
          padding: 10px 8px;
          background-color: #fff;
          margin-bottom: 16px;
          color: #888;
          i{
            color: @red;
            margin-right: 4px;
          }
          p{
            margin: 0;
          }
        }
        .serve{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 8px;
          box-sizing: border-box;
          border-radius: 8px;
          background-color: #fff;
          p{
            margin: 0;
            flex: 1;
            margin-left: 8px;
            color: #888;
          }
          i{
            opacity: .7;
          }
        }
      }
      .goods-detail{
        padding: 0 0 12px;
        .title{
          position: relative;
          padding: 10px 0;
          color: rgba(0, 0, 0, 89%);
          &::before{
            content: "";
            width: 2px;
            height: 50%;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto 0;
            background-color: rgba(0, 0, 0, 89%);
          }
          span{
            padding: 0 8px;
            margin: 0;
          }
        }
        .other{
          padding: 0 8px;
          box-sizing: border-box;
          border-radius: 8px;
          background-color: #fff;
          font-size: 14px;
          p{
            margin: 0;
            color:rgba(0, 0, 0, 64%);
            padding: 8px 0;
            span{
              display: inline-block;
              color: rgba(0, 0, 0, 89%);
              opacity: 1;
              margin-right: 4px;
            }
          } 
        }
        .photos{
          padding: 10px 0 0;
          .van-image{
            margin-bottom: 10px;
          }
        }
      }
    }
  }
</style>