<template>
  <section class="section">
    <h1 class="title is-2">Search Article</h1>
    <p>
      if you want to search a period of year, write below: [begin year,end year]
    </p>
    <b-field label="Title Keywords">
      <b-input v-model="info.word" placeholder="Keywords......" expanded>
      </b-input>
    </b-field>
    <b-field>
      <b-input
        v-model="info.cname"
        placeholder="Conference Series Name"
        expanded
      >
      </b-input>
      <b-input v-model="info.year" placeholder="Year"></b-input>
    </b-field>
    <b-field>
      <b-radio v-model="params.orderby" native-value="CC:desc">
        Sorted by citation
      </b-radio>
      <b-radio v-model="params.orderby" native-value="Y:desc">
        Sorted by year
      </b-radio>
    </b-field>
    <div class="buttons">
      <b-button type="is-primary" expanded @click="searchApi">Search</b-button>
    </div>
    <div v-for="article in articles" :key="article.title" class="box">
      <div class="media-content">
        <div class="content">
          <div v-if="article.data !== null" class="title is-5">
            <nuxt-link
              :to="{ name: 'summaries-id', params: { id: article.title } }"
            >
              {{ article.title }}
            </nuxt-link>
          </div>
          <div v-else class="title is-5">
            {{ article.title }}
          </div>
        </div>
        <nav class="level is-mobile">
          <!-- なぜかこれ入れないと右に寄らない． -->
          <div class="level-left"></div>
          <div class="level-right">
            <div class="level-item">
              <p>year: {{ article.year }}</p>
            </div>
            <div class="level-item">
              <p>citation: {{ article.citation }}</p>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <div v-if="articles.length !== 0" class="level">
      <div class="level-left">
        <div class="buttons">
          <b-button
            v-if="params.offset !== 0"
            type="is-primary"
            @click="backPage"
          >
            Previous
          </b-button>
          <b-button v-else disabled type="is-primary" @click="backPage">
            Previous
          </b-button>
        </div>
      </div>
      <div class="level-right">
        <div class="buttons">
          <b-button type="is-primary" @click="turnPage">Next</b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from '~/plugins/firebaseSettings'
export default {
  name: 'SearchPage',
  components: {},
  data() {
    return {
      query: '',
      qarray: [],
      info: {
        word: '',
        cname: '',
        year: ''
      },
      params: {
        model: 'latest',
        count: 20,
        offset: 0,
        orderby: 'Y:desc',
        attributes: 'Ti,Y,CC'
      },
      articles: []
    }
  },
  methods: {
    async searchApi() {
      this.articles = []
      this.query = ''
      this.qarray = []
      const db = firebase.firestore()

      // create query
      const spword = this.info.word
        .toLowerCase()
        .replace(/\W/g, ' ')
        .replace(/\s{2}/g, ' ')
        .split(' ')

      spword.forEach((el) => {
        if (el !== '') {
          this.qarray.push("W='" + el + "'")
        }
      })

      if (this.info.cname !== '') {
        this.qarray.push(
          "Or(Composite(C.CN='" +
            this.info.cname.toLowerCase() +
            "'),Composite(J.JN='" +
            this.info.cname.toLowerCase() +
            "'))"
        )
      }

      if (this.info.year !== '') {
        this.qarray.push('Y=' + this.info.year)
      }

      if (this.qarray.length === 0) {
        // error handling
        return
      } else if (this.qarray.length === 1) {
        this.query = this.qarray[0]
      } else {
        this.query = this.query + 'And('
        this.qarray.forEach((el) => {
          this.query = this.query + el + ','
        })
        this.query = this.query.slice(0, -1)
        this.query = this.query + ')'
      }

      console.log(this.query)

      // created

      // create search options
      const options = require('querystring').stringify(this.params)
      const url =
        process.env.academicApiUrl +
        'evaluate?expr=' +
        this.query +
        '&' +
        options
      // 非常に危なかったので消した．
      // console.log(process.env.academicApiHeader)

      const result = await this.$axios.get(url, {
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
              this.articles.push({
                data: article,
                title: el.Ti,
                year: el.Y,
                citation: el.CC
              })
            } else {
              this.articles.push({
                data: null,
                title: el.Ti,
                year: el.Y,
                citation: el.CC
              })
            }
          })
      })
    },
    turnPage() {
      this.params.offset += 20
      this.searchApi()
    },
    backPage() {
      this.params.offset -= 20
      this.searchApi()
    }
  }
}
</script>
