<template>
  <div class="login">
    <div class="mdui-container">
      <h1>登录</h1>
      <div class="mdui-row">
        <div class="mdui-col-xs-12">
          <form v-on:submit="login">
          <!-- <form action="http://localhost:8081/login"> -->
            <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">User name</label>
            <input class="mdui-textfield-input" type="text" required  v-model="user.userId" />
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
            <!-- pattern="^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*$" -->
            <!-- <div class="mdui-textfield-error">密码至少 6 位，且包含大小写字母</div> -->
            <div class="mdui-textfield-error">密码不能为空</div>
          </div>
          <!-- <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme mdui-float-right" type="submit">登录</button> -->
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
  data() {
    return {
      user:{}
    };
  },
   components: {
     Footer
   },
  mounted() {
    //   alert("adsfs");
  },
  methods:{
    login:function(e){

      console.log(this.user);

      this.$http.post("/api"+"/login",this.user,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        }

      }).then(response => {
        console.log(typeof response.data);
        console.log(response.data);
        
      


      // // get请求 登录
      // this.$http.get("http://localhost:3000/user?user_id="+ this.user.user_id +"&user_password=" + this.user.user_password).then(response => {
      // // this.$http.get("http://localhost:8081/login"+ this.user.user_id +"&user_password=" + this.user.user_password).then(response => {
      //   // 响应成功回调
      //   // 打印获取到的数据
      //   console.log("-----------------");
      //   console.log(response.data);
        if(response.data != ''){
          // console.log("---------------" + response.data[0].user_id);
          // alert("登录成功");
          /* 把用户信息存储到浏览器 */
          
          // console.log(response.data[0]);
          let objStr = JSON.stringify(response.data);
          // console.log([objStr]);
          this.$store.commit('SET_TOKEN', true);
          this.$store.commit('GET_USER', objStr);

          // alert("登录成功");
          
          // this.$router.push({path:'/'});
          mdui.snackbar({
            message: '登录成功',
            position: 'right-bottom'
          });
          setTimeout("javascript:location.href='http://localhost:8080/'", 1000);
        }else{
          alert("登录失败");
        }
        
      }),
        function(response) {
          // 响应错误回调
          alert("登录失败，请重新登录");
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
