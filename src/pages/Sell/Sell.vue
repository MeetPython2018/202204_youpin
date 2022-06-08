<template>
  <main>
    <div class="title">
      <van-nav-bar title="回收" :fixed="false"/>
    </div>
    <div class="con">
<div class="swipe-wrap">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
        <van-swipe-item v-for="value in 2" :key="value">
          <van-image src="" radius="8" width="100%" height="150">
          </van-image>
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            <div :class="{active:1===active}"></div>
            <div :class="{active:0===active}"></div>
          </div>
        </template>
      </van-swipe>
    </div>
    <div class="promise">
      <div>
        <i class="iconfont icon-wancheng1"></i>
        <span>免邮取件</span>
      </div>
      <div>
        <i class="iconfont icon-wancheng1"></i>
        <span>实价回收</span>
      </div>
      <div>
        <i class="iconfont icon-wancheng1"></i>
        <span>数据清除</span>
      </div>
      <div>
        <i class="iconfont icon-wancheng1"></i>
        <span>当天打款</span>
      </div>
    </div>
    <div class="business">
      <ul class="van-hairline--bottom">
        <li v-for="value in 5" :key="value">
          <van-image
            width="89%"
            height="54"
            src=""
          />
        </li>
      </ul>
      <ul>
        <li><span>手机</span></li>
        <li><span>数码</span></li>
        <li><span>钟表</span></li>
        <li><span>奢侈品</span></li>
        <li><span>黄金</span></li>
      </ul>
    </div>
    <div class="partner">
      <van-button type="primary" size="small">免费估价</van-button>
      <van-button type="danger" size="small">一键回收</van-button>
    </div>
    <div class="explain">
      <div class="flow">
        <div class="title">
          <span>回收流程</span>
        </div>
        <div class="wrap">
          <div>
            <i class="iconfont icon-shouji1"></i>
            <span>选择型号</span>
          </div>
          <div>
            <i class="iconfont icon-shouye"></i>
            <span>估价下单</span>
          </div>
          <div>
            <i class="iconfont icon-yifahuo"></i>
            <span>快递发货</span>
          </div>
          <div>
            <i class="iconfont icon-qian"></i>
            <span>检测打款</span>
          </div>
        </div>
      </div>
      <div class="flow">
        <div class="title">
          <span>回收规则</span>
        </div>
        <ul>
          <van-notice-bar
            wrapable
            :scrollable="false"
            text="我们会在收到货的当天晚上9点前完成检测并打款 回收客服电话1803817531；18038176752；18038172287；1804858715（钟表，奢侈品）"
          />
          <van-notice-bar
            wrapable
            :scrollable="false"
            text="请如实描述物品的实际情况，描述不符最终价格可能会减少，有品承诺报价的真实性，不会恶意折价，无论在哪个环节您都可以选择取消回收并退回您的回收物品"
          />
          <van-notice-bar
            wrapable
            :scrollable="false"
            text="请删除个人资料和账户密码，个人资料请自行备份好，收到货后我们可能会还原设备，有品不负责保留用户资料"
          />
          <van-notice-bar
            wrapable
            :scrollable="false"
            text="我们检测手机时，可能需要拆机，但不会更改和维修任何部件"
          />
          <van-notice-bar
            wrapable
            :scrollable="false"
            text="订单提交后需要在24小时之内将物品寄出，超出时间范围请重新估价下单"
          />
        </ul>
      </div>
      <div class="flow">
        <div class="title">
          <span>用户评价</span>
        </div>
      </div>
    </div>
    </div>
    
  </main>
</template>

<script>
import { NavBar,Swipe, SwipeItem, Image as VanImage,Button,NoticeBar  } from "vant"
export default {
  name:"Sell",
  data() {
    return {
      current: 0,
    }
  },
  components:{
    [NavBar.name]:NavBar,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem,
    [VanImage.name]:VanImage,
    [Button.name]:Button,
    [NoticeBar.name]:NoticeBar ,
  },
  computed:{
    active(){
      return (this.current+1)%2
    }
  },
  methods:{
    onChange(index) {
      this.current = index;
    },
  }
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    height: 100vh;
    display: flex;
    flex-direction: column;
    .con{
      height: 100%;
      overflow-y: auto;
      padding: 14px 12px;
      .swipe-wrap{
        width: 100%;
        .van-swipe-item{
          background-color: #fff;
          border-radius: 8px;
          .van-image{
            vertical-align: bottom;
          }
        }
        .custom-indicator {
          width: 20%;
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
            width: 45%;
            height: 2px;
            background-color: #ccc;
          }
        }
      }
      .promise{
        width: 100%;
        padding: 14px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div{
          i{
            color: @success;
            font-size: @font-size-md;
            margin-right: 5px;
          }
          span{
            color: #000;
            opacity: .7;
            font-size: @font-size-md;
          }
        }
      }
      .business{
        margin-bottom: 14px;
        background-color: #fff;
        border-radius: 8px;
        ul:first-child{
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          li{
            text-align: center;
            flex: 0 0 16%;
          }
        }
        ul:last-child{
          display: flex;
          justify-content: space-between;
          padding: 8px;
          box-sizing: border-box;
          li{
            text-align: center;
            flex: 0 0 16%;
            span{
              font-size: @font-size-md;
            }
          }
        }
      }
      .partner{ 
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 14px;
      }
      .explain{
        .flow{
          margin-bottom: 14px;
        }
        ul{
          .van-notice-bar{
            border-radius: 8px;
            margin-bottom: 14px;
          }
        }
        .title{
          position: relative;
          margin-bottom: 8px;
          .van-notice-bar--wrapable{
            padding: 10px 5px;
          }
          span{
            margin-left: 8px;
            font-size: @font-size-lg;
          }
          line-height: 20px;
          &::before{
            content: "";
            width: 2px;
            height: 100%;
            position: absolute;
            background: #333;
          }
        }
        .wrap{
          padding: 10px 0;
          border-radius: 8px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: #fff;
          div{
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            &:nth-child(1)::after, &:nth-child(2)::after,&:nth-child(3)::after{
              width: 90%;
              content: "";
              position: absolute;
              right: -90%;
              top: 15px;
              border-top: 1px dashed @success;
            }
            &:nth-child(3)::after{
              right: -100%;
            }
          }
          i{
            font-size: 26px;
            margin-bottom: 8px;
            color: @success;
          }
          span{
            font-size: @font-size-sm;
          }
        }
      }
    }
  }
</style>