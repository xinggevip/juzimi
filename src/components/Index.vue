<template>
  <div class="index">
    

    <div class="mdui-container">
      <div class="mdui-row">
        <div class="mdui-col-md-9">
          <div class="mdui-row">
            
            <div class="mdui-col-md-12" v-for="(sen,index) in sentenceList" :key="sen.sentenceId" >
              <div class="list mdui-clearfix mdui-hoverable">
                <div class="mdui-chip">
                  <!-- <span class="mdui-chip-icon mdui-color-blue">
                    <i class="mdui-icon material-icons">face</i>
                  </span> -->
                  <img class="mdui-chip-icon" v-bind:src="sen.userPicture"/>
                  <span class="mdui-chip-title">{{sen.userId}}</span>
                </div>
                <button class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right" v-if="$store.state.token == null" v-on:click="pleaselogin">
                  <i class="mdui-icon material-icons">favorite_border</i>
                </button>
                <button class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right" v-else v-on:click="togglelike(sen.isLike,sen.sentenceId,index)">
                  <i v-if="sen.isLike == 1" class="mdui-icon material-icons mdui-text-color-pink">favorite_border{{sen.isLike}}</i>
                  <i v-if="sen.isLike == 0" class="mdui-icon material-icons">favorite_border{{sen.isLike}}</i>
                </button>
                <p style="margin-bottom:23px;">{{sen.sentenceTxt}}</p>
                <span class="mdui-float-left" style="font-size:13px;color:#ccc">{{sen.createDate}}</span>
                <span class="mdui-float-right mdui-text-color-blue-900">
                  <a href="javascript:;" class="mdui-text-color-black-icon-disabled">
                    <span style="letter-spacing:-3px;">———</span>&nbsp;&nbsp;{{sen.authorName}}
                  </a> &nbsp;&nbsp;
                  <router-link href="javascript:;" class="mdui-text-color-black-secondary" v-bind:to="'/classify/'+ sen.classfiyId +'/album/' + sen.albumId">《{{sen.albumName}}》</router-link>
                </span>
              </div>
            </div>

            
            
          </div>

        <div class="mdui-row">
            <!-- 没有数据了 -->
          <p v-if="!next" class="nulldata">——我是有底线的——</p>

            <button v-if="next && !load" class="mdui-btn mdui-btn-raised mdui-ripple mdui-center" v-on:click="fetchSentence" >点击加载更多</button>

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

          <!-- <div class="zhu">
            <div class="tjtitle" style="border-bottom:1px solid #ccc;padding-bottom:12px;padding-top:8px;">
                <b>扫码体验移动端</b>
            </div>
            <div style="width:100%;padding:20px;box-sizing:border-box;">
                <img src="https://www.qiangssvip.com/usr/uploads/2019/03/2801480982.jpg" alt="" style="width:100%;margin-top:2px;">
            </div>
            
          </div> -->

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
      // SentenceRequestByAuto:{
      //   albumId:-1,
      //   pageNum:1,
      //   pageSize:10
      // },
      RequestByFirstPageDate:{
        "userId":'',
        "pageNum":0,
        "pageSize":10
      }

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
    // 已登录则进行toggle收藏操作
    togglelike:function(isLike,sentenceId,index){
      let userId = (JSON.parse(this.$store.state.user)).userId;
      // alert(isLike + "====" + sentenceId + "====" + userId + "=====" + index);

      if(isLike == 1){
        // 去取消收藏
        // alert("去取消收藏");
        let Userlikesen = {
          "userId":(JSON.parse(this.$store.state.user)).userId,
          "sentenceId":sentenceId
        };

        this.$http.post("/api/tonolike",Userlikesen,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        }

      }).then(response => {
        console.log(response.data);

        this.sentenceList[index].isLike = 0;

        if(response.data.success == true){
          mdui.snackbar({
            message: response.data.message,
            position: 'right-bottom'
          });
          
        }else{
          mdui.snackbar({
            message: response.data.message,
            position: 'right-bottom'
          });
        }
        
      }),
        function(response) {
          // 响应错误回调
          alert("未知错误");
        };

      }else{
        // 去收藏
        let Userlikesen = {
          "userId":(JSON.parse(this.$store.state.user)).userId,
          "sentenceId":sentenceId
        };

        this.$http.post("/api/tolike",Userlikesen,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        }

      }).then(response => {
        console.log(response.data);

        this.sentenceList[index].isLike = 1;

        if(response.data.success == true){
          mdui.snackbar({
            message: response.data.message,
            position: 'right-bottom'
          });
          
        }else{
          mdui.snackbar({
            message: response.data.message,
            position: 'right-bottom'
          });
        }
        
      }),
        function(response) {
          // 响应错误回调
          alert("未知错误");
        };



      }
    },
    // 未登录情况下点击收藏提示去登录
    pleaselogin:function(){
      alert("未登录，请登陆后操作");
    },
    // Get数据
    fetchSentence() {

      this.RequestByFirstPageDate.pageNum += 1;

      this.$http.post("/api/getfirstpagedata",this.RequestByFirstPageDate,{
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

        (response.data.firstPageDataList).forEach((item, index) => {
            item.userPicture = this.$global.globalPictureUrl + item.userPicture;
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
    // 给用户名赋值
    if(this.$store.state.token){
      this.RequestByFirstPageDate.userId = (JSON.parse(this.$store.state.user)).userId;
    }
    
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