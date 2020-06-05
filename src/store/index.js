import { auth } from '~/plugins/firebaseSettings'

export const state = () => ({
  user: null,
  isAuthorized: false,
  email: null
})

export const mutations = {
  setUser(state, { user }) {
    state.user = user
  },
  login(state, email) {
    state.isAuthorized = true
    state.email = email
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
            commit('login', res.user.email)
          }
          console.log(res.user)

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
  },
  userEmail(state) {
    return state.email
  }
}
