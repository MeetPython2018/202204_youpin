<template>
  <div>
    <main v-if="$route.meta.hidenfooter&&fatherHidden">
    <van-nav-bar :title="title">
      <template #left>
        <i class="iconfont icon-fanhui" @click="$router.back()"></i>
        <!-- <i class="iconfont icon-guanbi" @click="reset" v-if="fatherHidden"></i> -->
      </template>
    </van-nav-bar>
    <section>
      <van-empty description="暂无收货地址" image="http://8.219.72.10:9000/img/loca.svg" v-if="list.length===0">
        <van-button round type="danger" class="bottom-button" to="/person/address/addsite" @click="firstAdd">新增收货地址</van-button>
      </van-empty>
      <!-- <div class="add" v-if="show">
        <van-address-edit
          :area-list="areaList"
          show-postal
          show-delete
          show-set-default
          show-search-result
          :search-result="searchResult"
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          @delete="onDelete"
          @change-detail="onChangeDetail"
        />
      </div> -->
      <!-- <div>
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @edit="onEdit"
          @add="onAdd"
        />
      </div> -->
    </section>
  </main>
  <router-view></router-view>
  </div>
  
</template>

<script>
import {NavBar,Empty,Button,AddressEdit,AddressList,Toast} from "vant"
import { areaList } from '@vant/area-data'
export default {
  name:"Address",
  components:{
    [NavBar.name]:NavBar,
    [Empty.name]:Empty,
    [Button.name]:Button,
    [AddressEdit.name]:AddressEdit,
    [AddressList.name]:AddressList,
    [Toast.name]:Toast,
  },
  data() {
    return {
      areaList,
      searchResult: [],
      hidden: true,
      title:"收货地址",
      chosenAddressId: '1',
      show:false,
      ceshi:false,
      list: [],
      fatherHidden:true
    }
  },
  methods: {
    // onSave(content) {
    //   Toast('save');
    //   localStorage.setItem("address",JSON.stringify(content))
    //   let addobj = {name:content.name,tel:content.tel,address:content.addressDetail}
    //   this.list.push(addobj)
    // },
    // onDelete() {
    //   Toast('delete');
    // },
    // onChangeDetail(val) {
    //   if (val) {
    //     this.searchResult = [
    //       {
    //         name: '',
    //         address: '',
    //       },
    //     ];
    //   } else {
    //     this.searchResult = [];
    //   }
    // },
    // onAdd(){
    //   this.show = !this.show
    //   this.list.length = 1
    //   this.title = "新增地址"
    // },
    // reset(){
    //   this.show = !this.show
    //   this.list.length = 0
    //   this.title = "收货地址"
    // },
    // onEdit(item, index) {
    //   Toast('编辑地址:' + index);
    // },
    firstAdd(){
      this.fatherHidden = false
    },
    demo(val){
      console.log(val)
      this.fatherHidden = true
    }

  },
  mounted() {
    console.log(localStorage.getItem("address"))
    // this.list.push(JSON.parse(localStorage.getItem("address")))
    this.$bus.$on("close",this.demo)
  },
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    height: 100vh;
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