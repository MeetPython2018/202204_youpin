<template>
  <main>
    <div class="nav-search">
      <div class="searchbox">
        <div class="back" @click="$router.back()">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          input-align="left"
          @search="onSearch"
        />
      </div>
      <div class="filterbox">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" @change="onChange"/>
          <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
      </div>
    </div>
    <div class="con">
      <div class="wrap">
        <template>
          <a v-for="(item,index) in recommends" :key="index">
            <GoodsCard :asyncData="item"></GoodsCard>
          </a>
        </template>
        <template >
        </template>
      </div>
    </div>
  </main>
</template>

<script>
import {mapState} from "vuex"
import { Search,Toast,DropdownMenu,DropdownItem  } from 'vant';
import GoodsCard from "../PublicComponents/GoodsCard.vue"
export default {
  name:"FilterCategory",
  components:{
    [Search.name]:Search,
    [Toast.name]:Toast,
    [DropdownMenu.name]:DropdownMenu,
    [DropdownItem.name]:DropdownItem,
    GoodsCard
  },
  data() {
    return {
      value:'',
      value1: 0,
      value2: 0,
      option2: []
    }
  },
  computed:{
    ...mapState(["categorys","recommends"]),
    option1(){
      const {categorys} = this
      let op = []
      categorys.forEach((element,index) => {
        let obj = {}
        obj['text'] = element.name
        obj['value'] = index
        op.push(obj)
      });
      return op
    }
  },
  methods:{
    onSearch(){
      Toast({
        message: '已经在查了啦！',
        icon: 'like-o',
        position:"top"
      });
    },
    onChange(value){
      this.value2 = 0
      this.option2.splice(0)
      this.categorys[value]['items'].forEach((ele,index)=>{
        let obj = {}
        obj['text'] = ele
        obj['value'] = index
        this.option2.push(obj)
      })
    }
  },
  mounted() {
    this.value1 = this.$route.params.type*1
    this.categorys[this.value1]['items'].forEach((ele,index)=>{
        let obj = {}
        obj['text'] = ele
        obj['value'] = index
        this.option2.push(obj)
    })
    document.getElementsByClassName("van-dropdown-menu__bar")[0].style.boxShadow="none"
  },
  
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    position: relative;
    .van-dropdown-menu{
      box-shadow: none;
    }
    .nav-search{
      width: 100%;
      padding: 0 12px;
      box-sizing: border-box;
      position: fixed;
      z-index: 99;
      top: 0;
      background-color: #fff;
      .searchbox{
        display: flex;
        align-items: center;
      }
      .van-search{
        flex: 1;
      }
    }
    .con{
      padding: 100px 12px;
    }
    .wrap{
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      flex-wrap: wrap;
      a{
        width: 48%;
        display: inline-block;
        margin-bottom: 16px;
      }
    }
  }
</style>