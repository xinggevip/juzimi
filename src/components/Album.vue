<template>
  <div class="album">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!-- <Header></Header> -->

        
                <div class="both mdui-hidden-md-up" v-if="albuminfo != null">
                  <div class="zuotu" style="height:100%;width:30%;background-color:red;float:left;box-sizing:border-box;" v-bind:style="{ 'background-image': 'url(' + albuminfo.albumPicture + ')'}">
                      
                  </div>

                  <div class="right" style="width:70%;height:100%;float:left;box-sizing:border-box;position: relative;">
                    <b style="padding:10px;position: absolute;top:0px;">{{albuminfo.albumName}}</b>
                    <p style="padding:10px;padding-bottom:0px;position: absolute;bottom:0px;line-height:20px;font-size: 13px;">
                        此专辑由<a href="javascript:;">{{albuminfo.userId}}</a>创建<br>
                        时间为{{albuminfo.createDate}} <br>
                        共有100个句子
                    </p>
                      
                  </div>

                  

                </div>
                <div class="jian mdui-hidden-md-up" v-if="albuminfo != null">
                  
                  <b class="mdui-text-color-black-secondary" style="font-size:15px">简介</b>
                  <br>
                  <span class="mdui-text-color-black-disabled">
                    {{albuminfo.albumDetails}}
                  </span>
                  
                    
                </div>
                
       




    <div class="mdui-container">
      <div class="mdui-row">
        <div class="mdui-col-md-9">
          <div class="mdui-row" v-if="albuminfo != null">

            

            <h3 v-if="sentenceList.length == 0">什么都没有，赶快发布一个句子吧</h3>

            
            <div class="mdui-col-md-12" v-for="sentence in sentenceList" :key="sentence.sentenceId" >
              <div class="list mdui-clearfix mdui-hoverable">
                <div class="mdui-chip">
                  <span class="mdui-chip-icon mdui-color-blue">
                    <i class="mdui-icon material-icons">face</i>
                  </span>
                  <span class="mdui-chip-title">{{sentence.userId}}</span>
                </div>
                <button class="mdui-btn mdui-btn-icon mdui-ripple mdui-float-right">
                  <i class="mdui-icon material-icons">favorite_border</i>
                </button>
                <p style="margin-bottom:20px;">{{sentence.sentenceTxt}}</p>
                <span class="mdui-float-right mdui-text-color-blue-900">
                  <a href="javascript:;" class="mdui-text-color-black-icon-disabled">
                    <span style="letter-spacing:-3px;">———</span>&nbsp;&nbsp;{{sentence.authorName}}
                  </a> &nbsp;&nbsp;
                  <a href="javascript:;" class="mdui-text-color-black-secondary">《{{albuminfo.albumName}}》</a>
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

        <div class="mdui-col-md-3 you mdui-hidden-sm-down" v-if="albuminfo != null">
          <div class="zhu" v-bind:style="{ 'background-image': 'url(' + albuminfo.albumPicture + ')'}"></div>
          <span class="title"><b>{{albuminfo.albumName}}</b></span>
          <div style="line-height:20px;font-size: 13px;">
              此专辑由<a href="javascript:;">{{albuminfo.userId}}</a>创建
            <br>
            <span>时间为{{albuminfo.createDate}}</span>
            <br>
            <span>
              共有100个句子
            </span>
          </div>
          <div style="line-height:20px;" v-if="albuminfo != null">
            <b style="line-height:30px;" class="mdui-text-color-black-secondary">简介</b>
            <br>
            <span class="mdui-text-color-black-disabled" style="text-indent:2em;">
              {{albuminfo.albumDetails}}
            </span>
            
          </div>

        </div>
      </div>
    </div>
    <!-- 发布新句子 -->
    <button class="mdui-fab mdui-fab-fixed mdui-color-theme" v-on:click="writer()"><i class="mdui-icon material-icons">add</i></button>
    <Footer></Footer>
    <!-- 添加句子弹框 -->
    <el-dialog
      title="发布新句子"
      @close="addDialogClose"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      :width="dialogWidth"
    >
    <!-- 添加句子的表单 -->

      <form label-width="100px" v-if="albuminfo != null" v-on:submit="onAddSentence">
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">句子</label>
          <input class="mdui-textfield-input" type="text" v-model="sentence.sentenceTxt" required/>
          <div class="mdui-textfield-error">句子不能为空</div>
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">作者</label>
          <input class="mdui-textfield-input" type="text" v-model="sentence.authorName" required/>
          <div class="mdui-textfield-error">作者不能为空</div>
        </div>
        <!-- 禁用状态 -->
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">专辑</label>
          <input class="mdui-textfield-input" v-model="sentence.albumName" disabled style="color:#ccc"/>
        </div>

        <button class="mdui-btn mdui-btn-raised mdui-ripple" style="margin-right:5px;" type="button" @click="dialogTableVisible = false">取消</button>
        <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme " type="submit">发布</button>

      </form>

    </el-dialog>
    
    
    
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
      next:false,
      SentenceRequestByAuto:{
          albumId:Number(this.$route.params.albumid),
          pageNum:1,
          pageSize:10
      },
      // rulessentence:{},
      sentence:{
        albumName:'加载中',
        sentenceTxt:'',
        authorName:''

      },
      sentenceList: [],
      more:[],
      load:true,
      albuminfo:null,
      dialogWidth: "0px", // 屏幕宽度
      dialogTableVisible: false, // 添加用户弹框
      // 验证规则
      rulesAddSentence: {
        sentenceTxt: [
          { required: true, message: '句子不能为空', trigger: 'blur' }
        ],
        authorName: [
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ],
        albumName:[
          { required: true, message: '专辑不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  name: "album",
  components: {
    // HelloWorld,
    Footer
  },
  mounted() {
    this.$$.mutation();
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }
  },

  methods: {
    //清空form
    clearForm:function(){
      this.sentence.authorName = '';
      this.sentence.sentenceTxt = '';
    },
    // Get数据
    fetchSentence() {

      this.$http.post("/api/selectsentencebyalbumid",this.SentenceRequestByAuto,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        }

      }).then(response => {
        // 响应成功回调
        // 打印获取到的数据
        console.log(response.data);
        this.sentenceList = response.data.sentenceList;
        this.next = response.data.next;
        this.load = false;
      }),
        function(response) {
          // 响应错误回调
          alert("未知错误");
          this.load = false;
        };




    },
    onload:function(){
      // alert("hjk");
      this.load = true;

        this.SentenceRequestByAuto.pageNum = this.SentenceRequestByAuto.pageNum + 1;
        console.log(this.SentenceRequestByAuto.pageNum);
        this.$http.post("/api/selectsentencebyalbumid",this.SentenceRequestByAuto,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        }

        }).then(response => {
          // 响应成功回调
          // 打印获取到的数据
          console.log(response.data);
          this.next = response.data.next;
          let arr = response.data.sentenceList;
          this.load = false;
          arr.forEach((item, index) => {
            // item.albumPicture = this.$global.globalPictureUrl + item.albumPicture;

            //在这 改日期  
            // console.log(item);
            this.sentenceList.push(item);
          })


        }),
          function(response) {
            // 响应错误回调
            alert("未知错误");
            this.load = false;
          };




    },
    getAlbumInfo:function(){

      this.$http.post("/api/selectalbumbyid?albumId=" + Number(this.$route.params.albumid)).then(response => {
        // 响应成功回调
        // 打印获取到的数据
        console.log(response);
        // 把数据赋值给customers
        
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

        var date = new Date(response.data.createDate);
        this.albuminfo = response.data;

        this.albuminfo.createDate = date.toLocaleString();
        this.albuminfo.albumPicture   = this.$global.globalPictureUrl + this.albuminfo.albumPicture;

        console.log(typeof this.albuminfo);
        console.log(this.albuminfo);
        this.sentence.albumName = this.albuminfo.albumName;

      }),
        function(response) {
          // 响应错误回调
          alert("数据error");
        };

    },
     writer:function(num){
      // this.$$.alert("写句子");
      this.dialogTableVisible = true;
      var inst = new this.$$.Drawer('#content-drawer');
      inst.close();
      

    },
    // 关闭弹框的回调
    addDialogClose() {
      this.clearForm();
    },
    // 点击添加句子
    postSentence:function(){
        this.$http.post("/api/addsentence",this.sentence,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        }

        }).then(response => {
          console.log("+++++++++++++++++++++++++++++");
          console.log(this.sentence);
          this.sentence.sentenceId = response.data.albumId;
          this.sentenceList.unshift(this.sentence);
          console.log(response.data);
          this.$message.success(response.data.message)
          // window.location.href=window.location.href;

          this.SentenceRequestByAuto.pageNum = 1;
          this.fetchSentence();

          this.dialogTableVisible = false  // 关闭弹框
          // this.$refs.sentence.resetFields() // 清空表单
          this.clearForm();
          //this.getUserList() // 重新调用，刷新表单

        }),
        function(response) {
          // 响应错误回调
          alert("未知错误");

        };
    },
    onAddSentence(e) {
      this.postSentence();
      // 阻止冒泡事件
      e.preventDefault();
      
    },
    // 设置对话框大小
    setDialogWidth() {
      console.log(document.body.clientWidth)
      var val = document.body.clientWidth
      const def = 800 // 默认宽度
      if (val < def) {
        this.dialogWidth = '100%'
      } else {
        this.dialogWidth = def + 'px'
      }
    }
  },
  created() {
    this.$forceUpdate()
    this.fetchSentence();
    this.getAlbumInfo();
    console.log("分类id为："+this.$route.params.classifyid);
    console.log("专辑id为："+this.$route.params.albumid);
    // 设置对话框宽度
    this.setDialogWidth();
    // 把值传递给句子对象
    // let sysuser = JSON.parse(this.$store.state.user);

    this.sentence.userId = (JSON.parse(this.$store.state.user)).userId;
    this.sentence.classfiyId = this.$route.params.classifyid;
    this.sentence.albumId = this.$route.params.albumid;
    // 可以获取到全局图片地址
    // alert(this.$global.globalPictureUrl);
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
  // background-image:url('https://r1.ykimg.com/050E00005D897465ADA7B257BF0B7D07?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80/sharpen,100');
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
  padding:10px;
  font-size: 14px;
  background-color: white;
  clear:both;
  margin-bottom: 20px;
  line-height: 25px;
  box-sizing:border-box;
}
.zuotu{
  // background-image:url('https://r1.ykimg.com/050E00005D897465ADA7B257BF0B7D07?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80/sharpen,100');
  background-repeat:no-repeat;
  // background-size:auto 100%;
  background-size:cover;
  background-position: center center;
}
</style>
