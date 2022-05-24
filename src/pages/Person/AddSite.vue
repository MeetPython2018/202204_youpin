<template>
  <main>
    <van-nav-bar title="添加地址">
      <template #left>
        <i class="iconfont icon-fanhui" @click="back"></i>
      </template>
    </van-nav-bar>
    <section>
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        tel-maxlength=11
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </section>
  </main>
</template>

<script>
import {NavBar,AddressEdit,Toast,Button} from "vant"
import { areaList } from '@vant/area-data'
import ajax from "../../api/ajax"
export default {
  name:"AddSite",
  components:{
    [NavBar.name]:NavBar,
    [AddressEdit.name]:AddressEdit,
    [Toast.name]:Toast,
    [Button.name]:Button,
  },
  data() {
    return {
      areaList,
      searchResult: [],
    }
  },
  methods: {
    onSave(content) {
      Toast('save');
      let demo= content
      demo['address'] = content['addressDetail']
      demo['uid'] = this.$store.state.login.res._id
      this.$store.commit("addLocation",demo)
      this.$store.state.login.res._id
      ajax("/api/addlocation",demo,"POST")
      this.$bus.$emit("close",true)
      this.$router.back()
    },
    onDelete() {
      Toast('delete');
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