<template>
  <section class="section">
    <h1 class="title is-2">{{ title }}</h1>
    <div v-for="author in authors" :key="author.id">
      {{ author.name }}
      ({{ author.institute }})
    </div>

    <div class="columns">
      <div v-for="img in imgs" :key="img.id" class="column">
        <img :src="img.url" alt />
      </div>
    </div>

    <b-message title="Abstract">{{ abstract }}</b-message>

    <b-message title="Contribution">{{ contribution }}</b-message>

    <b-message title="How to Verify">{{ verify }}</b-message>
  </section>
</template>

<script>
import firebase from '~/plugins/firebaseSettings'
import 'firebase/storage'

export default {
  name: 'ViewPage',
  components: {},
  data() {
    return {
      title: '',
      imgs: [],
      authors: [],
      abstract: '',
      contribution: '',
      verify: ''
    }
  },
  methods: {
    getArticle() {
      const db = firebase.firestore()
      const storageRef = firebase.storage().ref()

      db.collection('article')
        .doc('pBSQUlavK1BHYtrLWeCX')
        .get()
        .then((querySnapshot) => {
          return querySnapshot.data()
        })
        .then((data) => {
          this.title = data.name
          this.authors = data.authors
          data.imgURL.forEach((path) => {
            storageRef
              .child(path)
              .getDownloadURL()
              .then((u) => {
                this.imgs.push({ url: u, id: this.imgs.length })
              })
          })
          this.abstract = data.inf.abstract
          this.contribution = data.inf.contribution
          this.verify = data.inf.verify
        })
    }
  },
  mounted() {
    this.getArticle()
  }
}
</script>
