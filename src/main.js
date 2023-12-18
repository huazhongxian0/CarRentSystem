import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import * as echarts from 'echarts'
import $ from 'jquery'
const errorHandler = (error, vm) => {
  console.error('抛出全局异常')
  console.error(vm)
  console.error(error)
}

Vue.config.errorHandler = errorHandler
Vue.prototype.$throw = (error) => errorHandler(error, this)
window.jQuery = $
window.$ = $
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.axios = axios
// Vue.use(axios)
window.history.pushState(null, null, window.location.href)
window.addEventListener('popstate', function () {
  window.history.forward(-1)
  window.history.pushState(null, null, window.location.href)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// console.log('=========')
// console.log(a.$store)
// console.log('=========')
