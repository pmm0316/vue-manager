// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import aweDnd from 'awe-dnd'
import vddl from 'vddl'
import store from './store'
import './common/element'

Vue.config.productionTip = false
Vue.use(aweDnd)
Vue.use(vddl)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})