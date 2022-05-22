import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const actions = {
  pulldata(context,value){
    context.commit('PullData',value)
  }
}
const mutations = {
  PullData(state,value){
    state.goodsdata = value
  }
}
const state = {
  goodsdata:{}
}

export default new Vuex.Store({
  actions,
  mutations,
  state
})