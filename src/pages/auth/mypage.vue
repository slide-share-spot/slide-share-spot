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
      </div>
      <div class="column">
        {{ username }}
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
      photoURL: ''
    }
  },
  mounted() {
    const user = auth.currentUser
    if (user != null) {
      this.username = user.displayName
      this.photoURL = user.photoURL

      console.log(this.username)
      console.log(this.photoURL)
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
