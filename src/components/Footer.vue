<template>
  <div class="hello">
    <!-- 尾部 -->
    <div class="mdui-container">
    <div class="mdui-row">
        <!-- <div class="mdui-col-xs-12"></div> -->
        <div class="mdui-color-theme-100 mdui-col-xs-12" id="content-footer">Copyright</div>
    </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "footer"
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
