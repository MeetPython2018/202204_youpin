<template>
  <main>
    <van-nav-bar :placeholder="true">
      <template #left>
        <van-search
          v-model="value"
          show-action
          placeholder="输入您需要搜索的产品"
          @search="onSearch"
        >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      </template>
    </van-nav-bar>
    <section>
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item v-for="item in categorys" :key="item._id" :title="item.name" />
      </van-sidebar>
      <div class="checkData">
        <ul>
          <li v-for="item in categorys[activeKey]['items']" :key="item">
            <div class="imgbox">
              <van-image src=""></van-image>
            </div>
            <div class="title">
              <span>{{item}}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <router-view></router-view>
  </main>
</template>

<script>
import {mapState} from "vuex"
import {NavBar,Search,Sidebar,SidebarItem,Image as VanImage} from "vant"

export default {
  name:"CategoryAll",
  components:{
    [NavBar.name]:NavBar,
    [Search.name]:Search,
    [Sidebar.name]:Sidebar,
    [SidebarItem.name]:SidebarItem,
    [VanImage.name]:VanImage,
  },
  data() {
    return {
      value:'',
      active: 0,
      activeKey:0,
    }
  },
  computed:{
    ...mapState(["categorys"])
  },
  methods:{
    onChange() {
    },
    onSearch(){

    }
  },
  mounted() {
    document.getElementsByClassName("van-nav-bar__left")[0].style.width="100%"
    document.getElementsByClassName("van-nav-bar__left")[0].style.position="relative"
  },
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    height: 100%;
    overflow: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .van-nav-bar{
      .van-search{
        padding: 0;
        flex: 1;
      }
    }
    .van-nav-bar .van-icon{
      color: #888;
    }
    section{
      height: 100%;
      overflow-y: auto;
      display: flex;
      box-sizing: border-box;
      flex-grow: 1;
      padding: 10px 12px;
      background-color: #f2f2f2;
      &::-webkit-scrollbar{
        display: none;
      }
      .van-sidebar{
        &::-webkit-scrollbar{
          display: none;
        }
      }
      .checkData{
        font-size: 12px;
        text-align: center;
        &::-webkit-scrollbar{
          display: none;
        }
        flex: 1;
        ul{
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          li{
            flex: 0 0 calc(100% / 3);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px 0;
            .imgbox{
              width: 50%;
              height: 46px;
              text-align: center;
              margin-bottom: 6px;
              background: #f5f5f5;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .title{
              color: #888;
            }
          }
        }
      }
    }
  }
</style>