<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Icon图标</span>
        </div>
        <div class="text item">
          <i class="el-icon-edit"></i>
          <i class="el-icon-share"></i>
          <i class="el-icon-delete"></i>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'Icon'
}
</script>

<style scoped lang='scss'>
  i, el-button {
    margin-right: 20px;
  }
</style>
