<template>
  <div class="index">
    

    <div class="mdui-container">
      <div class="mdui-row">
        <div class="mdui-col-md-9">
          <div class="mdui-row">
            
            <div class="mdui-col-md-12" v-for="sen in sentenceList" :key="sen.sentenceId" >
              <div class="list mdui-clearfix mdui-hoverable">
                <div class="mdui-chip">
                  <span class="mdui-chip-icon mdui-color-blue">
                    <i class="mdui-icon material-icons">face</i>
                  </span>
                  <span class="mdui-chip-title">{{sen.userId}}</span>
                </div>
                <button class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right">
                  <i class="mdui-icon material-icons">favorite_border</i>
                </button>
                <p style="margin-bottom:23px;">{{sen.sentenceTxt}}</p>
                <span class="mdui-float-left" style="font-size:13px;color:#ccc">{{sen.createDate}}</span>
                <span class="mdui-float-right mdui-text-color-blue-900">
                  <a href="javascript:;" class="mdui-text-color-black-icon-disabled">
                    <span style="letter-spacing:-3px;">———</span>&nbsp;&nbsp;{{sen.authorName}}
                  </a> &nbsp;&nbsp;
                  <a href="javascript:;" class="mdui-text-color-black-secondary">《{{sen.albumName}}》</a>
                </span>
              </div>
            </div>

            
            
          </div>

        <div class="mdui-row">
            <!-- 没有数据了 -->
          <p v-if="!next" class="nulldata">——我是有底线的——</p>

            <button v-if="next && !load" class="mdui-btn mdui-btn-raised mdui-ripple mdui-center" v-on:click="onload()" >点击加载更多</button>

            <!-- load -->
            <div v-if="load" class="mdui-spinner mdui-center"><div class="mdui-spinner-layer "><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div></div>
          
        </div>

        </div>

        <div class="mdui-col-md-3 you mdui-hidden-sm-down">
          <div class="zhu" style="margin-bottom:16px;">
              <div class="tjtitle" style="border-bottom:1px solid #ccc;padding-bottom:11px;padding-top:7px;">
                <b>推荐专辑</b>
              </div>
              <p>
                    <ul class="tjlist">
                      <li><a href="javascript:;" class="mdui-text-color-black-secondary">《功夫1111》</a></li>
                      <li><a href="javascript:;" class="mdui-text-color-black-secondary">《功夫1111》</a></li>
                      <li><a href="javascript:;" class="mdui-text-color-black-secondary">《功夫1111》</a></li>
                      <li><a href="javascript:;" class="mdui-text-color-black-secondary">《功夫1111》</a></li>
                      <li><a href="javascript:;" class="mdui-text-color-black-secondary">《功夫1111》</a></li>
                      <li><a href="javascript:;" class="mdui-text-color-black-secondary">《功夫1111》</a></li>
                      <li><a href="javascript:;" class="mdui-text-color-black-secondary">《功夫1111》</a></li>
                      
                    </ul>

              </p>
              

          </div>

          <div class="zhu">
            <div class="tjtitle" style="border-bottom:1px solid #ccc;padding-bottom:12px;padding-top:8px;">
                <b>扫码体验移动端</b>
            </div>
            <div style="width:100%;padding:20px;box-sizing:border-box;">
                <img src="https://www.qiangssvip.com/usr/uploads/2019/03/2801480982.jpg" alt="" style="width:100%;margin-top:2px;">
            </div>
            
          </div>

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
      next:false,
      sentenceList:[],
      more:[],
      load:true,
      SentenceRequestByAuto:{
        albumId:-1,
        pageNum:1,
        pageSize:10
      },
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
    fetchSentence() {
      // this.$http.get("http://localhost:3000/juzi").then(response => {
      //   // 响应成功回调
      //   // 打印获取到的数据
      //   // console.log(response);
      //   // 把数据赋值给customers
      //   this.customers = response.data;
      //   console.log(this.customers);
      //   this.load = false;
      // }),
      //   function(response) {
      //     // 响应错误回调
      //   };


      this.$http.post("/api/selectallsentence",this.SentenceRequestByAuto,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        }

      }).then(response => {
        // 响应成功回调
        console.log(response.data);
        // 遍历改日期
        Date.prototype.toLocaleString = function() {
        // 补0   例如 2018/7/10 14:7:2  补完后为 2018/07/10 14:07:02
        function addZero(num) {
            if(num<10)
                return "0" + num;
            return num;
        }
        // 按自定义拼接格式返回
            return this.getFullYear() + "年" + addZero(this.getMonth() + 1) + "月" + addZero(this.getDate()) + "日"
            //  + addZero(this.getHours()) + ":" + addZero(this.getMinutes()) + ":" + addZero(this.getSeconds())
             ;
        };

        (response.data.sentenceProList).forEach((item, index) => {
            // item.albumPicture = this.$global.globalPictureUrl + item.albumPicture;
            var date = new Date(item.createDate);
            item.createDate = date.toLocaleString();
            //在这 改日期  
            // console.log(item);
            this.sentenceList.push(item);
          })



        // this.sentenceList = response.data.sentenceList;
        this.next = response.data.next;
        

        this.load = false;
      }),
        function(response) {
          // 响应错误回调
        };


    },
    onload:function(){
      // alert("hjk");
      this.load = true;

      // // 获取数据
      // this.$http.get("http://localhost:3000/juzimore").then(response => {
      //   // 响应成功回调
      //   // 打印获取到的数据
      //   console.log(response);
      //   // 把数据赋值给customers
      //   this.more = response.data;
      //   console.log(this.more);

      //   // 遍历数据
      //   this.more.forEach((item, index) => {
        
      //   this.customers.push(item);
      //   this.load = false;
      //   })
      // }),
      //   function(response) {
      //     // 响应错误回调
      //   };



      this.SentenceRequestByAuto.pageNum = this.SentenceRequestByAuto.pageNum + 1;
        console.log(this.SentenceRequestByAuto.pageNum);
        this.$http.post("/api/selectallsentence",this.SentenceRequestByAuto,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        }

        }).then(response => {
          // 响应成功回调
          // 打印获取到的数据
          console.log(response.data);

          Date.prototype.toLocaleString = function() {
        // 补0   例如 2018/7/10 14:7:2  补完后为 2018/07/10 14:07:02
        function addZero(num) {
            if(num<10)
                return "0" + num;
            return num;
        }
        // 按自定义拼接格式返回
            return this.getFullYear() + "年" + addZero(this.getMonth() + 1) + "月" + addZero(this.getDate()) + "日"
            //  + addZero(this.getHours()) + ":" + addZero(this.getMinutes()) + ":" + addZero(this.getSeconds())
             ;
        };

          this.next = response.data.next;
          let arr = response.data.sentenceProList;
          this.load = false;
          arr.forEach((item, index) => {
            // item.albumPicture = this.$global.globalPictureUrl + item.albumPicture;

            //在这 改日期  

            var date = new Date(item.createDate);
            item.createDate = date.toLocaleString();

            // console.log(item);
            this.sentenceList.push(item);
          })


        }),
          function(response) {
            // 响应错误回调
            alert("未知错误");
            this.load = false;
          };













    }
  },
  created() {
    this.fetchSentence();
  }
};
</script>

<style lang="less" >

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
  padding: 10px;
  background-color: white;
  box-sizing: border-box;
}
.tjlist{
  margin:0;
  padding-left:0px;
  padding-top: 0px;
  li{
    list-style:none;
    width: 100%;
    // background-color: red;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    a{
      text-decoration: none;
      line-height: 26px;
      color: #333;
      
      &:hover{
        color: red;
        text-decoration: underline;
        
      }
    }
  }
}
</style>