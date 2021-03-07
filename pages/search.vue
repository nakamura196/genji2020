<template>
  <client-only>
   
    <ais-instant-search
      :routing="routing"
      :search-client="searchClient"
      index-name="genji"
    >
      <ais-configure :attributesToSnippet="['text', 'label']"/>
      <v-sheet color="grey lighten-2">
        <v-container fluid class="py-4">
          <v-breadcrumbs class="py-0" :items="bh">
            <template #divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-container>
      </v-sheet>
      <v-container class="my-5">

        <h2>{{ $t('search') }}</h2>

        <p class="my-2">
          『校異源氏物語』の本文テキストを検索します。
        </p>

        <v-row class="my-2" dense>
          <v-col cols="12" md="10"
            ><ais-search-box :placeholder="$t('add_a_search_term')"
          /></v-col>
          <v-col cols="12" md="2"
            ><client-only
              ><div class="text-right">
                <ais-powered-by /></div></client-only
          ></v-col>
        </v-row>

        <v-row class="mt-10" dense>
          <v-col cols="12" lg="4"
            ><ais-stats>
              <h3 slot-scope="{ nbHits }" class="my-0">
                {{ $t('search_result') }}: {{ nbHits.toLocaleString() }}
                {{ $t('hits') }}
              </h3>
            </ais-stats></v-col
          >
          <v-col cols="12" lg="8"
            ><v-row dense>
              <v-col cols="12" :lg="6">
                <ais-pagination :padding="2" class="mb-4" />
              </v-col>
              <v-col cols="12" :lg="6">
                <v-row>
                  <v-col cols="12" :sm="6">
                    <ais-hits-per-page
                      :items="[
                        { text: '24', value: 24, default: true },
                        { text: '60', value: 60 },
                        { text: '120', value: 120 },
                        { text: '512', value: 512 },
                      ]"
                    >
                      <v-select
                        v-model="perPage"
                        slot-scope="{ items, refine }"
                        dense
                        :items="items"
                        :label="$t('items_per_page')"
                        @change="refine(perPage)"
                      >
                        {{ getPageValue(items) }}
                      </v-select>
                    </ais-hits-per-page>
                  </v-col>
                  <v-col cols="12" :sm="6" v-if="">
                    <ais-sort-by
                      :items="[
                        { value: 'genji', label: $t('relevance') },
                      { value: 'genji_page_asc', label: $t('ページ') + ' ' + $t('asc') },
                      { value: 'genji_page_desc', label: $t('ページ') + ' ' + $t('desc') },
                        /*
                      {
                        value: 'dev_MAIN_temporal_asc',
                        label: this.$t('temporal') + ' ' + this.$t('asc'),
                      },
                      */
                      ]"
                    >
                      <v-select
                        v-model="sort"
                        slot-scope="{ items, currentRefinement, refine }"
                        dense
                        :items="getSortItems(items)"
                        :label="$t('sort_by')"
                        @change="refine(sort)"
                      >
                        {{ getSortValue(currentRefinement) }}
                      </v-select>
                    </ais-sort-by>
                  </v-col>
                </v-row>
              </v-col>
            </v-row></v-col
          >
        </v-row>
        
        <v-row class="mt-5">

          <v-col col="12" sm="9" order-sm="12">


            <ais-hits>
              <v-row slot-scope="{ items }">
                <v-col
                  v-for="item in items"
                  :key="item.objectID"
                  col="12"
                  sm="3"
                >
                  <v-card flat outlined>
                    <nuxt-link
                        :to="localePath({name : 'item-id', params : {id : item.objectID}})"
                      >
                      <v-img
                        contain
                        max-height="150"
                        style="height: 150px"
                        width="100%"
                        class="grey lighten-2"
                        :src="item.image"
                      />
                    </nuxt-link>

                    <v-card-text>
                      <nuxt-link
                        :to="localePath({name : 'item-id', params : {id : item.objectID}})"
                      >
                        <h3 class="mb-4">{{item.vol_str}}  {{item.page}}{{$t(item.type)}}</h3>
                      </nuxt-link>

                      <p v-if="item._snippetResult.text && item._snippetResult.text.matchLevel != 'none'">
                        
                        <ais-snippet
                          :attribute="'text'"
                          :hit="item"
                        />
                      </p>

                      <p v-if="false">
                        <ul>
                          <template v-for="(tag, index) in item.label">
                            <li v-if="item._snippetResult.label[index].matchLevel != 'none'" :key="tag">
                              <ais-snippet
                                :attribute="'label.'+index"
                                :hit="item"
                              />
                            </li>
                          </template>
                        </ul>
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </ais-hits>

            <ais-pagination :padding="2" class="mt-10" />
          </v-col>

          <v-col col="12" sm="3" order-sm="1">

            <v-card flat class="mb-4">
              <v-card-title class="headline grey lighten-2">
                {{ $t('vol_str') }}
              </v-card-title>
              <v-card-text>
                <ais-refinement-list
                  class="mt-4"
                  show-more
                  operator="and"
                  :show-more-limit="100"
                  :limit="20"
                  attribute="vol_str"
                  :sort-by="['isRefined', 'name:asc']"
                />
              </v-card-text>
            </v-card>
          </v-col>
          
        </v-row>
      </v-container>
    </ais-instant-search>
  </client-only>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import { simple } from 'instantsearch.js/es/lib/stateMappings'
import 'instantsearch.css/themes/algolia-min.css'

export default {
  data() {
    return {
      searchClient: algoliasearch(
        '48L2134NJ6',
        '713961b75d7d86355a810e6175e42d75'
      ),
      routing: {
        stateMapping: simple(),
      },
      sort: "",
      perPage: "",

      sortItems: [
        { value: 'dev_MAIN', label: this.$t('relevance') },
        /*
        {
          value: 'dev_MAIN_temporal_asc',
          label: this.$t('temporal') + ' ' + this.$t('asc'),
        },
        */
      ],

      bh: [
        {
          text: this.$t('top'),
          disabled: false,
          to: this.localePath({ name: 'index' }),
          exact: true,
        },
        {
          text: this.$t('search'),
        },
      ],
    }
  },

  head() {
    return {
      title: this.$t('search'),
    }
  },

  methods: {
    /*
    bbb(items){
      const items2 = []
      for(let i = 0; i < items.length; i++){
        const item = items[i]
        items2.push({
          text : item.label,
          value : item.value
        })
      }
      return items2
    },
    ccc(value){
      this.sort = value
    },
    ddd(items){
      for(let i = 0; i < items.length; i++){
        const item = items[i]
        if(item.isRefined){
          this.perPage = item.value
          break
        }
      }
    },
    */

    curationUrl(item){
      return "http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=" + item.curation + "&mode=annotation&lang=ja&pos="+item.pos
    },

    getSortItems(items) {
      const array = []
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        array.push({
          text: item.label,
          value: item.value,
        })
      }
      return array
    },

    getSortValue(value) {
      this.sort = value
    },

    getPageValue(items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.isRefined) {
          this.perPage = item.value
          break
        }
      }
    },
  }
}
</script>
