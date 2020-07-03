import { auth } from '~/plugins/firebaseSettings'

export default function({ redirect }) {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      return redirect('/auth/login')
    }
  })
}
