<template>
  <main>
    <van-nav-bar title="优惠券">
      <template #left>
        <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      </template>
    </van-nav-bar>
    <div v-if="!userinfo.code">
      <van-empty description="登录后查看优惠券情况！">
        <van-button round type="danger" class="bottom-button" to="/sign">转去登录</van-button>
      </van-empty>
    </div>
    <section v-else>
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
import {mapState} from "vuex"
import dayjs from "dayjs"
import {NavBar,Empty,Tab,Tabs,Button,Checkbox,CheckboxGroup} from "vant"
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
  },
  data() {
    return {
      active:0,
      t1:dayjs(Date.now()).format('YY-MM-DD HH:mm'),
      t2:dayjs(Date.now()+604800000).format('YY-MM-DD HH:mm')
    }
  },
  computed:{
    ...mapState(["userinfo"])
  }
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
        height: 100px;
        background-color: #fff;
        border-radius: 8px;
        margin: 16px auto;
        display: flex;
        border: 1px solid rgba(255, 0, 0, 36%);
        position: relative;
        overflow: hidden;
        >div:first-child{
          flex: 0 0 18%;
          font-size: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: @red;
          font-family: "macfont";
          position: relative;
          padding: 0 8px;
          i{
            font-size: 26px;
          }
          &::after{
            content: "";
            width: 0;
            height: 99%;
            border: 1px dashed rgba(255, 0, 0, 64%);
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
          p:first-child{
            font-family: "苹方";
          }
          .time{
            font-size: 13px;
            color: #888;
            margin-top: 8px;
          }
        }
        .tag{
          position: absolute;
          right: -17px;
          bottom: -19px;
          width: 74px;
          height: 74px;
          border-radius: 50%;
          border: 2px solid rgba(255, 0, 0, 89%);
          text-align: center;
          line-height: 74px;
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
            border: 1px dashed rgba(255, 0, 0, 89%);
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>