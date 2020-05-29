<template>
  <div class="container">
    <h1>これはサインアップ用のページ</h1>
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
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() =>
          this.$buefy.toast.open({
            message: '登録できましtあ',
            type: 'is-success'
          })
        )
        .then(() => this.$router.push('/'))
        // TODO: emailのバリデーションをかける. computedでvalidかをt/fで評価して、tだったらsignup関数を実行できるようにする
        .catch(function(err) {
          console.log(err.code)
          alert(err.message)
        })
    }
  }
}
</script>
