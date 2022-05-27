<template>
  <main>
    <van-nav-bar title="编辑收货地址">
      <template #left>
        <i class="iconfont icon-fanhui" @click="back"></i>
      </template>
      <template #right>
        <span style="color:gray" @click="onDelete">删除</span>
      </template>
    </van-nav-bar>
    <section>
      <van-address-edit
        :area-list="areaList"
        show-set-default
        show-search-result
        :address-info="demo[0]"
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
import {mapState} from "vuex"
import {NavBar,AddressEdit,Toast,Button} from "vant"
import { areaList } from '@vant/area-data'
import axios from "axios"
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
      demo:''
    }
  },
  computed:{
    ...mapState(["address"])
  },
  methods: {
    onSave(content) {
      content['uid'] = this.$store.state.userinfo.data._id
      axios({
        url:"/api/editaddress",
        method:"POST",
        data:content,
        withCredentials:true
      }).then(val=>{
        Toast.success(val.data.msg)
        this.$store.commit("updateIp",true)
        this.$bus.$emit("close",true)
        this.$router.back()
      })
    },
    onDelete() {
      axios({
        url:"/api/deleteaddress",
        method:"GET",
        params:{_id:this.$route.query._id},
        withDirectives: true
      }).then(val=>{
        Toast.success(val.data.msg)
        this.$store.state.updateIP = true
        this.$bus.$emit("close",true)
        this.$router.back()
      })
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
    }
  },
  mounted(){
    this.demo = this.$store.state.address.filter((e)=>{
      if(e._id===this.$route.query._id){
        return true
      }
    })
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
  }
</style>