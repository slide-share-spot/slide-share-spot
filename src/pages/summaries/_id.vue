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

    <div class="title is-4">Images</div>
    <div v-if="!isLoading">
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
    </div>
    <div v-else>
      loading...
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
import { db, storage } from '~/plugins/firebaseSettings'

export default {
  async asyncData({ params }) {
    const articleRef = db.collection('article-test')
    const snapShot = await articleRef.doc(params.id).get()

    if (snapShot.exists)
      return { article: { ...snapShot.data().info, normalize: params.id } }
    else return { article: { title: 'article not found' } }
  },
  // 画像取得時に画面がブレるのでisLoadingを追加した
  data() {
    return { images: [], isLoading: true }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isAuthenticated
    }
  },
  // 画像はasyncDataで取ってこれないのでmountedのタイミングで取得
  async mounted() {
    const storageRef = storage.ref()
    try {
      await Promise.all(
        this.article.imgPath.map(async (url) => {
          const u = await storageRef
            .child(this.article.normalize + '/' + url)
            .getDownloadURL()
          this.images.push({ url: u, id: this.images.length })
        })
      )
      this.isLoading = false
    } catch (e) {
      console.log(e)
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  margin-bottom: 1.5rem;
}
</style>
