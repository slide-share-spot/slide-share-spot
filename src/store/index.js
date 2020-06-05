import { auth } from '~/plugins/firebaseSettings'

export const state = () => ({
  user: null,
  isAuthorized: false
})

export const mutations = {
  setUser(state, { user }) {
    state.user = user
  },
  login(state) {
    state.isAuthorized = true
  },
  logout(state) {
    state.isAuthorized = false
    state.user = null
  }
}

export const actions = {
  login({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          commit('login')
          resolve(res.user)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    auth
      .signout()
      .then(() => {
        commit('logout')
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const getters = {
  isAuthorized(state) {
    return state.isAuthorized
  }
}
