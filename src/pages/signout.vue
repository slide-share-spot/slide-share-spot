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
    // TODO: 失敗時の処理
    async signOut() {
      const res = await this.$store.dispatch('logout')
      if (res === 'success') {
        this.$buefy.toast.open({
          message: 'ログoutできました',
          type: 'is-success'
        })
        this.$router.push('/')
      }
    }
  }
}
</script>
