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
            <i class="mdui-icon material-icons">account_circle</i>
          </a>
          
          <!-- 菜单 -->
          <ul class="mdui-menu" id="menu">
          <li class="mdui-menu-item" v-on:click="tospace">
            <a href="javascript:;" class="mdui-ripple">我的主页</a>
          </li>
          <li class="mdui-menu-item" v-on:click="signout">
            <a href="javascript:;" class="mdui-ripple">退出登录</a>
          </li>
        </ul>

          <!-- <a href="javascript:;" class="mdui-btn mdui-btn-icon">
            <i class="mdui-icon material-icons">more_vert</i>
          </a>-->
        </div>
        <div class="mdui-tab mdui-color-theme" mdui-tab="options">
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" to="/">首页</router-link>
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" v-bind:to="'/classify/' + 1">电影</router-link>
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" v-bind:to="'/classify/' + 2">电视剧</router-link>
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" v-bind:to="'/classify/' + 3">动漫</router-link>
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" v-bind:to="'/classify/' + 4">小说</router-link>
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" v-bind:to="'/classify/' + 5">书籍</router-link>
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" v-bind:to="'/classify/' + 6">名人名言</router-link>
        </div>
      </div>
    </header>
    <!-- 侧边栏 -->
    <div class="mdui-drawer" id="content-drawer">
      <div class="mdui-card">
        <div class="mdui-card-media">
          <img src="https://www.mdui.org/docs/assets/docs/img/card.jpg" />
          <div class="mdui-card-media-covered mdui-card-media-covered-gradient">
            <div class="mdui-card-primary">
              <div v-if="token" class="mdui-card-primary-title">{{user.user_id}}</div>
              <div v-if="token == null" class="mdui-card-primary-title">未登录</div>
              <div v-if="token" class="mdui-card-primary-subtitle" style="overflow: hidden;text-overflow: ellipsis;" >{{user.user_say}}</div>
              <div v-if="token == null" class="mdui-card-primary-subtitle"><router-link to="/login" style="color:pink">登录</router-link> 使用全部功能</div>
              
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
      user:JSON.parse(this.$store.state.user)

    };
  },
  mounted() {
    this.$$.mutation();
  },
  created() {
    // this.fetchCustomers();
    this.$$.mutation();
    // var inst = new mdui.Tab('#tab');
    // // 刷新网页选项卡选中电影选项
    // inst.show('tab2');
  },
  methods: {
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
          setTimeout("javascript:location.href='http://localhost:8080/login'", 1000);
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
