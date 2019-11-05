import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Classify from '../views/Classify.vue'
import Login from './../components/Login.vue'
import Register from './../components/Register.vue'
import CreateAlbum from './../components/CreateAlbum.vue'
import Album from './../components/Album.vue'
import Index from './../components/Index.vue'
import Profile from './../components/Profile.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect:'/',
    children:[
      {
        path:'/',
        name:'index',
        component:Index
      },
      {
        path:'/index',
        name:'index',
        component:Index
      },
      {
        path:'/classify/:classifyid',
        name:'classify',
        component:Classify
      },
      {
        path:'/classify/:classifyid/album/:albumid',
        name:'album',
        component:Album
      },
      {
        path: '/login',
        name: 'login',
        component:Login
      },
      {
        path: '/register',
        name: 'register',
        component:Register
      },
      {
        path: '/createalbum',
        name: 'createalbum',
        component:CreateAlbum,
        meta:{
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        }
      }
    ]
  },
  {
    path: '/profile/:user_id',
    name: 'profile',
    component: Profile
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




export default router
