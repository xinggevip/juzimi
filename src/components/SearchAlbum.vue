<template>
  <div class="searchalbum">
    <div class="mdui-container">
      <div class="mdui-row" id="listfather">

        <div class="mdui-row-xs-3 mdui-row-md-5">

          <h3 v-if="albums.length == 0">什么都没有，赶快创建一个专辑吧</h3>

          <div class="mdui-col wbj" v-for="album in albums" :key="album.albumId">
            
            <router-link href="javascript:;" class="kuang"  v-bind:to="'/classify/'+ $route.params.classifyid +'/album/' + album.albumId">
              <!-- <img class="picture" :src="album.album_picture" alt /> -->
              <!-- 动态绑定style属性 -->
              <div class="tu mdui-hoverable" v-bind:style="{ 'background-image': 'url(' + album.albumPicture + ')'}">
                
              </div>
              <div class="xian">
                <a class="title" href="javascript:;">{{album.albumName}}</a>
              </div>
            </router-link>
          </div>
        </div>



      </div>

    <div class="mdui-row">

        <!-- 没有数据了 -->
        <p v-if="!next" class="nulldata">——我是有底线的——</p>
      
        <button v-if="next && !load" class="mdui-btn mdui-btn-raised mdui-ripple mdui-center" v-on:click="onload()">点击加载更多</button>

        <!-- load -->
        <div v-if="load" class="mdui-spinner mdui-center"><div class="mdui-spinner-layer "><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div></div>
      
    </div>

    </div>

    

  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";

export default {
  name:"SearchAlbum",
  components: {
     Footer
   },
  data() {
    return {
      albums: [],
      load:true,
      more:[],
      next:false,
      // 请求参数  1.分类id  2.从第几页开始查 3.查多少条记录
      albumRequestByAuto:{
        //   classifyId:Number(this.$route.params.classifyid),
          keyy:this.keyy,
          pageNum:1,
          pageSize:10
      }
    };
  },
  props:{
      keyy:String
  },
  watch:{
      'keyy':function(){
          // this.reData();
          this.fetchCustomers();
      }
  },
  mounted() {
    this.$$.mutation();
    // 获取图片宽度，
    // 根据一定比例设置图片高度
    // 监听窗口大小
    
  },
  methods: {
    
    // Get数据
    fetchCustomers() {
      this.albums = [];
      this.onload = true;
      this.albumRequestByAuto.pageNum = 1;
      this.albumRequestByAuto.keyy = this.keyy;
      console.log(this.albumRequestByAuto);
      this.$http.post("/api/searchalbum",this.albumRequestByAuto,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        }

      }).then(response => {
        // 响应成功回调
        // 打印获取到的数据
        console.log(response.data);
        // 赋值
        let arr = response.data.albumList;
        this.next = response.data.next;
        arr.forEach((item, index) => {
          item.albumPicture = this.$global.globalPictureUrl + item.albumPicture;
          // console.log(item);
          this.albums.push(item);
        })
        this.load = false;
      }),
        function(response) {
          // 响应错误回调
          alert("未知错误");
        };



    },
    onload:function(){
      // alert("hjk");
      this.load = true;
      // 请求一次  页码加一
      this.albumRequestByAuto.pageNum = this.albumRequestByAuto.pageNum + 1;
      console.log(this.albumRequestByAuto);
      this.$http.post("/api/searchalbum",this.albumRequestByAuto,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        }

      }).then(response => {
        // 响应成功回调
        // 打印获取到的数据
        console.log(response.data);
        // 赋值
        let arr = response.data.albumList;
        this.next = response.data.next;
        arr.forEach((item, index) => {
          item.albumPicture = this.$global.globalPictureUrl + item.albumPicture;
          // console.log(item);
          this.albums.push(item);
        })
        this.load = false;
      }),
        function(response) {
          // 响应错误回调
          alert("未知错误");
        };


    },
    // writer:function(num){
    //   // this.$$.alert(num);
    //   this.$router.push({path:'/createalbum'});
    // }
    tocreatealbum:function(){
      this.$router.push({path:'/classify/'+ this.$route.params.classifyid +'/createalbum'});
    }
  },
  created() {
    this.fetchCustomers();
    // this.onload();
    // this.$$.mutation();
    // var inst = new mdui.Tab('#tab');
    // // 刷新网页选项卡选中电影选项
    // inst.show('tab2');

    console.log("此分类的id为：" + this.$route.params.classifyid);
  }
  
};
</script>

<style lang="less">
.kuang{
  width: 100%;
  text-decoration: none;
}
.tu{
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
.picture {
  width: 100%;
  height: 100%;
}
.title {
  width: 100%;
  text-decoration: none;
  color: #333;
  font-weight: 900;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.xian {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30px;
}
.wbj {
  margin-bottom: 5px;
  // box-sizing:border-box;
  // padding: 10px;
}
.nulldata{
  text-align: center;
  color: #333;
  line-height: 30px;

}
</style>
