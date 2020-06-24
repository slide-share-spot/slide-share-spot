<template>
  <div class="container">
    <h1>ファイルをアップロードするぞ！</h1>
    <input
      type="file"
      accept="image/*"
      multiple="multiple"
      @change="uploadedFile"
    />
    <div v-for="file in files" :key="file.name">
      <img :src="file.imagePath" />
    </div>
    <button @click="upload()">アップロード</button>
  </div>
</template>

<script>
import { storage } from '~/plugins/firebaseSettings'

export default {
  data() {
    return {
      files: []
    }
  },
  methods: {
    uploadedFile(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      const obj = {}
      reader.onload = () => {
        obj.imagePath = reader.result
        obj.file = file
        obj.name = file.name
        this.files.push(obj)
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
