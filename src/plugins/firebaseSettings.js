import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// 環境変数のセット
const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingServiceId: process.env.messagingServiceId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
}

// 初期化
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
export const auth = firebase.auth()
