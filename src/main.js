import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import VueFileAgent from 'vue-file-agent'
import 'vue-file-agent/dist/vue-file-agent.css'
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'
// import VueI18n from 'vue-i18n'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'

import './plugins/axios.js'
// import './assets/scss/vendors/css/styles.css'

import mixin from './mixin.js'

import VueGtag from 'vue-gtag'
Vue.use(VueGtag, {
  config: { id: 'G-T4QR8W7YYS' }
})

Vue.use(VueSweetalert2)
Vue.use(VueFileAgent)
Vue.component('ImgInputer', ImgInputer)
// Vue.use(VueI18n)
// Vue.use(VueAwesomeSwiper)

// 全域引用
Vue.mixin(mixin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
