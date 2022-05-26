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
      <van-empty description="暂无收货地址" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" v-if="address.length===0">
        <van-button round type="danger" class="bottom-button" to="/person/address/addsite" @click="firstAdd">新增收货地址</van-button>
      </van-empty>
      <div v-else>
        <van-address-list
          v-model="chosenAddressId"
          :list="address"
          default-tag-text="默认"
          @edit="onEdit"
          @add="onAdd"
        />
      </div>
    </section>
  </main>
  <router-view></router-view>
  </div>
</template>

<script>
import ajax from "../../api/ajax"
import {mapState} from "vuex"
import {NavBar,Empty,Button,AddressEdit,AddressList,Toast} from "vant"
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
      hidden: true,
      title:"收货地址",
      chosenAddressId: 0,
      fatherHidden:true
    }
  },
  computed:{
    ...mapState(["address"])
  },
  methods: {
    firstAdd(){
      this.fatherHidden = false
    },
    demo(){
      this.fatherHidden = true
    },
    onEdit(){
      this.fatherHidden = false
      this.$router.push("/person/address/addsite")
    },
    onAdd(){
      this.fatherHidden = false
      this.$router.push("/person/address/addsite")
    }
  },
  async mounted() {
    this.$bus.$on("close",this.demo)
    // console.log(this.$store.state.userinfo)
    const result = await ajax("http://8.219.72.10:9000/findaddress?uid=" + this.$store.state.userinfo.data._id)
    this.$store.commit("findLocation",result["res"])
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