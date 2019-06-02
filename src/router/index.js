import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../pages/dashboard'
import Button from '../pages/element-ui/Button'
import Icon from '../pages/element-ui/Icon'
import ColorPicker from '../pages/element-ui/ColorPicker'
import Dnd from '../pages/drag/Dnd'
import Vddl from '../pages/drag/Vddl'
import ChartBasic from '../pages/echarts/Basic'
import ChartCustom from '../pages/echarts/custom/Custom'
import Schedule from '../pages/calendar/schedule'
import Module from '../pages/vuex/Module'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/elementUI/button',
      name: 'Button',
      component: Button
    },
    {
      path: '/elementUI/icon',
      name: 'Icon',
      component: Icon
    },
    {
      path: '/elementUI/colorPicker',
      name: 'ColorPicker',
      component: ColorPicker
    },
    {
      path: '/drag/dnd',
      name: 'Dnd',
      component: Dnd
    },
    {
      path: '/drag/vddl',
      name: 'Vddl',
      component: Vddl
    },
    {
      path: '/eCharts/basic',
      name: 'ChartBasic',
      component: ChartBasic
    },
    {
      path: '/eCharts/custom',
      name: 'ChartCustom',
      component: ChartCustom
    },
    {
      path: '/calendar/schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/vuex/module',
      name: 'Module',
      component: Module
    }
  ]
})
