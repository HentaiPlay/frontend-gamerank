<template>
  <div class="btnLogin">
    <div v-if="$auth.loggedIn">
      <v-btn
        nuxt
        :to="`/account/${this.$auth.$state.user.id}`"
        class="pr-0"
        rounded
      >
        <span class="nav-btn text-capitalize">{{
          this.$auth.$state.user.nickname
        }}</span>
        <v-avatar right size="36" class="ml-2">
          <img
            v-if="this.$auth.$state.user.avatar"
            :src="`http://localhost:8000/storage/images/avatars/${this.$auth.$state.user.avatar}`"
            :alt="this.$auth.$state.user.nickname"
          />
          <img v-else src="/images/no-avatar.jpg" />
        </v-avatar>
      </v-btn>
    </div>

    <div v-else>
      <v-btn nuxt to="/login" rounded>
        <span class="nav-btn">войти</span>
        <v-icon small>mdi-login</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap");
.nav-btn {
  font-size: 0.8rem;
  font-family: "Ubuntu", sans-serif;
}
</style>