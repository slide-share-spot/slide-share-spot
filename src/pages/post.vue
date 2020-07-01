<template>
  <section class="section">
    <h1>ここはスライド内容を投稿するページ</h1>
    <div>
      <b-field label="論文タイトル">
        <b-input v-model="info.title"></b-input>
      </b-field>
      <b-field label="ようやく">
        <b-input v-model="info.abstract"></b-input>
      </b-field>
      <b-field label="著者名・所属">
        <div v-for="au in info.author" :key="au.id">
          <b-input v-model="au.name" placeholder="Author"></b-input>
          <b-input v-model="au.institute" placeholder="Institute"></b-input>
        </div>
      </b-field>
      <div class="buttons">
        <b-button type="is-primary" @click="addAuthor">
          著者を追加する
        </b-button>
        <b-button type="is-danger" @click="deleteAuthor">
          著者の欄を減らす
        </b-button>
      </div>
      <b-field label="こんとりびゅーしょん">
        <b-input v-model="info.contribution"></b-input>
      </b-field>
      <b-field label="verify">
        <b-input v-model="info.verify"></b-input>
      </b-field>
      <b-field label="発行年">
        <b-input v-model="info.year"></b-input>
      </b-field>
      <b-field label="タグ">
        <div v-for="tag in info.tag" :key="tag.id">
          <b-input v-model="tag.tagname" placeholder="Tag"></b-input>
        </div>
      </b-field>
      <div class="buttons">
        <b-button type="is-primary" @click="addTag">
          タグを追加する
        </b-button>
        <b-button type="is-danger" @click="deleteTag">
          タグを減らす
        </b-button>
      </div>
      <b-field label="画像">
        <input
          type="file"
          accept="image/*"
          multiple="multiple"
          @change="uploadedFile"
        />
        <div v-for="file in files" :key="file.name">
          <img :src="file.imagePath" />
        </div>
      </b-field>
    </div>
    <button :disabled="!info.title" @click="submit()">投稿する</button>
  </section>
</template>

<script>
import { db, storage } from '~/plugins/firebaseSettings'

export default {
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
        ]
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
            const targetRef = storageRef.child(
              this.info.title + '/' + normaltitle
            )
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
