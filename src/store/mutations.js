/* 直接更新state的多个方法的对象 */
import {
  RECEIVE_RECOMMENDGOODS,
  RECEIVE_QUERYBYTYPE,
  RECEIVE_CATEGORY,
  RECEIVE_ADDRESS,
  RECEIVE_SHOPPING,
  RECEIVE_USERINFO,
  RESET_USERINFO,
} from "./mutation-types"

export default {
  [RECEIVE_RECOMMENDGOODS] (state,recommends){
    state.recommends = recommends
  },
  [RECEIVE_QUERYBYTYPE] (state,data){
    state.queryByType = []
    state.queryByType.push(...data)
  },
  [RECEIVE_CATEGORY] (state,categorys){
    state.categorys = categorys
  },
  [RECEIVE_USERINFO] (state,userinfo){
    state.userinfo = userinfo
  },
  [RESET_USERINFO] (state){
    state.userinfo = {}
  },
  [RECEIVE_ADDRESS] (state,address){
    state.address = address['res']
  },
  [RECEIVE_SHOPPING] (state,data){
    state.shopcar = data
  },
  cacheDetail(state,value){
    state.detailpage = value
  },
  setLogin(state,value){
    state.userinfo = value
  },
  // 添加购物车
  addShoping(state,value){
    state.shopcar.data.push(value.data)
  },
  updateCar(state,value){
    state.shopcar = value
  },
  updateIp(state,value){
    state.updateIP = value
  },
  // 分页获取推荐板块的上新商品
  pushGoodsinfo(state,newData){
    state.recommends.push(...newData)
  }
}