import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Manage from '@/pages/Manage'
import Home from '@/pages/Home'
import UserList from '@/pages/UserList'
import OrderList from '@/pages/OrderList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/manage',
      component: Manage,
      name: '',
      children: [
        {
          path: '/',
          name: Home,
          component: Home,
          meta: []
        },{
          path: 'userlist',
          name: UserList,
          component: UserList,
          meta: ['数据管理', '用户列表']
        },
        {
          path: 'orderlist',
          name: OrderList,
          component: OrderList,
          meta: ['数据管理', '订单列表']
        }
      ]
    }
  ]
})
