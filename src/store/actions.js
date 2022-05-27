/* 通过mutation间接更新state的多个方法对象 */

import {
  RECEIVE_RECOMMENDGOODS,
  RECEIVE_CATEGORY,
  RECEIVE_USERINFO,
  RECEIVE_ADDRESS
} from "./mutation-types"

import { reqRecommedGoods,reqCategory,autoLogin,reqAddress } from "@/api"
export default {
  async getCommendGoods({commit}){
    commit(RECEIVE_RECOMMENDGOODS,await reqRecommedGoods())   // 获取首屏物品数据
  },
  async getCategory({commit}){
    commit(RECEIVE_CATEGORY,await reqCategory())  // 获取业务线分类
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
  addcar({commit},value){
    commit("addCar",value)
  }
}