<template>
  <main>
    <van-nav-bar :fixed="true">
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
        <van-sidebar-item v-for="item in items" :key="item.text" :title="item.text" />
      </van-sidebar>
      <div class="checkData">
        <ul>
          <li v-for="item in asyncData" :key="item._id">
            <div class="imgbox">
              <van-image src=""></van-image>
            </div>
            <div class="title">
              <span>{{item.name}}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <router-view></router-view>
  </main>
</template>

<script>
import {NavBar,Search,Sidebar,SidebarItem,Image as VanImage} from "vant"
import ajax from "../../api/ajax"

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
      items: [
        { text: '苹果' },
        { text: '安卓' },
        { text: '平板' },
        { text: '电脑' },
        { text: '数码家电' },
        { text: '配件' },
        { text: '耳机' },
        { text: '穿戴' },
        { text: '钟表' },
        { text: '运动户外' },
        { text: '奢侈品' },
        { text: '美妆' },
        { text: '生活百货' },
        { text: '尾货清仓' }
      ],
      demoData:28,
      demoTitle:"手机",
      activeKey:0,
      asyncData:[]
    }
  },
  methods:{
    onChange(index) {
      this.demoData = Math.round(Math.random()*10)+10
      this.demoTitle = this.items[index].text
    },
    onSearch(){

    }
  },
  async mounted() {
    if(sessionStorage.getItem("appletypes")){
      this.asyncData = JSON.parse(sessionStorage.getItem("appletypes"))
    }else{
      this.asyncData = await ajax("http://8.219.72.10:9000/applemodel")
      sessionStorage.setItem("appletypes",JSON.stringify(this.asyncData))
      console.log(this.asyncData)
    }
    document.getElementsByClassName("van-nav-bar__left")[0].style.width="100%"
    document.getElementsByClassName("van-nav-bar__left")[0].style.position="relative"
    // let h1 = document.getElementsByClassName("van-nav-bar")[0].clientHeight
    // let h2 = document.getElementsByClassName("van-tabbar-item")[0].clientHeight
    // console.log(document.documentElement.clientHeight-h1-h2)
    // document.getElementsByTagName("section")[0].style.height = document.documentElement.clientHeight - (h1+h2)+"px"
  },
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    width: 100%;
    position: relative;
    .van-search{
      padding: 0;
      flex: 1;
    }
    section{
      display: flex;
      padding-top: 70px;
      background-color: #fff;
      padding: 50px 12px 0;
      box-sizing: border-box;
      &::-webkit-scrollbar{
        display: none;
      }
      .van-sidebar{
        &::-webkit-scrollbar{
          display: none;
        }
      }
      .checkData{
        // overflow-y: scroll;
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
              height: 50px;
              text-align: center;
              margin-bottom: 6px;
              background: #f5f5f5;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
  }
</style>