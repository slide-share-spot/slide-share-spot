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
    <button @click="getUsers">get</button>
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
    getUsers() {
      const db = firebase.firestore()
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data())
          })
        })
    }
  }
}
</script>
