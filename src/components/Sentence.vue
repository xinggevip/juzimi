<template>
  <div class="sentence">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!-- <Header></Header> -->

        
                <div class="both mdui-hidden-md-up">
                  <div class="zuotu" style="height:100%;width:30%;background-color:red;float:left;box-sizing:border-box;">
                      
                  </div>

                  <div class="right" style="width:70%;height:100%;float:left;box-sizing:border-box;position: relative;">
                    <b style="padding:10px;position: absolute;top:0px;">夺命狙击</b>
                    <p style="padding:10px;padding-bottom:0px;position: absolute;bottom:0px;line-height:20px;font-size: 13px;">
                        此专辑由<a href="javascript:;">小红</a>创建<br>
                        时间为2019年9月27日 <br>
                        共有100个句子
                    </p>
                      
                  </div>
                </div>
                
       




    <div class="mdui-container">
      <div class="mdui-row">
        <div class="mdui-col-md-9">
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

        <div class="mdui-col-md-3 you mdui-hidden-sm-down">
          <div class="zhu"></div>
          <span class="title"><b>夺命狙击</b></span>
          <div style="line-height:20px;font-size: 13px;">
              此专辑由<a href="javascript:;">小红</a>创建
            <br>
            <span>时间为2019年9月27日</span>
            <br>
            <span>
              共有100个句子
            </span>
          </div>
          <div style="line-height:20px;">
            <b style="line-height:30px;" class="mdui-text-color-black-secondary">简介</b>
            <br>
            <span class="mdui-text-color-black-disabled" style="text-indent:2em;">
              美国国防情报局特工亨利（威尔·史密斯饰），准备退休之际意外遭到一名神秘杀手的追杀，在两人的激烈较量中，他发现这名杀手竟然是年轻了20多岁的自己，一场我与我的对决旋即展开，而背后的真相也逐渐浮出水面。
            </span>
            
          </div>

        </div>
      </div>
    </div>
    <button class="mdui-fab mdui-fab-fixed mdui-color-theme" v-on:click="writer(1)"><i class="mdui-icon material-icons">add</i></button>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
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
  name: "sentence",
  components: {
    // HelloWorld,
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
    },
     writer:function(num){
      this.$$.alert("写句子");
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
  box-sizing:border-box;
  padding: 20px;
  background-color: white;
  padding-top: 10px;
  height: auto;
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
  width:100%;
  height:0px;
  padding-bottom:150%;
  // background-color:blue;
  overflow: hidden;
  border-radius: 5px;
  background-image:url('https://r1.ykimg.com/050E00005D897465ADA7B257BF0B7D07?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80/sharpen,100');
  background-repeat:no-repeat;
  background-size:cover;
  background-position: center;
}
.title{
  line-height: 40px;
}
.jianjie{
  line-height: 20px;
}
.both{
  width: 100%;
  height: 150px;
  background-color: white;
  padding: 10px;
  // height: 200px;
  box-sizing:border-box;
}

.jian{
  width: 100%;
  height: 100%;
  background-color: red;
}
.zuotu{
  background-image:url('https://r1.ykimg.com/050E00005D897465ADA7B257BF0B7D07?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80/sharpen,100');
  background-repeat:no-repeat;
  // background-size:auto 100%;
  background-size:cover;
  background-position: center center;
}
</style>
