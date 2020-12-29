<template>
  <div>
    <v-container class="py-5">
      <iframe
        :src="getIframeUrl()"
        width="100%"
        height="400"
        allowfullscreen
        frameborder="0"
      ></iframe>
    </v-container>
    <v-container>
      <div class="text-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
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
          <template v-slot:activator="{ on }">
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
          <template v-slot:activator="{ on }">
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
          <template v-slot:activator="{ on }">
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

        <p class="my-4">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="item.prev"
                class="ma-1"
                :to="
                  localePath({
                    name: 'edit-id',
                    params: { id: item.prev },
                  })
                "
                v-on="on"
                ><v-icon>mdi-chevron-left</v-icon></v-btn
              >
            </template>
            <span>{{ '前の' + item.type + 'へ' }}</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="item.next"
                class="ma-1"
                :to="
                  localePath({
                    name: 'edit-id',
                    params: { id: item.next },
                  })
                "
                v-on="on"
                ><v-icon>mdi-chevron-right</v-icon></v-btn
              >
            </template>
            <span>{{ '次の' + item.type + 'へ' }}</span>
          </v-tooltip>
        </p>
      </div>
    </v-container>

    <v-sheet class="pa-4 mt-5 mb-3" color="grey lighten-3">
      <v-container>
        <dl class="row">
          <dt class="col-sm-3 text-muted"><b>URL</b></dt>
          <dd class="col-sm-9" style="overflow-wrap: break-word">
            <a :href="prefix + '/item/' + $route.params.id">{{
              prefix + '/item/' + $route.params.id
            }}</a>
          </dd>
        </dl>

        <dl class="row">
          <dt class="col-sm-3 text-muted">
            <b>{{ $t('title') }}</b>
          </dt>
          <dd class="col-sm-9">
            {{ item.vol_str }} {{ item.page }}{{ item.type }}
          </dd>
        </dl>

        <dl class="row">
          <dt class="col-sm-3 text-muted">
            <b>{{ $t('target') }}</b>
          </dt>
          <dd class="col-sm-9">
            {{ item.target }}
          </dd>
        </dl>
      </v-container>
    </v-sheet>

    <v-container>
      <v-expansion-panels
        tile
        :value="result.item.attribution == '国立国会図書館' ? 0 : 1"
      >
        <v-expansion-panel class="my-4">
          <v-expansion-panel-header>
            {{
              result.item.attribution == '国立国会図書館'
                ? 'テキスト'
                : 'OCRテキスト'
            }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p
              @select="selected"
              @blur="selected"
              @keyup="selected"
              @click="selected"
              v-html="result.item.text.split('\n').join('<b> / </b>')"
            ></p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <template v-if="chips.length > 0 && isSignedIn">
        <dl class="row">
          <dt class="col-sm-3 text-muted">
            <b>番号付与済み</b>
          </dt>
          <dd class="col-sm-9">
            <v-chip
              v-for="(attribution, index) in chips"
              :key="'chip_' + index"
              class="mx-2"
            >
              {{ attribution }}
            </v-chip>
          </dd>
        </dl>
      </template>

      <v-sheet class="pa-4 my-4" color="grey lighten-3">
        <v-row>
          <v-col cols="12" :sm="5"
            ><h3>類似コマ</h3>
            <small>
              <ul>
                <li>
                  「校異源氏物語テキスト」または「くずし字OCR結果テキスト」間の編集距離に基づく類似度を利用しています。
                </li>
                <li>
                  すでに頁番号が付与されている場合には、背景が黄色になります。
                </li>
              </ul></small
            ></v-col
          >
          <v-col cols="12" :sm="7"
            ><v-select
              v-model="select"
              :items="items"
              :label="$t('target')"
            ></v-select
          ></v-col>
        </v-row>
      </v-sheet>

      <template v-for="(itemList, attr) in result.arr">
        <template v-if="select == 'すべて' || attr == select">
          <h3 class="mb-3 mt-5" :key="attr">{{ attr }}</h3>
          <template v-for="(item, itemIndex) in itemList">
            <v-card
              :key="attr + itemIndex"
              class="mb-5"
              flat
              outlined
              :style="
                result.item.koui.includes(item.objectID)
                  ? 'background-color : #FFF59D'
                  : ''
              "
            >
              <v-row>
                <v-col cols="12" sm="3">
                  <nuxt-link
                    :to="
                      localePath({
                        name: 'edit-id',
                        params: { id: item.objectID },
                      })
                    "
                  >
                    <v-img
                      :src="item.image"
                      contain
                      style="height: 150px"
                      width="100%"
                    ></v-img>
                  </nuxt-link>
                  <v-card-text>
                    <div class="text-center">
                      <nuxt-link
                        :to="
                          localePath({
                            name: 'edit-id',
                            params: { id: item.objectID },
                          })
                        "
                        class="mr-2"
                      >
                        <h3>
                          {{ item.vol_str }} {{ item.page }}{{ item.type }}
                        </h3>
                      </nuxt-link>

                      <v-progress-linear :value="item.score * 100" height="25">
                        類似度:
                        <strong>{{ Math.ceil(item.score * 100) }}%</strong>
                      </v-progress-linear>

                      <div class="mt-2">
                        <v-btn
                          v-if="checkLike()"
                          icon
                          color="pink"
                          @click="like = !like"
                        >
                          <v-icon class="mr-1">mdi-heart</v-icon>1
                        </v-btn>
                        <v-btn v-else icon @click="like = !like">
                          <v-icon>mdi-heart-outline</v-icon>
                        </v-btn>
                      </div>
                    </div>

                    <template v-if="selectedText != ''"
                      ><p class="mt-4">
                        <b>選択済みテキスト：</b>{{ selectedText }}
                      </p></template
                    >

                    <p
                      v-if="
                        isSignedIn &&
                        result.item.attribution == '国立国会図書館'
                      "
                      class="mt-4"
                    >
                      <v-btn color="primary" @click="update2(item.objectID)">{{
                        $t('update')
                      }}</v-btn>
                    </p>
                  </v-card-text>
                </v-col>

                <!-- 右側の表示 -->
                <v-col cols="12" sm="9">
                  <!-- ログイン中 -->
                  <template
                    v-if="
                      isSignedIn && result.item.attribution == '国立国会図書館'
                    "
                  >
                    <v-virtual-scroll
                      :items="item.label"
                      height="500"
                      item-height="30"
                    >
                      <template
                        v-slot:default="{ item: text, index: lineIndex }"
                      >
                        <v-list-item :key="lineIndex">
                          <v-list-item-content>
                            <v-checkbox
                              v-model="checkbox[item.objectID]"
                              :value="lineIndex"
                              dense
                              class="my-0 py-0"
                            >
                              <template slot="label">
                                <span
                                  v-if="
                                    lineIndex == item.highlight &&
                                    selectedText != ''
                                  "
                                  class="background-color : yellow lighten-3"
                                >
                                  {{ text }}
                                </span>
                                <span v-else>
                                  {{ text }}
                                </span>
                              </template>
                            </v-checkbox>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-virtual-scroll>
                  </template>

                  <!-- 非ログイン中 -->
                  <template v-else>
                    <v-card-text>
                      <v-expansion-panels
                        tile
                        :value="item.attribution == '国立国会図書館' ? 0 : 1"
                      >
                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            {{
                              item.attribution == '国立国会図書館'
                                ? 'テキスト'
                                : 'OCRテキスト'
                            }}
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <p>
                              <template v-for="(text, lineIndex) in item.label">
                                <span
                                  v-if="
                                    lineIndex == item.highlight &&
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

                            <template v-if="selectedText != ''"
                              ><b>選択済みテキスト：</b
                              >{{ selectedText }}</template
                            >
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-card-text>
                  </template>
                </v-col>
              </v-row>
            </v-card>
          </template>
        </template>
      </template>
    </v-container>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <!--
        <v-card-title class="headline grey lighten-2" primary-title
          >プロフィールを編集</v-card-title
        >
        -->

        <v-card-text class="pt-5">更新しました。</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="dialog = !dialog">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

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

      const res = await axios.get(app.context.env.BASE_URL + '/nuxt.json')
      const jsonData = res.data

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

      return { result }
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
    }
  },

  computed: {
    // 算出 getter 関数
    url() {
      // `this` は vm インスタンスを指します
      return this.baseUrl + '/edit/' + this.$route.params.id
    },
    id() {
      return this.$route.params.id
    },
    title() {
      return null
      // return this.result.title
    },
    items() {
      const arr = this.result.arr
      const items = ['すべて']
      for (let key in arr) {
        items.push(key)
      }
      return items
    },
    chips() {
      const arr = this.result.arr
      const chips = []
      const checkbox = this.checkbox
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        const id = item.objectID
        if (checkbox[id] && checkbox[id].length > 0) {
          chips.push(item.attribution)
        }
      }
      return chips
    },
    item() {
      return this.result.item
    },
  },

  watch: {
    selectedText() {
      const selectedText = this.selectedText

      const attrMap = this.result.arr
      for (let attr in attrMap) {
        const arr = attrMap[attr]

        const items = []
        for (let i = 0; i < arr.length; i++) {
          const item = arr[i]
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

          item.highlight = arr2[0].key

          items.push(item)
        }

        attrMap[attr] = items
      }

      this.result.arr = attrMap
    },
  },

  created() {
    this.onAuthStateChanged()

    console.log(this.result)

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
    onAuthStateChanged() {
      firebase.auth().onAuthStateChanged((user) => {
        this.userName = user ? user.displayName : null
        this.userPic = user ? user.photoURL : null
        this.isSignedIn = !!user
      })
    },
    getIframeUrl() {
      const item = this.result.item
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

    aaa(item) {
      console.log(item)
    },

    update2(data) {
      const id = data
      const values = this.checkbox[data]
      const parent = this.result.item.objectID
      this.$store.dispatch('addNumber', { id, values, parent })
      this.dialog = true
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
}
</script>
