// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'
import axios from 'axios'

Vue.prototype.$http = axios.create({
  // baseURL: 'http://localhost:3000/api'
  baseURL: 'http://35.187.249.166/api'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
