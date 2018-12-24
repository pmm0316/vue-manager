<template>
    <el-container>
      <el-aside :width="asideWidth">
        <nav-left/>
      </el-aside>
      <el-container>
        <el-header>
          <main-header/>
        </el-header>
        <el-main>
          <tabs/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import NavLeft from '../common/nav-left'
import MainHeader from '../common/header'
import Tabs from '../common/tabs'
import {mapGetters} from 'vuex'

export default {
  name: 'Admin',
  components: {
    NavLeft,
    MainHeader,
    Tabs
  },
  computed: {
    ...mapGetters(['asideWidth'])
  }
}
</script>

<style scoped lang='scss'>
  @import '../style/common.scss';
  .el-container {
    .el-aside {
      background-color: $theme-color;
      height: calc(100vh);
    }
    .el-container {
      .el-header {
        padding: 0;
      }
      .el-main {
        padding: 0 10px;
      }
    }
  }
</style>
