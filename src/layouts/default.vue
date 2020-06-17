<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="~assets/buefy.png" alt="Buefy" height="28" />
        </a>
        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="!isLogin" class="buttons">
            <nuxt-link to="/auth/signup" class="button is-primary">
              <strong>Sign up</strong>
            </nuxt-link>
            <nuxt-link to="/auth/signin" class="button is-light">
              Log in
            </nuxt-link>
          </div>
          <div v-else class="buttons">
            <button class="button is-light" @click="logout()">Log out</button>
          </div>
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">General</p>
        <p>username: {{ username }}</p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" />
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
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
