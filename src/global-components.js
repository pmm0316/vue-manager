/**
 * CREATED DATE: 2019/1/24 09:59:46
 * author: mingmingbuzai
 * email: 847679250@qq.com
 */
import Vue from 'vue'
import MyTree from './component/my-tree/MyTree'
import MyTitle from './component/my-title/MyTitle'

Vue.component('Notification', Notification)
Vue.component('MyTree', MyTree)
Vue.component('MyTitle', MyTitle)

Vue.use(MyTree)
Vue.use(MyTitle)
