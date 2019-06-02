/**
 * Date: 2019/5/1
 * Author: mingmingbuzai
 * Email: 847679250@qq.com
 */
import Vue from 'vue'
import Component from './func-notification'
const NotificationContructor = Vue.extend(Component)

const instances = []
let seed = 0
const notify = (options) => {
  if (Vue.prototype.$isServer) return
  let {
    closeTime,
    ...rest
  } = options
  let instance = new NotificationContructor({
    propsData: {
      ...rest
    },
    data () {
      return {
        closeTime: !closeTime ? 3000 : closeTime
      }
    }
  }).$mount()
  let id = `notification_${seed++}`
  instance.id = id
  document.body.appendChild(instance.$el)
  instance.visible = true
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  // 监听提示框消失
  autoClose(instance)
  // 关闭按钮
  instance.$on('close', () => {
    instance.visible = false
  })
  instances.push(instance)
  return instance.vm
}

/**
 * 自动关闭
 * @param instance
 */
const autoClose = (instance) => {
  instance.$on('closed', () => {
    removeInstance(instance)
    instance.$destroy()
    document.body.removeChild(instance.$el)
  })
}

/**
 * 移除提示框dom
 * @param instance
 */
const removeInstance = (instance) => {
  if (!instance) return
  let index = instances.findIndex(item => item.id === instance.id)
  let len = instances.length
  instances.splice(index, 1)
  if (index > 1) {
    for (let i = index; i < len - 1; i++) {
      instances[i].verticalOffset = instances[i].verticalOffset - instance.selfHeight - 16
    }
  }
}

export default notify
