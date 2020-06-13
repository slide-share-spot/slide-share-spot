<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="Free" icon="github-circle">
        Open source on
        <a href="https://github.com/buefy/buefy">GitHub</a>
      </card>

      <card title="Responsive" icon="cellphone-link">
        <b class="has-text-grey">Every</b>
        component is responsive
      </card>

      <card title="Modern" icon="alert-decagram">
        Built with
        <a href="https://vuejs.org/">Vue.js</a>
        and
        <a href="http://bulma.io/">Bulma</a>
      </card>

      <card title="Lightweight" icon="arrange-bring-to-front"
        >No other internal dependency</card
      >
    </div>
    <button @click="getUsername">get</button>
  </section>
</template>

<script>
import Card from '~/components/Card'
import firebase from '~/plugins/firebaseSettings'

export default {
  name: 'HomePage',

  components: {
    Card
  },
  methods: {
    async getUsername() {
      const user = await firebase.auth().currentUser
      console.log(user)
    }
  }
}
</script>
