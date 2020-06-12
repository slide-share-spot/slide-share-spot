export default function({ store, redirect }) {
  // ユーザーが認証されていないとき
  if (!store.state.isAuthorized) {
    return redirect('/inspire')
  }
}
