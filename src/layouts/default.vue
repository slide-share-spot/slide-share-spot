<template>
  <div>
    <VHeader />
    <section class="main-content columns">
      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import VHeader from '~/components/VHeader'
export default {
  components: {
    VHeader
  },
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
  }
}
</script>
