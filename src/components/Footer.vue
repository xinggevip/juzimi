<template>
  <div class="ifooter">
    <!-- 尾部 -->
    <div class="mdui-container">
    <div class="mdui-row">
        <div class="mdui-color-theme-100 mdui-col-xs-12" id="content-footer">Copyright © 2019 - 2019 Tencent. All Rights Reserved. 句子迷 版权所有 <a href="https://github.com/xinggevip" target="_blank">项目源码</a></div>
    </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "ifooter"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#content-footer {   
    // position:fixed;
    bottom: 0px;
    padding: 30px;
}
.mdui-container{
  padding-bottom: 0px;
}
</style>
