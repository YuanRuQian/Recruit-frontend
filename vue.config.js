

module.exports = {

  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: { // 配置跨域
      '/api': {
        target: 'http://47.100.227.73:8080/recruit/api',
        ws: true,
        changOrigin: true,    //是否开启代理
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
