<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!-- <Header></Header> -->
    <Header></Header>

    <!-- <router-view :key="$route.fullPath"></router-view> -->
    <router-view :key="$route.fullPath"></router-view>



  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Header from '@/components/Header.vue'
// import Header from '@/components/Header.vue'
import Footer from "@/components/Footer.vue";

export default {
  data() {
    return {
      // customers: [],
      // more:[],
      // load:true
    };
  },
  name: "home",
  components: {
    HelloWorld,
    Header,
    Footer
  },
  mounted() {
    this.$$.mutation();
  },

  // methods: {
  //   // Get数据
  //   fetchCustomers() {
  //     this.$http.get("http://localhost:3000/juzi").then(response => {
  //       // 响应成功回调
  //       // 打印获取到的数据
  //       console.log(response);
  //       // 把数据赋值给customers
  //       this.customers = response.data;
  //       console.log(this.customers);
  //       this.load = false;
  //     }),
  //       function(response) {
  //         // 响应错误回调
  //       };
  //   },
  //   onload:function(){
  //     // alert("hjk");
  //     this.load = true;

  //     // 获取数据
  //     this.$http.get("http://localhost:3000/juzimore").then(response => {
  //       // 响应成功回调
  //       // 打印获取到的数据
  //       console.log(response);
  //       // 把数据赋值给customers
  //       this.more = response.data;
  //       console.log(this.more);

  //       // 遍历数据
  //       this.more.forEach((item, index) => {
        
  //       this.customers.push(item);
  //       this.load = false;
  //       })
  //     }),
  //       function(response) {
  //         // 响应错误回调
  //       };
  //   }
  // },
  // created() {
  //   this.fetchCustomers();
  // }
};
</script>

<style lang="less" scoped>


</style>


