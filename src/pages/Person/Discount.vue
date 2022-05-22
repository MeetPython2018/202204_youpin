<template>
  <main>
    <van-nav-bar title="优惠券">
      <template #left>
        <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      </template>
    </van-nav-bar>
    <section>
      <van-tabs v-model="active" sticky swipe-threshold='6'>
        <van-tab title="未使用">
            <div class="card">
              <div>
                <span><i class="iconfont icon-renminbi1"></i>50</span>
              </div>
              <div class="info">
                <p>APP新用户50元代金券（满500可用）</p>
                <p class="time">
                  <span class="number">{{t1}}</span>至<span class="number">{{t2}}</span>
                </p>
              </div>
              <div class="tag">未使用</div>
            </div>
            <div class="card">
              <div>
                <span><i class="iconfont icon-renminbi1"></i>5</span>
              </div>
              <div class="info">
                <p>APP新用户5元代金券（满100可用）</p>
                <p class="time">
                  <span class="number">{{t1}}</span>至<span class="number">{{t2}}</span>
                </p>
              </div>
              <div class="tag">未使用</div>
            </div>
        </van-tab>
        <van-tab title="已使用">
          <van-empty description="为生民立命">
            <van-button round type="danger" class="bottom-button" to="/home">去主页逛逛</van-button>
          </van-empty>
        </van-tab>
        <van-tab title="已过期">
          <van-empty description="为往胜继绝学">
            <van-button round type="danger" class="bottom-button" to="/home">去主页逛逛</van-button>
          </van-empty>
        </van-tab>
        <van-tab title="领券中心">
          <van-empty description="为万世开太平">
            <van-button round type="danger" class="bottom-button" to="/home">去主页逛逛</van-button>
          </van-empty>
        </van-tab>
      </van-tabs>
    </section>
  </main>
</template>

<script>
// import { format } from 'timeago.js';
import { format, render, cancel, register } from 'timeago.js';
import dayjs from "dayjs"
import {NavBar,Empty,CouponList,Tab,Tabs,Button,SubmitBar,Checkbox,CheckboxGroup,Toast,Image as VanImage,Tag} from "vant"
export default {
  name:"Discount",
  components:{
    [NavBar.name]:NavBar,
    [Empty.name]:Empty,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
    [Button.name]:Button,
    [Checkbox.name]:Checkbox,
    [CheckboxGroup.name]:CheckboxGroup,
    [Toast.name]:Toast,
    [VanImage.name]:VanImage,
    format
  },
  data() {
    return {
      active:0,
      t1:dayjs(Date.now()).format('YYYY-MM-DD HH:mm'),
      t2:dayjs(Date.now()+604800000).format('YYYY-MM-DD HH:mm')
    }
  },
  methods: {

  },
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    .van-nav-bar{
      position: sticky;
    }
    .icon-fanhui{
      font-size: 18px;
    }
    section{
      .van-tab__pane{
        padding: 0 12px;
      }
      .card{
        width: 100%;
        height: 120px;
        background-color: #fff;
        border-radius: 8px;
        margin: 16px auto;
        display: flex;
        border: 2px solid @red;
        position: relative;
        overflow: hidden;
        >div:first-child{
          flex: 0 0 24%;
          font-size: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: @red;
          font-family: "macfont";
          position: relative;
          i{
            font-size: 28px;
          }
          &::after{
            content: "";
            width: 0;
            height: 99%;
            border: 1px dashed @red;
            position: absolute;
            right: 0;
          }
        }
        .info{
          flex: 1;
          font-size: 15px;
          padding: 0 24px 0 12px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          p{
            margin: 0;
          }
          .time{
            font-size: 13px;
            color: #888;
            margin-top: 8px;
          }
        }
        .tag{
          position: absolute;
          right: -18px;
          bottom: -20px;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          border: 2px solid red;
          text-align: center;
          line-height: 76px;
          transform: rotate(-30deg);
          color: @red;
          &::before{
            content: "";
            width: 89%;
            height: 89%;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            border: 1px dashed @red;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>