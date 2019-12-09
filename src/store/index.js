import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    currentUser:null,
    //用户名
    currentType:null
    // (登录人员类型(如果登陆失败,type为空,否则type有值 其中 0病人 1健康人 2机构))

  },
  mutations: {

  },
  actions: {


  },
  getters: {

  }
})
