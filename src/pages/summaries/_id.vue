<template>
  <section class="section">
    <h1 class="title is-2">{{ article.title }}</h1>

    <div class="columns">
      <div v-for="a in article.author" :key="a.name" class="column">
        <div class="subtitle is-6">
          {{ a.name }}
          ({{ a.institute }})
        </div>
      </div>
    </div>

    <div class="title is-4">Abstract</div>
    <b-message type="is-primary">{{ article.abstract }}</b-message>

    <div class="title is-4">Contribution</div>
    <b-message type="is-primary">
      {{ article.contribution }}
    </b-message>

    <div class="title is-4">How to Verify</div>
    <b-message type="is-primary">{{ article.verify }}</b-message>
  </section>
</template>

<script>
import { db } from '~/plugins/firebaseSettings'
export default {
  async asyncData({ params }) {
    const articleRef = db.collection('article-test')
    // const storageRef = storage.ref()

    const snapShot = await articleRef.doc(params.id).get()

    if (snapShot.exists) return { article: snapShot.data().info }
    else return { article: 'data not found.' }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
