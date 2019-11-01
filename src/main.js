import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mdui from 'mdui'
import 'default-passive-events'
//导入axios组件
import axios from 'axios'
//让$http等同于axios，实现vue-resource的无缝切换
Vue.prototype.$http = axios
// import './assets/css/mdui'

Vue.config.productionTip = false
Vue.prototype.$$ = mdui

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
