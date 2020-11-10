<template>
  <div>
    <section class="mb-5">
      <v-parallax src="img/ogp/home.jpg" height="300">
        <v-layout column align-center justify-center class="white--text">
          <h1 class="white--text mb-2 display-1 text-center">
            <b>{{$t("digital_genji")}}
            </b>
          </h1>
          <v-btn
            large
            class="mt-5"
            :to="localePath({ name: 'search', query : {'genji[sortBy]' : 'genji_page_asc'} })"
            color="primary"
            >{{ $t('try_out') }}</v-btn
          >
        </v-layout>
      </v-parallax>
    </section>

    <v-container>
      <v-card class="my-5">
        <v-card-title>
          <h2>{{ $t('about_') }}</h2>
        </v-card-title>
        <v-card-text>
          <div class="text--primary">
            <p>{{$t("digital_genji")}}</p>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.BASE_URL,
    }
  },
  head() {
    const title = this.$t("digital_genji")
    return {
      titleTemplate: null,
      title,
    }
  },
}
</script>
