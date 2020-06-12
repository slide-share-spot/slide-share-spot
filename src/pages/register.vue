<template>
  <section class="section">
    <h1>ここはスライド内容を投稿するページ</h1>
    <div>
      <b-field label="論文タイトル">
        <b-input v-model="field.title"></b-input>
      </b-field>
      <b-field label="ようやく">
        <b-input v-model="field.abstract"></b-input>
      </b-field>
      <!-- <b-field label="著者">
        <b-input v-model="field.auther"></b-input>
      </b-field>-->
      <b-field label="こんとりびゅーしょん">
        <b-input v-model="field.contribution"></b-input>
      </b-field>
      <b-field label="verify">
        <b-input v-model="field.verify"></b-input>
      </b-field>
    </div>
    <button @click="submit()">投稿する</button>
  </section>
</template>

<script>
import { db } from '~/plugins/firebaseSettings'

export default {
  name: 'HomePage',
  components: {},
  data() {
    return {
      field: {
        title: '',
        abstract: '',
        contribution: '',
        verify: ''
        // auther: [],
        // tags: []
      }
    }
  },
  methods: {
    submit() {
      db.collection('article')
        .doc(this.field.title)
        .set({
          // author: this.field.auther,
          info: {
            abstract: this.field.abstract,
            contribution: this.field.contribution,
            verify: this.field.verify
            // tags: this.field.tags
          }
        })
        .then((docRef) => {
          console.log('document written with id: ' + docRef.id)
          alert('success, you registered data.')
        })
        .catch((err) => {
          console.log('error adding document: ' + err)
          alert('error, you faild.')
        })
    }
  }
}
</script>
