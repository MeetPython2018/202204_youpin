<template>
  <main>
    <van-nav-bar title="新建收货地址">
      <template #left>
        <i class="iconfont icon-fanhui" @click="back"></i>
      </template>
    </van-nav-bar>
    <section>
      <van-address-edit
        :area-list="areaList"
        show-set-default
        show-search-result
        :search-result="searchResult"
        tel-maxlength=11
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @change-detail="onChangeDetail"
      />
    </section>
  </main>
</template>

<script>
import {NavBar,AddressEdit,Toast,Button} from "vant"
import { areaList } from '@vant/area-data'
import { addAddress } from "../../api/index"
export default {
  name:"AddSite",
  components:{
    [NavBar.name]:NavBar,
    [AddressEdit.name]:AddressEdit,
    [Toast.name]:Toast,
    [Button.name]:Button
  },
  data() {
    return {
      areaList,
      searchResult: []
    }
  },
  methods: {
    async onSave(content) {
      content['uid'] = this.$store.state.userinfo.data._id
      const state = await addAddress(content)
      if(state.code===1){
        Toast.success(state.msg)
        this.$store.state.updateIP = true
        this.$bus.$emit("close",true)
        this.$router.back()
      }
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    back(){
      this.$bus.$emit("close",true)
      this.$router.back()
    },
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
    }
  }
</style>