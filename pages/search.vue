<template>
  <client-only>
   
    <ais-instant-search
      :routing="routing"
      :search-client="searchClient"
      index-name="genji"
    >
      <ais-configure :attributesToSnippet="['text', 'label']"/>
      <v-container class="my-5">
        <v-row>

          <v-col col="12" sm="8" order-sm="12">
            <client-only>
              <ais-powered-by class="my-2" />
            </client-only>
            
            <ais-search-box :placeholder="$t('add_a_search_term')" />

            <v-sheet class="pa-4 my-4" color="grey lighten-3">
              <v-row dense>
                <v-col cols="12" :sm="6">
                  <ais-stats>
                    <p
                      class="my-0"
                      slot-scope="{
                        hitsPerPage,
                        nbPages,
                        nbHits,
                        page,
                        processingTimeMS,
                        query,
                      }"
                    >
                      {{ $t('search_result') }}: {{ nbHits.toLocaleString() }} {{ $t('hits') }}
                    </p>
                  </ais-stats>
                </v-col>
                    <v-col cols="12" :sm="3">
                      <ais-hits-per-page
                    :items="[
                      { text: '24', value: 24, default: true },
                      { text: '60', value: 60 },
                      { text: '120', value: 120 },
                      { text: '512', value: 512 },
                    ]"
                  >
                  <v-select
                  dense
                      slot-scope="{ items, refine }"
                      :items="items"
                      v-model="perPage"
                      :label="$t('items_per_page')"
                      @change="refine(perPage)"
                    >
                    {{ddd(items)}}
                    </v-select>
                    </ais-hits-per-page>
                    </v-col>
                    <v-col cols="12" :sm="3">
                      <ais-sort-by
                    :items="[
                      { value: 'genji', label: $t('relevance') },
                      { value: 'genji_page_asc', label: $t('ページ') + ' ' + $t('asc') },
                      { value: 'genji_page_desc', label: $t('ページ') + ' ' + $t('desc') },
                    ]"
                  >
                    <v-select
                    dense
                      slot-scope="{ items, currentRefinement, refine }"
                      :items="bbb(items)"
                      v-model="sort"
                      :label="$t('sort_by')"
                      @change="refine(sort)"
                    >
                    {{ccc(currentRefinement)}}
                    </v-select>
                  </ais-sort-by>
                    
                  

                  
                </v-col>
              </v-row>
            </v-sheet>

            <ais-pagination :padding="2" class="my-4" />

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

            <ais-pagination :padding="2" class="my-4" />
          </v-col>

          <v-col col="12" sm="4" order-sm="1">
            <v-row>
              <v-col col="12" sm="6">
                <h2>{{ $t('filter') }}</h2>
              </v-col>
              <v-col col="12" sm="6" class="text-right">
                <ais-clear-refinements>
                  <span slot="resetLabel">{{ $t('reset') }}</span>
                </ais-clear-refinements>
              </v-col>
            </v-row>

            <v-card flat outlined class="mt-4">
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
      perPage: ""
    }
  },

  head() {
    return {
      title: this.$t('search'),
    }
  },

  methods: {
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
    curationUrl(item){
      return "http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=" + item.curation + "&mode=annotation&lang=ja&pos="+item.pos
    }
  }
}
</script>
