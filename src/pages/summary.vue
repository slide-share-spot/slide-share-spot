<template>
  <section class="section">
    <h1 class="title is-2">{{ title }}</h1>
    <p v-for="a in author" :key="a.name">
      {{ a.name }}
      ({{ a.institute }})
    </p>

    <div class="columns">
      <div v-for="img in imgs" :key="img.id" class="column">
        <figure class="image is-16by9">
          <img :src="img.url" alt />
        </figure>
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
