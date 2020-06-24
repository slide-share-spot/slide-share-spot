<template>
  <div class="container">
    <h1>ファイルをアップロードするぞ！</h1>
    <input type="file" accept="image/*" />
    <button @click="upload()">アップロード</button>
  </div>
</template>

<script>
import { storage } from '~/plugins/firebaseSettings'

export default {
  methods: {
    async upload() {
      try {
        const storageRef = storage.ref()
        const file = ''
        await storageRef.put(file)
        console.log('アップロードが終わりました')
      } catch (error) {}
    }
  }
}
</script>

<style scoped></style>
