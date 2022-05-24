const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  // devServer:{
  //   proxy:{
  //     "/api":{
  //       target:"http://8.219.72.10:9000",
  //       changeOrigin: true,
  //       pathRewrite:{"^/api":""}
  //     }
  //   }
  // }
})
