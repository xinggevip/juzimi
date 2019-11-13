<template>
  <div class="profile">
    <div class="clearall">
        <div class="mdui-appbar mdui-appbar-fixed">
        <div class="mdui-toolbar mdui-color-theme">
            <a href="javascript:;" class="mdui-btn mdui-btn-icon" v-on:click.stop.prevent="toback"><i class="mdui-icon material-icons" >arrow_back</i></a>
            <a href="javascript:;" class="mdui-typo-title">主页</a>
            <div class="mdui-toolbar-spacer"></div>
            
        </div>

        
    </div>

    <div class="mdui-container" style="margin-top:55px;">

        <div class="header">
            <div class="inheader">
                <h1>用户名</h1>
                <p>今天天气不错</p>
                
            </div>
            
        </div>


            <mu-tabs :value.sync="active2" inverse color="secondary"  text-color="rgba(0, 0, 0, .54)"  full-width style="background-color:white">
                <mu-tab>发布</mu-tab>
                <mu-tab>收藏</mu-tab>
                <mu-tab>资料</mu-tab>
            </mu-tabs>
            <div class="demo-text" v-if="active2 === 0" style="background-color:#e8eaf6">
                
                <div class="mdui-row" style="background-color:#e8eaf6">
                
                    <div class="mdui-col-md-12" v-for="sen in sentenceList" :key="sen.sentenceId" >
                    <div class="list mdui-clearfix mdui-hoverable">
                        <div class="mdui-chip">

                        <img class="mdui-chip-icon" v-bind:src="sen.userPicture"/>
                        <span class="mdui-chip-title">{{sen.userId}}</span>
                        </div>
                        <!-- <button class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right" v-if="$store.state.token == null" v-on:click="pleaselogin"> -->
                        <!-- <i class="mdui-icon material-icons">favorite_border</i> -->
                        <!-- </button> -->

                        <button class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right" v-if="isShow" >
                            <i class="mdui-icon material-icons">delete</i>
                        </button>

                        <button class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right" v-if="isShow" >
                            <i class="mdui-icon material-icons">create</i>
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
                
                <!-- 没有数据了 -->
                <p v-if="!next" class="nulldata">——我是有底线的——</p>

                <button v-if="next && !load" class="mdui-btn mdui-btn-raised mdui-ripple mdui-center" v-on:click="getmysen" >点击加载更多</button>

            <!-- load -->
            <div v-if="load" class="mdui-spinner mdui-center"><div class="mdui-spinner-layer "><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div></div>

            </div>
            <div class="demo-text" v-if="active2 === 1">
               
                <p>“我的心从来没有这么坚定过，所以我会为了补偿而死，也可以为了补偿而死……一辈子，急辈子都无所谓，我绝不后退！”</p>
                <p>“如果我后退呢？如果我想要死呢？我不想你再次背对着我逃跑了……”</p>
                <p>“那么就去地狱找到你，我绝对不逃！”</p>
                <p>“白痴，你也哭了？因为那些软弱拖累你的脚步？”</p>
            </div>
            <div class="demo-text" v-if="active2 === 2">
                <p>“不，这泪水……是因为勇气，因为力量，因为信任，……你不会懂的！”</p>
                <p>“我不会帮你，想要什么样的未来……自己去追寻吧！”</p>
                <p>“我不需要你的帮忙！未来我会一手开启，什么样的敌人我也不会惧怕……还有，其实我们可以成为朋友的……”</p>
                <p>“也许吧，未来……给你了。”</p>
            </div>
            





    </div>


    </div>
    

    
  </div>
</template>

<script>
export default {
  name: "profile",
  data(){
      return{
          isShow:false,
          load:false,
          next:false,
          sentenceList:[],
          
          open: false,

          active2: 0,
          extend:null,

          RequestByFirstPageDate:{
            "userId":this.$route.params.userid,
            "pageNum":0,
            "pageSize":10
          },
          
      }
  },
  created(){
      mdui.mutation();
      // 进入网页立马获取数据
      this.getmysen();
      // 判断是否登录，如果登录则获取用户id
      // 获取路由id
      if(this.$store.state.token){
          this.$route.params.userid
          if((JSON.parse(this.$store.state.user)).userId == this.$route.params.userid){
              this.isShow = true;
          }
      }
  },
  methods:{
      // 弹出菜单

      // 获取已发布
      getmysen:function(){
        console.log(this.RequestByFirstPageDate);


      this.load = true;
      this.RequestByFirstPageDate.pageNum += 1;

      this.$http.post("/api/getsenbyuserid",this.RequestByFirstPageDate,{
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
      // 退到上一页
      toback:function(){
        window.history.back(-1);
      },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" >

.demo-text {
  padding: 16px;
  background: #fff;
  p {
    margin: 8px 0;
  }
}

@media (max-width: 600px){
    .clearall{
        margin-top: -104px;
    }
}
@media (min-width: 600px){
    .clearall{
        margin-top: -112px;
    }
}

// 629-960
@media (min-width: 630px){
    .clearall{
        margin-top: -96px;
    }
}
@media (min-width: 723px){
    .clearall{
        margin-top: -96px;
    }
}
@media (min-width: 960px){
    .clearall{
        margin-top: -112px;
    }
}
@media (min-width: 1024px){
    .clearall{
        margin-top: -112px;
        margin-left: -240px;
    }
}


.header{
    width: 100%;
    padding-bottom: 5%;
    text-align: center;
    position: relative;
    // https://cdn.wallpapersafari.com/98/20/h5e7vT.jpg
    //   border-radius: 5px;
    background-image:url('https://cdn.wallpapersafari.com/98/20/h5e7vT.jpg');
    background-repeat:no-repeat;
    background-size:cover;
    background-position: center;
    color: white;
    font-weight: none;

    .inheader{
        width: 100%;
        padding-top: 5%;
        h1{
            font-weight:normal
        }
    }
}

</style>
