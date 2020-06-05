<template>
  <div class="container">
    <h1>これはサインアウト用のページ</h1>
    <div>
      <b-button @click="signOut">signOut</b-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async signOut() {
      const res = await this.$store.dispatch('logout')
      if (res === 'success') {
        this.$buefy.toast.open({
          message: 'ログoutできましt＾あ',
          type: 'is-success'
        })
        this.$router.push('/')
      }
    }
  }
}
</script>
