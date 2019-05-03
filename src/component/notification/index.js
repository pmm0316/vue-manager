/**
 * Date: 2019/5/1
 * Author: mingmingbuzai
 * Email: 847679250@qq.com
 */
import Notification from './Notification'
import notify from './function'

export default (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$myNotify = notify
}
