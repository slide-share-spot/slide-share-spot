<template>
  <div class="container">
    <h1>これはサインアップ用のページ</h1>
    <p>
      もしすでにアカウントを作成していたら
      <nuxt-link to="/auth/signin">サインインのページ</nuxt-link>
      でサインインしてください
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
    </div>
    <div>
      <b-button @click="signUp">signUp</b-button>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebaseSettings'
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
        // メアドがすでに使われているかの確認
        const providers = await firebase
          .auth()
          .fetchSignInMethodsForEmail(this.email)
        if (
          providers.findIndex(
            (p) =>
              p ===
              firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
          ) !== -1
        ) {
          alert('登録されています')
          return
        }

        // 新規の場合ユーザの作成
        const res = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)

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
        console.error(e)
      }
    }
  }
}
</script>
