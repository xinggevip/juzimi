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
          <div class="mdui-col-xs-12 mdui-col-md-3">
              <div class="mdui-textfield mdui-textfield-expandable mdui-float-right" >
                
                <!-- <router-link to="/search" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">search</i></router-link> -->
                <button class="mdui-textfield-icon mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons" >search</i></button>
                <input class="mdui-textfield-input" style="color:white" v-model="search" type="text" v-on:keyup.enter="toSearchPage(search)" placeholder="Search"/>
                <button class="mdui-textfield-close mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">close</i></button>
              </div>
          </div>
          

          <a href="javascript:;" class="mdui-btn mdui-btn-icon" id="isopen" v-on:click="tologin()">
            <i v-if="user == null" class="mdui-icon material-icons">account_circle</i>
            <!-- <div class="tu mdui-hoverable" v-bind:style="{ 'background-image': 'url(' + album.albumPicture + ')'}"> -->
            <img v-if="user != null" class="mdui-icon material-icons mdui-img-circle" v-bind:src="$global.globalPictureUrl + (JSON.parse(this.$store.state.user)).userPicture"/>
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
              <div v-if="token" class="mdui-card-primary-subtitle" style="overflow: hidden;text-overflow: ellipsis;font-size:13px;padding-top:2px;" >{{(JSON.parse(this.$store.state.user)).userSlogan}}</div>
              <div v-if="token == null" class="mdui-card-primary-subtitle"><router-link to="/login" style="color:pink">登录</router-link> 使用全部功能</div>
              
            </div>
            
            <div class="mdui-card-actions" style="font-size:5px;opacity:0.7;margin-left:-7px;" v-if="token != null">
              <button class="mdui-btn mdui-ripple mdui-ripple-white" v-on:click="toprofile(user.userId)">我的主页</button>
              <button class="mdui-btn mdui-ripple mdui-ripple-white" v-on:click="toEditProfile">编辑资料</button>
            </div>

          </div>
        </div>
        
        


      </div>

      <ul class="mdui-list">
        <li class="mdui-list-item mdui-ripple" v-on:click="toMyLikeSen(user.userId)">
          <i class="mdui-list-item-icon mdui-icon material-icons">favorite</i>
          <div class="mdui-list-item-content">我的收藏</div>
        </li>
        <li class="mdui-list-item mdui-ripple" v-on:click="toprofile(user.userId)">
          <i class="mdui-list-item-icon mdui-icon material-icons">send</i>
          <div class="mdui-list-item-content">我的发布</div>
        </li>
        <li class="mdui-list-item mdui-ripple" v-on:click="openSimpleDialog">
          <i class="mdui-list-item-icon mdui-icon material-icons">error</i>
          <div class="mdui-list-item-content">关于我们</div>
        </li>
        <li class="mdui-list-item mdui-ripple" v-on:click="signout">
          <i class="mdui-list-item-icon mdui-icon material-icons">exit_to_app</i>
          <div class="mdui-list-item-content">退出登录</div>
        </li>
      </ul>
    </div>

    <!-- 对话框 -->
      <mu-dialog title="关于我们" width="360" :open.sync="openSimple">
        此应用为17计应（对口）1班2组合作开发 <br>
        组长：高星<br>
        成员：常诚、常鑫、高壮、胡鑫磊、裴兆洋
        <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">好的</mu-button>
      </mu-dialog>


    <!-- 尾部 -->
    <!-- <div class="mdui-color-theme" id="content-footer">Copyright</div> -->
  </div>
</template>

<script>
import { userInfo } from 'os';
export default {
  data() {
    return {
      search:'',
      token:this.$store.state.token,
      user:null,
      openSimple: false

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
    // 去修改资料
    toEditProfile:function(){
      this.$router.push({path:'/editprofile'});
    },
    // 对话框
    openSimpleDialog () {
      this.openSimple = true;
    },
    closeSimpleDialog () {
      this.openSimple = false;
    },
    // 去我的收藏
    toMyLikeSen:function(url){
      // this.$store.state.active2 = 1;
      if(url != null){
        window.location.href=this.$global.localhostUrl + "/profile/" + url;
        // this.$router.push({path:'/profile/'+ url});
      }else{
        alert("请先登录");
      }
    },
    getUserActive:function(){
      if(this.user.isActive == 1){
          return ""
      }else{
        return "未激活"
      }
    },
    toprofile:function(url){
      if(url != null){
        this.$store.state.active2 = 0;
        window.location.href=this.$global.localhostUrl + "/profile/" + url;
      }else{
        alert("请先登录");
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
    // 去搜索
    toSearchPage:function(search){
      // this.$router.push("/search");
      this.$router.push({
              path: '/search',
                query: {
                  key: search
                }
              })

    },
    signout:function(){
        // alert("退出登录");
        this.$store.commit('LOGOUT');
        this.$$.snackbar({
            message: '已退出登录',
            position: 'right-bottom'
          });
          setTimeout(()=>{
            window.location.href=this.$global.localhostUrl + "/login/";
          }, 1000);
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
