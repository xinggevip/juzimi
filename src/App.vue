<template>
  <div id="app">
    <!-- <Header></Header> -->
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
   components: {
     Header
   },
   methods:{
     
   }
}
</script>

<style lang="less">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>

<style src="..\node_modules\mdui\dist\css\mdui.min.css"></style>
<style src="..\node_modules\element-ui\lib\theme-chalk\index.css"></style>
<style src="..\node_modules\muse-ui\dist\muse-ui.css"></style>

