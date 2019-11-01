<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!-- <Header></Header> -->
    <div class="mdui-container">
      <div class="mdui-row">
        <div class="mdui-col-md-8">
          <div class="mdui-row">
            
            <div class="mdui-col-md-12" v-for="customer in customers" :key="customer.id">
              <div class="list mdui-clearfix mdui-hoverable">
                <div class="mdui-chip">
                  <span class="mdui-chip-icon mdui-color-blue">
                    <i class="mdui-icon material-icons">face</i>
                  </span>
                  <span class="mdui-chip-title">{{customer.id}}</span>
                </div>
                <button class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right">
                  <i class="mdui-icon material-icons">favorite_border</i>
                </button>
                <p>{{customer.juzi}}</p>
                <span class="mdui-float-right mdui-text-color-blue-900">
                  <a href="javascript:;" class="mdui-text-color-black-icon-disabled">
                    <span style="letter-spacing:-3px;">———</span>&nbsp;&nbsp;{{customer.writer}}
                  </a> &nbsp;&nbsp;
                  <a href="javascript:;" class="mdui-text-color-black-secondary">《{{customer.from}}》</a>
                </span>
              </div>
            </div>

            
            
          </div>
        </div>

        <div class="mdui-col-md-4 you">
          右
          
          <div class="zhu">不知道写啥</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
// import Header from '@/components/Header.vue'

export default {
  data() {
    return {
      customers: []
    };
  },
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {
    this.$$.mutation();
  },

  methods: {
    // Get数据
    fetchCustomers() {
      this.$http.get("http://localhost:3000/juzi").then(response => {
        // 响应成功回调
        // 打印获取到的数据
        console.log(response);
        // 把数据赋值给customers
        this.customers = response.data;
        console.log(this.customers);
      }),
        function(response) {
          // 响应错误回调
        };
    }
  },
  created() {
    this.fetchCustomers();
  }
};
</script>

<style lang="less">
.you {
  // background-color: red;
  height: 500px;
}
.list {
  width: 100%;
  padding: 10px 0px;
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 16px;
  p {
    text-align: center;
  }
  span {
    text-align: right;
    a {
      text-decoration: none;
    }
  }
}
.zhu {
  width: 100%;
  padding: 10px 0px;
  background-color: white;
}
</style>
