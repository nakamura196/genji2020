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
            <dd class="col-sm-9" style="overflow-wrap: break-word;">
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
              {{ result.item.page }}{{result.item.attribution == "国立国会図書館" ? "ページ" : "コマ目"}}
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

          <!--
          <dl class="row">
            <dt class="col-sm-3 text-muted">
              <b>{{ $t('テキスト') }}</b>
            </dt>
            <dd class="col-sm-9">
              <v-expansion-panels tile :value="result.item.attribution == '国立国会図書館' ? 0 : 1">
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    {{result.item.attribution == "国立国会図書館" ? "テキスト" : "OCRテキスト"}}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                     <p v-html="result.item.text.split('\n').join('<b> / </b>')"></p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </dd>
          </dl>
          -->

          <v-expansion-panels tile :value="result.item.attribution == '国立国会図書館' ? 0 : 1">
                <v-expansion-panel class="my-4">
                  <v-expansion-panel-header>
                    {{result.item.attribution == "国立国会図書館" ? "テキスト" : "OCRテキスト"}}
                    <span v-if='result.item.attribution != "国立国会図書館"' class="red--text">（誤読を含む）</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                     <p 
                     @blur="selected"
                     @keyup="selected"
                     @click="selected"　@select="selected" v-html="result.item.text.split('\n').join('<b> / </b>')"></p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>

              <v-sheet class="pa-4 my-4" color="grey lighten-3">

              <v-row dense>
                <v-col cols="12" :sm="3"><h3>類似コマ</h3></v-col>
                <v-col cols="12" :sm="9"><v-select
          v-model="select"
          :items="items"
          :label="$t('attribution')"
        ></v-select></v-col>
              </v-row>

              </v-sheet>
          
      

      

      <template v-for="(item, index) in result.arr">
      <v-card
        class="mb-5"
        flat
        outlined
        v-if="select == 'すべて' || item.attribution == select"
        :key="index"
      >
        <v-row>
          <v-col cols="12" sm="3">
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
            <v-card-text class="text-center">
              <nuxt-link :to="localePath({name : 'item-id', params : {id : item.objectID}})" class="mr-2">
                <h3>{{ item.vol }} {{ item.work }} {{ item.page }}{{item.attribution == "国立国会図書館" ? "ページ" : "コマ目"}}</h3>
              </nuxt-link>

              <p>
                {{ item.attribution }}
              </p>

              <v-progress-linear
            :value="item.score * 100"
            height="25"
          >
            類似度: <strong>{{ Math.ceil(item.score * 100) }}%</strong>
          </v-progress-linear>
            </v-card-text>
          </v-col>
          
          <v-col　cols="12" sm="9">
            <v-card-text>
              <v-expansion-panels tile :value="item.attribution == '国立国会図書館' ? 0 : 1">
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    {{item.attribution == "国立国会図書館" ? "テキスト" : "OCRテキスト"}}
                    <span v-if='item.attribution != "国立国会図書館"' class="red--text">（誤読を含む）</span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p>
                      <template v-for="(text, index) in item.label">
                        <span v-if="index == item.highlight && selectedText != ''" class="background-color : yellow lighten-3">
                          {{text}}
                        </span>
                        <span v-else>
                          {{text}}
                        </span>
                        <b v-if="index != item.label.length - 1"> / </b>
                      </template>
                    </p>

                    <template v-if="selectedText != ''"><b>選択済みテキスト：</b>{{selectedText}}</template>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
      </template>
    </v-container>
  </div>
</template>

<script>

function levenshteinDistance(str1, str2) {
  var r, c, cost, 
      d = [];

  for (r=0; r<=str1.length; r++) {
    d[r] = [r];
  }
  for (c=0; c<=str2.length; c++) {
    d[0][c] = c;
  }
  for (r=1; r<=str1.length; r++) {
    for (c=1; c<=str2.length; c++) {
      //cost = str1[r-1] == str2[c-1] ? 0: 1;
      cost = str1.charCodeAt(r-1) == str2.charCodeAt(c-1) ? 0: 1;
      d[r][c] = Math.min(d[r-1][c]+1, d[r][c-1]+1, d[r-1][c-1]+cost);
    }
  }
  return d[str1.length][str2.length] / Math.max(str1.length, str2.length);
}

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

      const sims = obj.arr
      const arr = []

      for(let i = 0; i < sims.length; i++){
        const sim = sims[i]
        const obj = jsonData[sim.id]
        obj.score = sim.score
        arr.push(obj)        
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
      select: "すべて",
      selectedText: ""
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
    items(){
      const arr = this.result.arr
      const items = ["すべて"]
      for(let i = 0; i < arr.length; i++){

        const attribution = arr[i].attribution
        if(!items.includes(attribution)){
          items.push(attribution)
        }
      }
      return items
    }
  },

  watch: {
    selectedText: function(){
      const selectedText = this.selectedText

      const arr = this.result.arr
      const items = []
      for(let i = 0; i < arr.length; i++){
        const item = arr[i]
        const texts = item.label
        const map = {}
        for(let j = 0; j < texts.length; j++){
          let text = texts[j]

          /*
          if(j != texts.length - 1 && text.length < 5){
            text += texts[j + 1]
          }
          */

          const dist = levenshteinDistance(selectedText, text)

          map[j] = dist
        }
        
        const arr2 = Object.keys(map).map((e)=>({ key: e, value: map[e] }));
        arr2.sort(function(a,b){
          if(a.value < b.value) return -1;
          if(a.value > b.value) return 1;
          return 0;
        });
        
        item.highlight = arr2[0].key

        items.push(item)
      }

      this.result.arr = items
    }
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

    selected: function() {
        this.selectedText = window.getSelection().toString();
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