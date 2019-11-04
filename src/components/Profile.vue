<template>
  <div class="profile">
    <div class="clearall">
        <div class="mdui-appbar">
        <div class="mdui-toolbar mdui-color-theme">
            <a href="javascript:;" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">arrow_back</i></a>
            <a href="javascript:;" class="mdui-typo-title">主页</a>
            <div class="mdui-toolbar-spacer"></div>
            
        </div>

        
    </div>
    <div class="mdui-container">

        <div class="header">
            <div class="inheader">
                <h1>用户名</h1>
                <p>今天天气不错</p>
            </div>
            
        </div>

        <div class="mdui-tab mdui-tab-full-width mdui-color-white" mdui-tab>
            <a class="mdui-ripple mdui-tab-active" v-on:click.prevent="showissue">发布</a>
            <a class="mdui-ripple" v-on:click.prevent="showlove">收藏</a>
            <a class="mdui-ripple" v-on:click.prevent="showres">资料</a>
        </div>

        <div class="issue" v-if="issue">
            <h1>发布</h1>
        </div>
        <div class="love" v-if="love">
            <h1>收藏</h1>
        </div>
        <div class="res" v-if="res">
            <h1>资料</h1>
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
          issue:true,
          love:false,
          res:false,
      }
  },
  created(){
      mdui.mutation();
  },
  methods:{
      showissue:function(){
          issue:true;
          love:false;
          res:false;
      },
      showlove:function(){
        issue:false;
        love:true;
        res:false;
      },
      showres:function(){
        issue:false;
        love:false;
        res:true;
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>

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
