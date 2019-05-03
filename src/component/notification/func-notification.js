/**
 * Date: 2019/5/1
 * Author: mingmingbuzai
 * Email: 847679250@qq.com
 */
import Notification from './Notification'

export default {
  extends: Notification,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  data () {
    return {
      verticalOffset: 0,
      closeTime: 3000,
      visible: false,
      selfHeight: 0
    }
  },
  methods: {
    setNotifyTimer () {
      if (this.closeTime) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.closeTime)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      this.selfHeight = this.$el.offsetHeight
    }
  },
  beforeDestroy () {
    this.clearTimer()
  },
  mounted () {
    this.setNotifyTimer()
  }
}
