<template>
  <div>
    <v-container class="my-5">
      <h2 class="mb-5">{{title}}</h2>

      <p>
        <ul>
          <li>「OCRテキスト」には誤読が含まれる可能性があります。ご利用の際はご注意ください。</li>
        </ul>
      </p>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      title : this.$t("legend")
    }
  },
  head() {
    const title = this.title
    return {
      title,
    }
  },
}
</script>
