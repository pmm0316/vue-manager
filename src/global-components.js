/**
 * CREATED DATE: 2019/1/24 09:59:46
 * author: mingmingbuzai
 * email: 847679250@qq.com
 */
import Vue from 'vue'
import MyTree from './component/my-tree/MyTree'
import MyNotify from './component/my-notify'
import NiuFuNotify from './component/nf-notify'

Vue.component('MyTree', MyTree)
Vue.component(MyNotify.name, MyNotify)
Vue.use(MyNotify)
Vue.use(NiuFuNotify)
