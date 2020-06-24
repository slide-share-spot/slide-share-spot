<template>
  <div class="container">
    <h1>ファイルをアップロードするぞ！</h1>
    <input type="file" accept="image/*" @change="uploadedFile" />
    <img :src="imagePath" />
    <button @click="upload()">アップロード</button>
  </div>
</template>

<script>
import { storage } from '~/plugins/firebaseSettings'

export default {
  data() {
    return {
      file: null,
      imagePath: null
    }
  },
  methods: {
    uploadedFile(e) {
      const file = e.target.files[0]
      this.file = file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imagePath = reader.result
      }
    },
    async upload() {
      try {
        const storageRef = storage.ref()
        const targetRef = storageRef.child('images/' + this.file.name)
        await targetRef.put(this.file)
        alert('アップロードが完了しました')
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped></style>
