<template>
  <div class="rating">
    <client-only>
      <div v-if="$auth.loggedIn" class="person-rank">

        <!-- Personal rating -->
        <h4 class="font-weight-bold my-2">Ваша оценка</h4>
        <star-rating
          v-model="personRating"
          :increment="0.5"
          :max-rating="10"
          :star-size="25"
          @rating-selected="submit"
        />
        <v-btn
          class="primary my-3"
          depressed
          rounded
          small
          @click.prevent="clear"
        >
          Сбросить оценку
        </v-btn>
      </div>
      <div v-else class="f-flex justify-center my-5">
        <v-icon>mdi-lock</v-icon>
        <span class="font-weight-bold ml-2">
          Что бы оставить оценку авторизуйтесь
        </span>
      </div>
      <!-- End personal rating -->

      <!-- Common rating -->
      <div class="common-rank">
        <h4 class="font-weight-bold my-2">Общая оценка</h4>
        <star-rating
          v-model="commonRating"
          read-only
          :increment="0.5"
          :max-rating="10"
          :star-size="25"
        />
      </div>
      <!-- End common rating -->

    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      personRating: null,
      commonRating: null,
      flag: null
    }
  },
  mounted() {
    this.getPersonRating()
    this.getCommonRating()
  },
  methods: {
    
    // common rating
    getCommonRating() {
      this.$axios.$get("/sanctum/csrf-cookie").then(() => {
        this.$axios
          .$post(`/api/rating/common/${this.$route.params.slug}`)
          .then(response => {
            this.commonRating = response
          })
      })
    },

    // person rating
    getPersonRating() {
      if (this.$auth.loggedIn) {
        this.$axios.$get("/sanctum/csrf-cookie").then(() => {
          this.$axios
            .$post(`/api/rating/${this.$route.params.slug}/person/${this.$auth.user.id}`)
            .then(response => {
              (this.personRating = response), (this.flag = response)
            })
        })
      }
    },
    addPersonRating(personRating) {
      this.$axios.$get("/sanctum/csrf-cookie").then(() => {
        this.$axios.$post(`/api/rating/${this.$route.params.slug}/add`, {
          user_id: this.$auth.user.id,
          rank: personRating
        })
      })
    },
    updatePersonRating(personRating) {
      this.$axios.$get("/sanctum/csrf-cookie").then(() => {
        this.$axios.$patch(`/api/rating/${this.$route.params.slug}/update`, {
          user_id: this.$auth.user.id,
          rank: personRating
        })
      })
    },
    deletePersonRating() {
      this.$axios.$get("/sanctum/csrf-cookie").then(() => {
        this.$axios.$post(`/api/rating/${this.$route.params.slug}/delete`, {
          user_id: this.$auth.user.id
        })
      })
    },

    // on click stars
    async submit(personRating) {
      if (this.flag == 0) {
        await this.addPersonRating(personRating)
        await this.getCommonRating()
        await (this.flag = 1)
      } else {
        await this.updatePersonRating(personRating)
        await this.getCommonRating()
      }
    },

    async clear() {
      await this.deletePersonRating()
      await this.getCommonRating()
      await (this.personRating = 0)
      await (this.flag = 0)
    }
  }
}
</script>