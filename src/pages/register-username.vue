<template>
  <div class="container">
    <h1>これはユーザーネーム設定用のページ</h1>
    <div>
      <b-field label="Name">
        <b-input v-model="displayName"></b-input>
      </b-field>
    </div>
    <div>
      <b-button @click="registerUsername">usernameの登録</b-button>
    </div>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebaseSettings'
export default {
  data() {
    return {
      displayName: ''
    }
  },
  methods: {
    async registerUsername() {
      try {
        const user = await auth.currentUser
        if (user) {
          await user.updateProfile({
            displayName: this.displayName
          })
          alert('success')
          await this.$store.dispatch('login', { displayName: this.displayName })
          this.$router.push('/')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
