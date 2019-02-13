<template>
    <div>Module</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('echarts')
export default {
  name: 'Module',
  computed: {
    ...mapGetters(['chartList'])
  },
  mounted () {
    console.log('modules', this.chartList)
  }
}
</script>
