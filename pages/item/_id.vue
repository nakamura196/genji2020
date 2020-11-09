<template>
  <div>
    <v-container class="py-5">
      <iframe
        :src="getIframeUrl()"
        width="100%"
        height="600"
        allowfullscreen
        frameborder="0"
      ></iframe>
    </v-container>
    <v-container>
      <p class="text-center">
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
      </p>

          <dl class="row">
            <dt class="col-sm-3 text-muted"><b>URL</b></dt>
            <dd class="col-sm-9">
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
              {{ result.item.vol }} {{ result.item.work }}
              {{ result.item.page }}コマ目
            </dd>
          </dl>

          <dl class="row">
            <dt class="col-sm-3 text-muted">
              <b>{{ $t('attribution') }}</b>
            </dt>
            <dd class="col-sm-9">
              {{ result.item.attribution }}
            </dd>
          </dl>

          <dl class="row" v-if="false">
            <dt class="col-sm-3 text-muted">
              <b>{{ $t('license') }}</b>
            </dt>
            <dd class="col-sm-9">
              <template v-if="$i18n.locale == 'ja'">
                <a
                  rel="license"
                  href="http://creativecommons.org/licenses/by/4.0/"
                  ><img
                    alt="クリエイティブ・コモンズ・ライセンス"
                    style="border-width: 0"
                    src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a
                ><br />この作品は<a
                  rel="license"
                  href="http://creativecommons.org/licenses/by/4.0/"
                  >クリエイティブ・コモンズ 表示 4.0 国際 ライセンス</a
                >の下に提供されています。
              </template>
              <template v-else>
                <a
                  rel="license"
                  href="http://creativecommons.org/licenses/by/4.0/"
                  ><img
                    alt="Creative Commons License"
                    style="border-width: 0"
                    src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a
                ><br />This work is licensed under a
                <a
                  rel="license"
                  href="http://creativecommons.org/licenses/by/4.0/"
                  >Creative Commons Attribution 4.0 International License</a
                >.
              </template>
            </dd>
          </dl>

          <dl class="row">
            <dt class="col-sm-3 text-muted">
              <b>{{ $t('テキスト') }}</b>
            </dt>
            <dd class="col-sm-9">
              <p v-html="result.item.text.split('\n').join('<b> / </b>')"></p>
            </dd>
          </dl>
          
      <h3 class="mb-4">類似コマ</h3>

      <v-card
        class="mb-5"
        flat
        outlined
        v-for="(item, index) in result.arr"
        :key="index"
      >
        <v-row>
          <v-col cos="12" sm="3">
            <nuxt-link
              :to="
                localePath({ name: 'item-id', params: { id: item.objectID } })
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
              <nuxt-link :to="localePath({name : 'item-id', params : {id : item.objectID}})" class="mr-2">
                <h3>{{ item.vol }} {{ item.work }} {{ item.page }}コマ目</h3>
              </nuxt-link>

              <p>
                {{ item.attribution }}
              </p>
            </v-card-text>
          </v-col>
          <v-col>
            <v-card-text>
              <p v-html="item.text.split('\n').join('<b> / </b>')"></p>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>

const fs = require('fs')

export default {
  async asyncData({ payload, app }) {
    if (payload) {
      return { result: payload }
    } else {
      const id = app.context.params.id

      
      const jsonData = JSON.parse(fs.readFileSync('assets/json/nuxt.json'))

      /*

      let searchResult = await index.search('', {
        filters: 'objectID:' + id,
      })

      

      const obj = searchResult.hits[0]

      */

      const obj = jsonData[id]

      /*

      const attribution = obj.attribution

      const vol = obj.vol

      const text = obj.text

      const thres = 100

      searchResult = await index.search('', {
        similarQuery: text.length > thres ? text.substring(0, thres) : text,
        filters: 'NOT objectID:' + id + ' AND NOT attribution:' + attribution + ' AND vol:' + vol,
      })

      const arr = searchResult.hits

      */

      const ids = obj.arr
      const arr = []

      for(let i = 0; i < ids.length; i++){
        arr.push(jsonData[ids[i]])        
      }

      let result = {
        item: obj,
        arr: arr,
      }

      return { result }
    }
  },

  data() {
    return {
      baseUrl: process.env.BASE_URL,
      prefix: process.env.BASE_URL, //'https://w3id.org/kunshujo',
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
      return null
      //return this.result.title
    },
  },

  methods: {
    getIframeUrl() {
      const item = this.result.item
      let url = ""
      if(item.manifest){
        url = this.baseUrl +
        '/curation/?manifest=' +
        item.manifest +
        '&canvas=' +
        encodeURIComponent(item.canvas)
      } else {
        url = this.baseUrl +
        '/curation/?curation=' + item.curation + "&pos=" + item.pos
      }
      return url
    },

    getCurationUrl() {
      const item = this.result.item
      let url = ""
      if(item.curation){
        url = 'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=' + item.curation + "&pos=" + item.pos + "&mode=annotation"
      } else {
        url = 'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest=' + item.manifest + "&canvas=" + item.canvas
      }
      return url
    },

    aaa(item) {
      console.log(item)
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