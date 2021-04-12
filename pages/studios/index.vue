<template>
  <v-container>
    <v-row class="pb-5">
      <v-col cols="12">
        <h2 class="font-weight-bold my-5">Студии</h2>
        <hr />
      </v-col>

      <v-col v-for="studio of this.studios" :key="studio.id" md="4" sm="4">
        <v-card class="card-studio deep-purple darken-3" outlined>
          <div class="d-flex align-center card-image">
            <v-img
              :src="`${$axios.defaults.baseURL}/storage/images/studios/${studio.logo}`"
              width="100%"
            />
          </div>
          <v-card-title
            nuxt
            :to="`/studios/${studio.slug}`"
            class="d-flex justify-center"
          >
            <nuxt-link :to="`/studios/${studio.slug}`">
              {{ studio.name }}
            </nuxt-link>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      studios: []
    }
  },
  mounted() {
    this.getStudios()
  },
  methods: {
    getStudios() {
      this.$axios.$get("/sanctum/csrf-cookie").then(() => {
        this.$axios
          .$post("/api/studios")
          .then((response) => (this.studios = response))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-studio {
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
  margin: auto auto;
  height: 200px;
  padding: 2em;
  overflow: hidden;
  background-color: #fff;
  img {
    border: 1px solid black;
  }
}
</style>
