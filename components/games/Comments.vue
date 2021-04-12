<template>
  <v-col>
    <hr />
    <h2 class="font-weight-bold my-5">Комментарии</h2>

    <div v-if="comments[0]">
      <div v-for="comment in comments" :key="comment.id" class="comment my-3">

        <!-- Sender block -->
        <v-chip class="sender mr-3">
          <v-avatar v-if="comment.sender.avatar" class="mr-4" size="40">
            <img
              :src="`${$axios.defaults.baseURL}/storage/images/avatars/${comment.sender.avatar}`"
            />
          </v-avatar>
          <v-avatar v-else class="mr-4">
            <img src="/images/no-avatar.jpg" />
          </v-avatar>
          <span class="font-weight-bold">{{ comment.sender.nickname }}</span>
        </v-chip>
        <span>{{ comment.created_at }}</span>
        <!-- End sender block -->

        <div class="comment-message my-3 d-flex">
          <v-chip class="font-weight-bold mr-3">Прокомментировал(а)</v-chip>
          <div v-html="comment.comment"></div>
        </div>

        <div class="editor-wrapper" v-show="show">
          <GamesEditor />
        </div>
      </div>
    </div>
    <div class="py-5 d-flex justify-center" v-else>
      <span class="mb-5">Комментариев пока нет</span>
    </div>

    <GamesEditor v-if="$auth.loggedIn" @update="getComments" />

    <div class="comment-lock d-flex justify-center py-5" v-else>
      <v-icon class="mr-3">mdi-lock</v-icon>
      <span class="font-weight-bold text-center"
        >Что бы оставить комментарий, авторизуйтесь</span
      >
    </div>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
      avatars: false,
      show: false
    }
  },
  mounted() {
    this.getComments()
  },
  methods: {
    getComments() {
      this.$axios.$get("/sanctum/csrf-cookie").then(() => {
        this.$axios
          .$post(`/api/comments/${this.$route.params.slug}`)
          .then((response) => {
            this.comments = response
          })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  width: 100%;
  height: auto;
  padding: 10px;
  border-radius: 8px;
}
.comment-lock {
  border: 1px solid grey;
  border-radius: 8px;
}
.editor-wrapper {
  margin: 30px 0 30px 100px;
}
</style>