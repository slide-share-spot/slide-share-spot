<template>
  <section class="section">
    <h1 class="title is-2">{{ title }}</h1>

    <div class="columns">
      <div class="column" v-for="a in author" :key="a.name">
        <div class="subtitle is-6">
          {{ a.name }}
          ({{ a.institute }})
        </div>
      </div>
    </div>

    <div class="columns">
      <div v-for="img in imgs" :key="img.id" class="column">
        <figure class="image is-16by9">
          <img :src="img.url" alt />
        </figure>
      </div>
    </div>

    <div class="title is-4">Abstract</div>
    <b-message type="is-primary">{{ abstract }}</b-message>

    <div class="title is-4">Contribution</div>
    <b-message type="is-primary">
      {{ contribution }}
    </b-message>

    <div class="title is-4">How to Verify</div>
    <b-message type="is-primary">{{ verify }}</b-message>
  </section>
</template>

<script>
import firebase from '~/plugins/firebaseSettings'
import 'firebase/storage'

export default {
  name: 'ViewPage',
  components: {},
  asyncData({ params }) {
    const storageRef = firebase.storage().ref()

    const t = params.data.info.title
    const abs = params.data.info.abstract
    const au = params.data.info.author
    const cont = params.data.info.contribution
    const ver = params.data.info.verify
    const imgPath = params.data.info.imgPath
    const images = []

    const normalize = t
      .toLowerCase()
      .replace(/\W/g, ' ')
      .replace(/\s{2}/g, ' ')

    imgPath.forEach((url) => {
      storageRef
        .child(normalize + '/' + url)
        .getDownloadURL()
        .then((u) => {
          images.push({ url: u, id: images.length })
        })
    })

    return {
      title: t,
      abstract: abs,
      author: au,
      contribution: cont,
      verify: ver,
      imgs: images
    }
  },
  data() {
    return {}
  }
}
</script>
