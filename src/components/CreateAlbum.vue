<template>
  <div class="createalbum">
    <!-- 尾部 -->
    <div class="mdui-container" style="padding-bottom:0px;">
    <div class="mdui-row">
      <div class="mdui-col-xs-12 formbg">
          <h1>创建专辑</h1>
          <h4>上传专辑封面<span style="color:red;text-decoration: none;font-weight:normal"> 建议比例1：1.5</span></h4>
          <!-- 文件上传组件 -->
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :file-list="fileList">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
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
            <input class="mdui-textfield-input" type="text"/>
          </div>
          <!-- 多行文本框 -->
          <div class="mdui-textfield">
            <textarea class="mdui-textfield-input" rows="4" placeholder="专辑介绍"></textarea>
          </div>

          <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent mdui-float-right mdui-color-theme-400" style="top:10px;margin-left:13px;" v-on:click="submitting = !submitting">立即创建</button>
          <!-- load -->
            <div v-if="submitting" class="mdui-spinner mdui-float-right" style="top:13px;"><div class="mdui-spinner-layer "><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div></div>
      </div>
        
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
      submitting:false,
      fileList:[],
      disabled:false,
      dialogVisible:false,
      dialogImageUrl:null

    };
  },
  name: "createalbum",
  created() {
    console.log(jquery("h1"));
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
