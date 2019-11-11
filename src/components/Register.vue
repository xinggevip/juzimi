<template>
  <div class="login">
    <div class="mdui-container">
      <h1>注册</h1>
      <div class="mdui-row">
        <div class="mdui-col-xs-12">
          <form v-on:submit="register">
            <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">User name</label>
            <input class="mdui-textfield-input" type="text" v-model="user.userId" required />
            <div class="mdui-textfield-error">用户名不能为空</div>
          </div>

          <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">Password</label>
            <input
              class="mdui-textfield-input"
              type="password"
              
              required
              v-model="user.userPassword"
            />
            <div class="mdui-textfield-error">密码不能为空</div>
          </div>

          <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme mdui-float-right" type="submit">注册</button>
          <router-link class="mdui-float-right reg" to="/login">已有账号，去登录</router-link>
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
  data(){
    return{
      user:{},
    }
  },
   components: {
     Footer
   },
  mounted() {
    //   alert("adsfs");
    
  },
  methods:{
    register:function(e){
      // alert("注册");

      console.log(this.user);

      this.$http.post("/api"+"/register",this.user,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        }

      }).then(response => {
        console.log(typeof response.data);
        console.log(response.data);

        if(response.data.state == 'success'){

          mdui.snackbar({
            message: '注册成功',
            position: 'right-bottom'
          });
          // setTimeout("javascript:location.href='http://localhost:8081/login'", 1000);
          setTimeout("javascript:location.href='" + this.$global.localhostUrl +"'", 1000);
        }else{
          alert("用户名已存在，注册失败");
        }
        
      }),
        function(response) {
          // 响应错误回调
          alert("注册失败");
        };


      // 阻止冒泡事件
      e.preventDefault();
    }
  }
};
</script>

<style lang="less">
.reg{
  padding-top: 15px;
  padding-right: 10px;
}
</style>