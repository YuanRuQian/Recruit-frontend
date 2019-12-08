

module.exports = {

  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    open: true,    //是否自动打开浏览器
    proxy: { // 配置跨域
      '/api': {
        target: 'http://47.100.227.73:8080/kidney-disease-1.0.0-RELEASE/',
        ws: true,
        changOrigin: true,    //是否开启代理
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  }
};
