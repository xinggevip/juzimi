import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import mdui from 'mdui'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import store from './store/store.js'
import Global from './components/Global'
// import 'assets/css/element.css'
import ElementUI from 'element-ui';
import 'default-passive-events'
//导入axios组件
import axios from 'axios'
axios.defaults.baseURL = "http://juapi.qiangssvip.com"
// axios.defaults.baseURL = "http://localhost:8080"
//设置全局，每次ajax请求携带cookies
// axios.defaults.withCredentials = true

//让$http等同于axios，实现vue-resource的无缝切换
Vue.prototype.$http = axios
// import './assets/css/mdui'

Vue.config.productionTip = false
Vue.prototype.$$ = mdui
Vue.prototype.$global = Global
Vue.prototype.$muse = MuseUI

Vue.use(ElementUI);
Vue.use(MuseUI);
// Vue.use(Global);




router.beforeEach((to, from, next) => {
  const token = store.state.token;
  
  // if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
  //   if (token) { // 通过vuex state获取当前的token是否存在
  //     next();
  //   } else {
  //     console.log('该页面需要登陆');
  //     next('/login');
  //   }
  // } else {
  //   next();
  // }

  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (token) { // 通过vuex state获取当前的token是否存在
      const isActive = (JSON.parse(store.state.user)).isActive;
      if(isActive == 1){
        next();
      }else{
        alert("账号未激活，无创建专辑权限！");
      }
      
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
