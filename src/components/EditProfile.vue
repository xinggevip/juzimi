<template>
  <div class="EditProfile">
    <!-- 尾部 -->
    <div class="mdui-container" style="padding-bottom:0px;">
    <div class="mdui-row">

      <form v-on:submit.prevent="editUser">
              <div class="mdui-col-xs-12 formbg">
          <h1>编辑资料</h1>
          <h4>上传头像<span style="color:red;text-decoration: none;font-weight:normal"> 建议比例1：1</span></h4>
          <!-- 文件上传组件 -->
          <el-upload
            action="http://juapi.qiangssvip.com/api/uploadheadpicture"
            ref="upload"
            name="userPicture"
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
          <div class="mdui-textfield ">
            <label class="mdui-textfield-label">密码</label>
            <input class="mdui-textfield-input" type="password" v-model="user.userPassword" required/>
            <div class="mdui-textfield-error">密码不能为空</div>
          </div>
          <!-- 单行文本框 -->
          <div class="mdui-textfield ">
            <label class="mdui-textfield-label">姓名</label>
            <input class="mdui-textfield-input" type="text" v-model="user.userName"/>
          </div>
          <!-- 性别 -->
            <label class="mdui-radio">
                <input type="radio" name="group1" value="男" v-model="param"/>
                <i class="mdui-radio-icon"></i>
                男
            </label>
            
            <label class="mdui-radio" style="margin-left:30px;">
                <input type="radio" name="group1" value="女" v-model="param"/>
                <i class="mdui-radio-icon"></i>
                女
            </label>
          <!-- 单行文本框 -->
          <div class="mdui-textfield ">
            <label class="mdui-textfield-label">签名</label>
            <input class="mdui-textfield-input" type="text" v-model="user.userSlogan"/>
          </div>
          <div class="mdui-textfield ">
            <label class="mdui-textfield-label">手机</label>
            <input class="mdui-textfield-input" type="text" pattern="^1(3|4|5|6|7|8|9)\d{9}$" v-model="user.userPhone"/>
            <div class="mdui-textfield-error">手机号格式错误</div>
          </div>
          <div class="mdui-textfield ">
            <label class="mdui-textfield-label">邮箱</label>
            <input class="mdui-textfield-input" type="email" v-model="user.userEmail"/>
            <div class="mdui-textfield-error">邮箱格式错误</div>
          </div>
          
          <!-- 多行文本框 -->
          <div class="mdui-textfield">
            <textarea class="mdui-textfield-input" rows="4" placeholder="简介" v-model="user.userProfile" ></textarea>
          </div>

          <!-- <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent mdui-float-right mdui-color-theme-400" style="top:10px;margin-left:13px;" v-on:click="submitting = !submitting">立即创建</button> -->
          <!-- <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent mdui-float-right mdui-color-theme-400" style="top:10px;margin-left:13px;" v-on:click="creatalbum">立即创建</button> -->
          <input type="submit" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent mdui-float-right mdui-color-theme-400" style="top:10px;margin-left:13px;" value="提交更新" v-bind:disabled="submitting" />
          
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
        // 默认性别
        param:(JSON.parse(this.$store.state.user)).userSex,
        // 当前用户资料
        user:JSON.parse(this.$store.state.user),
      fileList: [{name: (JSON.parse(this.$store.state.user)).userPicture, url: this.$global.globalPictureUrl + (JSON.parse(this.$store.state.user)).userPicture}],
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
  name: "EditProfile",
  created() {
    // console.log(jquery("h1"));
    let sysuser = (JSON.parse(this.$store.state.user)).userId;
    console.log(sysuser);
   
  },
  methods:{
    //文件上传成功的钩子函数
        handleSuccess(res, file) {
            
            if (file.response.success) {
                this.$message({
                    type: 'success',
                    message: '图片上传成功',
                    duration: 1500
                });
                // this.editor.picture = file.response.message; //将返回的文件储存路径赋值picture字段
                this.user.userPicture = file.response.message; //将返回的文件储存路径赋值picture字段
                console.log(this.user);
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
                    console.log(this.user);
                    if(this.user.userPicture == '/headpicture/defaultpicture.png'){
                        // 如果用户用户向删除的图片为系统默认头像，则只清空前端图图片列表，不调用删除图片api从服务器删除
                        // alert("则只清空前端图图片列表");
                        this.$refs.upload.clearFiles();

                    }else{
                        // 调用删除图片api从服务器删除
                        // alert("从服务器删除图图片");

                            this.$http.post("/api/deluserpicture",this.user,{
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
                    }


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
        editUser: function() {
            console.log(this.user);
            // 显示loding
            this.submitting = true;
            if (this.user.userPicture != '') {
                // alert("一切准备就绪,提交吧");
                this.user.userSex = this.param;
                // alert(this.param);

                this.$http.post("/api/edituser", this.user, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }

                }).then(response => {
                    // console.log(response);
                    // console.log(typeof response.data);
                    console.log(response.data);
                    // alert("成功回调");
                    this.submitting = false;

                    if (response.data.success == true) {

                        mdui.snackbar({
                            message: response.data.message,
                            position: 'right-bottom'
                        });
                        // 把vuex里的东西重新保存
                        this.$store.commit('GET_USER', JSON.stringify(this.user));
                        // this.$store.state.user = this.user;

                    } else {
                        mdui.snackbar({
                            message: response.data.message,
                            position: 'right-bottom'
                        });
                        this.submitting = false;
                    }

                }),
                    function (response) {
                        // 响应错误回调
                        alert("未知错误");
                        this.submitting = false;
                    };




            } else {
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
