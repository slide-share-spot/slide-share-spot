<template>
  <section class="section">
    <h1>this is summary page.</h1>
    <p>id: {{ id }}</p>
    <p>title: {{ article }}</p>
  </section>
</template>

<script>
import { db } from '~/plugins/firebaseSettings'
export default {
  async asyncData({ params }) {
    const articleRef = db.collection('article-test')
    const snapShot = await articleRef
      .doc('audio substituting haptic system to aware the sound from backwards')
      .get()

    if (snapShot.exists) return { article: snapShot.data() }
    else return { article: 'data not found.' }
  },
  data() {
    return {
      id: this.$route.params.id
    }
  }
}
</script>
