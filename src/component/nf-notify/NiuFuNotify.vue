<template>
  <transition name="fade" @after-enter="afterEnter" @after-leave="afterLeave" mode="out-in">
    <div class="notification" :style="style" v-if="visible" @mouseover="clearTimer" @mouseout="createTimer">
      <div class="top-wrapper">
        <i :class="typeClass"></i>
        <i class="title">{{title}}</i>
        <i class="el-icon-close" @click="handleClose"></i>
      </div>
      <div class="message">{{message}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'nf-notify',
  data () {
    return {
      visible: false
    }
  },
  props: {
    type: {
      default: 'success',
      type: String
    },
    message: {
      default: '这是一条提示信息',
      type: String
    },
    autoClose: {
      default: 3000,
      type: Number
    }
  },
  computed: {
    typeClass () { return '' },
    title () {
      return '标题'
    },
    style () {
      return {}
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    afterEnter () {},
    afterLeave () {
      this.$emit('closed')
    },
    clearTimer () {},
    createTimer () {}
  }
}
</script>

<style scoped lang="scss">
  .notification {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    width: 220px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background-color: #fff;
    transition: bottom .3s;
    .message {
      font-size: 14px;
    }
    .top-wrapper {
      margin-bottom: 10px;
      .el-icon-success {
        margin-right: 4px;
        color: #67c23a;
      }
      .el-icon-error {
        color: #f56c6c;
      }
      .el-icon-info {
        color: #909399;
      }
      .title {
        display: inline-block;
        font-size: 15px;
        font-weight: bold;
      }
      .el-icon-close {
        float: right;
        cursor: pointer;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
