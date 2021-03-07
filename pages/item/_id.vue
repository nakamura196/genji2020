<template>
  <div>
    <v-sheet color="grey lighten-2">
      <v-container fluid class="py-4">
        <v-breadcrumbs class="py-0" :items="bh">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-container>
    </v-sheet>
    <p class="text-center mb-5 mt-2">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              v-if="item.next"
              class="ma-1"
              fab
              dark
              small
              :to="
                localePath({
                  name: 'item-id',
                  params: { id: item.next },
                })
              "
              v-on="on"
              ><v-icon>mdi-chevron-left</v-icon></v-btn
            >
          </template>
          <span>{{ '次の' + item.type + 'へ' }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              v-if="item.prev"
              class="ma-1"
              fab
              dark
              small
              :to="
                localePath({
                  name: 'item-id',
                  params: { id: item.prev },
                })
              "
              v-on="on"
              ><v-icon>mdi-chevron-right</v-icon></v-btn
            >
          </template>
          <span>{{ '前の' + item.type + 'へ' }}</span>
        </v-tooltip>
      </p>

      <v-sheet color="grey lighten-3 mt-5 px-5">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card flat class="my-5 scroll vertical"
            :style="`height: ${/*height * 0.85*/ 400}px; width: ${width / 2}px`"
          >
            <div class="pa-4 px-5">
              <span @select="selected"
              @blur="selected"
              @keyup="selected"
              @click="selected" v-html="item.text.split('\n').join('<br/>')"> </span>

            </div>
            </v-card>
          </v-col>
        <v-col cols="12" sm="6">
          <iframe
          class="my-5"
      :src="getIframeUrl(item)"
      width="100%"
      height="400"
      allowfullscreen
      frameborder="0"
    ></iframe>
    </v-col>
          </v-row>
        </v-sheet>

    

    <v-container class="mt-5 py-5">
      

      

      <h2>{{ title }}</h2>

      <div class="text-center my-2">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              class="mx-1"
              icon
              target="_blank"
              :href="getCurationUrl()"
              v-on="on"
              ><img :src="baseUrl + '/img/icons/icp-logo.svg'" width="30px"
            /></v-btn>
          </template>
          <span>{{ 'IIIF Curation Viewer' }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              class="mx-1"
              icon
              target="_blank"
              :href="'https://twitter.com/intent/tweet?url=' + url"
              v-on="on"
              ><v-icon>mdi-twitter</v-icon></v-btn
            >
          </template>
          <span>{{ 'Twitter' }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              class="mx-1"
              icon
              target="_blank"
              :href="'https://www.facebook.com/sharer/sharer.php?u=' + url"
              v-on="on"
              ><v-icon>mdi-facebook</v-icon></v-btn
            >
          </template>
          <span>{{ 'Facebook' }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              class="mx-1"
              icon
              target="_blank"
              :href="'http://getpocket.com/edit?url=' + url"
              v-on="on"
              ><img
                style="font-size: 30px"
                src="https://cultural.jp/img/icons/pocket.svg"
            /></v-btn>
          </template>
          <span>{{ 'Pocket' }}</span>
        </v-tooltip>
      </div>

      <v-simple-table v-if="false" class="mt-5">
        <template #default>
          <tbody>
            <tr>
              <td width="30%">URL</td>
              <td style="overflow-wrap: break-word" class="py-5">
                <a :href="prefix + '/item/' + $route.params.id">{{
                  prefix + '/item/' + $route.params.id
                }}</a>
              </td>
            </tr>

            <tr>
              <td width="30%">{{ $t('target') }}</td>
              <td style="overflow-wrap: break-word" class="py-5">
                {{ item.target }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>

    <v-sheet class="pa-4 my-5" color="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" :sm="8"
            ><h3>類似度の高い見開きページ</h3>
            <p class="my-0">
              <ul>
                <li>
                  『校異源氏物語』のテキストデータと、くずし字OCR結果のテキストデータ間の編集距離を用いて、類似度の高い見開きページを表示しています。詳しくは、<nuxt-link :to="localePath({name: 'about'})">こちら</nuxt-link>をご覧ください。
                </li>
                <li>
                  背景が黄色になっているものは、『校異源氏物語』の頁番号が既に付与されているページです。
                </li>
              </ul>
              </p>
              </v-col
          >
          <v-col cols="12" :sm="4"
            ><v-select
              v-model="select"
              :items="items"
              :label="$t('target')"
            ></v-select
          ></v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-container>
      <template v-for="(arr, attr) in result.arr">
        <div
          v-if="(select == 'すべて' || attr == select) && items.includes(attr)"
          :key="attr"
        >
          <h3 class="mb-3 mt-5">{{ labelConverter(attr) }}</h3>

          <ul class="horizontal-list">
            <li v-for="(item, index) in arr" :key="index" class="item">
              <v-card
                :key="index"
                class="mb-5"
                flat
                outlined
                :style="
                  result.item.koui.includes(item.objectID)
                    ? 'background-color : #FFF59D'
                    : ''
                "
              >
                <!--
                <nuxt-link
                  :to="
                    localePath({
                      name: 'item-id',
                      params: { id: item.objectID },
                    })
                  "
                >
                  <v-img
                    :src="item.image"
                    contain
                    style="height: 150px"
                    width="100%"
                    class="grey lighten-2"
                  ></v-img>
                </nuxt-link>
                -->
                <a
                  @click="
                    rItemId = item.objectID
                    lItemId = id
                    dialog = true
                  "
                >
                  <v-img
                    :src="item.image"
                    contain
                    style="height: 150px"
                    width="100%"
                    class="grey lighten-2"
                  ></v-img>
                </a>

                <v-card-text>
                  <a
                    @click="
                      rItemId = item.objectID
                      lItemId = id
                      dialog = true
                    "
                  >
                    <b> {{ item.vol_str }} {{ item.page }}{{ item.type }} </b>
                  </a>
                  <!--
                  <nuxt-link
                    :to="
                      localePath({
                        name: 'item-id',
                        params: { id: item.objectID },
                      })
                    "
                  >
                    <b>
                      {{ item.vol_str }} {{ item.page
                      }}{{
                        item.type
                      }}
                    </b>
                  </nuxt-link>
                  -->

                  <div class="mt-3">
                    <v-progress-linear :value="item.score * 100" height="25">
                      類似度:
                      <strong>{{ Math.ceil(item.score * 100) }}%</strong>
                    </v-progress-linear>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <template v-if="login">
                    <template v-if="documentIds.includes(item.objectID)">
                      <v-btn
                        icon
                        :color="
                          documents[item.objectID].includes(uid) ? 'pink' : ''
                        "
                        @click="
                          good(
                            item.objectID,
                            !documents[item.objectID].includes(uid)
                          )
                        "
                      >
                        <v-icon class="mr-1">{{
                          documents[item.objectID].includes(uid)
                            ? 'mdi-heart'
                            : 'mdi-heart-outline'
                        }}</v-icon
                        >{{
                          documents[item.objectID].length > 0
                            ? documents[item.objectID].length
                            : ''
                        }}
                      </v-btn>
                    </template>
                    <template v-else>
                      <v-btn icon @click="good(item.objectID, true)">
                        <v-icon class="mr-1">mdi-heart-outline</v-icon>
                      </v-btn>
                    </template>
                  </template>
                  <template v-else>
                    <div class="my-1">
                      <v-icon class="mr-1">mdi-heart-outline</v-icon
                      >{{
                        documentIds.includes(item.objectID)
                          ? documents[item.objectID].length
                          : ''
                      }}
                    </div>
                  </template>
                </v-card-actions>
              </v-card>
            </li>
          </ul>
        </div>
      </template>
    </v-container>

    <p class="my-10"></p>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-btn fab dark fixed top right small @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card>
        <div class="pa-4">
          <v-row>
            <v-col>
              <v-card flat outlined>
                <iframe
                  :src="getIframeUrl(lItem)"
                  width="100%"
                  height="600"
                  allowfullscreen
                  frameborder="0"
                ></iframe>
                <div class="pa-4">
                  
                  <p class="my-2 text-center">
                    <v-tooltip v-if="lItem.next" bottom>
                      <template #activator="{ on }">
                        <v-btn
                          class="ma-1"
                          fab
                          dark
                          small
              @click="lItemId = lItem.next"
              v-on="on"
                          ><v-icon>mdi-chevron-left</v-icon></v-btn
                        >
                      </template>
                      <span>{{ '次の' + lItem.type + 'へ' }}</span>
                    </v-tooltip>

                    <v-tooltip v-if="lItem.prev" bottom>
                      <template #activator="{ on }">
                        <v-btn
                          class="ma-1"
                          fab
                          dark
                          small
              @click="lItemId = lItem.prev"
              v-on="on"
                          ><v-icon>mdi-chevron-right</v-icon></v-btn
                        >
                      </template>
                      <span>{{ '前の' + lItem.type + 'へ' }}</span>
                    </v-tooltip>
                  </p>

                  <h2>
                    {{ lItem.vol_str }} {{ lItem.page }}{{ lItem.type }}（{{
                      lItem.target
                    }}）
                  </h2>

                  <p
                    v-if="lItem.text"
                    class="mt-2"
                    @select="selected"
                    @blur="selected"
                    @keyup="selected"
                    @click="selected"
                    v-html="lItem.text.split('\n').join('<b> / </b>')"
                  ></p>
                </div>
              </v-card>
            </v-col>

            <v-col>
              <v-card flat outlined>
                <iframe
                  :src="getIframeUrl(rItem)"
                  width="100%"
                  height="600"
                  allowfullscreen
                  frameborder="0"
                ></iframe>

                <div class="pa-4">
                  

                  <p class="my-2 text-center">
                    <v-tooltip v-if="rItem.next" bottom>
                      <template #activator="{ on }">
                        <v-btn
                          class="ma-1"
                          fab
                          dark
                          small
              @click="rItemId = rItem.next"
              v-on="on"
                          ><v-icon>mdi-chevron-left</v-icon></v-btn
                        >
                      </template>
                      <span>{{ '次の' + rItem.type + 'へ' }}</span>
                    </v-tooltip>

                    <v-tooltip v-if="rItem.prev" bottom>
                      <template #activator="{ on }">
                        <v-btn
                          class="ma-1"
                          fab
                          dark
                          small
              @click="rItemId = rItem.prev"
              v-on="on"
                          ><v-icon>mdi-chevron-right</v-icon></v-btn
                        >
                      </template>
                      <span>{{ '前の' + rItem.type + 'へ' }}</span>
                    </v-tooltip>
                  </p>

                  <h2>
                    {{ rItem.vol_str }} {{ rItem.page }}{{ rItem.type }}（{{
                      labelConverter(rItem.target)
                    }}）
                  </h2>

                  <p class="mt-2">
                    <template v-for="(text, lineIndex) in rItem.label">
                      <span
                        v-if="
                          lineIndex == highlight_line_index &&
                          selectedText != ''
                        "
                        :key="lineIndex"
                        class="background-color : yellow lighten-3"
                      >
                        {{ text }}
                      </span>
                      <span v-else :key="lineIndex">
                        {{ text }}
                      </span>
                      <b
                        v-if="lineIndex != item.label.length - 1"
                        :key="'br-' + lineIndex"
                      >
                        /
                      </b>
                    </template>
                  </p>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <div class="text-center my-10">
            <!-- <v-btn :to="localePath({name : 'item-id', params : {id : rItemId}})" large color="primary" class="mr-4">続きを見る</v-btn> -->
            <!-- 
            <v-btn v-if="checkLike()" icon color="pink" @click="like = !like">
              <v-icon class="mr-1">mdi-heart</v-icon>1
            </v-btn>
            <v-btn v-else icon @click="like = !like">
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
            -->
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

const FieldValue = firebase.firestore.FieldValue
const firestore = firebase.firestore()

function levenshteinDistance(str1, str2) {
  let r
  let c
  let cost
  const d = []

  for (r = 0; r <= str1.length; r++) {
    d[r] = [r]
  }
  for (c = 0; c <= str2.length; c++) {
    d[0][c] = c
  }
  for (r = 1; r <= str1.length; r++) {
    for (c = 1; c <= str2.length; c++) {
      // cost = str1[r-1] == str2[c-1] ? 0: 1;
      cost = str1.charCodeAt(r - 1) === str2.charCodeAt(c - 1) ? 0 : 1
      d[r][c] = Math.min(
        d[r - 1][c] + 1,
        d[r][c - 1] + 1,
        d[r - 1][c - 1] + cost
      )
    }
  }
  return d[str1.length][str2.length] / Math.max(str1.length, str2.length)
}

export default {
  async asyncData({ payload, app }) {
    if (payload) {
      return { result: payload }
    } else {
      const id = app.context.params.id

      const jsonData = {}

      const res = await axios.get(app.context.env.BASE_URL + '/nuxt.json')
      for (const key in res.data) {
        jsonData[key] = res.data[key]
      }

      const arr = [
        'kyoto01',
        'kyoto02',
        'ndl02',
        'ndl03',
        'ndl04',
        'nijl',
        'utokyo',
      ]
      for (let i = 0; i < arr.length; i++) {
        const e = arr[i]
        const res = await axios.get(
          app.context.env.BASE_URL + '/data/json/' + e + '.json'
        )
        for (const key in res.data) {
          jsonData[key] = res.data[key]
        }
      }

      const obj = jsonData[id]

      const sims = obj.arr
      const sims2 = {}

      for (const attr in sims) {
        const arr = []

        const obj2 = sims[attr]

        for (let i = 0; i < obj2.length; i++) {
          const sim = obj2[i]
          const obj = jsonData[sim.id]
          obj.score = sim.score
          arr.push(obj)
        }

        sims2[attr] = arr
      }

      const result = {
        item: obj,
        arr: sims2,
      }

      return { result, nuxt: jsonData }
    }
  },

  data() {
    return {
      baseUrl: process.env.BASE_URL,
      prefix: process.env.BASE_URL, // 'https://w3id.org/kunshujo',
      select: 'すべて',
      selectedText: '',
      isSignedIn: false,
      checkbox: {},
      like: true,
      dialog: false,
      rItemId: '',
      lItemId: '',
      lText: '',
      highlight_line_index: -1,

      //
      documents: [],
      documentIds: [],
      uid: '',
      login: false,

      //
      width: window.innerWidth
    }
  },

  head() {
    const title = this.title
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.url,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.result.item.image,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  },

  computed: {
    // 算出 getter 関数
    url() {
      // `this` は vm インスタンスを指します
      return this.baseUrl + '/item/' + this.$route.params.id
    },
    id() {
      return this.$route.params.id
    },
    title() {
      const item = this.item
      return item.vol_str + ' ' + item.page + item.type
    },
    bh() {
      return [
        {
          text: this.$t('top'),
          disabled: false,
          to: this.localePath({ name: 'index' }),
          exact: true,
        },
        {
          text: this.$t('search'),
          disabled: false,
          to: this.localePath({ name: 'search', query: { 'genji[sortBy]': 'genji_page_asc' } }),
          text: this.$t('search'),
        },
        {
          text: this.title,
        },
      ]
    },
    items() {
      const arr = this.result.arr
      const items = ['すべて']
      for (const key in arr) {
        if (arr[key].length > 0) {
          items.push(key)
        }
      }
      return items
    },
    rItem() {
      const itemId = this.rItemId

      return this.nuxt[itemId] || {}
    },
    lItem() {
      const itemId = this.lItemId
      this.selectedText = ''
      return this.nuxt[itemId] || {}
    },

    item() {
      return this.result.item
    },
  },

  watch: {
    selectedText() {
      this.update_highlight()
    },
    rItem() {
      this.update_highlight()
    },
  },

  created() {
    firebase
      .firestore()
      .collection('kouis')
      .doc(this.id)
      .collection('documents')
      .onSnapshot(
        (res) => {
          const documents = {}
          const ids = []

          res.forEach(async function (doc) {
            /*
            const users = []
            const likedUsersRef = await firebase
              .firestore()
              .doc(doc.ref.path)
              .collection('likedUsers')
              .get()
            likedUsersRef.forEach(function (user) {
              users.push(user.id)
            })
            */
            const users = doc.data().likedUsers || []
            documents[doc.id] = users
            ids.push(doc.id)
          })

          /*
          for(let i = 0; i < res.docs.length; i++){
            const doc = res.docs[i]
            console.log(doc)

            const users = []
            const likedUsersRef = await firebase
              .firestore()
              .doc(doc.ref.path)
              .collection('likedUsers')
              .get()
            likedUsersRef.forEach(function (user) {
              users.push(user.id)
            })
            documents[doc.id] = users
            ids.push(doc.id)
          }
          */

          this.documents = documents
          this.documentIds = ids
        },
        (error) => {
          console.error('GET_REALTIME_LIST', error)
        }
      )

    this.onAuthStateChanged()

    const checkbox = {}

    const arr = this.result.arr
    for (let i = 0; i < arr.length; i++) {
      checkbox[arr[i].objectID] = []
    }

    const db = firebase.firestore()

    const numberRef = db.collection(this.result.item.objectID)

    if (numberRef) {
      numberRef
        .get()
        .then((res) => {
          res.forEach((doc) => {
            checkbox[doc.id] = Array.isArray(doc.data().values)
              ? doc.data().values
              : [doc.data().values]
          })

          this.checkbox = checkbox
        })
        .catch((error) => {
          console.log('error : ' + error)
        })
    } else {
      this.checkbox = checkbox
    }
  },

  methods: {
    labelConverter(value){
      const map = {
        "NDL02" : "伝嵯峨本（国会図書館所蔵）",
        "NDL03" : "近世前期写本（国会図書館所蔵）",
        "NDL04" : "元和9年古活字版（国会図書館所蔵）",
        "京大本01" : "平松家本（京都大学所蔵）",
        "京大本02" : "中院文庫本（京都大学所蔵）",
        "東大本" : "東京大学本（東京大学総合図書館所蔵）",
        "湖月抄（国文研所蔵）" : "『湖月抄』鵜飼文庫（国文研所蔵）",
      }
      return map[value]
    },
    update_highlight() {
      const selectedText = this.selectedText
      const item = this.rItem
      if (Object.keys(item).length == 0) {
        this.highlight_line_index = -1
        return
      }
      const texts = item.label
      const map = {}
      for (let j = 0; j < texts.length; j++) {
        const text = texts[j]

        const dist = levenshteinDistance(selectedText, text)

        map[j] = dist
      }

      const arr2 = Object.keys(map).map((e) => ({ key: e, value: map[e] }))
      arr2.sort(function (a, b) {
        if (a.value < b.value) return -1
        if (a.value > b.value) return 1
        return 0
      })

      const highlight_line_index = arr2[0].key
      this.highlight_line_index = highlight_line_index
    },
    onAuthStateChanged() {
      firebase.auth().onAuthStateChanged((user) => {
        this.uid = user.uid || ''
        this.login = !!user
        this.userName = user ? user.displayName : null
        this.userPic = user ? user.photoURL : null
        this.isSignedIn = !!user
      })
    },
    getIframeUrl(item) {
      let url = ''
      if (item.manifest) {
        url =
          this.baseUrl +
          '/curation/?manifest=' +
          item.manifest +
          '&canvas=' +
          encodeURIComponent(item.canvas)
      } else {
        url =
          this.baseUrl +
          '/curation/?curation=' +
          item.curation +
          '&pos=' +
          item.pos
      }
      return url
    },

    selected() {
      this.selectedText = window.getSelection().toString()
    },

    getCurationUrl() {
      const item = this.result.item
      let url = ''
      if (item.curation) {
        url =
          'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=' +
          item.curation +
          '&pos=' +
          item.pos +
          '&mode=annotation'
      } else {
        url =
          'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest=' +
          item.manifest +
          '&canvas=' +
          item.canvas
      }
      return url
    },

    toArray2(map) {
      const arr = []
      for (const key in map) {
        arr.push({
          key,
          text: map[key],
        })
      }

      console.log(arr)

      return arr
    },

    checkLike() {
      const like = this.like
      /*
      this.like = !like
      return !like
      */
      return like
    },

    async good(documentId, addFlag) {
      // ----------
      const koui = await firebase
        .firestore()
        .collection('kouis')
        .doc(this.id)
        .get()
      const kouiRef = koui.ref
      if (!koui.exists) {
        await kouiRef.set({
          id: this.id,
          createTime: FieldValue.serverTimestamp(),
          updateTime: FieldValue.serverTimestamp(),
        })
      }

      // ----------
      const doc = await firebase
        .firestore()
        .collection('kouis')
        .doc(this.id)
        .collection('documents')
        .doc(documentId)
        .get()
      const docRef = doc.ref

      if (!doc.exists) {
        await docRef.set({
          id: documentId,
          createTime: FieldValue.serverTimestamp(),
          updateTime: FieldValue.serverTimestamp(),
          // likeCount: 0,
          likedUsers: [],
        })
      }

      // ----------

      const batch = firestore.batch()

      const anotherUser = await firebase
        .firestore()
        .collection('users')
        .doc(this.uid)
        .get()
      const anotherUserRef = anotherUser.ref

      if (addFlag) {
        /*
        batch.set(
          firestore
            .doc(docRef.path)
            .collection('likedUsers')
            .doc(anotherUserRef.id),
          {
            id: anotherUserRef.id,
            createTime: FieldValue.serverTimestamp(),
          }
        )
        */

        batch.update(firestore.doc(docRef.path), {
          // id: anotherUserRef.id,
          updateTime: FieldValue.serverTimestamp(),
          likedUsers: firebase.firestore.FieldValue.arrayUnion(
            anotherUserRef.id
          ),
        })

        batch.set(
          firestore
            .doc(anotherUserRef.path)
            .collection('likedDocs')
            .doc(docRef.id),
          {
            id: docRef.id,
            postRef: docRef,
            createTime: FieldValue.serverTimestamp(),
          }
        )

        // batch.update(docRef, { likeCount: FieldValue.increment(1) })
        batch.update(anotherUserRef, { likeDocCount: FieldValue.increment(1) })
      } else {
        batch.update(firestore.doc(docRef.path), {
          // id: anotherUserRef.id,
          updateTime: FieldValue.serverTimestamp(),
          likedUsers: firebase.firestore.FieldValue.arrayRemove(
            anotherUserRef.id
          ),
        })

        batch.delete(
          firestore
            .doc(anotherUserRef.path)
            .collection('likedDocs')
            .doc(docRef.id)
        )

        // batch.update(docRef, { likeCount: FieldValue.increment(-1) })
        batch.update(anotherUserRef, { likeDocCount: FieldValue.increment(-1) })
      }

      await batch.commit()
    }
    
  },
}
</script>

<style>
.horizontal-list {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding-left: 0px !important;
  padding-right: 0px;
}
.item {
  /* 横スクロール用 */
  display: inline-block;
  /* 見た目調整 */
  margin-right: 16px;
}
.scroll {
  overflow-y: auto;
}

.vertical {
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
}
</style>
