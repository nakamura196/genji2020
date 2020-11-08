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
          {{ title }}
        </dd>
      </dl>

      <dl class="row" v-if="result.tags.length > 0">
        <dt class="col-sm-3 text-muted">
          <b>{{ $t('Tags') }}</b>
        </dt>
        <dd class="col-sm-9">
          <ul>
            <li v-for="value in result.tags" :key="value">
              <nuxt-link
                :to="
                  localePath({
                    name: 'search',
                    query: {
                      'kunshujo[refinementList][tags][0]': value,
                    },
                  })
                "
              >
                {{ value }}
              </nuxt-link>
            </li>
          </ul>
        </dd>
      </dl>

      <dl class="row">
        <dt class="col-sm-3 text-muted">
          <b>{{ $t('label') }}</b>
        </dt>
        <dd class="col-sm-9">
          <nuxt-link
                :to="
                  localePath({
                    name: 'search',
                    query: {
                      'kunshujo[refinementList][_label][0]': result.label,
                    },
                  })
                "
              >
                {{ result.label }}
              </nuxt-link>
          
        </dd>
      </dl>

      <dl class="row">
        <dt class="col-sm-3 text-muted">
          <b>{{ $t('license') }}</b>
        </dt>
        <dd class="col-sm-9">
          <template v-if="$i18n.locale == 'ja'">
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
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
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
              ><img
                alt="Creative Commons License"
                style="border-width: 0"
                src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a
            ><br />This work is licensed under a
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
              >Creative Commons Attribution 4.0 International License</a
            >.
          </template>
        </dd>
      </dl>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ payload, app }) {
    if (payload) {
      return { result : payload }
    } else {
      const id = app.context.params.id
      const arr = app.context.env.jsonData
      let result = null
      for (let i = 0; i < arr.length; i++) {
        const obj = arr[i]
        if (obj.objectID == id) {
          result = obj
          break
        }
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
      return this.result.title
    },
  },

  methods: {
    getIframeUrl() {
      const url =
        this.baseUrl +
        '/curation/?manifest=' +
        this.result.manifest +
        '&canvas=' +
        encodeURIComponent(this.result.member)
      return url
    },

    getCurationUrl() {
      const memberId = this.result.member
      const memberIdSpl = memberId.split('#xywh=')
      const canvasId = memberIdSpl[0]
      const xywh = memberIdSpl[1]
      const url =
        'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest=' +
        this.result.manifest +
        '&canvas=' +
        encodeURIComponent(canvasId) +
        '&xywh=' +
        xywh +
        '&xywh_highlight=border'
      return url
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
          content: this.result.image,
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
