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
      const res = await this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      console.log(res)

      // resにはメール確認済みかどうかのt/fが入っている
      if (!res) {
        this.$buefy.toast.open({
          message: 'メアドの確認をしてください',
          type: 'is-success'
        })
      } else {
        this.$buefy.toast.open({
          message: 'ログインできました',
          type: 'is-success'
        })
        const user = auth.currentUser
        if (user.displayName === null) this.$router.push('/register-username')
        else this.$router.push('/')
      }
    }
  }
}
</script>
