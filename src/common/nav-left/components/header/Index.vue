<template>
    <div class="header">
      <div class="icon-wrapper" @click="handleIconClick">
        <i class="iconfont" :class="{ 'icon-caidan': isActive, 'icon-webicon03-copy': !isActive }"></i>
      </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import { SET_MENU_IS_COLLAPSE, SET_ASIDE_WIDTH } from '@/store/types'

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
      this.setIsCollapse()
      this.setAsideWidth()
    },
    ...mapMutations({
      setIsCollapse: SET_MENU_IS_COLLAPSE,
      setAsideWidth: SET_ASIDE_WIDTH
    })
  }
}
</script>

<style scoped lang='scss'>
  @import '../../../../style/common.scss';
  .header {
    height: 49px;
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
        cursor: pointer;
      }
    }
  }
</style>
