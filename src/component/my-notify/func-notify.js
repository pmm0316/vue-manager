/**
 * Date: 2019/6/1
 * Author: mingmingbuzai
 * Email: 847679250@qq.com
 * @Last Modified time: 2019/6/1
 */
import MyNotify from './MyNotify'
export default {
  extends: MyNotify,
  name: 'my-notify',
  data () {
    return {
      screenBottomHeight: 0,
      autoClose: 2000,
      height: 0
    }
  },
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.screenBottomHeight}px`,
        visible: false
      }
    }
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(_ => {
          this.visible = false
        }, this.autoClose)
      }
    },
    afterEnter () {
      this.height = this.$el.offsetHeight
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
