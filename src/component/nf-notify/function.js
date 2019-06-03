/**
 * Date: 2019/6/1
 * Author: mingmingbuzai
 * Email: 847679250@qq.com
 * @Last Modified time: 2019/6/1
 */
import Vue from 'vue'
import NiufuNotify from './niufu-notify'

const NotifyConstructor = Vue.extend(NiufuNotify)
const instances = []
let id = 0

const notify = (options) => {
  let {onClose, ...rest} = options
  let instance = new NotifyConstructor({
    propsData: {
      ...rest
    }
  })
  instance.id = `notify_${id++}`
  instance.$mount()
  let offsetBottom = 0
  instances.forEach(item => {
    offsetBottom += item.$el.offsetHeight + 16
  })
  offsetBottom += 16
  instance.offsetBottom = offsetBottom || 16
  instances.push(instance)
  document.body.appendChild(instance.$el)
  instance.visible = true
  removeInstance(instance, onClose)
}

/**
 * 移除组件
 * @param instance
 * @param onClose 关闭方法
 */
const removeInstance = (instance, onClose) => {
  if (!instance) {
    return
  }
  instance.$on('closed', () => {
    let index = instances.findIndex(item => item.id === instance.id)
    let len = instances.length
    let height = instance.height
    instances.splice(index, 1)
    if (len > 1) {
      for (let i = index; i < len - 1; i++) {
        instances[i].offsetBottom = instances[i].offsetBottom - height - 16
      }
    }
    instance.$destroy()
  })
  instance.$on('close', () => {
    instance.visible = false
    onClose()
  })
}

export default notify
