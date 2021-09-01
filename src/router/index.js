import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './../views/layout'

// 按需加载的组件
const Goods = () => import('../views/goods')
const Rules = () => import('../views/guize')
const Ad = () => import('../views/ad')
const User = () => import('../views/user')
const Login = () => import('../views/login')

//订单管理 
import Order from "../views/OrderManage"
const OrderList = () =>
  import('../views/OrderManage/order-list')
const ProductManage = () =>
  import('../views/OrderManage/product-manage')
const ProductionList = () =>
  import('../views/OrderManage/product-manage/production-list')
const ReviewManage = () =>
  import('../views/OrderManage/product-manage/review-manage')
const ReturnGoods = () =>
  import('../views/OrderManage/return-goods')


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Layout',
    component: Layout,
    meta:{
      isLogin:true
    },
    children: [{
        path: '/goods',
        name: 'Goods',
        component: Goods,
      }, {
        path: '/rules',
        name: 'Rules',
        component: Rules,
      }, {
        path: '/ad',
        name: 'Ad',
        component: Ad,
      }, {
        path: '/user',
        name: 'User',
        component: User,
      },
      {
        path: 'order',
        name: 'Order',
        component: Order,
        meta: {
          name: '订单管理',
          icon: 'icon-email'
        },
        children: [{
            path: 'list',
            name: 'order-list',
            component: OrderList
          },
          {
            path: 'product',
            name: 'product-manage',
            component: ProductManage,
            children: [{
                path: 'list',
                name: 'product-list',
                component: ProductionList
              },
              {
                path: 'review',
                name: 'review-manage',
                component: ReviewManage
              }
            ]
          },
          {
            path: 'returnGoods',
            name: 'return-goods',
            component: ReturnGoods
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }

]

const router = new VueRouter({
  routes
})

export default router