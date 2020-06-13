<template>
  <div class="container">
    <h1>これはユーザーネーム設定用のページ</h1>
    <div>
      <b-field label="Name">
        <b-input v-model="displayname"></b-input>
      </b-field>
    </div>
    <div>
      <b-button @click="registerUsername">usernameの登録</b-button>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebaseSettings'
export default {
  data() {
    return {
      displayname: ''
    }
  },
  methods: {
    async registerUsername() {
      try {
        const user = await firebase.auth().currentUser
        if (user) {
          user
            .updateProfile({
              displayName: this.displayname
            })
            .then(() => {
              alert('success, you set displayname.')
            })
            .then(() => this.$router.push('/'))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
