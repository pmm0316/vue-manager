<template>
    <el-tabs
      v-model="tabsValue"
      type="card" :closable="true"
      @tab-click="tabClick"
      @tab-remove="handleTabsRemove">
      <el-tab-pane
        :key="item.key"
        v-for="(item) in closableTabs"
        :label="item.title"
        :name="item.order">
        <div class="content">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </div>
      </el-tab-pane>
    </el-tabs>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { SET_TABS, SET_CLOSABLE_TABS_VALUE } from '@/store/types'

export default {
  name: 'Index',
  data () {
    return {
      tabsValue: ''
    }
  },
  computed: {
    ...mapGetters(['closableTabs', 'closableTabsValue'])
  },
  methods: {
    /**
     * 单击tab时触发
     * @param self
     */
    tabClick (self) {
      for (let i = 0; i < this.closableTabs.length; i++) {
        if (this.closableTabs[i].order === self.name) {
          this.$router.push(this.closableTabs[i].url)
          return
        }
      }
      // this.closableTabs.forEach(item => {
      //   if (item.order === self.name) {
      //     this.$router.push(item.url)
      //   }
      // })
    },
    /**
     * 通过order得到当前的路由url
     * @param activeOrder 序号值
     */
    getUrlByOrder (activeOrder) {
      let tab = this.closableTabs.find(v => {
        return v.order === activeOrder
      })
      return tab.url
    },
    /**
     * 移除tab时触发
     * @param targetOrder
     */
    handleTabsRemove (targetOrder) {
      let tabs = this.closableTabs
      if (tabs.length === 1) {
        return
      }
      let activeName = this.closableTabsValue
      if (activeName === targetOrder) {
        tabs.forEach((tab, index) => {
          if (tab.order === targetOrder) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.order
            }
          }
        })
      }
      // 在data中设置当前的activeName的值，使页面变化到目标tab
      this.tabsValue = activeName
      this.setTabs(tabs.filter(tab => tab.order !== targetOrder))
      this.setTabsValue(activeName)
      this.$router.push(this.getUrlByOrder(activeName))
    },
    ...mapMutations({
      setTabs: SET_TABS,
      setTabsValue: SET_CLOSABLE_TABS_VALUE
    })
  },
  watch: {
    closableTabsValue (value) {
      this.tabsValue = value
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang='scss'>
  .el-tab-pane {
    overflow: hidden;
    height: 600px;
    .content {
      height: calc(100%);
      overflow-y: auto;
    }
  }
  /*.fade-enter-active, .fade-leave-active {*/
    /*transition: opacity .3s;*/
  /*}*/
  /*.fade-enter, .fade-leave-to !* .fade-leave-active below version 2.1.8 *! {*/
    /*transition: opacity .2s;*/
    /*opacity: 0;*/
  /*}*/
</style>
