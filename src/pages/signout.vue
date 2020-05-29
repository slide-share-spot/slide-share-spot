<template>
  <div class="container">
    <h1>これはサインアウト用のページ</h1>
    <div>
      <b-button @click="signOut">signOut</b-button>
    </div>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebaseSettings'
export default {
  methods: {
    async signOut() {
      await auth.signOut()
      this.$router.push('/')
    }
  }
}
</script>
