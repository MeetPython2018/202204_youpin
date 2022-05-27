import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

import Home from "../pages/Home/Home.vue"
import Sign from "../components/PublicComponents/Sign.vue"
import Category from "../pages/Category/Category.vue"
import Sell from "../pages/Sell/Sell.vue"
import CallCenter from "../pages/CallCenter/CallCenter.vue"
import Person from "../pages/Person/Person.vue"
import Order from "../pages/Person/Order.vue"
import ShopCar from "../pages/Person/ShopCar.vue"
import Discount from "../pages/Person/Discount.vue"
import Address from "../pages/Person/Address.vue"
import AddSite from "../pages/Person/AddSite.vue"
import EditAddress from "../pages/Person/EditAddress.vue"

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

const router = new VueRouter({
  routes:[
    {
      path:"/",
      redirect:"/home",
      meta:{title:'首页'}
    },
    {
      path:'/sign',
      component:Sign,
      meta:{hidenfooter:true,title:'登录'}
    },
    {
      path: "/home",
      component:Home,
      meta:{title:'首页'}
    },
    {
      path:"/category",
      component:Category,
      meta:{ishow:0,title:'分类'},
      children:[
        {
          path:"categoryall",
          meta:{title:"全部分类"},
          component: () => import('@/components/Category/CategoryAll.vue')
        },
        {
          path:"filtercategory/:type",
          meta:{hidenfooter:true,title:'具体分类'},
          component: () => import('@/components/Category/FilterCategory.vue')
        }
      ]
    },
    {
      path:"/sell",
      component:Sell,
      meta:{title:'闲置还钱'}
    },
    {
      path:"/callcenter",
      component:CallCenter,
      meta:{title:'客服'}
    },
    {
      path:"/person",
      component:Person,
      meta:{title:'个人中心'},
      children:[
        {
          path:"order", // 维修订单路由
          component:Order,
          meta:{hidenfooter:true,title:"维修订单"}
        },
        {
          path:"shopcar", // 购物车页面路由
          component:ShopCar,
          meta:{hidenfooter:true,title:"购物车"}
        },
        {
          path:'discount', // 优惠券路由
          component:Discount,
          meta:{hidenfooter:true,title:"优惠券"}
        },
        {
          path:"address",   // 地址管理路由
          component:Address,
          meta:{hidenfooter:true,title:"地址管理"},
          children:[
            {
              path:"addsite",   // 添加地址路由
              component:AddSite,
              meta:{hidenfooter:true,demo:true,title:"添加地址"}
            },
            {
              path:"editaddress",   // 编辑地址路由
              component:EditAddress,
              meta:{hidenfooter:true,demo:true,title:"编辑地址"}
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
router.afterEach((to,from)=>{
  document.title = to.meta.title || "有品"
})
export default router