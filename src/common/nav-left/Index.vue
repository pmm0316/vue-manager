<template>
    <div>
      <nav-header/>
      <nav-menu/>
    </div>
</template>

<script>
import NavHeader from './components/header'
import NavMenu from './components/menu'
export default {
  name: 'Index',
  components: {
    NavHeader,
    NavMenu
  }
}
</script>

<style scoped lang='scss'>

</style>
