import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Manage from '@/pages/Manage'
import Home from '@/pages/Home'
import UserList from '@/pages/UserList'
import OrderList from '@/pages/OrderList'
import ShopList from '@/pages/ShopList'
import AddGoods from '@/pages/AddGoods'
import Explain from '@/pages/Explain'
import AdminSet from '@/pages/AdminSet'
import Visitor from '@/pages/Visitor'
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
          name: 'Home',
          component: Home,
          meta: []
        },{
          path: 'userList',
          name: 'UserList',
          component: UserList,
          meta: ['数据管理', '用户列表']
        },
        {
          path: 'orderList',
          name: 'OrderList',
          component: OrderList,
          meta: ['数据管理', '订单列表']
        },
        {
          path: 'shopList',
          name: 'ShopList',
          component: ShopList,
          meta: ['数据管理', '商家列表']
        },
        {
          path: 'addGoods',
          name: 'AddGoods',
          component: AddGoods,
          meta: ['添加数据', '添加商品']
        },
        {
          path: 'explain',
          name: 'Explain',
          component: Explain,
          meta: ['说明', '说明']
        },
        {
          path: 'adminSet',
          name: 'AdminSet',
          component: AdminSet,
          meta: ['设置', '管理员设置']
        },
        {
          path: 'visitor',
          name: 'Visitor',
          component: Visitor,
          meta: ['图表', '用户分布']
        }
      ]
    }
  ]
})
