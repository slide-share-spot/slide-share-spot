<template>
  <div class="section">
    <div class="columns">
      <div class="column is-4">
        <figure class="image is-128x128">
          <div v-if="photoURL != null">
            <img class="is-rounded" :src="photoURL" />
          </div>
          <div v-else>
            <img class="is-rounded" src="/noimage.png" />
          </div>
        </figure>
        <h1 class="title is-3">@{{ username }}</h1>
        {{ discription }}
      </div>
      <div class="column">
        <h1 class="title is-3">Create Article Summary</h1>
        <div class="box" v-for="article in editor" :key="article.title">
          <div class="media-content">
            <div class="content">
              <div class="title is-5" v-if="article.data !== null">
                <nuxt-link
                  :to="{ name: 'summary', params: { data: article.data } }"
                >
                  {{ article.title }}
                </nuxt-link>
              </div>
              <div class="title is-5" v-else>
                {{ article.title }}
              </div>
            </div>
          </div>
        </div>
        <h1 class="title is-3">Contibute Article Summary</h1>
        <div class="box" v-for="article in contributed" :key="article.title">
          <div class="media-content">
            <div class="content">
              <div class="title is-5" v-if="article.data !== null">
                <nuxt-link
                  :to="{ name: 'summary', params: { data: article.data } }"
                >
                  {{ article.title }}
                </nuxt-link>
              </div>
              <div class="title is-5" v-else>
                {{ article.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebaseSettings'
export default {
  data() {
    return {
      username: '',
      photoURL: '',
      discription: 'sample discription, sample discription',
      editor: [
        {
          title: 'sample article1'
        },
        {
          title: 'sample article2'
        },
        {
          title: 'sample article3'
        }
      ],
      contributed: [
        {
          title: 'sample contribute1'
        },
        {
          title: 'sample contribute2'
        }
      ]
    }
  },
  mounted() {
    const user = auth.currentUser
    if (user != null) {
      this.username = user.displayName
      this.photoURL = user.photoURL
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.buttons {
  margin: 2rem 0 0;
  .button {
    display: block;
    margin: 0 0 0 auto;
  }
}
</style>
