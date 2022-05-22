/* 通过mutation间接更新state的多个方法对象 */

import {
  RECEIVE_RECOMMENDGOODS,
  RECEIVE_CATEGORY
} from "./mutation-types"

import { reqRecommedGoods,reqCategory } from "@/api"
export default {
  async getCommendGoods({commit}){
    commit(RECEIVE_RECOMMENDGOODS,await reqRecommedGoods())   // 获取首屏物品数据
  },
  async getCategory({commit}){
    commit(RECEIVE_CATEGORY,await reqCategory())  // 获取业务线分类
  },
  pulldata(context,value){
    context.commit('PullData',value)
  }
}