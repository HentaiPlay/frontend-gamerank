<template>
  <div>
    <client-only placeholder="loading...">
      <ckeditor-nuxt
        v-model="contentHolder"
        :config="editorConfig"
        @keyup.enter="submit"
      />
    </client-only>
    <v-btn
      :loading="loading"
      depressed
      rounded
      small
      success
      class="success mt-5"
      @click.prevent="submit"
    >
      <v-icon class="mr-3">mdi-chat-outline</v-icon>
      Отправить
    </v-btn>
  </div>
</template>

<script>
export default {
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt")
      }
    }
  },
  data() {
    return {
      editorConfig: {
        simpleUpload: {
          uploadUrl: "path_to_image_controller",
          headers: {
            Authorization: "optional_token"
          }
        },
        removePlugins: ["Title", "Fonts"],
        placeholder: "Написать..."
      },
      contentHolder: "",
      loading: false
    }
  },
  methods: {
    clear() {
      this.contentHolder = ""
    },
    send() {
      this.$axios.$get("/sanctum/csrf-cookie").then(() => {
        this.$axios
          .$post(`/api/comments/${this.$route.params.slug}/add`, {
            comment: this.contentHolder,
            sender_id: this.$auth.user.id,
          })
          .catch(e => console.log("Error on add comment: " + e))
          .finally(this.clear())
      })
    },
    async submit() {
      await (this.loading = true)
      await this.send()
      await (this.loading = false)
      await this.$emit("update")
    }
  }
}
</script>