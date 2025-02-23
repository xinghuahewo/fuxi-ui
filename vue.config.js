module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  productionSourceMap: false,  // 禁用 source map
  outputDir: 'dist',          // 输出目录
  assetsDir: 'static',        // 静态资源目录
  devServer: {
    proxy: {
      '/api': {
        target: 'http://your-backend-api',
        changeOrigin: true
      }
    }
  },
  // 其他配置...
};