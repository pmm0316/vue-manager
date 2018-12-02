/**
 * CREATED DATE: 2018/12/1 12:23:12
 * author: Absent Min
 * email: 847679250@qq.com
 */
import * as types from './types'
const mutations = {
  [types.SET_TABS] (state, tabs) {
    state.closableTabs = tabs
  },
  [types.SET_CLOSABLE_TABS_VALUE] (state, value) {
    state.closableTabsValue = value
  }
}

export default mutations
