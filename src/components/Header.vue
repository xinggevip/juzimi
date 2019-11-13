<template>
  <div id="header">
    <header class="mdui-appbar mdui-appbar-fixed" id="content-header">
      <div class="mdui-appbar">
        <div class="mdui-toolbar mdui-color-theme">
          <span
            class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white"
            mdui-drawer="{target: '#content-drawer', swipe: true}"
          >
            <i class="mdui-icon material-icons">menu</i>
          </span>
          <a href="javascript:;" class="mdui-typo-title">句子迷</a>
          <div class="mdui-toolbar-spacer"></div>
          <a href="javascript:;" class="mdui-btn mdui-btn-icon" v-on:click="test()">
            <i class="mdui-icon material-icons">search</i>
          </a>
          <a href="javascript:;" class="mdui-btn mdui-btn-icon" id="isopen" v-on:click="tologin()">
            <i v-if="user == null" class="mdui-icon material-icons">account_circle</i>
            <!-- <div class="tu mdui-hoverable" v-bind:style="{ 'background-image': 'url(' + album.albumPicture + ')'}"> -->
            <img v-if="user != null" class="mdui-icon material-icons mdui-img-circle" v-bind:src="user.userPicture"/>
          </a>
          
          <!-- 菜单 -->
          <ul class="mdui-menu" id="menu">
          <li class="mdui-menu-item" v-on:click="tospace">
            <a href="javascript:;" class="mdui-ripple" v-on:click.stop.prevent="toprofile(user.userId)">我的主页</a>
          </li>
          <li class="mdui-menu-item" v-on:click="signout">
            <a href="javascript:;" class="mdui-ripple">退出登录</a>
          </li>
        </ul>

          <!-- <a href="javascript:;" class="mdui-btn mdui-btn-icon">
            <i class="mdui-icon material-icons">more_vert</i>
          </a>-->
        </div>
        <div class="mdui-tab mdui-color-theme" mdui-tab>
        <!-- <div class="mdui-tab mdui-color-theme" > -->
          <!-- class="mdui-ripple mdui-ripple-white -->
          <router-link href="#example3-tab1" v-bind:class="{'mdui-ripple':true,'mdui-ripple-white':true,'mdui-tab-active':$route.path == '/'} " to="/">首页</router-link>
          <router-link href="#example3-tab1" v-bind:class="{'mdui-ripple':true,'mdui-ripple-white':true,'mdui-tab-active':$route.params.classifyid == '1'}" v-bind:to="'/classify/' + 1">电影</router-link>
          <router-link href="#example3-tab1" v-bind:class="{'mdui-ripple':true,'mdui-ripple-white':true,'mdui-tab-active':$route.params.classifyid == '2'}" v-bind:to="'/classify/' + 2">电视剧</router-link>
          <router-link href="#example3-tab1" v-bind:class="{'mdui-ripple':true,'mdui-ripple-white':true,'mdui-tab-active':$route.params.classifyid == '3'}" v-bind:to="'/classify/' + 3">动漫</router-link>
          <router-link href="#example3-tab1" v-bind:class="{'mdui-ripple':true,'mdui-ripple-white':true,'mdui-tab-active':$route.params.classifyid == '4'}" v-bind:to="'/classify/' + 4">小说</router-link>
          <router-link href="#example3-tab1" v-bind:class="{'mdui-ripple':true,'mdui-ripple-white':true,'mdui-tab-active':$route.params.classifyid == '5'}" v-bind:to="'/classify/' + 5">书籍</router-link>
          <router-link href="#example3-tab1" v-bind:class="{'mdui-ripple':true,'mdui-ripple-white':true,'mdui-tab-active':$route.params.classifyid == '6'}" v-bind:to="'/classify/' + 6">名人名言</router-link>
        </div>
      </div>
    </header>
    <!-- 侧边栏 -->
    <div class="mdui-drawer" id="content-drawer">
      <div class="mdui-card">
        <div class="mdui-card-media">
          <!-- <img src="https://hdqwalls.com/wallpapers/material-design-stock-4k-y7.jpg" height="150xp;"/> -->
          <img src="https://cdn.wallpapersafari.com/98/20/h5e7vT.jpg" height="150xp;"/>
          <!-- <img src="https://1.bp.blogspot.com/-imPGeN0jP9E/XTFp85B05bI/AAAAAAAAIkw/YhlOmhgZ_i0_0i7l5M1Jx_JBOhiw9pOIwCKgBGAs/w914-h514-p-k-no-nu/snow-mountain-night-landscape-minimalist-digital-art-uhdpaper.com-4K-50-wp.thumbnail.jpg" height="150xp;"/> -->
          <div class="mdui-card-media-covered ">
            <div class="mdui-card-primary">
              <div v-if="token" class="mdui-card-primary-title">{{user.userId}} <span style="color:red">{{ getUserActive() }}</span> </div>
              <div v-if="token == null" class="mdui-card-primary-title">未登录</div>
              <div v-if="token" class="mdui-card-primary-subtitle" style="overflow: hidden;text-overflow: ellipsis;font-size:13px;padding-top:2px;" >{{user.userSlogan}}</div>
              <div v-if="token == null" class="mdui-card-primary-subtitle"><router-link to="/login" style="color:pink">登录</router-link> 使用全部功能</div>
              
            </div>
            
            <div class="mdui-card-actions" style="font-size:5px;opacity:0.7;margin-left:-7px;" v-if="token != null">
              <button class="mdui-btn mdui-ripple mdui-ripple-white" v-on:click="toprofile(user.userId)">我的主页</button>
              <button class="mdui-btn mdui-ripple mdui-ripple-white">编辑资料</button>
            </div>

          </div>
        </div>
        
        


      </div>

      <ul class="mdui-list">
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">move_to_inbox</i>
          <div class="mdui-list-item-content">我的收藏</div>
        </li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">send</i>
          <div class="mdui-list-item-content">我的发布</div>
        </li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">send</i>
          <div class="mdui-list-item-content">个人信息</div>
        </li>
        
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">delete</i>
          <div class="mdui-list-item-content">关于我们</div>
        </li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">error</i>
          <div class="mdui-list-item-content">退出登录</div>
        </li>
      </ul>
    </div>

    <!-- 尾部 -->
    <!-- <div class="mdui-color-theme" id="content-footer">Copyright</div> -->
  </div>
</template>

<script>
import { userInfo } from 'os';
export default {
  data() {
    return {
      token:this.$store.state.token,
      user:null,

    };
  },
  mounted() {
    this.$$.mutation();
  },
  created() {
    // this.fetchCustomers();
    this.$$.mutation();
    this.user = JSON.parse(this.$store.state.user);
    if(this.$store.state.token != null){
      this.user.userPicture = this.$global.globalPictureUrl + this.user.userPicture;
    }
    
    // $global.globalPictureUrl + user.userPicture
    // var inst = new mdui.Tab('#tab');
    // // 刷新网页选项卡选中电影选项
    // inst.show('tab2');
    // alert(this.$route.path);
  },
  methods: {
    getUserActive:function(){
      if(this.user.isActive == 1){
          return ""
      }else{
        return "未激活"
      }
    },
    toprofile:function(url){
      if(url != null){
        window.location.href=this.$global.localhostUrl + "/profile/" + url;
      }
      
    },
    tologin: function() {
      
      // alert("跳转到登录");
      
      let zt = this.$store.state.token;
      if(zt != null){
        console.log("不为空-----------------"+ zt);
        // console.log(this.$store.state.user);
        // 把json字符串转换成json
        let obj1 = JSON.parse(this.$store.state.user)
        console.log(obj1);
        var inst = new this.$$.Menu('#isopen', '#menu');
        inst.open();
      }else{
        console.log("为空-----------------"+ zt);
        this.$router.push("/login");
        // 在登录页面执行这句会有报错，垃圾
      }
      // this.$router.push("/login");
      
    },
    signout:function(){
        // alert("退出登录");
        this.$store.commit('LOGOUT');
        this.$$.snackbar({
            message: '已退出登录',
            position: 'right-bottom'
          });
          setTimeout("javascript:location.href='http://localhost:8081/login'", 1000);
    },
    tospace:function(){
      alert("我的主页");
    }
  },
  
  
};
</script>

<style lang="less">
#content-drawer {
  // padding: 20px;
  background: white;
  font-size: 50px;
}
</style>
