import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

function defaultState () {
  return {
    jwt: {
      token: '',
      // 儲存時間戳記
      received: 0
    },
    // 使用者資料
    user: {
      account: '',
      id: '',
      role: 0,
      email: ''
    },
    cartList: [],
    cartAmount: '',
    processCheckout: false
  }
}

// function defaultOrderDetail () {
//   return {
//     receiver: '',
//     phone: 0,
//     address: '',
//     delivery: '',
//     payment: '',
//     totalPrice: 0
//   }
// }

export default new Vuex.Store({
  state: defaultState,
  mutations: {
    login (state, data) {
      state.jwt.token = data.token
      // 檢查序號有沒有過期是否需要更換
      state.jwt.received = new Date().getTime()
      state.user.account = data.account
      state.user.id = data.id
      state.user.role = data.role
      state.user.email = data.email
    },
    // 登出， VueX 清空
    logout (state) {
      state.jwt = {
        token: '',
        received: 0
      }
      state.user = {
        account: '',
        id: '',
        role: 0,
        email: ''
      }
    },
    extend (state, data) {
      state.jwt.token = data
      state.jwt.received = new Date().getTime()
    },
    getinfo (state, data) {
      state.user.account = data.account
      state.user.role = data.role
      state.user.email = data.email
    },
    // setCart (state, items) {
    //   state.cartList = items.cartList
    //   state.orderId = items.orderId
    // },
    // addCart (state, { productName, productId, price, image, amount }) {
    //   const product = { productName, productId, price, image, amount }
    //   const cart = state.cartList
    //   let newCartItem = true
    //   if (cart.length) {
    //     if (product.productId) {
    //       cart.forEach(item => {
    //         if (item.productId === product.productId) {
    //           item.amount += amount
    //           newCartItem = false
    //         }
    //       })
    //     }
    //   }
    //   if (!cart.length || newCartItem) {
    //     product.amount = amount
    //     cart.push(product)
    //   }
    //   state.cartList = cart
    // }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    user (state) {
      // ... 其餘運算值，解構展開變數
      // 除了 state.user 的資料，多判斷 user 有沒有登入，及是否為 admin
      return { islogin: state.user.account.length > 0, isAdmin: state.user.role === 1, ...state.user }
    },
    getCart (state) {
      return state.cartList
    }
  },
  plugins: [createPersistedState()]
})
