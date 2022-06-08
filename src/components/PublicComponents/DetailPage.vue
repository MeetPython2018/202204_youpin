<template>
  <main>
    <van-nav-bar title="详情" :fixed="false" :placeholder="true">
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
            height="100%"
            :src="detailpage.photo[0]"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div class="info">
          <p>
            <van-tag round type="danger">自营</van-tag>
            <span v-for="(item,index) in detailpage.title" :key="index">{{item}}</span>
          </p>
          <div class="price">
            <i class="iconfont icon-renminbi1"></i>
            <span>{{detailpage.price}}</span>
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
          <i class="iconfont icon-xiangyoujiantou" @click="$router.replace('/sell')"></i>
        </div>
      </div>
      <div class="goods-detail">
        <div class="title">
          <span>产品详情</span>
        </div>
        <div class="other">
          <p class="van-hairline--bottom"><span class="number">IMEI/SN:{{detailpage['IMEI/SN']}}</span></p>
          <p class="van-hairline--bottom"><span>质检报告:</span>{{detailpage.test}}</p>
          <p><span>包装清单:</span>{{detailpage.other}}</p>
        </div>
        <div class="photos">
          <van-image
            width="100%"
            height="230"
            src=""
            v-for="value in 4"
            :key="value"
          />
        </div>
      </div>
    </section>
    <van-goods-action class="van-hairline--top">
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="logined ? totalNum:0" @click="$router.push('/person/shopcar')" />
      <van-goods-action-button type="warning" :text="this.disabled ? '已加入购物车':'加入购物车'" @click="addCar" :disabled="disabled" />
      <van-goods-action-button type="danger" text="立即购买" @click="buyNow(detailpage['_id'])"/>
    </van-goods-action>
  </main>
</template>

<script>
import {mapState,mapActions,mapGetters} from "vuex"
import {NavBar,ShareSheet,Toast,Image as VanImage,Loading,Tag,GoodsAction, GoodsActionIcon, GoodsActionButton} from "vant"
export default {
  name:"DetailPage",
  components:{
    [NavBar.name]:NavBar,
    [ShareSheet.name]:ShareSheet,
    [Toast.name]:Toast,
    [VanImage.name]:VanImage,
    [Loading.name]:Loading,
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
      disabled: false,
      totalNum:0
    }
  },
  watch:{
    goodsData:{
      immediate:true,
      deep:true,
      handler(newVal){
        this.goodsData = newVal
      }
    },
    shopcar:{
      deep:true,
      handler(newVal){
        this.totalNum = newVal.data.length
        newVal.data.forEach((ele)=>{
          if(ele["_id"]===this.detailpage["_id"]){
            this.disabled = true
          }
        })
      }
    }
  },
  computed:{
    ...mapGetters(['logined']),
    ...mapState(["detailpage","shopcar"])
  },
  methods:{
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    addCar(){
      if(this.$store.state.userinfo.code!==0){
        this.disabled = true
        let demoData = this.detailpage
        demoData['uid'] = this.$store.state.userinfo.data._id
        this.$store.dispatch("addtoShoping",demoData)
      }else{
        Toast.fail("登录后操作")
      }
    },
    buyNow(val){
      if(this.$store.state.userinfo){
        this.$router.push(`/submit?_id=${val}`)
      }else{
        Toast.fail("登录后操作")
      }
    },
    ...mapActions(['getShopping'])
  },
  created(){
    if(this.logined){
      this.getShopping(this.$store.state.userinfo.data._id)
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
    .icon-fanhui,.icon-fenxiang{
      font-size: 18px;
    }
    .number{
      font-family: "macfont";
      letter-spacing: 1px;
    }
    section{
      padding: 14px 12px 0;
      font-size: @font-size-md;
      font-family: "苹方";
      height: 100%;
      overflow: auto;
      .about{
        box-sizing: border-box;
        margin-bottom: 14px;
        background-color: #fff;
        border-radius: 8px;
        padding: 8px;
        .imgbox{
          width: 100%;
          height: 164px;
          display: flex;
          justify-content: center;
          align-items: center;
          .van-image{
            vertical-align: bottom;
          }
        }
        .info{
          font-size: 14px;
          p{
            position: relative;
            margin: 8px 0;
            .van-tag{
              position: relative;
              top: -1.5px;
            }
            span{
              margin-right: 4px;
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
        padding: 0 0 14px;
        box-sizing: border-box;
        font-size: @font-size-sm;
        .promise{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          border-radius: 8px;
          background-color: #fff;
          margin-bottom: 7px;
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
          padding: 8px;
          box-sizing: border-box;
          border-radius: 8px;
          background-color: #fff;
          font-size: @font-size-sm;
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
        padding: 0 0 14px;
        .title{
          position: relative;
          padding-bottom: 14px;
          color: rgba(0, 0, 0, 89%);
          span{
            padding-left: 8px;
            margin: 0;
            position: relative;
            &::before{
              content: "";
              width: 2px;
              height: 89%;
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              margin: auto 0;
              background-color: rgba(0, 0, 0, 89%);
            }
          }
        }
        .other{
          padding: 0 8px;
          box-sizing: border-box;
          border-radius: 8px;
          background-color: #fff;
          font-size: @font-size-sm;
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
          .van-image{
            margin-top: 14px;
            vertical-align: bottom;
          }
        }
      }
    }
    .van-goods-action{
      position: relative;
      padding: 8px 0;
    }
  }
</style>