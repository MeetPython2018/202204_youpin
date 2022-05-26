<template>
  <div class="card">
    <div class="icon">
      <van-image :src="data.photo[0]" width="110" height="110" radius="8">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
    <div class="title van-multi-ellipsis--l2">
      <van-tag type="danger" size="medium" plain>{{data.title.slice(0,1)[0]}}</van-tag>
      <span v-for="(item,index) of data.title.slice(1)" :key="index">{{item}}</span>
    </div>
    <div class="extend">
      <div class="price">
        <i class="iconfont icon-renminbi1"></i>
        <span>{{data.price}}</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { Image as VanImage,Loading,Tag } from 'vant'
export default {
  props:["asyncData"],
  data() {
    return {
      data:this.asyncData
    }
  },
  watch:{
    asyncData:{
      deep:true,
      handler(value){
        this.data = value
      }
    },
  },
  components:{
    [Tag.name]:Tag,
    [VanImage.name]:VanImage,
    [Loading.name]:Loading
  },
  mounted(){
    // console.log(this.asyncData)
  }
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  .card{
    padding: 10px;
    box-sizing: border-box;
    font-family: "苹方";
    font-size: 13px;
    background-color: #fff;
    border-radius: 8px;
    .icon{
      display: flex;
      justify-content: center;
      padding: 10px 0 20px;
    }
    .title{
      font-size: 13px;
      .van-tag{
        border-radius: 4px;
        margin-right: 8px;
        font-family: "macfont";
        letter-spacing: .5px;
        font-size: 11px;
      }
      span{
        margin-right: 2px;
      }
    }
    .extend{
      font-family: "macfont";
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: "苹方";
      padding-top: 10px;
      .price{
        font-family: "macfont";
        color: @red;
        letter-spacing: .5px;
        i{
          font-size: 13px;
          margin-right: 3px;
        }
        
      }
      .more{
        color: #000;
        opacity: .6;
      }
    }
  }
</style>