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
  }
}

export const actions = {
  login({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          if (res.user.emailVerified) {
            commit('login')
          }
          resolve(res.user.emailVerified)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      auth
        .signOut()
        .then(() => {
          commit('logout')
          resolve('success')
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }
}

export const getters = {
  isAuthorized(state) {
    return state.isAuthorized
  }
}
