<template>
    <div>
        <el-button @click="notify" type="primary">notify</el-button>
    </div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    notify () {
      this.$myNotify({
        content: 'test2323 test',
        autoClose: 4000
      })
    }
  }
}
</script>
