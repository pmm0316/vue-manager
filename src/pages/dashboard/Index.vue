<template>
    <div>
      <Button @click="notify">notify</Button>
    </div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    notify () {
      this.$myNotify({
        content: 'test test',
        closeText: 'close'
      })
    }
  },
  mounted () {
  }
}
</script>
