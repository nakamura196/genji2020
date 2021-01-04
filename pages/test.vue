<template>
  <div>
    <v-container>
      <v-btn @click="post">投稿</v-btn>

      <v-row>
        <v-col>
          <v-card
            class="mt-5"
            v-for="(obj, index) in postsSnapshot"
            :key="index"
          >
            <div class="pa-4">
              {{ obj.id }}
              <br />

              <a @click="modal(index)">
                {{ obj.data().title }}
              </a>

              <br />

              <template v-if="login">
                <v-btn v-if="likedPosts.includes(obj.id)" icon color="pink">
                  <v-icon @click="good(index)" class="mr-1">mdi-heart</v-icon>
                  {{ obj.data().likeCount > 0 ? obj.data().likeCount : '' }}
                </v-btn>
                <v-btn v-else icon>
                  <v-icon @click="good(index)" class="mr-1"
                    >mdi-heart-outline</v-icon
                  >
                  {{ obj.data().likeCount > 0 ? obj.data().likeCount : '' }}
                </v-btn>
              </template>
              <template v-else>
                <div class="my-1">
                  <v-icon class="mr-1">mdi-heart-outline</v-icon>
                  {{ obj.data().likeCount > 0 ? obj.data().likeCount : '' }}
                </div>
              </template>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="mt-5" v-for="(obj, index) in likedPosts2" :key="index">
            <div class="pa-4" v-if="obj.doc">
              {{ obj.doc.id }}
              <br />

              {{
                //重要。時差あり
                obj.doc.data().createTime != null
                  ? $moment(obj.doc.data().createTime.toDate()).fromNow()
                  : ''
              }}

              <br />

              {{ obj.ref ? obj.ref.data().title : '' }}

              {{ obj.ref ? obj.ref.data().likeCount : '' }}
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline pl-1">
          <v-btn class="mr-1" color="primary" icon text @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          いいねしたユーザー
        </v-card-title>

        <v-divider />

        <div style="height: 400px; overflow-y: auto">
          <template v-for="(user, index) in users">
            <v-list-item :key="index">
              <v-list-item-avatar size="50">
                <v-img class="elevation-6" :src="user.photoURL"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <h3>{{ user.displayName }}</h3>
                <div class="mt-1">
                  <template v-if="user.description">
                    {{ user.description }}
                  </template>
                  <template>
                    <i color="grey--text">プロフィールが設定されていません</i>
                  </template>
                </div>
              </v-list-item-content>
            </v-list-item>

            <v-divider :key="'d-' + index" />
          </template>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

const FieldValue = firebase.firestore.FieldValue
const firestore = firebase.firestore()

export default {
  data() {
    return {
      postsSnapshot: [],
      likedPosts2: [],
      likedPosts: [],
      likedPosts3: [],
      refs: {},
      uid: '',
      login: false,
      dialog: false,
      users: [],
    }
  },

  created() {
    firebase
      .firestore()
      .collectionGroup('posts')
      .orderBy('createTime', 'desc')
      .onSnapshot(
        (res) => {
          const postsSnapshot = []

          res.forEach(function (doc) {
            postsSnapshot.push(doc)
          })
          //return postsSnapshot
          this.postsSnapshot = postsSnapshot
        },
        (error) => {
          console.error('GET_REALTIME_LIST', error)
        }
      )

    this.onAuthStateChanged()
  },

  methods: {
    onAuthStateChanged() {
      firebase.auth().onAuthStateChanged(async (user) => {
        console.log('onAuthStateChanged')

        if (user != null) {
          this.login = true

          let uid = firebase.auth().currentUser.uid
          this.uid = uid

          //自分がいいねした記事一覧
          firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .collection('likedPosts')
            .orderBy('createTime', 'desc')
            .onSnapshot(
              (res) => {
                const postsSnapshot = []
                const postsSnapshot2 = []

                console.log('likedPosts changed')

                res.forEach(async function (doc) {
                  postsSnapshot.push(doc.id)

                  const ref = await firebase
                    .firestore()
                    .doc(doc.data().postRef.path)
                    .get()

                  postsSnapshot2.push({
                    doc,
                    ref,
                  })
                })

                this.likedPosts = postsSnapshot
                this.likedPosts2 = postsSnapshot2
              },
              (error) => {
                console.error('GET_REALTIME_LIST', error)
              }
            )

          //ユーザ情報の登録
          //console.log(firebase.auth().currentUser)
          const userRef = firebase.firestore().collection('users').doc(uid)
          if (userRef == null || true) {
            await userRef.set({
              displayName: firebase.auth().currentUser.displayName,
              photoURL: firebase.auth().currentUser.photoURL,
              createTime: firebase.firestore.FieldValue.serverTimestamp(),
              updateTime: firebase.firestore.FieldValue.serverTimestamp(),
              likePostCount: 0,
            })
          }
        } else {
          this.login = false
          this.uid = ''
        }
      })
    },

    async post() {
      const uid = firebase.auth().currentUser.uid
      const userRef = firebase.firestore().collection('users').doc(uid)

      const postRef = userRef.collection('posts').doc()
      await postRef.set({
        title: 'How to use Cloud Firestore',
        body: '...',
        author: userRef.path,
        createTime: FieldValue.serverTimestamp(),
        updateTime: FieldValue.serverTimestamp(),
        likeCount: 0,
      })
    },

    async good(index) {
      const postRef = this.postsSnapshot[index].ref

      const uid = firebase.auth().currentUser.uid

      const result = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('likedPosts')
        .where('id', '==', postRef.id)
        .get()

      const batch = firestore.batch()

      const anotherUser = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .get()
      const anotherUserRef = anotherUser.ref

      if (result.docs == 0) {
        batch.set(
          firestore
            .doc(postRef.path)
            .collection('likedUsers')
            .doc(anotherUserRef.id),
          {
            id: anotherUserRef.id,
            createTime: FieldValue.serverTimestamp(),
            //name: anotherUser.data().name
          }
        )

        batch.set(
          firestore
            .doc(anotherUserRef.path)
            .collection('likedPosts')
            .doc(postRef.id),
          {
            id: postRef.id,
            postRef: postRef,
            createTime: FieldValue.serverTimestamp(),
          }
        )

        // 追加
        batch.update(postRef, { likeCount: FieldValue.increment(1) })
        batch.update(anotherUserRef, { likePostCount: FieldValue.increment(1) })
      } else {
        batch.delete(
          firestore
            .doc(postRef.path)
            .collection('likedUsers')
            .doc(anotherUserRef.id)
        )

        batch.delete(
          firestore
            .doc(anotherUserRef.path)
            .collection('likedPosts')
            .doc(postRef.id)
        )

        // 追加
        batch.update(postRef, { likeCount: FieldValue.increment(-1) })
        batch.update(anotherUserRef, {
          likePostCount: FieldValue.increment(-1),
        })
      }

      await batch.commit()
    },

    async bad(index) {
      const postRef = this.postsSnapshot[index].ref

      const batch = firestore.batch()

      const uid = firebase.auth().currentUser.uid

      const anotherUserRef = firebase.firestore().collection('users').doc(uid)

      batch.delete(
        firestore
          .doc(postRef.path)
          .collection('likedUsers')
          .doc(anotherUserRef.id)
      )

      batch.delete(
        firestore
          .doc(anotherUserRef.path)
          .collection('likedPosts')
          .doc(postRef.id)
      )

      // 追加
      batch.update(postRef, { likeCount: FieldValue.increment(-1) })
      batch.update(anotherUserRef, { likePostCount: FieldValue.increment(-1) })

      await batch.commit()
    },

    async modal(index) {
      const postRef = this.postsSnapshot[index].ref

      const result = await firestore
        .doc(postRef.path)
        .collection('likedUsers')
        .get()

      const users = []

      result.docs.map(async (doc) => {
        //console.log(doc.data())
        //console.log(doc)

        const result2 = await firestore.collection('users').doc(doc.id).get()
        //console.log(result2.data())
        users.push(result2.data())
      })

      this.users = users
      this.dialog = true
    },
  },
}
</script>
