<template>
  <div class="navigation">
    <div class="d-flex pa-3">

      <!-- Top link on account or login -->
      <v-list-item v-if="$auth.loggedIn">
        <v-list-item-avatar v-if="this.$auth.$state.user.avatar">
          <v-img
            :src="`http://localhost:8000/storage/images/avatars/${this.$auth.$state.user.avatar}`"
          />
        </v-list-item-avatar>
        <v-list-item-avatar v-else>
          <v-img src="/images/no-avatar.jpg" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{
            this.$auth.$state.user.nickname
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-else>
        <nuxt-link to="/login" class="d-flex link">
          <v-icon class="mr-5 ml-2">mdi-login</v-icon>
          <v-list-item-content>
            <v-list-item-title>Войти</v-list-item-title>
          </v-list-item-content>
        </nuxt-link>
      </v-list-item>
      <v-icon class="ml-auto mr-3 mt-4 mb-4" @click="$emit('toggle')"
        >mdi-close</v-icon
      >
    </div>
    <!-- End top link on account or login -->

    <v-divider />

    <v-list dense rounded>

      <!-- Link on account -->
      <v-list-item
        v-if="$auth.loggedIn"
        class="py-2 account link"
        link
        :to="`/account/${this.$auth.$state.user.id}`"
      >
        <v-list-item-icon>
          <v-icon>mdi-pencil-plus-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Мой аккаунт</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- End link on account -->

      <v-divider v-if="$auth.loggedIn" class="mt-2 mb-4" />

      <!-- Menu -->
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="`${item.link}`"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- End menu -->

      <v-divider v-if="$auth.loggedIn" class="mt-4 mb-4" />

      <!-- Bottom link on account or login -->
      <v-list-item v-if="$auth.loggedIn" class="exit" bottom>
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title @click="logout">Выйти</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- End bottom link on account or login -->

    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Главная", icon: "mdi-home", link: "/" },
        { title: "Игры", icon: "mdi-gamepad-variant", link: "/games" },
        { title: "Студии", icon: "mdi-briefcase-variant", link: "/studios" }
      ]
    }
  },
  props: ["drawer"],
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
      } catch (error) {
        console.log("Error on logout: " + error)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/mixins";
.link {
  @include link;
}
.account {
  @include link;
}
.exit {
  &:hover {
    cursor: pointer;
  }
}
</style>