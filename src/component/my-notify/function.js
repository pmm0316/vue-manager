/**
 * Date: 2019/6/1
 * Author: mingmingbuzai
 * Email: 847679250@qq.com
 * @Last Modified time: 2019/6/1
 */
import Vue from 'vue'
import NotifyComponent from './func-notify'

const NotifyConstructor = Vue.extend(NotifyComponent)
const instances = []
let id = 0

const notify = (options) => {
  let {
    autoClose,
    ...rest
  } = options
  let component = new NotifyConstructor({
    propsData: {
      ...rest
    },
    data () {
      return {
        autoClose: autoClose
      }
    }
  })
  component.$mount()
  component.id = `notify_${id++}`
  let screenBottomHeight = 0
  instances.forEach(item => {
    screenBottomHeight += item.$el.offsetHeight + 16
  })
  removeComponent(component)
  screenBottomHeight += 16
  component.screenBottomHeight = screenBottomHeight
  instances.push(component)
  document.body.appendChild(component.$el)
  component.visible = true
  return component
}

/**
 * 移除组件
 * @param component
 */
const removeComponent = (component) => {
  if (!component) {
    return
  }
  component.$on('closed', () => {
    let index = instances.findIndex(item => component.id === item.id)
    let len = instances.length
    let height = component.height
    instances.splice(index, 1)
    if (len > 1) {
      for (let i = index; i < len - 1; i++) {
        instances[i].screenBottomHeight = instances[i].screenBottomHeight - height - 16
      }
    }
    component.$destroy()
  })
  component.$on('close', () => {
    component.visible = false
  })
}
export default notify
