<template>
  <div class="about">
    <div class="mdui-container">
      <div class="mdui-row" id="listfather">

        <div class="mdui-row-xs-3 mdui-row-md-5">
          <div class="mdui-col wbj" v-for="album in albums" :key="album.album_id">
            <a href="javascript:;" class="title">
              <img class="picture" :src="album.album_picture" alt />
              <br />
              <div class="xian">
                <a class="title" href="javascript:;">{{album.album_name}}</a>
              </div>
            </a>
          </div>
        </div>

      </div>

    <div class="mdui-row">
      <mdui-row-xs-12>
        <button v-if="!load" class="mdui-btn mdui-btn-raised mdui-ripple mdui-center" v-on:click="onload()">点击加载更多</button>

        <!-- load -->
        <div v-if="load" class="mdui-spinner mdui-center"><div class="mdui-spinner-layer "><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div></div>
      </mdui-row-xs-12>
    </div>

    </div>





    <Footer></Footer>

  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";

export default {
  components: {
     Footer
   },
  data() {
    return {
      albums: [],
      load:false,
      more:[]
    };
  },

  mounted() {
    this.$$.mutation();
    
  },
  methods: {
    // Get数据
    fetchCustomers() {
      this.$http.get("http://localhost:3000/album").then(response => {
        // 响应成功回调
        // 打印获取到的数据
        console.log(response);
        // 把数据赋值给customers
        this.albums = response.data;
        console.log(this.albums);
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



      

      // 遍历数组append添加标签
      
      

    }
  },
  created() {
    this.fetchCustomers();
    // this.$$.mutation();
    // var inst = new mdui.Tab('#tab');
    // // 刷新网页选项卡选中电影选项
    // inst.show('tab2');
  }
};
</script>

<style lang="less">
.picture {
  width: 100%;
  border-radius: 5px;
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
}
.wbj {
  margin-bottom: 16px;
  // box-sizing:border-box;
  // padding: 10px;
}
</style>
