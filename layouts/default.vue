<template>
  <v-app>
    <div>
      <v-navigation-drawer v-model="drawer" app :temporary="true">
        <v-list>
          <v-list-item link :to="localePath({ name: 'index' })">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="localePath({ name: 'search', query : {'genji[sortBy]' : 'genji_page_asc'} })">
            <v-list-item-action>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t('search') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!--

          <v-list-item
            link
            href="http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=https://moeller.jinsha.tsukuba.ac.jp/data/curation.json&mode=annotation&lang=ja"
            target="_blank"
          >
            <v-list-item-action>
              <v-icon>mdi-image</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                >IIIF Curation<br />Platform
                <v-icon>mdi-open-in-new</v-icon></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            link
            href="https://diyhistory.org/public/sm/?collection=https://moeller.jinsha.tsukuba.ac.jp/data/curation.json&build=1"
            target="_blank"
          >
            <v-list-item-action>
              <v-icon>mdi-image</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                >Self Museum <v-icon>mdi-open-in-new</v-icon></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          -->
        </v-list>
      </v-navigation-drawer>

      <v-app-bar>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>
          <nuxt-link
            :to="
              localePath({
                name: 'index',
              })
            "
            style="color: inherit; text-decoration: inherit"
          >
            {{$t("digital_genji")}}
          </nuxt-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn depressed btn v-on="on">
              <v-icon class="mr-2">mdi-translate</v-icon>
              <template v-if="$vuetify.breakpoint.name != 'xs'">
                {{ $i18n.locale == 'ja' ? '日本語' : 'English' }}</template
              >
              <v-icon class="ml-2">mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item :to="switchLocalePath('ja')">
              <v-list-item-title>日本語</v-list-item-title>
            </v-list-item>
            <v-list-item :to="switchLocalePath('en')">
              <v-list-item-title>English</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>

    <v-main>
      <nuxt />
    </v-main>

    <v-footer :dark="true" class="mt-5">
      <v-container>
        <p class="text-center my-5">
          <template v-if="$i18n.locale == 'ja'">
            東京大学</template
          >
          <template v-else
            >The University of Tokyo
          </template>
        </p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  components: {
  },
})
export default class search extends Vue {
  drawer: boolean = false
  baseUrl: string = process.env.BASE_URL || ''
}
</script>
