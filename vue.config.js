module.exports = {
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        // target: 'http://localhost:8080',
        target: 'http://juapi.qiangssvip.com',
        // target: targetUrl,
        ws: true,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''//需要重写的
        // }
      }
    }
  }
}

