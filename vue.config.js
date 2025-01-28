const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 7001,
    proxy: { // 使用 devServer.proxy 进行跨域配置
      '/api': {
        target: 'http://localhost:9991', // 请求后台接口
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 重写请求
        }
      }
    }
    }
})
