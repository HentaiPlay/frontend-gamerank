export const state = () => ({
  image: []
})

export const mutations = {
  get(state, text) {
    state.image.push({
      text,
      done: false
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}

export const actions = {
  GET_IMAGE({commit}) {
    this.$axios.$get('/sanctum/csrf-cookie').then(() => {
      this.$axios.$post(`/api/game/${this.$route.params.slug}`)
        .then(response => {
          this.game = response,
            this.preview = `${this.$axios.defaults.baseURL}/storage/images/games/${response.slug}/${response.preview_image}`
        })
    })
  }
}

export const getters = {
  IMAGE(state){
    return state.image
  }
}