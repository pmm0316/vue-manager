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
      <el-button @click="notify">提示</el-button>
      <el-button @click="handleELNotify">el-提示</el-button>
    </div>
</template>

<script>
export default {
  name: 'Icon',
  methods: {
    notify () {
      this.$niuFuNotify({
        message: 'test test test',
        type: 'info',
        autoClose: 0,
        onClose: () => {
          console.log('自定义的关闭')
        }
      })
    },
    handleELNotify () {
      this.$notify({
        title: '消息',
        onClose () {
          console.log('aaaagag')
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
  i, el-button {
    margin-right: 20px;
  }
</style>
