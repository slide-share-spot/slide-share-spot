<template>
  <div class="container">
    <h1>これはサインイン用のページ</h1>
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
import firebase from '~/plugins/firebaseSettings'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() =>
          this.$buefy.toast.open({
            message: 'ログインできましt＾あ',
            type: 'is-success'
          })
        )
        .then(() => this.$router.push('/'))

        .catch(function(err) {
          console.log(err.code)
          alert(err.message)
        })
    }
  }
}
</script>
