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
      // filesは name,file,imagepathをもつオブジェクトの配列
      files: []
    }
  },
  methods: {
    uploadedFile(e) {
      console.log(e)
      for (const k of Object.keys(e.target.files)) {
        const file = e.target.files[k]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        const obj = {}
        reader.onload = () => {
          obj.imagePath = reader.result
          obj.file = file
          obj.name = file.name
          this.files.push(obj)
        }
      }
    },
    async upload() {
      try {
        const storageRef = storage.ref()
        await Promise.all(
          this.files.map(async (e) => {
            // 'images/' がたぶん論文の名前になる、
            const targetRef = storageRef.child('images/' + e.name)
            await targetRef.put(e.file)
          })
        )
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
