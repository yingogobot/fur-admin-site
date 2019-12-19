import UserAPI from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'
const UserObject = 'Admin-User'

const state = {
  token: Cookies.get(TokenKey),
  name: Cookies.get(UserObject) ? JSON.parse(Cookies.get(UserObject)).name : '',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  id: Cookies.get(UserObject) ? JSON.parse(Cookies.get(UserObject)).id : ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ID: (state, id) => {
    state.id = id
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log(userInfo)
    const { login_name, password } = userInfo
    return new Promise((resolve, reject) => {
      UserAPI.login({ login_name: login_name.trim(), password: password }).then(response => {
        state.toke = response.access_token
        state.name = response.name
        state.id = response.id
        Cookies.set(TokenKey, response.access_token)
        Cookies.set(UserObject, JSON.stringify(response))
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
