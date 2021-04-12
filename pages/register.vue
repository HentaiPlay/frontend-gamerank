<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" offset-md="3" class="auth-form">
        <h2 class="text-center mt-3 mb-5">Регистрация</h2>
        <v-form v-model="form" ref="form">

          <!-- Nickname -->
          <v-text-field
            prepend-icon="mdi-account mr-2"
            class="mt-3 mb-3"
            v-model="nickname"
            :rules="nicknameRules"
            label="Придумайте никнейм"
            required
          ></v-text-field>
          <!-- End nickname -->

          <!-- Email -->
          <v-text-field
            prepend-icon="mdi-email mr-2"
            class="mt-3 mb-3"
            v-model="email"
            :rules="emailRules"
            label="Ваш E-mail"
            required
          ></v-text-field>
          <!-- End email -->

          <!-- First password -->
          <v-text-field
            v-model="password"
            class="mt-3 mb-5"
            :prepend-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="show1 ? 'text' : 'password'"
            label="Придумайте пароль"
            hint="Не менее 8 символов"
            counter
            @click:prepend="show1 = !show1"
          ></v-text-field>
          <!-- End first password -->

          <!-- Second password -->
          <v-text-field
            v-model="password2"
            class="mt-3 mb-5"
            :prepend-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min, passwordRules.equality]"
            :type="show2 ? 'text' : 'password'"
            label="Повторите пароль"
            hint="Не менее 8 символов"
            counter
            @click:prepend="show2 = !show2"
          ></v-text-field>
          <!-- End second password -->

          <div class="d-flex justify-center">
            <v-btn 
              rounded
              depressed
              :disabled="!form"
              color="success"
              class="mr-4 success"
              :loading="loading"
              @click="submit"
            >
              Зарегистрироваться
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>;
export default {
  auth: false,
  data() {
    return {
      form: false,
      nickname: "",
      nicknameRules: [
        (v) => !!v || "Заполните это поле",
        (v) => v.length >= 3 || "Никнейм должен содержать не менее 3 символов"
      ],
      email: "",
      emailRules: [
        (v) => !!v || "Заполните поле",
        (v) => /.+@.+/.test(v) || "Некорректный e-mail"
      ],
      show1: false,
      show2: false,
      password: "",
      password2: "",
      passwordRules: {
        required: (v) => !!v || "Заполните поле.",
        min: (v) => v.length >= 8 || "Не менее 8 символов",
        equality: (v) => (v == this.password) || "Пароли не совпадают"  
      },
      loading: false
    }
  },
  methods: {
    getToken(){
      this.$axios.$get('/sanctum/csrf-cookie')
    },
    clear() {
      this.$refs.form.reset();
      this.nickname = "",
      this.email = "",
      this.password = "",
      this.password2 = ""
    },
    send() {
      this.$axios.$get('/sanctum/csrf-cookie').then(() => {
      this.$axios.$post('/api/register', {
        nickname: this.nickname,
        email: this.email,
        password: this.password
      })
      .catch(error => {
        this.error = error
      })
      .finally(this.clear())
      })
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