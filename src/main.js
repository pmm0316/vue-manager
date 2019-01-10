// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import aweDnd from 'awe-dnd'
import vddl from 'vddl'
import store from './store'
import './common/element'
import 'jquery'
import 'jquery-ui'
import Notification from './component/notification'

Vue.config.productionTip = false
/**
 * 注册全局组件
 */
Vue.use(aweDnd)
Vue.use(vddl)
Vue.use(Notification)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
