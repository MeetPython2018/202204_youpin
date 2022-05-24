import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import less from 'less'
import dragVerify from "vue-drag-verify2"

Vue.use(less)
Vue.use(dragVerify)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
