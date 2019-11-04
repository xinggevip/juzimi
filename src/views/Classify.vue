<template>
  <div class="classify">
    <div class="mdui-container">
      <div class="mdui-row" id="listfather">

        <div class="mdui-row-xs-3 mdui-row-md-5">

          <div class="mdui-col wbj" v-for="album in albums" :key="album.album_id">
            
            <router-link href="javascript:;" class="kuang"  v-bind:to="'/classify/'+ $route.params.classifyid +'/album/' + album.album_id">
              <!-- <img class="picture" :src="album.album_picture" alt /> -->
              <!-- 动态绑定style属性 -->
              <div class="tu mdui-hoverable" v-bind:style="{ 'background-image': 'url(' + album.album_picture + ')'}">
                
              </div>
              <div class="xian">
                <a class="title" href="javascript:;">{{album.album_name}}</a>
              </div>
            </router-link>
          </div>
        </div>



      </div>

    <div class="mdui-row">
      
        <button v-if="!load" class="mdui-btn mdui-btn-raised mdui-ripple mdui-center" v-on:click="onload()">点击加载更多</button>

        <!-- load -->
        <div v-if="load" class="mdui-spinner mdui-center"><div class="mdui-spinner-layer "><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div></div>
      
    </div>

    </div>


    <button class="mdui-fab mdui-fab-fixed mdui-color-theme" v-on:click="writer(1)" ><i class="mdui-icon material-icons">add</i></button>


    <Footer></Footer>

  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";

export default {
  name:"classify",
  components: {
     Footer
   },
  data() {
    return {
      albums: [],
      load:true,
      more:[]
    };
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
      this.$http.get("http://localhost:3000/album").then(response => {
        // 响应成功回调
        // 打印获取到的数据
        // console.log(response);
        // 把数据赋值给customers
        this.albums = response.data;
        console.log(this.albums);
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
      this.$http.get("http://localhost:3000/more").then(response => {
        // 响应成功回调
        // 打印获取到的数据
        console.log(response);
        // 把数据赋值给customers
        this.more = response.data;
        console.log(this.more);

        // 遍历数据
        this.more.forEach((item, index) => {
        
        this.albums.push(item);
        this.load = false;


        })
      }),
        function(response) {
          // 响应错误回调
        };
    },
    writer:function(num){
      // this.$$.alert(num);
      this.$router.push({path:'/createalbum'});
    }
  },
  created() {
    this.fetchCustomers();
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
</style>
