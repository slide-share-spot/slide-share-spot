import createPersistedState from 'vuex-persistedstate'

// storeの永続化のプラグイン
// localstrageに保存する
export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'slide-share-spot'
    })(store)
  })
}
