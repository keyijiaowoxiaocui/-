const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 打包
  publicPath:'./',
  transpileDependencies: true,
  lintOnSave:false,  //关闭语法检查
  
  devServer:{
    // lintOnSave:false,  //关闭语法检查
    open: true,
    proxy: {
      '/api': {
        target: 'http://xiax.e1.luyouxia.net:22656',
        changeOrigin: true, //允许跨域
      }
    }
  }
})

// module.exports = {
//     // 打包
//   publicPath:'./',
  

