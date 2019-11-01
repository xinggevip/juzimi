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
          <a href="javascript:;" class="mdui-btn mdui-btn-icon" v-on:click="login()">
            <i class="mdui-icon material-icons">account_circle</i>
          </a>
          <!-- <a href="javascript:;" class="mdui-btn mdui-btn-icon">
            <i class="mdui-icon material-icons">more_vert</i>
          </a>-->
        </div>
        <div class="mdui-tab mdui-color-theme" mdui-tab>
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" to="/">首页</router-link>
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" to="/about">电影</router-link>
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" to="/about">电视剧</router-link>
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" to="/about">动漫</router-link>
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" to="/about">小说</router-link>
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" to="/about">书籍</router-link>
          <router-link href="#example3-tab1" class="mdui-ripple mdui-ripple-white" to="/about">名人名言</router-link>
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
              <div class="mdui-card-primary-title">amGaoXing</div>
              <div class="mdui-card-primary-subtitle">又是元气满满的一天</div>
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
export default {
  mounted() {
    this.$$.mutation();
  },
  methods: {
    login: function() {
      // alert("跳转到登录");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less">
#content-drawer {
  // padding: 20px;
  background: white;
  font-size: 50px;
}
</style>
