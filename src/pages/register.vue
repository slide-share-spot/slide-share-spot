<template>
  <section class="section">
    <h1>ここはスライド内容を投稿するページ</h1>
    <div>
      <!-- <b-field label="論文タイトル">
        <b-input v-model="field.inf.name"></b-input>
      </b-field>
      <b-field label="ようやく">
        <b-input v-model="feild.inf.abstract"></b-input>
      </b-field> -->
      <b-field label="著者">
        <b-input v-model="field.auther"></b-input>
      </b-field>
      <!-- <b-field label="こんとりびゅーしょん">
        <b-input v-model="field.inf.contribution"></b-input>
      </b-field> -->
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
        auther: '',
        inf: {
          abstract: '',
          contribution: '',
          tags: [],
          name: ''
        }
      }
    }
  },
  methods: {
    submit() {
      db.collection('article')
        .add({
          author: 'suzuki kensuke'
        })
        .then((docRef) => {
          console.log('document written with id: ' + docRef.id)
        })
        .catch((err) => {
          console.log('error adding document: ' + err)
        })
    }
  }
}
</script>
