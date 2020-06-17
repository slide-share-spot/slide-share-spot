import { auth } from '~/plugins/firebaseSettings'

// TODO: userのdisplayname,メアドやセッション情報を保持
export const state = () => ({
  user: null
})

export const mutations = {
  login(state, user) {
    state.user = user.displayName
  },
  logout(state) {
    state.user = null
  }
}

export const actions = {
  login({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          if (res.user.emailVerified) {
            // メアド認証が終わっていればloginコミットを打つ
            commit('login', res.user)
          }
          console.log(res.user)
          // resolveは認証されてるかどうかのT/Fを返す
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
          // ログアウトコミットを打つ
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
  username(state) {
    return state.user
  },
  isAuthenticated(state) {
    return !!state.user
  }
}
