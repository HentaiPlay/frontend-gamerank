<template>
  <v-container>
    <v-row class="pb-5">
      <v-col cols="12">
        <div class="d-flex mt-5">
          <h2 class="font-weight-bold my-5">Игры</h2>
          <GamesSelect @current="current" />
        </div>
        <hr />
      </v-col>

      <!-- Game cards -->
      <v-col v-for="game of selectGames" :key="game.id" md="4" sm="4">
        <v-card class="card-game deep-purple darken-3">
          <div class="pb-1 card-image">
            <v-img
              :src="`${$axios.defaults.baseURL}/storage/images/games/${game.slug}/${game.preview_image}`"
              width="100%"
            />
          </div>
          <v-card-title
            nuxt
            :to="`/games/${game.slug}`"
            class="d-flex justify-center"
          >
            <small>
              <nuxt-link :to="`/games/${game.slug}`">
                {{ game.name }}
              </nuxt-link>
            </small>
          </v-card-title>
        </v-card>
      </v-col>
      <!-- End game cards -->
      
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      games: [],
      currentCategory: ""
    }
  },
  mounted() {
    this.getGames()
  },
  computed: {
    selectGames() {
      if (this.currentCategory !== "" && this.currentCategory !== "Все") {
        return this.games.filter((e) =>
          e.category.includes(this.currentCategory)
        )
      } else {
        return this.games;
      }
    }
  },
  methods: {
    getGames() {
      this.$axios.$get("/sanctum/csrf-cookie").then(() => {
        this.$axios
          .$post("/api/games")
          .then((response) => (this.games = response))
      })
    },
    current(data) {
      this.currentCategory = data;
    }
  }
}
</script>

<style lang="scss" scoped>
.card-game {
  border-radius: 15px;
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
.card-image {
  height: 240px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-color: #fff;
  img {
    object-fit: cover;
    min-height: 100%;
    display: block;
  }
}
</style>
