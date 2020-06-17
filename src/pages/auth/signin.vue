<template>
  <div class="container">
    <h1>これはサインイン用のページ</h1>
    <p>
      もしまだアカウントを作成していなかったら
      <nuxt-link to="/auth/signup">サインアップのページ</nuxt-link>
      でアカウントを作成してください。
    </p>
    <div>
      <b-field label="Email">
        <b-input v-model="email" type="email" value="john@"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input v-model="password" type="password" password-reveal></b-input>
      </b-field>
    </div>
    <div>
      <b-button @click="signIn">signIn</b-button>
    </div>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebaseSettings'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async signIn() {
      try {
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
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
