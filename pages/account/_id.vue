<template>
  <v-container>
    <v-row>
      <v-col cols="6" offset="3">
        <h2 class="text-center">Мой аккаунт</h2>
        <div class="d-flex mt-5">
          <span class="mb-5 font-weight-bold">Никнейм:</span>
          <span class="ml-5">{{ this.user.nickname }}</span>
        </div>
        <div class="d-flex">
          <span class="mb-5 font-weight-bold">email:</span>
          <span class="ml-5">{{ this.user.email }}</span>
        </div>
      </v-col>

      <AccountEditAvatar :user="this.user" />

      <v-col cols="6" offset="3">
        <v-btn
          depressed
          rounded
          class="d-flex red lighten-1 white--text pa-3 mt-5 ml-auto"
        >
          <v-icon class="mr-3">mdi-login</v-icon>
          <span @click="logout">Выйти</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: this.$auth.$state.user,
      show: false,
      form: "",
      files: []
    }
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
      } catch (error) {
        console.log("Error on logout: " + error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 60px;
}
.wrapper {
  padding: 20px;
  margin: 0 auto;
}
</style>