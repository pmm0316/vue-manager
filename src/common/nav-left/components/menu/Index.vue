<template>
    <div class="menu">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b">
        <div v-for="item in menuList" :key="item.key">
          <el-menu-item
            :index="item.order"
            v-if="!item.children"
            @click="handleMenuItemClick(item)">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <el-submenu
            :show-timeout="200"
            :index="item.order" v-else>
            <template slot="title">
              <i class="el-icon-news"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item
              @click="handleMenuItemClick(children)"
              :index="children.order"
              v-for="children in item.children"
              :key="children.key">
              {{children.title}}
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import { SET_TABS, SET_CLOSABLE_TABS_VALUE } from '@/store/types'
export default {
  name: 'Menu',
  data () {
    return {
      menuList: []
    }
  },
  computed: {
    ...mapGetters(['closableTabs'])
  },
  methods: {
    /**
     * 判断tab中是否已经存在menuItem
     * @param tabs
     * @param menuItem
     * @returns {boolean}
     */
    isExistOfTab (tabs, menuItem) {
      let flag = false
      if (tabs.length > 0) {
        tabs.forEach(obj => {
          if (obj.key === menuItem.key) {
            flag = true
          }
        })
      }
      return flag
    },
    /**
     * 点击菜单item事件
     * @param item
     */
    handleMenuItemClick (item) {
      let tabs = this.closableTabs
      if (!this.isExistOfTab(tabs, item)) {
        tabs.push(item)
        this.setTabs(tabs)
      }
      this.setTabsValue(item.order)
      this.$router.push(item.url)
    },
    ...mapMutations({
      setTabs: SET_TABS,
      setTabsValue: SET_CLOSABLE_TABS_VALUE
    })
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
