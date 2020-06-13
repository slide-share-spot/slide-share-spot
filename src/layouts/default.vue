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
    </nav>

    <section class="main-content columns">
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">General</p>
        <p>login state: {{ state }}</p>
        <p>email: {{ email }}</p>
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
        },
        {
          title: 'Signup',
          icon: 'home',
          to: { name: 'signup' }
        },
        {
          title: 'signIn',
          icon: 'home',
          to: { name: 'signin' }
        },
        {
          title: 'signOut',
          icon: 'home',
          to: { name: 'signout' }
        },
        {
          title: 'register',
          icon: 'home',
          to: { name: 'register' }
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
    state() {
      return this.$store.getters.isAuthorized
    },
    email() {
      return this.$store.getters.userEmail
    }
  }
}
</script>
