import { auth } from '~/plugins/firebaseSettings'

// TODO: userのdisplayname,メアドやセッション情報を保持
export const state = () => ({
  user: null,
  isAuthorized: false,
  email: null
})

export const mutations = {
  login(state, email) {
    state.isAuthorized = true
    state.email = email
  },
  logout(state) {
    state.isAuthorized = false
    state.email = null
    // localStorage.removeItem('slide-share-spot')
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
            commit('login', res.user.email)
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
  isAuthorized(state) {
    return state.isAuthorized
  },
  userEmail(state) {
    return state.email
  }
}