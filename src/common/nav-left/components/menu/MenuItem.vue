<template>
    <div>
      <template v-if="!item.children">
        <el-menu-item
          :index="item.order"
          @click="handleMenuItemClick(item)">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </template>
      <el-submenu
        v-else
        :show-timeout="200"
        :index="item.order">
        <template slot="title">
          <i class="el-icon-news"></i>
          <span>{{item.title}}</span>
        </template>
        <template v-for="child in item.children">
          <menu-item
            v-if="child.children && child.children.length > 0"
            :item="child"
            :key="child.order"/>
          <el-menu-item
            @click="handleMenuItemClick(child)"
            :key="child.order"
            :index="child.order"
            v-else>
            {{child.title}}
          </el-menu-item>
        </template>
      </el-submenu>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { SET_TABS, SET_CLOSABLE_TABS_VALUE } from '@/store/types'

export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      required: true
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
      // let flag = false
      console.log('menuItem', menuItem)
      console.log('tabs', tabs)
      if (tabs.length > 0) {
        return tabs.some(v => {
          return v.key === menuItem.key
        })
        // tabs.forEach(obj => {
        //   if (obj.order === menuItem.order) {
        //     flag = true
        //   }
        // })
      }
      // return flag
      return false
    },
    /**
     * 点击菜单item事件
     * @param item
     */
    handleMenuItemClick (item) {
      let tabs = this.closableTabs
      this.setTabsValue(item.order)
      this.$router.push(item.url)
      if (this.isExistOfTab(tabs, item)) {
        return
      }
      tabs.push(item)
      this.setTabs(tabs)
    },
    ...mapMutations({
      setTabs: SET_TABS,
      setTabsValue: SET_CLOSABLE_TABS_VALUE
    })
  }
}
</script>

<style scoped lang='scss'>

</style>
