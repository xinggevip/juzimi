<template>
  <div class="album">
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
                <div class="jian mdui-hidden-md-up">
                  
                  <b class="mdui-text-color-black-secondary" style="font-size:15px">简介</b>
                  <br>
                  <span class="mdui-text-color-black-disabled">
                    美国国防情报局特工亨利（威尔·史密斯饰），准备退休之际意外遭到一名神秘杀手的追杀，在两人的激烈较量中，他发现这名杀手竟然是年轻了20多岁的自己，一场我与我的对决旋即展开，而背后的真相也逐渐浮出水面。
                  </span>
                  
                    
                </div>
                
       




    <div class="mdui-container">
      <div class="mdui-row">
        <div class="mdui-col-md-9">
          <div class="mdui-row">

            

            <h3 v-if="customers.length == 0">什么都没有，赶快发布一个吧</h3>

            
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
            <button v-if="!load && customers.length != 0" class="mdui-btn mdui-btn-raised mdui-ripple mdui-center" v-on:click="onload()" >点击加载更多</button>

            <!-- load -->
            <div v-if="load" class="mdui-spinner mdui-center"><div class="mdui-spinner-layer "><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div></div>
          
        </div>

        </div>

        <div class="mdui-col-md-3 you mdui-hidden-sm-down" v-if="albuminfo.length != 0">
          <div class="zhu"></div>
          <span class="title"><b>{{albuminfo[0].album_name}}</b></span>
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
              {{albuminfo[0].album_details}}
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
      <!-- <el-form ref="addFormRef" :rules="rulesAddUser" :model="sentence" label-width="100px" v-if="albuminfo.length != 0"> -->
      <el-form ref="addFormRef" :rules="rulesAddUser" :model="sentence" label-width="100px" v-if="albuminfo.length != 0">
        <el-form-item prop="sentenceTxt" label="句子">
          <el-input v-model="sentence.sentenceTxt"></el-input>
        </el-form-item>
        <el-form-item prop="authorName" label="作者">
          <el-input v-model="sentence.authorName"></el-input>
        </el-form-item>
        <el-form-item  label="专辑">
          <el-input v-model="albuminfo[0].album_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button type="primary" @click="onAddSentence">确定</el-button>
        </el-form-item>
      </el-form>


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
      sentence:{
        
      },
      customers: [],
      more:[],
      load:true,
      albuminfo:[],
      dialogWidth: "0px", // 屏幕宽度
      dialogTableVisible: false, // 添加用户弹框
      // 添加句子
      addSentence: {
        sentence_txt: '',
        author_name: '',
      },
      // 验证规则
      rulesAddUser: {
        sentenceTxt: [
          { required: true, message: '句子不能为空', trigger: 'blur' }
        ],
        authorName: [
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ],
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
    getAlbumInfo:function(){
      // 获取数据
      this.$http.get("http://localhost:3000/album?album_id=" + this.$route.params.albumid).then(response => {
        // 响应成功回调
        // 打印获取到的数据
        console.log(response);
        // 把数据赋值给customers
        this.albuminfo = response.data;
        console.log(this.albuminfo);

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
      this.$refs.addFormRef.resetFields() // 清空表单
    },
    // 点击添加句子
    onAddSentence() {
      
      
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return null;  // 如果验证失败就不往下继续执行
        // let user = JSON.parse(this.$store.state.user); // 从vuex取用户信息

        // let newSentence = {
        //     sentence_txt : this.addSentence.sentence_txt,
        //     author_name : this.addSentence.author_name,
        //     user_id : user.user_id,
        //     album_id : this.$route.params.albumid,
        //     classfiy_id : this.$route.params.classifyid
        // }

        // console.log(newSentence);

        console.log(this.sentence);


        // const { data: res } = await this.$http.post('http://localhost:3000/sentence', newSentence)
        // if (res.meta.status !== 201) return this.$message.error(res.meta.msg)

        // this.$http.post("http://localhost:3000/sentence",newSentence)
        //             .then((response) =>{
        //                 console.log(response);
        //                 this.$message.success('添加成功')
        //                 this.dialogTableVisible = false  // 关闭弹框
        //                 this.$refs.addFormRef.resetFields() // 清空表单
        //                 //this.getUserList() // 重新调用，刷新表单
        //                 // this.$router.push({path:'/',query:{alert:"用户信息添加成功"}});
        //             })
      })
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
    this.fetchCustomers();
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
  padding:10px;
  font-size: 14px;
  background-color: white;
  clear:both;
  margin-bottom: 20px;
  line-height: 25px;
  box-sizing:border-box;
}
.zuotu{
  background-image:url('https://r1.ykimg.com/050E00005D897465ADA7B257BF0B7D07?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80/sharpen,100');
  background-repeat:no-repeat;
  // background-size:auto 100%;
  background-size:cover;
  background-position: center center;
}
</style>
