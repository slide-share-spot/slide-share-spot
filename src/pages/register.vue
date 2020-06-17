<template>
  <section class="section">
    <h1>ここはスライド内容を投稿するページ</h1>
    <div>
      <b-field label="論文タイトル">
        <b-input v-model="info.title"></b-input>
      </b-field>
      <b-field label="ようやく">
        <b-input v-model="info.abstract"></b-input>
      </b-field>
      <!-- <b-field label="著者">
        <b-input v-model="field.auther"></b-input>
      </b-field>-->
      <b-field label="こんとりびゅーしょん">
        <b-input v-model="info.contribution"></b-input>
      </b-field>
      <b-field label="verify">
        <b-input v-model="info.verify"></b-input>
      </b-field>
      <b-field label="発行年">
        <b-input v-model="info.year"></b-input>
      </b-field>
      <b-field label="著者名">
        <b-input v-model="info.author[0].name"></b-input>
      </b-field>
      <b-field label="著者の所属">
        <b-input v-model="info.author[0].institute"></b-input>
      </b-field>
      <b-field label="タグ">
        <b-input v-model="info.tag[0].tagname"></b-input>
      </b-field>
    </div>
    <button :disabled="!info.title" @click="submit()">投稿する</button>
  </section>
</template>

<script>
import { db } from '~/plugins/firebaseSettings'

export default {
  name: 'HomePage',
  components: {},
  data() {
    return {
      info: {
        title: '',
        abstract: '',
        contribution: '',
        verify: '',
        year: '',
        tag: [{ tagname: '' }],
        author: [
          {
            name: '',
            institute: ''
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      if (this.info.title === '') return

      // test code
      const normaltitle = this.info.title
        .toLowerCase()
        .replace(/\W/g, ' ')
        .replace(/\s{2}/g, ' ')

      // test fin
      db.collection('article-test')
        .doc(normaltitle)
        .set({
          info: this.info
        })
        .then((docRef) => {
          // console.log('document written with id: ' + docRef.id)
          alert('success, you registered data.')
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((err) => {
          console.log('error adding document: ' + err)
          alert('error, you faild.')
        })
    }
  }
}
</script>
