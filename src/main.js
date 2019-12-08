import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import vueAxios from 'vue-axios'
import VueProgressBar from 'vue-progressbar'


Vue.use(vueAxios, axios,VueProgressBar);



Vue.config.productionTip = false;





new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
