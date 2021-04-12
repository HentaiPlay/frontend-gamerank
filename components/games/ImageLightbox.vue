<template>
  <v-col cols="12">
    <CoolLightBox :items="items" :index="index" @close="index = null">
    </CoolLightBox>
    <p class="font-weight-bold">Скриншоты</p>
    <div class="images-wrapper d-flex">
      <img
        class="ma-1 images"
        v-for="(image, id) in items"
        :key="id"
        @click="index = id"
        :src="image"
      />
    </div>
  </v-col>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox"
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css"
export default {
  components: {
    CoolLightBox
  },
  data() {
    return {
      index: null,
      items: []
    }
  },
  mounted() {
    this.getImages()
  },
  methods: {
    getImages() {
      this.$axios.$get("/sanctum/csrf-cookie").then(() => {
        this.$axios
          .$post(`/api/game/${this.$route.params.slug}/images`)
          .then(response => {
            this.items = response.image.map(e =>
                (`${this.$axios.defaults.baseURL}/storage/images/games/${this.$route.params.slug}/` + e.path)
            )
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.images-wrapper {
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-color: #fff;
}
.images {
  width: 100%;
  height: 180px;
  display: block;
  overflow: hidden;
  object-fit: cover;
  background-color: #fff;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
    filter: brightness(70%);
  }
}
</style>