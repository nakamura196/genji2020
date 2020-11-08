<template>
  <client-only>
   
    <ais-instant-search
      :routing="routing"
      :search-client="searchClient"
      index-name="genji"
    >
      <ais-configure :attributesToSnippet="['label2', 'label']"/>
      <v-container class="my-5">
        <v-row>
          <v-col col="12" sm="4">
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
                {{ $t('attribution') }}
              </v-card-title>
              <v-card-text>
                <ais-refinement-list
                  class="mt-4"
                  show-more
                  operator="and"
                  :show-more-limit="100"
                  :limit="20"
                  attribute="attribution"
                />
              </v-card-text>
            </v-card>

            <v-card flat outlined class="mt-4">
              <v-card-title class="headline grey lighten-2">
                {{ $t('work') }}
              </v-card-title>
              <v-card-text>
                <ais-refinement-list
                  class="mt-4"
                  show-more
                  operator="and"
                  :show-more-limit="100"
                  :limit="20"
                  attribute="work"
                />
              </v-card-text>
            </v-card>

            <v-card flat outlined class="mt-4">
              <v-card-title class="headline grey lighten-2">
                {{ $t('vol') }}
              </v-card-title>
              <v-card-text>
                <ais-refinement-list
                  class="mt-4"
                  show-more
                  operator="and"
                  :show-more-limit="100"
                  :limit="20"
                  attribute="vol"
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col col="12" sm="8">
            <ais-search-box :placeholder="$t('add_a_search_term')" />

            <client-only>
              <ais-powered-by class="my-2" />
            </client-only>

            <v-sheet class="pa-4 my-4" color="grey lighten-3">
              <v-row>
                <v-col>
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
                      {{ $t('search_result') }}:{{ nbHits.toLocaleString() }} {{ $t('hits') }}
                    </p>
                  </ais-stats>
                </v-col>
                <v-col class="text-right">
                  <ais-hits-per-page
                    :items="[
                      { label: '24', value: 24, default: true },
                      { label: '60', value: 60 },
                      { label: '120', value: 120 },
                      { label: '512', value: 512 },
                    ]"
                  />
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
                    <a
                      :href="curationUrl(item)"
                      target="_blank"
                    >
                      <v-img
                        contain
                        max-height="150"
                        style="height: 150px"
                        width="100%"
                        class="grey lighten-2"
                        :src="item.image"
                      />
                    </a>

                    <v-card-text>
                      <a
                        :href="curationUrl(item)"
                        target="_blank"
                      >
                        <h3 class="mb-4">{{item.vol}} {{ item.work }} {{item.page}}コマ目</h3>
                      </a>

                      <p>
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
                      
                      <!--
                      <p>
                        <ais-snippet
                          attribute="label2"
                          :hit="item"
                        />
                      </p>
                      -->

                      <p>
                        {{item.attribution}}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </ais-hits>

            <ais-pagination :padding="2" class="my-4" />
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
        'X6NDGPNEKY',
        '6eb95994e7c070f22d01ed808eb2c081'
      ),
      routing: {
        stateMapping: simple(),
      },
    }
  },

  head() {
    return {
      title: this.$t('search'),
    }
  },

  methods: {
    aaa(item){
      console.log(item)
    },
    curationUrl(item){
      return "http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=" + item.curation + "&mode=annotation&lang=ja&pos="+item.pos
    }
  }
}
</script>
