<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" offset-md="3" class="auth-form">
        <h2 class="text-center mt-3 mb-5">Авторизация</h2>
        <v-form v-model="form" ref="form">

          <!-- Nickname -->
          <v-text-field
            prepend-icon="mdi-account mr-2"
            class="mt-3 mb-3"
            v-model="nickname"
            :rules="nicknameRules"
            label="Ваш никнейм"
            required
          ></v-text-field>
          <!-- End nickname -->

          <!-- Password -->
          <v-text-field
            v-model="password"
            class="mt-3 mb-5"
            :prepend-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="show ? 'text' : 'password'"
            label="Ваш пароль"
            hint="Не менее 8 символов"
            counter
            @click:prepend="show = !show"
          ></v-text-field>
          <!-- End password -->

          <div class="d-flex">
            <v-btn
              rounded
              depressed
              :disabled="!form"
              color="success"
              class="mr-4 success"
              :loading="loading"
              @click="submit"
            >
              Войти
            </v-btn>
            <v-btn
              rounded
              depressed
              color="primary"
              class="ml-auto"
              nuxt
              to="/register"
            >
              <v-icon small class="mr-2">mdi-login</v-icon>
              Регистрация
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: false,
      nickname: "",
      nicknameRules: [
        (v) => !!v || "Заполните поле",
        (v) => v.length >= 3 || "Никнейм должен содержать не менее 3 символов",
      ],
      show: false,
      password: "",
      passwordRules: {
        required: (v) => !!v || "Заполните поле.",
        min: (v) => v.length >= 8 || "Не менее 8 символов",
      },
      loading: false
    }
  },
  methods: {
    clear() {
      this.$refs.form.reset()
      this.nickname = ""
      this.password = ""
    },
    send() {
      this.$auth
        .loginWith("laravelSanctum", {
          data: {
            nickname: this.nickname,
            password: this.password
          }
        })
        .catch(e => console.log("Error on login: " + e))
        .finally(this.clear())
    },
    async submit() {
      await (this.loading = true)
      await (this.send())
      await (this.loading = false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap");
h2 {
  font-family: "Ubuntu", sans-serif;
}
.auth-form {
  border: 1px solid grey;
  border-radius: 15px;
  margin-top: 100px;
  padding: 30px 30px 30px 30px;
}
</style>