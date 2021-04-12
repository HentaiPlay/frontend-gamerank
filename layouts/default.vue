<template>
  <v-app>
    
    <!-- Navigation drawer -->
    <v-navigation-drawer
      v-model="drawer"
      clipped
      temporary
      app
    >
    <div class="wrapper">
      <NavigationDrawer @toggle="toggle"/>
    </div>
    </v-navigation-drawer>
    <!-- End navigation drawer -->

    <v-app-bar class="deep-purple darken-4 white--text" max-height="66" app>

      <!-- Menu section -->
      <v-app-bar-nav-icon color="white" @click="toggle"/>
      <Logo class="ml-2 mr-1"/>
      <v-app-bar-title class="text-uppercase font-weight-bold" nuxt to="/">
        <nuxt-link class="nav-link" to="/">
          game<span class="font-weight-light">rank</span>
        </nuxt-link>
      </v-app-bar-title>

      <v-btn large depressed color="deep-purple darken-4" class="ml-5 white--text" nuxt to="/games">
        игры
      </v-btn>
      <v-btn large depressed color="deep-purple darken-4" class=" ml-2 white--text" nuxt to="/studios">
        студии
      </v-btn>
      <!-- End menu section -->

      <v-spacer />
      <LoginButton />
    </v-app-bar>
    
    <v-main>
      <nuxt />
    </v-main>

    <v-footer app class="deep-purple darken-4 white--text">
      <v-col class="ml-5" cols="12">
        <span>Gamerank</span> &copy;{{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    toggle(){
      this.drawer = !this.drawer
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');

.nav-btn{
  font-size: .8rem;
  font-family: 'Ubuntu', sans-serif;
}
.nav-link{
  text-decoration: none;
  color: #fff;
}
h2{
  font-family: 'Ubuntu', sans-serif;
}
.theme--dark.v-application {
  background-color: (#121212) !important;
}
</style>