import { auth } from '~/plugins/firebaseSettings'

// TODO: userのdisplayname,メアドやセッション情報を保持
export const state = () => ({
  user: null
})

export const mutations = {
  login(state, displayName) {
    state.user = displayName
  },
  logout(state) {
    state.user = null
  }
}

export const actions = {
  login({ commit }, { displayName }) {
    commit('login', displayName)
  },
  async logout({ commit }) {
    await auth.signOut()
    commit('logout')
  }
}

export const getters = {
  username(state) {
    return state.user
  },
  isAuthenticated(state) {
    return !!state.user
  }
}
