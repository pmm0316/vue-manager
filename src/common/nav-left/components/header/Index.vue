<template>
    <div class="header">
      <div class="icon-wrapper" @click="handleIconClick">
        <i class="iconfont" :class="{ 'icon-caidan': isActive, 'icon-webicon03-copy': !isActive }"></i>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      isActive: true
    }
  },
  methods: {
    handleIconClick () {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style scoped lang='scss'>
  @import '../../../../style/common.scss';
  .header {
    height: 52px;
    width: 100%;
    background-color: $header-bg-color;
    .icon-wrapper {
      margin-top: 8px;
      color: #fff;
      width: 48px;
      height: 38px;
      text-align: center;
      float: right;
      .iconfont {
        font-size: 36px;
      }
    }
  }
</style>
