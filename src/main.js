import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import mdui from 'mdui'
import store from './store/store.js'
// import 'assets/css/element.css'
import ElementUI from 'element-ui';
import 'default-passive-events'
//导入axios组件
import axios from 'axios'
//让$http等同于axios，实现vue-resource的无缝切换
Vue.prototype.$http = axios
// import './assets/css/mdui'

Vue.config.productionTip = false
Vue.prototype.$$ = mdui

Vue.use(ElementUI);


router.beforeEach((to, from, next) => {
  const token = store.state.token;
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (token) { // 通过vuex state获取当前的token是否存在
      next();
    } else {
      console.log('该页面需要登陆');
      next('/login');
    }
  } else {
    next();
  }
 })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
