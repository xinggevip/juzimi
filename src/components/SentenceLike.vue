<template>
  <div class="SentenceLike">
    <!-- 尾部 -->

    <div class="mdui-row" style="background-color:#e8eaf6">

        <div class="mdui-col-md-12" v-for="(sen2,index) in sentenceLikeList" :key="sen2.sentenceId" >
            <div class="list mdui-clearfix mdui-hoverable">
                <div class="mdui-chip">
                <!-- <span class="mdui-chip-icon mdui-color-blue">
                    <i class="mdui-icon material-icons">face</i>
                </span> -->
                <img class="mdui-chip-icon" v-bind:src="sen2.userPicture"/>
                <span class="mdui-chip-title">{{sen2.userId}}</span>
                </div>
                <button class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right" v-if="!isShow" v-on:click="pleaselogin">
                <i class="mdui-icon material-icons">favorite_border</i>
                </button>
                <button class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right" v-else v-on:click="togglelike(sen2.isLike,sen2.sentenceId,index)">
                <i v-if="sen2.isLike == 1" class="mdui-icon material-icons mdui-text-color-pink">favorite_border{{sen2.isLike}}</i>
                <i v-if="sen2.isLike == 0" class="mdui-icon material-icons">favorite_border{{sen2.isLike}}</i>
                </button>
                <p style="margin-bottom:23px;">{{sen2.sentenceTxt}}</p>
                <span class="mdui-float-left" style="font-size:13px;color:#ccc">{{sen2.createDate}}</span>
                <span class="mdui-float-right mdui-text-color-blue-900">
                <a href="javascript:;" class="mdui-text-color-black-icon-disabled">
                    <span style="letter-spacing:-3px;">———</span>&nbsp;&nbsp;{{sen2.authorName}}
                </a> &nbsp;&nbsp;
                <router-link href="javascript:;" class="mdui-text-color-black-secondary" v-bind:to="'/classify/'+ sen2.classfiyId +'/album/' + sen2.albumId">《{{sen2.albumName}}》</router-link>
                </span>
            </div>
        </div>

        <!-- 没有数据了 -->
        <p v-if="!next2" class="nulldata">——我是有底线的——</p>
        <button v-if="next2 && !load2" class="mdui-btn mdui-btn-raised mdui-ripple mdui-center" v-on:click="getLikeSen" >点击加载更多</button>
        <!-- load -->
        <div v-if="load2" class="mdui-spinner mdui-center"><div class="mdui-spinner-layer "><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div></div>
        </div>

    
    </div>
</template>

<script>
export default {
    name: "SentenceLike",
    data(){
        return{
            isShow:false,
            load2:false,
            next2:false,
            RequestByFirstPageDate2:{
            "userId":this.$route.params.userid,
            "pageNum":0,
            "pageSize":10
            },
            sentenceLikeList:[]
        }
    },
    created(){
        // 获取收藏数据
        this. getLikeSen();
              if(this.$store.state.token){
          this.$route.params.userid
          if((JSON.parse(this.$store.state.user)).userId == this.$route.params.userid){
              this.isShow = true;
          }
      };
    },
    methods:{
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

            this.sentenceLikeList[index].isLike = 0;
            this.sentenceLikeList.splice(index,1);

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

            this.sentenceLikeList[index].isLike = 1;

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
      // 获取收藏句子列表
    getLikeSen() {
    this.load2 = true;
    this.RequestByFirstPageDate2.pageNum += 1;

    this.$http.post("/api/getlikesenbyuserid",this.RequestByFirstPageDate2,{
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
            this.sentenceLikeList.push(item);
        })

        this.next2 = response.data.next;
        

        this.load2 = false;
    }),
        function(response) {
          // 响应错误回调
            alert("未知错误");
        };


    },
    }
};
</script>

<style scoped lang="less">

</style>
