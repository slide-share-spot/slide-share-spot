<template>
  <section class="main-content columns">
    <div class="container column is-10">
      <nuxt />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        },
        {
          title: 'search',
          icon: 'home',
          to: { name: 'article-search' }
        }
      ]
    }
  },
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
        message: 'ログoutできました',
        type: 'is-success'
      })
      this.$router.push('/')
    }
  }
}
</script>
