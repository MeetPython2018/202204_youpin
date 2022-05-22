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
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
      </div>
    </div>
    <div class="con">
      <div class="wrap">
        <template>
          <a v-for="(item) in 11" :key="item">
            <GoodsCard :asyncData="asyncData"></GoodsCard>
          </a>
        </template>
        <template >
        </template>
      </div>
    </div>
  </main>
</template>

<script>
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
      value2: 'a',
      option1: [
        { text: '全部宝贝', value: 0 },
        { text: '苹果', value: '1' },
        { text: '安卓', value: '2' },
        { text: '平板', value: "3" },
        { text: '电脑', value: '4' },
        { text: '数码家电', value: '5' },
        { text: '配件', value: '6' },
        { text: '耳机', value: '7' },
        { text: '穿戴', value: '8' },
        { text: '钟表', value: '9' },
        { text: '运动户外', value: '10' },
        { text: '奢侈品', value: '11' },
        { text: '美妆', value: '12' },
        { text: '生活百货', value: '13'},
      ],
      option2: [
        { text: '全部宝贝', value: 'a' },
        { text: '壳膜', value: 'b' },
        { text: '苹果', value: 'c' },
      ],
    }
  },
  computed:{
    asyncData(){
      return {
        imgurl:'',
        rate:"99新",
        info:["iPhone","14","Pro Max","深空灰","256G","官方质保期内"]
      }
    }
  },
  mounted() {
    this.value1 = this.$route.params.type
    document.getElementsByClassName("van-dropdown-menu__bar")[0].style.boxShadow="none"
  },
  methods:{
    onSearch(){
      Toast({
        message: '已经在查了啦！',
        icon: 'like-o',
        position:"top"
      });
    }
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