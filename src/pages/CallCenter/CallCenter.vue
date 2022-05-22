<template>
  <main>
    <van-nav-bar title="客服" :fixed="true" class="van-hairline--bottom"/>
    <div class="QA">
      <div class="van-hairline--right van-hairline--bottom">
        <i class="iconfont icon-wenti"></i>
        <span>常见问题</span>
      </div>
      <div class="van-hairline--bottom">
        <i class="iconfont icon-ceshi"></i>
        <span>测试群招募</span>
      </div>
      <div class="van-hairline--right">
        <i class="iconfont icon-fankui"></i>
        <span>投诉反馈</span>
      </div>
      <div>
        <i class="iconfont icon-tongzhi"></i>
        <span>系统消息</span>
      </div>
    </div>
  </main>
</template>

<script>
import { NavBar,Grid, GridItem } from 'vant';
export default {
  name:"CallCenter",
  components:{
    [NavBar.name]:NavBar,
    [Grid.name]:Grid,
    [GridItem.name]:GridItem
  }
}
</script>

<style lang="less" scoped>
@import url("../../common/css/mixin.less");
main{
  height: 100vh;
  padding: 0 12px;
  position: relative;
  .QA{
    width: 100%;
    border-radius: 8px;
    margin-top: 60px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    background-color: #fff;
    div{
      flex: 0 0 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px 0;
      i{
        font-size: 24px;
        margin-bottom: 12px;
      }
    }
  }
}
</style>