/* 包含多个基于state的getter计算属性的对象 */

export default {
  logined(state){
    return state.userinfo.code===1 ? true:false
  }
}