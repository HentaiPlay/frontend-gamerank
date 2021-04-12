<template>
  <v-container>
    <v-row class="pb-5">
      <v-col cols="12">
        <h2 class="font-weight-bold my-5">{{studio.name}}</h2>
        <hr>
      </v-col>

      <!-- Studio block -->
      <v-col md="4">
        <div class="d-flex align-center image-wrapper mb-3">
          <v-img v-if="image"
            :src="image"
            width="100%"
          />
        </div>
        <span class="mr-3 font-weight-bold">Страна: </span>
        <span>{{studio.country}}</span>
      </v-col>
      <v-col md="8">
        <h3 class="font-weight-bold my-3">Описание</h3>
        {{studio.description}}
      </v-col>
      <!-- End studio block -->

      <v-col cols="12">
        <p class="font-weight-bold my-5">Игры студии:</p>
        <v-row>

          <!-- Game cards -->
          <v-col v-for="game in this.games" :key="game.id" cols="3">
            <v-card class="card-game">
              <div class="game-image-wrapper">
                <img
                  :src="`${$axios.defaults.baseURL}/storage/images/games/${game.slug}/${game.preview_image}`"
                />
              </div>
              <v-card-title>
                <small>
                  <nuxt-link :to="`/games/${game.slug}`">
                    {{game.name}}
                  </nuxt-link>
                </small>
              </v-card-title>
            </v-card>
          </v-col>
          <!-- End Game cards -->

        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      studio: {},
      games: [],
      image: false
    }
  },
  mounted(){
    this.getStudio()
  },
  methods: {
    getStudio(){
      this.$axios.$get('/sanctum/csrf-cookie').then(() => {
        this.$axios.$post(`/api/studio/${this.$route.params.slug}`)
        .then(response => {
          this.studio = response,
          this.image = `${this.$axios.defaults.baseURL}/storage/images/studios/${response.logo}`
        })
        .then(() => {
          this.$axios.$post(`/api/studio/${this.studio.id}/games`)
          .then(response => this.games = response)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-game {
  border-radius: 15px;
  .game-image-wrapper {
    height: 200px;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    background-color: #fff;
    img{
      object-fit: cover;
      height: 100%;
      width: 100%;
      display: block;
      margin: auto auto;
    }
  }
  a {
    color: #000;
    text-decoration: none;
    &:hover{
      text-decoration: underline;
    }
  }
}
.image-wrapper{
  margin: auto auto;
  height: 250px;
  width: 250px;
  overflow: hidden;
  background-color: #fff;
  img{
    border: 1px solid black;
  }
}
</style>
