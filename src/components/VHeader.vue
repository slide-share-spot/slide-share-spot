<template>
  <header>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item is-primary" href="/">
          <span class="is-size-4 has-text-weight-bold">Slide-Share-Spot</span>
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="!isLogin" class="buttons">
            <nuxt-link to="/auth/signup" class="button is-primary">
              <strong>Sign up</strong>
            </nuxt-link>
            <nuxt-link to="/auth/login" class="button is-light"
              >Log in</nuxt-link
            >
          </div>
          <div v-else class="buttons">
            <nuxt-link to="/post" class="button is-light">Post</nuxt-link>
            <button class="button is-light" @click="logout()">Log out</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.getters.username
    },
    isLogin() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$buefy.toast.open({
        message: 'ログアウトできました',
        type: 'is-success'
      })
      this.$router.push('/')
    }
  }
}
</script>
