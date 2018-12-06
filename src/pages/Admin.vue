<template>
    <el-container>
      <el-aside>
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
export default {
  name: 'Admin',
  components: {
    NavLeft,
    MainHeader,
    Tabs
  }
}
</script>

<style scoped lang='scss'>
  @import '../style/common.scss';
  .el-container {
    .el-aside {
      background-color: $theme-color;
      width: 14%;
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
