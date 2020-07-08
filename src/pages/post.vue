<template>
  <section class="section">
    <h1>以下のフォーマットにしたがって入力してください</h1>
    <div>
      <b-field label="論文タイトル">
        <b-input v-model="info.title"></b-input>
      </b-field>
      <b-field label="要約">
        <b-input v-model="info.abstract" type="textarea"></b-input>
      </b-field>
      <b-field label="著者名・所属">
        <div v-for="au in info.author" :key="au.id">
          <b-input v-model="au.name" placeholder="Author"></b-input>
          <b-input v-model="au.institute" placeholder="Institute"></b-input>
        </div>
      </b-field>
      <div class="buttons">
        <b-button type="is-primary" @click="addAuthor">著者を追加する</b-button>
        <b-button type="is-danger" @click="deleteAuthor"
          >著者の欄を減らす</b-button
        >
      </div>
      <b-field label="新規性">
        <b-input v-model="info.contribution" type="textarea"></b-input>
      </b-field>
      <b-field label="検証方法">
        <b-input v-model="info.verify" type="textarea"></b-input>
      </b-field>
      <b-field label="発行年">
        <b-input v-model="info.year" type="number"></b-input>
      </b-field>
      <b-field label="タグ">
        <div v-for="tag in info.tag" :key="tag.id">
          <b-input v-model="tag.tagname" placeholder="Tag"></b-input>
        </div>
      </b-field>
      <div class="buttons">
        <b-button type="is-primary" @click="addTag">タグを追加する</b-button>
        <b-button type="is-danger" @click="deleteTag">タグを減らす</b-button>
      </div>
      <b-field label="画像(最大4枚まで選択できます)">
        <input
          type="file"
          accept="image/*"
          multiple="multiple"
          :disabled="files.length > 3"
          @change="uploadedFile"
        />
      </b-field>
      <div class="columns">
        <div v-for="(file, index) in files" :key="file.name" class="column">
          <img :src="file.imagePath" class="preview" />
          <button class="button is-light" @click="files.splice(index, 1)">
            Remove image
          </button>
        </div>
      </div>
    </div>
    <br />
    <button class="button is-primary" :disabled="!info.title" @click="submit()">
      投稿する
    </button>
  </section>
</template>

<script>
import { db, storage } from '~/plugins/firebaseSettings'

export default {
  middleware: 'authenticated',
  name: 'HomePage',
  components: {},
  data() {
    return {
      info: {
        title: '',
        abstract: '',
        contribution: '',
        verify: '',
        year: '',
        tag: [
          {
            tagname: '',
            id: 0
          }
        ],
        author: [
          {
            name: '',
            institute: '',
            id: 0
          }
        ],
        imgPath: []
      },
      files: []
    }
  },
  methods: {
    addAuthor() {
      this.info.author.push({
        name: '',
        institute: '',
        id: this.info.author.length
      })
    },
    deleteAuthor() {
      if (this.info.author.length !== 1) {
        this.info.author.pop()
      }
    },
    addTag() {
      this.info.tag.push({
        tagname: '',
        id: this.info.tag.length
      })
    },
    deleteTag() {
      if (this.info.tag.length !== 1) {
        this.info.tag.pop()
      }
    },
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
          // 画像のurlをdatabaseのほうに登録
          this.info.imgPath.push(file.name)
          this.files.push(obj)
        }
      }
    },
    async submit() {
      if (this.info.title === '') return

      // test code
      const normaltitle = this.info.title
        .toLowerCase()
        .replace(/\W/g, ' ')
        .replace(/\s{2}/g, ' ')

      // test fin
      const storageRef = storage.ref()
      try {
        await db
          .collection('article-test')
          .doc(normaltitle)
          .set({
            info: this.info
          })
        await Promise.all(
          this.files.map(async (e) => {
            const targetRef = storageRef.child(normaltitle + '/' + e.name)
            await targetRef.put(e.file)
          })
        )
        alert('success')
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
