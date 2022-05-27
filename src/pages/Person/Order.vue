<template>
  <main>
    <van-nav-bar title="维修订单">
      <template #left>
        <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      </template>
    </van-nav-bar>
    <div class="unsign" v-if="!userinfo.code">
      <van-empty description="登录后查看订单情况！">
        <van-button round type="danger" class="bottom-button" to="/sign">转去登录</van-button>
      </van-empty>
    </div>
    <div class="signed" v-else>
      <section>
        <van-tabs v-model="active" sticky swipe-threshold='6'>
          <van-tab title="全部">
            <van-empty description="为天地立心">
              <van-button round type="danger" class="bottom-button" to="/home">去主页逛逛</van-button>
            </van-empty>
          </van-tab>
          <van-tab title="待发货">
            <van-empty description="为生民立命">
              <van-button round type="danger" class="bottom-button" to="/home">去主页逛逛</van-button>
            </van-empty>
          </van-tab>
          <van-tab title="待签收">
            <van-empty description="为往胜继绝学">
              <van-button round type="danger" class="bottom-button" to="/home">去主页逛逛</van-button>
            </van-empty>
          </van-tab>
          <van-tab title="待维修">
            <van-empty description="为万世开太平">
              <van-button round type="danger" class="bottom-button" to="/home">去主页逛逛</van-button>
            </van-empty>
          </van-tab>
          <van-tab title="已寄回">
            <van-empty description="令和4年">
              <van-button round type="danger" class="bottom-button" to="/home">去主页逛逛</van-button>
            </van-empty>
          </van-tab>
          <van-tab title="待评价">
            <van-empty description="记于京都建安寺">
              <van-button round type="danger" class="bottom-button" to="/home">去主页逛逛</van-button>
            </van-empty>
          </van-tab>
        </van-tabs>
      </section>
    </div>
  </main>
</template>

<script>
import {mapState} from "vuex"
import {NavBar,Empty,Tab,Tabs,Button,SubmitBar,Checkbox,CheckboxGroup,Toast,Image as VanImage,Tag} from "vant"
export default {
  name:"Order",
  components:{
    [NavBar.name]:NavBar,
    [Empty.name]:Empty,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
    [Button.name]:Button,
    [SubmitBar.name]:SubmitBar,
    [Checkbox.name]:Checkbox,
    [CheckboxGroup.name]:CheckboxGroup,
    [Toast.name]:Toast,
    [VanImage.name]:VanImage,
    [Tag.name]:Tag
  },
  data() {
    return {
      active:0
    }
  },
  computed:{
    ...mapState(["userinfo"])
  }

}
</script>

<style lang="less" scoped>
  main{
    .van-nav-bar{
      position: sticky;
    }
    .icon-fanhui{
      font-size: 18px;
    }
  }
</style>