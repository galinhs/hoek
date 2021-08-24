<template lang="pug">
#app
  b-navbar.fixed-top(
    toggleable='lg'
    v-on:scroll="handleScroll"
    :class="[ 'topBg', scrollPosition > 150 ? 'scrollBg' : '']")
    //-  'scrollBg':scrollPosition > 150, 'topBg':scrollPosition < 150"
    b-container
      b-navbar-brand(to='/')
        img(:src="require('./assets/logo.png')" height="48")
      b-navbar-toggle(target='nav-collapse')
      b-collapse#nav-collapse(is-nav)
        b-navbar-nav.ml-auto
          b-nav-item(to='/exhibitions') 展覽
          b-nav-item(to='/shop') 商店
          b-nav-item-dropdown(right)
            template(#button-content)
              b-icon-person-fill
            b-dropdown-item(v-if="!user.islogin" to='/register') 註冊
            b-dropdown-item(v-if="!user.islogin" to='/login') 登入
            b-dropdown-item(v-if="user.islogin" to='/orders') 我的訂單
          b-nav-item(to='/cart')
            b-icon-cart-fill
            //- b-badge.rounded-pill(
            //-   variant="light"
            //-   )
            //-   | {{ cartList.length ? cartList.length : '0' }}
          b-nav-item(v-if="user.islogin && user.isAdmin" to='/admin/products') 後臺管理
          b-nav-item
            b-icon-box-arrow-right(v-if="user.islogin" @click="logout") 登出
  router-view
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      navBackground: 'topBg',
      hidebar: false,
      black: false,
      scrollPosition: null
    }
  },
  computed: {
    cartList () {
      return this.$store.state.cartList
    }
  },
  methods: {
    async logout () {
      try {
        await this.axios.delete('/users/logout', {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        // 清除 vueX
        this.$store.commit('logout')
        // 導回首頁
        if (this.$route.push !== '/') this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          text: '發生錯誤'
        })
      }
    },
    handleScroll () {
      this.scrollPosition = window.scrollY
    }
  },
  async mounted () {
    window.addEventListener('scroll', this.handleScroll)
    if (this.$store.state.jwt.token.length === 0) return
    const diff = Date.now() - this.$store.state.jwt.received
    try {
      // 如果進入網頁時，距離收到 jwt 過了六天，重新取得一次新的 jwt
      // 1000 * 60 * 60 * 24 * 6 = 6 天的毫秒數
      if (diff > 1000 * 60 * 60 * 24 * 6) {
        const { data } = await this.axios.post('/users/extend', {}, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$store.commit('extend', data.result)
      }
      // 進入網頁時重新取一次使用者資料
      const { data } = await this.axios.get('/users/', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.$store.commit('getinfo', data.result)
    } catch (error) {
      this.$store.commit('logout')
    }
  },
  // created () {
  //   window.addEventListener('scroll', this.handleScroll)
  // },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
  #app .scrollBg{
    display: none;
  }
  #app .topBg{
    background: rgba(255, 255, 255, 0.3) !important;
    backdrop-filter: blur(5px);
    z-index: 99;
  }
  #app .dropdown-menu {
    min-width: 5rem;
  }
  #app .dropdown-item {
    padding: 0.25rem 1.5rem;
  }
  #app .dropdown-toggle::after {
    display: none;
  }
  #app .badge {
    border: 0.5px solid #fff;
    position: absolute;
    margin-left: -5px;
    margin-top: -5px;
    padding: 0.2em 0.4em;
  }
  #app .badge-light {
    /* color: #212529; */
    background-color: #f8f8f8;
  }
  #app .navbar-light .navbar-nav .nav-link{
    color: rgba(0, 0, 0, 0.8);
    font-weight: 500;
  }
</style>
