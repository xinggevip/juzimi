<template>
  <div class="search">
    
    
    <div class="mdui-container">
      <div class="mdui-row">
        <div class="mdui-col-md-12">
          <div class="mdui-row">
            <div style="margin-top: 15px;">
                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="搜句子" value="1"></el-option>
                    <el-option label="搜专辑" value="2"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="toSearch()"></el-button>
                </el-input>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SearchSen :keyy="searchKey" v-if="select === '1'" />
    <SearchAlbum v-bind:keyy="searchKey" v-if="select === '2'" />



    <Footer></Footer>
  </div>
</template>

<script>
import SearchSen from "@/components/SearchSen.vue"
import SearchAlbum from "@/components/SearchAlbum.vue"
// @ is an alias to /src
import Header from '@/components/Header.vue'
// import Header from '@/components/Header.vue'
import Footer from "@/components/Footer.vue";

export default {
  data() {
    return {
        input3: '',
        select: '1',
        searchKey:'',
    };
  },
  name: "search",
  components: {
    Header,
    Footer,
    SearchSen,
    SearchAlbum
  },
  mounted() {
    this.$$.mutation();
  },

  methods: {
    // 去搜索
      toSearch:function(){
          this.searchKey = this.input3;
      },
  },
  created() {
    this.searchKey = this.$route.query.key;
    //   this.$route.query.alert
    console.log(this.$route.query.key);
    this.input3 = this.$route.query.key;
  }
};
</script>

<style lang="less" >
 .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>