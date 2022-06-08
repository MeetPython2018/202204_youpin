<template>
  <main>
    <van-nav-bar title="确认订单" :fixed="true" :placeholder="true">
      <template #left>
        <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      </template>
    </van-nav-bar>
    <section>
      <div class="empty-address">
        <i class="iconfont icon-dingxiang"></i>
        <p>你还没收货地址，点击添加</p>
        <i class="iconfont icon-jiaru" @click="$router.push('/person/address')"></i>
      </div>
      <div class="order-list">
        <div class="mini-card">
          <div class="imgbox">
            <van-image :src="detailpage['photo']"></van-image>
          </div>
          <p class="title van-multi-ellipsis--l3">
            <span v-for="item in detailpage['title']" :key="item['_id']">{{item}}</span>
          </p>
          <div class="price">
            <i class="iconfont icon-renminbi1"></i>
            <span>{{detailpage.price}}</span>
          </div>
        </div>
      </div>
      <div class="config">
        <div class="col van-hairline--bottom">
          <div class="name">
            <img src="../../assets/zhipay.svg" alt="" width="25">
            <span class="title">支付宝</span>
            <van-tag type="primary" plain>支持花呗<span class="number">64、128、512</span>期结算</van-tag>
          </div>
          <van-switch v-model="zhiPay" size="20px" active-color="#ee0a24" inactive-color="#dcdee0" />
        </div>
        <div class="col van-hairline--bottom">
          <div class="name">
            <img src="../../assets/wepay.svg" alt="" width="25">
            <span class="title">微信支付</span>
          </div>
          <van-switch v-model="wechatPay" size="20px" active-color="#ee0a24" inactive-color="#dcdee0" />
        </div>
        <div class="col van-hairline--bottom">
          <div class="name">
            <span class="title">退货无忧</span>
            <van-tag type="primary" plain>可享受<span class="number">1</span>次免费上门取件</van-tag>
          </div>
          <div class="other">
            <span class="number"><i class="iconfont icon-renminbi1"></i>0.99</span>
            <van-checkbox v-model="checkbox" checked-color="#ee0a24"></van-checkbox>
          </div>
        </div>
        <div class="col van-hairline--bottom">
          <div class="name">
            <span class="title">新人券</span>
            <van-tag type="primary" plain>已选推荐优惠券</van-tag>
          </div>
          <div class="other">
            <span class="number">-<i class="iconfont icon-renminbi1"></i>300</span>
          </div>
        </div>
        <div class="col van-hairline--bottom">
          <div class="name">
            <span>配送方式</span>
          </div>
          <div class="other">
            <van-popover
              v-model="showPopover"
              trigger="click"
              :actions="actions"
              @select="onSelect"
            >
              <template #reference>
                <span>{{Ems}}</span>
                <i class="iconfont icon-xiangyoujiantou"></i>
              </template>
            </van-popover>
            
          </div>
        </div>
        <div class="col van-hairline--bottom">
          <div class="name">
            <span>发货时间</span>
          </div>
          <div class="other">
            <span><span class="number">18</span>点前缴款当天可释出</span>
          </div>
        </div>
        <div class="col van-hairline--bottom">
            <van-field
              v-model="message"
              rows="2"
              autosize
              label="备注"
              type="textarea"
              maxlength="50"
              placeholder="填写备注(可选)"
              show-word-limit
            />
          
        </div>
      </div>
    </section>
    <div class="calc van-hairline--top">
      <div class="con">
        <div class="info">
          <p>实付款:<span class="number"><i class="iconfont icon-renminbi1"></i>{{detailpage.price}}</span></p>
          <p>共<span class="number">1</span>件商品</p>
        </div>
        <div class="submit">
          <van-button type="danger" @click="submit">提交订单</van-button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapState} from "vuex"
import {NavBar,Toast,Image as VanImage,Tag,Switch,Checkbox,Button,Notify,Popover,Field} from "vant"
export default {
  name:"Submit",
  components:{
    [NavBar.name]:NavBar,
    [Toast.name]:Toast,
    [VanImage.name]:VanImage,
    [Tag.name]:Tag,
    [Switch.name]:Switch,
    [Checkbox.name]:Checkbox,
    [Button.name]:Button,
    [Notify.name]:Notify,
    [Popover.name]:Popover,
    [Field.name]:Field

  },
  data() {
    return {
      checked:true,
      checkbox:true,
      zhiPay:true,
      wechatPay:false,
      showPopover: false,
      Ems:'DHL国际快递',
      actions: [{ text: 'DHL国际快递' }, { text: 'Fedex国际快递' }, { text: 'UPS国际快递' }],
      message:''
    }
  },
  watch:{
    zhiPay(value){
      this.wechatPay = !value
    },
    wechatPay(value){
      this.zhiPay = !value
    }
  },
  computed:{
    ...mapState(["detailpage"])
  },
  methods: {
    onClickLeft(){
      this.$router.back()
    },
    submit(){
      Notify({ type: 'success', message: '发现内鬼,出货失败!' });
    },
    onSelect(action) {
      this.Ems = action.text
    },
  }
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    height: 100vh;
    position: relative;
    .number{
      font-family: "macfont";
      letter-spacing: 1px;
    }
    .icon-fanhui{
      font-size: 18px;
    }
    section{
      padding: 14px 12px;
      color: #888;
      .empty-address{
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        i{
          font-size: 18px;
          font-weight: 600;
        }
        .icon-dingxiang{
          margin-right: 4px;
        }
        p{
          flex: 1;
          margin: 0;
        }
        .icon-jiaru{
          color: @red;
        }
      }
      .order-list{
        .mini-card{
          width: 100%;
          background-color: #fff;
          padding: 14px 10px;
          margin: 14px 0;
          box-sizing: border-box;
          display: flex;
          justify-content: space-around;
          align-items: center;
          position: relative;
          border-radius: 8px;
          .imgbox{
            width: 19%;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 14px;
            .van-image{
              width: 100%;
              height: 64px;
            }
          }
          p{
            margin: 0;
            font-size: 14px;
            opacity: .7;
            span{
              margin-right: 2px;
            }
          }
          .price{
            font-family: "macfont";
            position: absolute;
            bottom: 8px;
            right: 8px;
            color: @red;
            letter-spacing: 1px;
            font-weight: 600;
          }
        }
      }
      .config{
        background-color: #fff;
        border-radius: 8px;
        .col{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 10px;
          font-size: @font-size-md;
          .van-cell{
            padding: 0;
            display: flex;
          }
          .name,.other{
            display: flex;
            align-items: center;
            img{
              margin-right: 4px;
            }
            .title{
              margin-right: 4px;
            }
            .number{
              margin-right: 4px;
            }
          }
        }
      }
    }
    .calc{
      width: 100%;
      position: fixed;
      bottom: 0;
      background: #fff;
      .con{
        padding: 8px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .info{
          p{
            letter-spacing: .5px;
            margin: 2px 0;
            &:first-child{
              color: @red;
            }
            &:last-child{
              opacity: .7;
            }
          }
        }
        .submit{
          .van-button{
            border-radius: 8px;
          }
        }
      }
    }
  }
</style>