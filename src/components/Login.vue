<template>
  <div class="login">
    <div class="mdui-container">
      <h1>登录</h1>
      <div class="mdui-row">
        <div class="mdui-col-xs-12">
          <form action="">
            <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">User name</label>
            <input class="mdui-textfield-input" type="text" required />
            <div class="mdui-textfield-error">用户名不能为空</div>
          </div>

          <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">Password</label>
            <input
              class="mdui-textfield-input"
              type="password"
              pattern="^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*$"
              required
            />
            <div class="mdui-textfield-error">密码至少 6 位，且包含大小写字母</div>
          </div>
          <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme mdui-float-right" type="submit">登录</button>
          <router-link class="mdui-float-right reg" to="/register">还没账号，去注册</router-link>
          
          </form>
        </div>
      </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '@/components/Footer.vue'

export default {
   components: {
     Footer
   },
  mounted() {
    //   alert("adsfs");
  }
};
</script>

<style lang="less">
.reg{
  padding-top: 15px;
  padding-right: 10px;
}
</style>
