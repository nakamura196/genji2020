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

          <v-list-item
            link
            :to="
              localePath({
                name: 'search',
                query: { 'genji[sortBy]': 'genji_page_asc' }
              })
            "
          >
            <v-list-item-action>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("search") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="localePath({ name: 'legend' })">
            <v-list-item-action>
              <v-icon>mdi-information</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t("legend") }}</v-list-item-title>
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
                name: 'index'
              })
            "
            style="color: inherit; text-decoration: inherit"
          >
            {{ $t("digital_genji") }}
          </nuxt-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn depressed btn v-on="on">
              <v-icon class="mr-2">mdi-translate</v-icon>
              <template v-if="$vuetify.breakpoint.name != 'xs'">
                {{ $i18n.locale == "ja" ? "日本語" : "English" }}</template
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

        <template v-if="isSignedIn">
          <v-menu left bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-avatar size="36">
                  <img :src="userPic" :alt="userName" />
                </v-avatar>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="dialog = !dialog">
                <v-list-item-title>プロフィール編集</v-list-item-title>
              </v-list-item>
              <v-list-item @click="signOut">
                <v-list-item-title>ログアウト</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-else>
          <v-btn color="error" @click="dialog4login = !dialog4login"
            >ログイン</v-btn
          >
        </template>
      </v-app-bar>
    </div>

    <v-main>
      <nuxt />
    </v-main>

    <v-footer :dark="true" class="mt-5">
      <v-container>
        <p class="text-center my-5">
          <template v-if="$i18n.locale == 'ja'"> 東京大学</template>
          <template v-else>The University of Tokyo </template>
        </p>
      </v-container>
    </v-footer>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title
          >プロフィールを編集</v-card-title
        >

        <v-card-text class="mt-5"
          >Lorem ipsum dolor sit amet, consectetur a</v-card-text
        >

        <v-card-actions>
          <v-btn @click="dialog = false">キャンセル</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary">更新</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog4login" width="500">
      <v-card>
        <v-card-title class="primary white--text" primary-title
          >ログイン</v-card-title
        >

        <v-card-text class="mt-5">
          ログインにはGoogleまたはTwitterアカウントが必要です。
          <div class="text-center mb-5">
            <v-btn class="error mt-5" @click="signInWithGoogle">
              <v-icon class="mr-2">mdi mdi-google</v-icon
              >Googleアカウントでログイン
            </v-btn>

            <v-btn class="info mt-5" @click="signInWithTwitter">
              <v-icon class="mr-2">mdi mdi-twitter</v-icon
              >Twitterアカウントでログイン
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import firebase from "../plugins/firebase";

@Component({
  components: {}
})
export default class search extends Vue {
  drawer: boolean = false;
  baseUrl: string = process.env.BASE_URL || "";

  //isSignedIn: boolean = false;
  userName: any = null;
  userPic: any = null;
  dialog: boolean = false;
  dialog4login: boolean = false;

  get isSignedIn(): boolean {
    return this.$store.getters.getIsSignedIn;
  }

  set isSignedIn(value) {
    this.$store.commit("setSignedIn", value);
  }

  created() {
    this.onAuthStateChanged();
  }

  signInWithGoogle() {
    this.$store.dispatch("login");
    /*
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(error => alert(error.message))
      .then(() => (this.dialog4login = !this.dialog4login));
    */
    this.dialog4login = !this.dialog4login;
  }

  signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(error => alert(error.message))
      .then(() => (this.dialog4login = !this.dialog4login));
  }

  onAuthStateChanged() {
    firebase.auth().onAuthStateChanged(user => {
      this.userName = user ? user.displayName : null;
      this.userPic = user ? user.photoURL : null;
      this.isSignedIn = user ? true : false;
    });
  }

  async signOut() {
    await firebase.auth().signOut();
  }
}
</script>
