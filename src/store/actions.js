/* 通过mutation间接更新state的多个方法对象 */

import {
  RECEIVE_RECOMMENDGOODS,
  RECEIVE_CATEGORY,
  RECEIVE_USERINFO,
  RECEIVE_ADDRESS,
  RECEIVE_QUERYBYTYPE,
  RECEIVE_SHOPPING
} from "./mutation-types"

import { reqRecommedGoods,addShopping,reqShopping,reqGoodsByType,reqCategory,autoLogin,reqAddress } from "@/api"
export default {
  // 获取首屏物品数据
  async getCommendGoods({commit}){
    commit(RECEIVE_RECOMMENDGOODS,await reqRecommedGoods())   
  },
  async getQueryByType({commit},type){
    commit(RECEIVE_QUERYBYTYPE,await reqGoodsByType(type))
  },
  async getCategory({commit}){
    commit(RECEIVE_CATEGORY,await reqCategory())  // 获取业务线分类
  },
  // 获取购物车信息
  async getShopping({commit},uid){
    commit(RECEIVE_SHOPPING,await reqShopping(uid))
  },
  async getUserInfo({commit}){
    commit(RECEIVE_USERINFO,await autoLogin())
  },
  async getAddress({commit},value){
    commit(RECEIVE_ADDRESS, await reqAddress(value))
  },
  cachedetail(context,value){
    context.commit('cacheDetail',value)
  },
  setlogin({commit},value){
    commit("setlogin",value)
  },
  // 添加购物车
  async addtoShoping({commit},value){
    commit("addShoping",await addShopping(value))
  }
}