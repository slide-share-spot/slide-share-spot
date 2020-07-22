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

    <div v-if="isLogin" class="columns">
      <div v-for="image in images" :key="image.id" class="column">
        <figure class="image is-16by9">
          <img :src="image.url" alt />
        </figure>
      </div>
    </div>

    <b-message v-else>
      ログインしているユーザのみ画像を閲覧できます
    </b-message>

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
import { db, storage } from '~/plugins/firebaseSettings'

export default {
  async asyncData({ params }) {
    const articleRef = db.collection('article-test')
    const snapShot = await articleRef.doc(params.id).get()

    if (!snapShot.exists) return { article: { title: 'article not found' } }
    else {
      const data = snapShot.data().info
      return { article: { ...data, normalize: params.id } }
    }
  },
  data() {
    return { images: [] }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isAuthenticated
    }
  },
  mounted() {
    const storageRef = storage.ref()
    this.article.imgPath.forEach(async (url) => {
      try {
        const u = await storageRef
          .child(this.article.normalize + '/' + url)
          .getDownloadURL()
        this.images.push({ url: u, id: this.images.length })
      } catch (e) {
        console.log(e)
      }
    })
  }
}
</script>
