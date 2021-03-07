<template>
  <div>
    <section class="mb-5">
      <v-parallax src="img/ogp/home.jpg" height="300">
        <v-layout column align-center justify-center class="white--text">
          <h1 class="white--text mb-2 display-1 text-center">
            <b>{{$t(siteName)}}
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
      <v-card flat class="my-5">
        <v-card-title>
          <h2>{{ $t('about_') }}</h2>
        </v-card-title>
        <div class="pa-4">
           <p>
『源氏物語』の写本・版本のデジタル画像は多くの機関で公開されていますが、ある一つの場面を確認したいとき、桐壺巻から夢浮橋巻までの約2000枚にも及ぶ画像から目当ての場面を探し出すのは、変体仮名（くずし字）の読解能力にかかわらず、画像のコマ送りの手間を要します。複数の写本・版本を同時に調べる場合は尚更であり、「デジタル源氏物語」では『校異源氏物語』や『新編日本古典文学全集』の頁番号を付すことで諸本の横断検索を実現しています。その一方で、頁番号付与の作業は人による確認が欠かせず、少人数の作業体制では一度に多くの伝本を組み入れることは困難です。この問題を解消すべく、従来の頁番号の方法もこれまで通り進めつつ、さらなる自動化を目指して別の新しい検索方法についても議論してきました。
        </p>

        <p>
この「AI画像検索」は、国立国会図書館デジタルコレクションで公開されている 『校異源氏物語』（インターネット公開（保護期間満了））の本文を基に、複数の写本・版本の全冊画像から該当箇所と思われる画像を横断的に検索する機能です。検索結果に表示される「類似度」は、『校異源氏物語』の本文と人文学オープンデータ共同利用センター（CODH）開発のくずし字OCRによる諸本翻刻との照合に基づくものであり、システム構築に際してくずし字OCRの利用を御快諾下さったCODHの各位に御礼申し上げます。
        </p>

        <p>
くずし字OCRの解読結果に対しては、人手による修正は加えていません。提示される候補画像の中から、類似度およびくずし字OCRの翻刻を参考に、必要な画像をお選びいただく仕組みです。この検索機能の役割はいわば「見当をつける」ことまでで、利用者御自身による画像選択を検索の最終プロセスとして位置づけています。類似度は『校異源氏物語』と対象伝本における文字数や改頁箇所の異なり具合によって大きく上下しますので、各伝本内での相対的な目安とお考え置き下さい。類似度が50％に満たない場合でも、同じ伝本の画像中最も高い数値であれば、それが該当画像である可能性が高いと思われます。
        </p>
<p>
なお、検索対象としては、サイト内の「IIIF対応源氏物語リスト」のうち、パブリックドメインの画像、および所蔵機関の許諾を得られた画像を用いました。画像の転載等にあたっては、各機関の利用条件を遵守して下さい。
  </p>
  
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      siteName: process.env.siteName
    }
  },
  head() {
    const title = this.$t(this.siteName)
    return {
      titleTemplate: null,
      title,
    }
  },
}
</script>
