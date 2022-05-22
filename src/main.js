import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import less from 'less';

import { Tab, Tabs, Swipe, SwipeItem,Grid, GridItem ,Tabbar, TabbarItem,Card } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Card);
Vue.use(less);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
