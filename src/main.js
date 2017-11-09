// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './state'
import VueAnalytics from 'vue-analytics'


Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-66586414-1',
  checkDuplicatedScript: true
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
