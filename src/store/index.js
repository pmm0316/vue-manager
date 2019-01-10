/**
 * CREATED DATE: 2018/12/1 12:22:12
 * author: Absent Min
 * email: 847679250@qq.com
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import echarts from './modules/echarts'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  modules: {
    echarts
  }
})
