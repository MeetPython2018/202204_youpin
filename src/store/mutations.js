/* 直接更新state的多个方法的对象 */
import {
  RECEIVE_RECOMMENDGOODS,
  RECEIVE_CATEGORY,
  RECEIVE_USERINFO
} from "./mutation-types"

export default {
  [RECEIVE_RECOMMENDGOODS] (state,recommends){
    state.recommends = recommends
  },
  [RECEIVE_CATEGORY] (state,categorys){
    state.categorys = categorys
  },
  [RECEIVE_USERINFO] (state,userinfo){
    state.userinfo = userinfo
  },
  cacheDetail(state,value){
    state.detailpage = value
  },
  setLogin(state,value){
    state.login = value
  },
  addCar(state,value){
    state.shopcar.push(value)
  },
  updataCar(state,value){
    state.shopcar = value
  },
  addLocation(state,value){
    state.address.push(value)
  },
  findLocation(state,value){
    state.address = value
  }
}