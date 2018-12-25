<template>
    <div class="menu">
      <el-menu
        mode="vertical"
        :collapse="menuIsCollapse"
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b">
        <menu-item
          v-for="item in menuList"
          :key="item.order"
          :item="item"/>
      </el-menu>
    </div>
</template>

<script>
import axios from 'axios'
import MenuItem from './MenuItem'
import {mapGetters} from 'vuex'

export default {
  name: 'Menu',
  data () {
    return {
      menuList: []
    }
  },
  components: {
    MenuItem
  },
  computed: {
    ...mapGetters(['menuIsCollapse'])
  },
  mounted () {
    axios.get('/static/api/menu/menuList.json').then(res => {
      this.menuList = res.data.data.menuList
    })
  }
}
</script>

<style scoped lang='scss'>
  @import "../../../../style/common.scss";
  .menu {
    width: 99%;
    .el-menu-vertical-demo {
      border: 1px solid $theme-color;
    }
  }
</style>
