import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首頁'
    }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/Shop.vue'),
    meta: {
      title: '商店'
    }
  },
  {
    // path 此處與 express router 概念相同，為網址參數
    path: '/product/:id',
    name: 'Product',
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue'),
    meta: {
      title: '商品'
    }
  },
  {
    path: '/exhibitions',
    name: 'Exhibitions',
    component: () => import(/* webpackChunkName: "exhibitions" */ '../views/Exhibitions.vue'),
    meta: {
      title: '展覽'
    }
  },
  {
    path: '/exhibitions/:id',
    name: 'SingleExhibition',
    component: () => import(/* webpackChunkName: "singleexhibition" */ '../views/SingleExhibition.vue'),
    meta: {
      title: '展覽'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
    meta: {
      login: true,
      title: '購物車'
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import(/* webpackChunkName: "orders" */ '../views/Orders.vue'),
    meta: {
      login: true,
      title: '訂單'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      title: '註冊'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: '登入'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    children: [
      // {
      //   path: 'mainpage',
      //   name: 'AdminMainpage',
      //   component: () => import(/* webpackChunkName: "adminmainpage" */ '../views/AdminMainpage.vue'),
      //   meta: {
      //     login: true,
      //     admin: true,
      //     title: '首頁管理'
      //   }
      // },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import(/* webpackChunkName: "adminproducts" */ '../views/AdminProducts.vue'),
        meta: {
          login: true,
          admin: true,
          title: '商品管理'
        }
      },
      {
        path: 'exhibitions',
        name: 'AdminExhibitions',
        component: () => import(/* webpackChunkName: "adminexhibitions" */ '../views/AdminExhibitions.vue'),
        meta: {
          login: true,
          admin: true,
          title: '展覽管理'
        }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import(/* webpackChunkName: "adminorders" */ '../views/AdminOrders.vue'),
        meta: {
          login: true,
          admin: true,
          title: '訂單管理'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// beforeEach 進入每一頁之前
router.beforeEach((to, from, next) => {
  // 進入的頁面需要登入
  if (to.meta.login && store.state.user.account.length === 0) {
    next('/login')
  // 進入的頁面需要管理員權限
  } else if (to.meta.admin && store.state.user.role !== 1) {
    next('/')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
