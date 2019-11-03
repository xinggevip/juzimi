<template>
  <div class="index">
    

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
                <p style="margin-bottom:20px;">{{customer.juzi}}</p>
                <span class="mdui-float-right mdui-text-color-blue-900">
                  <a href="javascript:;" class="mdui-text-color-black-icon-disabled">
                    <span style="letter-spacing:-3px;">———</span>&nbsp;&nbsp;{{customer.writer}}
                  </a> &nbsp;&nbsp;
                  <a href="javascript:;" class="mdui-text-color-black-secondary">《{{customer.from}}》</a>
                </span>
              </div>
            </div>

            
            
          </div>

        <div class="mdui-row">
          <mdui-row-xs-12>
            <button v-if="!load" class="mdui-btn mdui-btn-raised mdui-ripple mdui-center" v-on:click="onload()">点击加载更多</button>

            <!-- load -->
            <div v-if="load" class="mdui-spinner mdui-center"><div class="mdui-spinner-layer "><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div></div>
          </mdui-row-xs-12>
        </div>

        </div>

        <div class="mdui-col-md-4 you">
          <div class="zhu">不知道写啥</div>
        </div>
      </div>
    </div>

    <Footer></Footer>
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
      customers: [],
      more:[],
      load:true
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
        this.load = false;
      }),
        function(response) {
          // 响应错误回调
        };
    },
    onload:function(){
      // alert("hjk");
      this.load = true;

      // 获取数据
      this.$http.get("http://localhost:3000/juzimore").then(response => {
        // 响应成功回调
        // 打印获取到的数据
        console.log(response);
        // 把数据赋值给customers
        this.more = response.data;
        console.log(this.more);

        // 遍历数据
        this.more.forEach((item, index) => {
        
        this.customers.push(item);
        this.load = false;
        })
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

<style lang="less" scoped>
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