import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import './plugins/element'
import router from './router'
import EleForm from 'vue-ele-form'


// 注册 vue-ele-form
Vue.use(EleForm)

Vue.config.productionTip = false


//引入axios
Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:3000'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
