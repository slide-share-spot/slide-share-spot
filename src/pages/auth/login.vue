<template>
  <div class="container">
    <div class="input-area">
      <b-field label="Email">
        <b-input v-model="email" type="email" value="john@"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input v-model="password" type="password" password-reveal></b-input>
      </b-field>
    </div>

    <div class="buttons">
      <nuxt-link to="/auth/signup" class="has-text-primary">
        アカウントを作成
      </nuxt-link>
      <button class="button is-primary" @click="logIn">LogIn</button>
    </div>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebaseSettings'
export default {
  layout: 'auth',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async logIn() {
      try {
        if (this.email === '' || this.password === '') {
          alert('フォームが空です')
          return
        }
        const res = await auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )

        console.log(res)

        if (!res.user.emailVerified) {
          this.$buefy.toast.open({
            message: 'メアドの確認をしてください',
            type: 'is-success'
          })
          return
        }

        this.$buefy.toast.open({
          message: 'ログインできました',
          type: 'is-success'
        })

        if (res.user.displayName == null)
          this.$router.push('/register-username')
        else {
          this.$store.dispatch('login', {
            displayName: res.user.displayName
          })
          this.$router.push('/')
        }
      } catch (e) {
        console.log(e)
        switch (e.code) {
          case 'auth/user-not-found':
            alert('ユーザが登録されていません')
            break
          case 'auth/wrong-password':
            alert('パスワードが間違っています')
            break
          case 'auth/too-many-requests':
            alert('しばらく時間を置いてください')
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
