import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../pages/dashboard'
import Button from '../pages/element-ui/Button'
import Icon from '../pages/element-ui/Icon'
import Dnd from '../pages/drag/Dnd'
import Vddl from '../pages/drag/Vddl'

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
      path: '/drag/dnd',
      name: 'Dnd',
      component: Dnd
    },
    {
      path: '/drag/vddl',
      name: 'Vddl',
      component: Vddl
    }
  ]
})
