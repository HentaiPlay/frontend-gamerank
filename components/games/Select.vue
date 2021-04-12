<template>
  <div class="select-wrapper ml-auto">
    <v-select
      v-model="current"
      :items="items"
      chips
      label="Категории"
      outlined
      @change="$emit('current', current)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      current: ""
    }
  },
  mounted() {
    this.getCategories()
  },
  computed: {
    items() {
      return ["Все"].concat(this.categories.map(e => e.name))
    }
  },
  methods: {
    getCategories() {
      this.$axios.$get("/sanctum/csrf-cookie").then(() => {
        this.$axios
          .$post("/api/categories")
          .then(response => (this.categories = response))
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.select-wrapper {
  width: 500px;
}
</style>