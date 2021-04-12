<template>
  <v-container>
    <v-row class="pb-5">
      <v-col cols="12">
        <h2 class="font-weight-bold my-5">{{ game.name }}</h2>
        <hr />
      </v-col>

      <!-- Preview image block -->
      <v-col md="5" sm="6">
        <div class="d-flex align-center image-wrapper mb-3">
          <v-img v-if="preview" :src="preview" />
        </div>
      </v-col>
      <!-- End preview image block -->

      <!-- Category block -->
      <v-col md="7" sm="6">
        <span class="mr-3 font-weight-bold">Категория</span>
        <v-chip-group active-class="primary--text" column>
          <v-chip v-for="tag in categories" :key="tag.name">
            {{ tag.name }}
          </v-chip>
        </v-chip-group>
        <!-- End category block -->

        <!-- Studios block -->
        <span class="mr-3 font-weight-bold">Разрабочтик</span>
        <v-chip-group active-class="primary--text" column>
          <v-chip
            v-for="tag in studios"
            :key="tag.name"
            link
            :to="`/studios/${tag.slug}`"
          >
            {{ tag.name }}
          </v-chip>
        </v-chip-group>
        <!-- End studios block -->

        <GamesRating />
      </v-col>

      <GamesImageLightbox />

      <!-- Description block -->
      <v-col cols="12">
        <h3 class="font-weight-bold my-3">Описание</h3>
        {{ game.description }}
      </v-col>
      <!-- End description block -->

      <GamesComments />
    </v-row>
  </v-container>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
export default {
  auth: false,
  components: {
    CoolLightBox,
  },
  data() {
    return {
      game: [],
      preview: false
    }
  },
  mounted() {
    this.getGame()
  },
  computed: {
    categories() {
      return this.game.category
    },
    studios() {
      return this.game.studios
    },
  },
  methods: {
    getGame() {
      this.$axios.$get("/sanctum/csrf-cookie").then(() => {
        this.$axios
          .$post(`/api/game/${this.$route.params.slug}`)
          .then((response) => {
            (this.game = response),
            (this.preview = `${this.$axios.defaults.baseURL}/storage/images/games/${response.slug}/${response.preview_image}`)
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
    img {
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
    &:hover {
      text-decoration: underline;
    }
  }
}
.image-wrapper {
  height: auto;
  max-height: 400px;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  img {
    margin: auto auto;
    width: 100%;
    height: auto;
  }
}
</style>
