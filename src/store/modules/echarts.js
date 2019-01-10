const state = {
  chartList: []
}

const getters = {
  chartList: state => state.chartList
}
const mutations = {
  addChart (state, option) {
    state.chartList.push(option)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
