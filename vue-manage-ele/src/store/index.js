/**
 * Created by Administrator on 2018/10/26.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/js/api.js'

Vue.use(Vuex)
const state = {
  adminInfo: {
    avatar: 'default.jpg'
  },
  adminDefault: {
    name:'zq',
    registerTime:'2018-10-20',
    id:'369',
    limit:'simple'
  }
}

const actions = {
  getAdminData ({commit}) {
    api.getAdminInfo().then(res => {
      console.log(res)
      if (res.status == 1) {
        commit('saveAdminInfo', res.data);
      }else{
        throw new Error(res)
      }
    }).catch(err => {
      //console.log('您尚未登陆或者session失效')
    })
  }
}

const mutations = {
  saveAdminInfo (state, adminInfo) {
    state.adminInfo = adminInfo
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
