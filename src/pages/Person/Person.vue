<template>
  <main v-if="!$route.meta.hidenfooter">
    <van-nav-bar title="个人中心" :fixed="true" class="van-hairline--bottom"/>
    <section>
      <div class="userinfo">
      <van-image
        round
        width="60"
        height="60"
        src="http://8.219.72.10:9000/img/user.png"
      />
      <span @click="$router.push('/sign')">点击登录/注册</span>
      <!-- <span>闲杂人员_<span class="number">No.101</span></span> -->
      </div>
      <div class="serve">
        <van-cell-group inset>
          <van-cell title="维修订单" is-link to="/person/order"/>
          <van-cell title="购物车" is-link to="/person/shopcar?s_id=1"/>
          <van-cell title="优惠券" is-link to="/person/discount"/>
          <van-cell title="地址管理" is-link to="/person/address" />
          <van-cell title="客服电话: 18306824961 (05:00-23:00)" is-link />
          <van-cell title="招兵买马" is-link />
          <van-cell title="关注公众号和微博" is-link />
          <van-cell title="关注有品" is-link />
          <van-cell title="设置" is-link />
        </van-cell-group>
      </div>
    </section>
  </main>
  <router-view v-else></router-view>
</template>

<script>
import { NavBar,Image as VanImage,Cell, CellGroup  } from 'vant';
export default {
  name:"Person",
  components:{
    [NavBar.name]:NavBar,
    [VanImage.name]:VanImage,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
  }
}
</script>

<style lang="less" scoped>
@import url("../../common/css/mixin.less");
main{
  height: 100vh;
  .number{
    font-family: "macfont";
    letter-spacing: 1px;
  }
  section{
    padding: 0 12px;
    .userinfo{
      width: 100%;
      padding: 20px 0;
      background-color: #fff;
      margin-top: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-radius: 8px;
      margin-bottom: 16px;
      img{
        width: 60px;
        border-radius: 50%;
      }
      span{
        margin-top: 12px;
      }
    }
    .serve{
      padding: 20px 0;
      border-radius: 8px;
      background-color: #fff;
      .van-cell{
        padding: 10px 0;
      }
    }
  }
}
</style>