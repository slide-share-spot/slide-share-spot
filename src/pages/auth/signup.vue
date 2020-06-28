<template>
  <div class="container">
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

    <div class="buttons">
      <nuxt-link to="/auth/login" class="has-text-primary">
        Login instead
      </nuxt-link>
      <button class="button is-primary" @click="signUp">signUp</button>
    </div>
  </div>
</template>

<script>
import { auth, authProviderEmail } from '~/plugins/firebaseSettings'
export default {
  layout: 'auth',
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
            url: 'https://slide-share-spot.herokuapp.com/',
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

<style lang="scss" scoped>
.buttons {
  margin: 2rem 0 0;
  .button {
    display: block;
    margin: 0 0 0 auto;
  }
}
</style>
