/**
 * Created by zq on 2018/10/21.
 */
import axios from 'axios'
// axios 配置
axios.defaults.timeout = 3000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://elm.cangdu.org'

export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function fetchGet (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default {
  /**
   * 用户注册量
   */
  userCount (params) {
    return fetchGet('/statis/user/' + params + '/count')
  },
  /**
   * 某一天订单数量
   */
  orderCount (params) {
    return fetchGet('/statis/order/' + params + '/count')
  },
  /**
   * 某一天管理员注册量
   */
  adminDayCount (params) {
    return fetchGet('/statis/admin/' + params + '/count')
  },
  /**
   * 获取用户数量
   */
  getUserCount (params) {
    return fetchGet('/v1/users/count', params)
  },
  /**
   * 获取订单数量
   */
  getOrderCount (params) {
    return fetchGet('/bos/orders/count', params)
  },
  /**
   * 管理员数量
   */
  adminCount (params) {
    return fetchGet('/admin/count')
  },
  /**
   * 获取用户列表
   */
  getUserList (params) {
    return fetchGet('/v1/users/list', params)
  },
  /**
   * 获取用户数量
   */
  getUserCount (params) {
    return fetchGet('/v1/users/count', params)
  },
  /**
   * 获取订单数量
   */
  getOrderCount (params) {
    return fetchGet('/bos/orders/count', params)
  },
  /**
   * 获取订单列表
   */
  getOrderList (params) {
    return fetchGet('/bos/orders', params)
  },
  /**
   * 获取餐馆详细信息
   */
  getResturantDetail (params) {
    return fetchGet('/shopping/restaurant/' + params)
  },
  /**
   * 获取用户信息
   */
  getUserInfo (params) {
    return fetchGet('/v1/user/' + params)
  },
  /**
   * 获取地址信息
   */
  getAddressById (params) {
    return fetchGet('/v1/addresse/' + params)
  },
  /**
   * 获取定位城市
   */
  cityGuess (params) {
    return fetchGet('/v1/cities', params)
  },
  /**
   * 获取餐馆数量
   */
  getResturantsCount (params) {
    return fetchGet('/shopping/restaurants/count')
  },
  /**
   * 获取餐馆列表
   */
  getResturants (params) {
    return fetchGet('/shopping/restaurants', params)
  },
  /**
   * category 种类列表
   */
  foodCategory (params) {
    return fetchGet('/shopping/v2/restaurant/category', params)
  },
  baseImgPath () {
    return '//elm.cangdu.org/img/';
  },
  /**
   * 更新餐馆信息
   */
  updateResturant (params) {
    return fetchPost('/shopping/updateshop', params)
  }

}
