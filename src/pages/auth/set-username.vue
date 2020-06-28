<template>
  <div class="container">
    <p>最初にユーザ名を登録してください</p>
    <div>
      <b-field label="Name">
        <b-input v-model="displayName"></b-input>
      </b-field>
    </div>

    <div class="button-area">
      <button class="button is-primary" @click="setUsername">
        usernameの登録
      </button>
    </div>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebaseSettings'
export default {
  layout: 'auth',
  data() {
    return {
      displayName: ''
    }
  },
  methods: {
    async setUsername() {
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

<style lang="scss" scoped>
.button-area {
  margin: 2rem 0 0;
  .button {
    display: block;
    margin: 0 0 0 auto;
  }
}
</style>
