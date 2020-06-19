<template>
  <div class="container">
    <h1>これはサインアップ用のページ</h1>
    <p>
      もしすでにアカウントを作成していたら
      <nuxt-link to="/auth/login">ログインのページ</nuxt-link
      >でサインインしてください
    </p>
    <div>
      <b-field label="Email">
        <b-input v-model="email" type="email" value="john@"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input
          v-model="password"
          type="password"
          value="iwantmytreasure"
          password-reveal
        ></b-input>
      </b-field>
      <span>パスワードは6文字以上で設定してください</span>
    </div>
    <div>
      <b-button @click="signUp">signUp</b-button>
    </div>
  </div>
</template>

<script>
import { auth, authProviderEmail } from '~/plugins/firebaseSettings'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async signUp() {
      try {
        if (this.email === '' || this.password === '') {
          alert('フォームが空です')
          return
        }
        // メアドがすでに使われているかの確認
        const providers = await auth.fetchSignInMethodsForEmail(this.email)
        if (providers.findIndex((p) => p === authProviderEmail) !== -1) {
          alert('登録されています')
          return
        }

        // 新規の場合ユーザの作成
        const res = await auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        )

        // 確認メールの送信
        res.user
          .sendEmailVerification({
            url: 'https://slide-share-spot.herokuapp.com/register-username.vue',
            handleCodeInApp: false
          })
          .then(() => {
            this.$buefy.toast.open({
              message: 'メールを確認してください',
              type: 'is-success'
            })
            this.$router.push('/')
          })
      } catch (e) {
        console.log(e)
        switch (e.code) {
          case 'auth/invalid-email':
            alert('メールアドレスの形式が正しくありません')
            break
          case 'auth/weak-password':
            alert('パスワードは6文字以上で設定してください')
            break
          default:
            alert('エラーが発生したようです')
            break
        }
      }
    }
  }
}
</script>
