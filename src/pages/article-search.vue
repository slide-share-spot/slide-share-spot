<template>
  <section class="section">
    <h1 class="title is-2">Search Article</h1>
    <b-field label="Title Keywords">
      <b-input v-model="word" placeholder="Search......" expanded></b-input>
    </b-field>
    <b-field label="Display Number" grouped>
      <b-slider v-model="params.count"></b-slider>
      <b-input v-model="params.count"></b-input>
    </b-field>
    <div class="buttons">
      <b-button type="is-primary" @click="searchApi" expanded>Search</b-button>
    </div>
    <div class="list is-hoverable">
      <div v-for="article in articles" :key="article.title" class="list-item">
        <!-- データなかったら，nullにしています． -->
        <div v-if="article.data !== null">
          <nuxt-link
            :to="{ name: 'article-view', params: { data: article.data } }"
          >
            {{ article.title }}
          </nuxt-link>
        </div>
        <div v-else>
          {{ article.title }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import firebase from '~/plugins/firebaseSettings'
export default {
  name: 'SearchPage',
  components: {},
  data() {
    return {
      word: '',
      params: {
        model: 'latest',
        count: 10,
        offset: '0',
        orderby: '',
        attributes: 'Ti'
      },
      articles: []
    }
  },
  methods: {
    async searchApi() {
      this.articles = []
      const db = firebase.firestore()
      const q = require('querystring').stringify(this.params)
      const url =
        process.env.academicApiUrl + 'evaluate?expr=' + this.word + '&' + q
      // 非常に危なかったので消した．
      // console.log(process.env.academicApiHeader)

      const result = await axios.get(url, {
        headers: process.env.academicApiHeader
      })
      console.log(result.data.entities)

      // ここから，DBにでーたがあるか確認
      result.data.entities.forEach((el) => {
        // 一旦テストドキュメントに対してアクセスするようにしています．
        db.collection('article-test')
          .doc(el.Ti)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.exists) {
              return querySnapshot.data()
            } else {
              console.log('No data')
            }
          })
          .then((article) => {
            if (article !== undefined) {
              this.articles.push({ data: article, title: el.Ti })
            } else {
              this.articles.push({ data: null, title: el.Ti })
            }
          })
      })
    }
  }
}
</script>
