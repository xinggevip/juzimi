<template>
  <div class="createalbum">
    <!-- 尾部 -->
    <div class="mdui-container" style="padding-bottom:0px;">
    <div class="mdui-row">

      <form v-on:submit.prevent="creatalbum">
              <div class="mdui-col-xs-12 formbg">
          <h1>创建专辑</h1>
          <h4>上传专辑封面<span style="color:red;text-decoration: none;font-weight:normal"> 建议比例1：1.5</span></h4>
          <!-- 文件上传组件 -->
          <el-upload
            action="http://juapi.qiangssvip.com/api/upload"
            ref="upload"
            name="albumPicture"
            list-type="picture-card"
            :limit="1"
            :file-list="fileList"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove">

              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                  <!-- <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span> -->
                  <!-- <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span> -->
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>

          <!-- 单行文本框 -->
          <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">专辑名称</label>
            <input class="mdui-textfield-input" type="text" v-model="album.albumName" required/>
            <div class="mdui-textfield-error">专辑名称不能为空</div>
          </div>
          
          <!-- 多行文本框 -->
          <div class="mdui-textfield">
            <textarea class="mdui-textfield-input" rows="4" placeholder="专辑介绍" v-model="album.albumDetails" required ></textarea>
            <div class="mdui-textfield-error">专辑介绍不能为空</div>
          </div>

          <!-- <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent mdui-float-right mdui-color-theme-400" style="top:10px;margin-left:13px;" v-on:click="submitting = !submitting">立即创建</button> -->
          <!-- <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent mdui-float-right mdui-color-theme-400" style="top:10px;margin-left:13px;" v-on:click="creatalbum">立即创建</button> -->
          <input type="submit" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent mdui-float-right mdui-color-theme-400" style="top:10px;margin-left:13px;" value="立即创建" v-bind:disabled="submitting" />
          
          <!-- load -->
            <div v-if="submitting" class="mdui-spinner mdui-float-right" style="top:13px;"><div class="mdui-spinner-layer "><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div></div>
      </div>
      </form>

        
    </div>
    </div>
    
    <!-- 页脚 -->
    <Footer></Footer>
  </div>
</template>

<script>

import jquery from 'jquery'
import Footer from "@/components/Footer.vue";
export default {
  components: {
     Footer
   },
   data() {
    return {
      fileList: [],
      album:{
        userId:(JSON.parse(this.$store.state.user)).userId,
        classifyId:this.$route.params.classifyid,
        albumPicture:''
      },
      // 上传地址
      submitting:false,
      disabled:false,
      //文件上传的参数
      dialogImageUrl: '',
      dialogVisible: false,
      //图片列表（用于在上传组件中回显图片）
      // fileList: [{name: '', url: ''}],
      // fileList: [{}],

    };
  },
  name: "createalbum",
  created() {
    // console.log(jquery("h1"));
    let sysuser = (JSON.parse(this.$store.state.user)).userId;
    console.log(sysuser);
   
  },
  methods:{
    //文件上传成功的钩子函数
        handleSuccess(res, file) {
            this.$message({
                type: 'success',
                message: '图片上传成功',
                duration: 1500
            });
            if (file.response.success) {
                // this.editor.picture = file.response.message; //将返回的文件储存路径赋值picture字段
                this.album.albumPicture = file.response.message; //将返回的文件储存路径赋值picture字段
                // alert(this.album.albumPicture);
            }
        },
        //删除文件之前的钩子函数
        handleRemove(file, fileList) {

          this.$confirm('此操作将删除该图片, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 点确定来到了这
            // this.$message({
            //   type: 'success',
            //   message: '删除成功!'
            // });

            // 调用删除图片api
            console.log(this.album);
            this.$http.post("/api/delpicture",this.album,{
                headers: {
                    'Content-Type':'application/json;charset=UTF-8'
                }

              }).then(response => {
                  console.log(response.data);
                  
                  if(response.data.success == true){
                    // 删除成功执行
                      this.$refs.upload.clearFiles();
                      this.$message({
                        type: 'success',
                        message: response.data.message
                      });
                  }else{
                    // 删除失败执行
                    this.$refs.upload.clearFiles();
                    this.$message({
                      type: 'info',
                      message: response.data.message
                    });  
                  }
                }),
                function(response) {
                  // 响应错误回调
                  this.$refs.upload.clearFiles();
                  alert("未知错误");
                };


          }).catch(() => {
            // 点取消来到了这
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });


        },

        //点击列表中已上传的文件事的钩子函数
        handlePreview(file) {
        },
        //上传的文件个数超出设定时触发的函数
        onExceed(files, fileList) {
            this.$message({
                type: 'info',
                message: '最多只能上传一个图片',
                duration: 6000
            });
        },
        //文件上传前的前的钩子函数
        //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const isJPGG = file.type === 'image/jpg';
            const isLt2M = file.size / 1024 / 1024 < 10;

            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 10MB!');
            }
            return (isJPG || isBMP || isGIF || isPNG || isJPGG) && isLt2M;
        },
        handlePictureCardPreview:function(file){

        },
        creatalbum:function(){
          console.log(this.album);
          // 显示loding
          this.submitting = true;
          if(this.album.albumPicture != ''){
            // alert("一切准备就绪,提交吧");



        this.$http.post("/api/savealbum",this.album,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        }

        }).then(response => {
          // console.log(response);
          // console.log(typeof response.data);
          console.log(response.data);
          // alert("成功回调");
        this.submitting = false;

        if(response.data.success == true){

          mdui.snackbar({
            message: response.data.message,
            position: 'right-bottom'
          });
          // 待修改  v-bind:to="'/classify/'+ $route.params.classifyid +'/album/' + album.album_id"
          // setTimeout("javascript:location.href='http://localhost:8080/login'", 1000);
          setTimeout(() => {
            // 路由跳转elementui-对话框就报错，只能用原生跳转 操他妈的
            // this.$router.push({path:'/classify/'+ this.$route.params.classifyid +'/album/' + response.data.albumId});
            this.$router.push({path:'/classify/'+ this.$route.params.classifyid +'/album/' + response.data.albumId});
        
          }, 1000);
          // let url = 'http://localhost:8081/classify/' + this.$route.params.classifyid +'/album/' + response.data.albumId;
          // setTimeout(()=>{
          //   // location.href=url;
          //   window.location.href=url;
          // }, 1000);

        }else{
          alert("创建失败");
          this.submitting = false;
        }
        
      }),
        function(response) {
          // 响应错误回调
          alert("创建失败");
          this.submitting = false;
        };




          }else{
            this.submitting = false;
            alert("请上传专辑图片");
          }

          // 阻止冒泡事件
          // e.preventDefault();
        }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.formbg{
  background-color: white;
  box-sizing:border-box;
  padding: 10px;
  padding-bottom: 25px;
  border-radius: 5px;
  
}
</style>
