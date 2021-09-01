import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/base.css'
import './assets/css/icon/iconfont.css'

// 路由守卫
import './router/router-permission'
// 引api 挂全局
import api from './api'
// 引语言
import i18n from './plugins/lang'

Vue.prototype.$api = api

Vue.config.productionTip = false

// 刷新读取本地数据
let userinfo = localStorage.getItem('userinfo')
if (userinfo) {
  let obj = JSON.parse(userinfo)
  store.commit('LoginModule/setUser', obj)
}


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')