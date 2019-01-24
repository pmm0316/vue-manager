/**
 * CREATED DATE: 2019/1/24 09:59:46
 * author: mingmingbuzai
 * email: 847679250@qq.com
 */
import Vue from 'vue'
import Notification from './component/notification/Notification'
import MyTree from './component/my-tree/MyTree'
import TestJSX from './component/TestJSX'
Vue.component('TestJSX', TestJSX)
Vue.component('Notification', Notification)
Vue.component('MyTree', MyTree)

Vue.use(TestJSX)
Vue.use(Notification)
Vue.use(MyTree)
