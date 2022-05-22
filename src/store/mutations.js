/* 直接更新state的多个方法的对象 */
import {
  RECEIVE_RECOMMENDGOODS,
  RECEIVE_CATEGORY
} from "./mutation-types"

export default {
  [RECEIVE_RECOMMENDGOODS] (state,recommends){
    state.recommends = recommends
  },
  [RECEIVE_CATEGORY] (state,categorys){
    state.categorys = categorys
  },
  PullData(state,value){
    state.goodsdata = value
  }
}