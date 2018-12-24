/**
 * CREATED DATE: 2018/12/1 12:23:12
 * author: Absent Min
 * email: 847679250@qq.com
 */
import * as types from './types'

const collapseWidth = '55px' // 折叠后的宽度
const notCollapseWidth = '250px' // 不折叠后的宽度
const mutations = {
  [types.SET_TABS] (state, tabs) {
    state.closableTabs = tabs
  },
  [types.SET_CLOSABLE_TABS_VALUE] (state, value) {
    state.closableTabsValue = value
  },
  [types.SET_MENU_IS_COLLAPSE] (state) {
    state.menuIsCollapse = !state.menuIsCollapse
  },
  [types.SET_ASIDE_WIDTH] (state) {
    state.asideWidth = state.asideWidth === collapseWidth ? notCollapseWidth : collapseWidth
  }
}

export default mutations
