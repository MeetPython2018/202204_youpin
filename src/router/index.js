import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

import Home from "../pages/Home/Home.vue"
import Category from "../pages/Category/Category.vue"
import Sell from "../pages/Sell/Sell.vue"
import CallCenter from "../pages/CallCenter/CallCenter.vue"
import Person from "../pages/Person/Person.vue"
import Order from "../pages/Person/Order.vue"
import ShopCar from "../pages/Person/ShopCar.vue"
import Discount from "../pages/Person/Discount.vue"
import Address from "../pages/Person/Address.vue"
import AddSite from "../pages/Person/AddSite.vue"

import DetailPage from "../components/PublicComponents/DetailPage.vue"
import Submit from "../components/PublicComponents/Submit.vue"

let originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve&&reject){
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}

export default new VueRouter({
  routes:[
    {
      path:"/",
      redirect:"/home"
    },
    {
      path: "/home",
      component:Home
    },
    {
      path:"/category",
      component:Category,
      meta:{ishow:0},
      children:[
        {
          path:"categoryall",
          component: () => import('@/components/Category/CategoryAll.vue')
        },
        {
          path:"filtercategory/:type",
          meta:{hidenfooter:true},
          component: () => import('@/components/Category/FilterCategory.vue')
        }
      ]
    },
    {
      path:"/sell",
      component:Sell
    },
    {
      path:"/callcenter",
      component:CallCenter
    },
    {
      path:"/person",
      component:Person,
      children:[
        {
          path:"order", // 维修订单路由
          component:Order,
          meta:{hidenfooter:true}
        },
        {
          path:"shopcar", // 购物车页面路由
          component:ShopCar,
          meta:{hidenfooter:true}
        },
        {
          path:'discount', // 优惠券路由
          component:Discount,
          meta:{hidenfooter:true}
        },
        {
          path:"address",   // 地址管理路由
          component:Address,
          meta:{hidenfooter:true},
          children:[
            {
              path:"addsite",   // 添加地址路由
              component:AddSite,
              meta:{hidenfooter:true,demo:true}
            }
          ]
        },
      ]
    },
    {
      path:"/detailpage",   // 商品详情页路由
      component:DetailPage,
      meta:{hidenfooter:true}
    },
    {
      path:"/submit",  // 确认订单页面
      component:Submit,
      meta:{hidenfooter:true}
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) {
        return savedPosition
    } else {
        return {
            x: 0,
            y: 0
        }
    }
  }
})