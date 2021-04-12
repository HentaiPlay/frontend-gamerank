<template>
  <v-col cols="6" offset="3">
    <div class="wrapper px-5">
      <v-img
        v-if="this.user.avatar"
        class="avatar"
        :src="`http://localhost:8000/storage/images/avatars/${this.user.avatar}`"
      />
      <img v-else class="avatar" src="/images/no-avatar.jpg" />
    </div>

    <div class="wrapper px-5">
      <v-form ref="form">
        <v-file-input
          v-model="files"
          show-size
          accept="image/png, image/jpeg, image/bmp"
          label="Загрузить новую картинку"
        />
        <small>Измения применятся после перезагрузки страницы((</small>
        <v-btn
          rounded
          depressed
          :disabled="!files"
          color="success"
          @click="submit"
          class="mt-4"
        >
          Готово
        </v-btn>
      </v-form>
    </div>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      formData: ""
    }
  },
  methods: {
    clear() {
      this.$refs.form.reset()
      this.image = null
    },
    send() {
      const formData = new FormData()
      formData.append("file", this.files)
      this.$axios
        .$post(
          `http://localhost:8000/api/account/${this.user.id}/avatar`,
          formData
        )
        .then((request) => {
          console.log(request)
        })
        .catch((error) => {
          this.error = error
        })
        .finally(this.clear())
    },
    async submit() {
      await (this.loading = true)
      await this.send()
      await (this.loading = false)
    },
  },
  props: ["user"]
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    filter: brightness(80%);
  }
}
</style>