<template>
  <div>
    <div class="wallpaper">
      <v-container >
        <v-row>
          <v-col class="wrapper" md="6" offset-md="0" sm="8" offset-sm="1">
            <h3 class="mt-4 mb-2 white--text">Добро пожаловать!</h3>
            <p>Это мой учебный проект - мини рейтинговая площадка. Вся суть в том, что пользователи ставят свою оценку и влияют на общую оценку игры. Так же они могут оставлять комментарии, правда доступна эта возможность только авторизованным пользователям, есть личный кабинет.</p> 
            <hr />
            <p>Более подробней читай в github</p>
            <hr />
            <p>* Если на текущий момент ты не видишь мобильной версии и админки, значит я еще не успел их доделать))</p>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
}
</script>


<style lang="scss"scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');

.wallpaper{
  min-height: 500px;
  height: auto;
  width: 100%;
  overflow: hidden;
  opacity: 85%;
  background: no-repeat center url('/images/wall.jpg');
  background-size: cover;
  .wrapper{
    padding: 10px 40px;
    min-height: 500px;
    height: auto;
    background-color: rgba(66, 51, 202, 0.541);
    font-family: 'Ubuntu';
  }
  h3{
    text-shadow: 1px 1px 2px black;
  }
  p{
    color: #fff;
    padding-top: 10px;
  }
}
</style>