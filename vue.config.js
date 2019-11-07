// module.exports = {
//   devServer: {
//     port: 8081,
//     // proxy: 'http://localhost:8080',
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8080',
//         ws: true,
//         changeOrigin: true
//     }
//   }
// }

module.exports = {
  outputDir:"F:/GitSpace/IdeaJava/JuzimiMaven/src/main/webapp",
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true
      }
    }
  }
}

