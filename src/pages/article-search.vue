<template>
  <section class="section">
    <h1 class="title is-2">Search Article</h1>
    <b-field grouped>
      <b-input v-model="word" placeholder="Serach......" expanded></b-input>
      <p class="control">
        <button @click="searchApi" class="button is-primary">Search</button>
      </p>
    </b-field>
    <div class="list is-hoverable">
      <nuxt-link
        :to="{ name: 'article-view' }"
        v-for="data in datas"
        :key="data.Ti"
        class="list-item"
      >
        {{ data.Ti }}
        ({{ data.Y }})
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SearchPage',
  components: {},
  data() {
    return {
      word: '',
      params: {
        model: 'latest',
        count: '10',
        offset: '0',
        orderby: '',
        attributes: 'Ti,Y,AA.AuN,AW'
      },
      datas: []
    }
  },
  methods: {
    async searchApi() {
      const q = require('querystring').stringify(this.params)
      const header = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Ocp-Apim-Subscription-Key': process.env.subscriptionKey
      }
      const url =
        'https://api.labs.cognitive.microsoft.com/academic/v1.0/evaluate?expr=' +
        this.word +
        '&' +
        q

      const result = await axios.get(url, { headers: header })
      console.log(result.data.entities)

      this.datas = result.data.entities
    }
  }
}
</script>
