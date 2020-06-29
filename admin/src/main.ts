import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import './plugins/element'
import './plugins/avue'

import router from './router'


// import EleForm from 'vue-ele-form'
// // 注册 vue-ele-form
// Vue.use(EleForm)

Vue.config.productionTip = false

const http =  axios.create({
  baseURL:'http://localhost:3000'
})

//给Avue上传使用
Vue.prototype.$httpajax= http

//引入axios（请求接口）
Vue.prototype.$http = http
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
