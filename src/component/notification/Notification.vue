<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div class="notification" :style="style" v-show="visible" @mouseover="clearTimer" @mouseout="setNotifyTimer">
      <span class="content">{{content}}</span>
      <span class="btn" @click.prevent="handleClose">{{closeText}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    content: {
      type: String,
      required: true
    },
    closeText: {
      type: String,
      default: '关闭'
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    handleClose (e) {
      e.preventDefault()
      this.$emit('close')
    },
    afterLeave () {
      this.$emit('closed')
    },
    afterEnter () {},
    setNotifyTimer () {},
    clearTimer () {}
  }
}
</script>

<style scoped lang='scss'>
  .notification {
    display: inline-flex;
    background-color: #303030;
    color: rgba(255, 255, 255, 1);
    align-items: center;
    padding: 20px;
    min-width: 280px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
    flex-wrap: wrap;
    transition: all .3s;
    .content {
      padding: 0;
    }
    .btn {
      color: #ff4081;
      padding-left: 24px;
      margin-left: auto;
      cursor: pointer;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
