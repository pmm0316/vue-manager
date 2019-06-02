/**
 * Date: 2019/6/1
 * Author: mingmingbuzai
 * Email: 847679250@qq.com
 * @Last Modified time: 2019/6/1
 */
import NiuFuNotify from './NiuFuNotify'

const typeList = [
  {
    type: 'success',
    name: '成功',
    classNames: 'el-icon-success'
  },
  {
    type: 'error',
    name: '失败',
    classNames: 'el-icon-error'
  },
  {
    type: 'info',
    name: '消息',
    classNames: 'el-icon-info'
  }
]
export default {
  extends: NiuFuNotify,
  data () {
    return {
      offsetBottom: 0,
      height: 0
    }
  },
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.offsetBottom}px`
      }
    },
    typeClass () {
      let item = typeList.find(item => item.type === this.type)
      return item.classNames || ''
    },
    title () {
      let item = typeList.find(item => item.type === this.type)
      return item.name || ''
    }
  },
  methods: {
    afterEnter () {
      this.height = this.$el.offsetHeight
    },
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    }
  },
  mounted () {
    this.createTimer()
  },
  beforeDestroy () {
    this.clearTimer()
  }
}
