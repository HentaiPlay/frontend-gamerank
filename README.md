## Описание:

Проектик написан на Laravel 8 + Nuxt (SSR mode), представляет собой мини рейтинговую площадку для игр.

Фронтенд (скорее функционал в целом):

* Есть возможность зарегистрироваться / авторизоваться, это дает доступ к комментированию и возможности оставлять оценку на игру, тем самым влияя на общий рейтинг игры (используется nuxt/auth -> laravel-sanctum)
* Есть личный кабинет где можно поменять аватарку, загрузив свою
* Есть страница с списком игр, где их можно фильтровать по категориям.
* На странице самой игры есть информация о разработчиках, как и на странице разработчиков есть список их игр
* Так же есть скриншоты к игре (используется vue-cool-lightbox)
* К игре имеются комментарии (используется vue-CKEditor)
* Есть так же "звездочки" для оценки игры (используется vue-star-rating)
* Медиа файлы (всякие картинки) шибко не оптимизирвал и сами респонсы не быстро приходят из за лишних подзапросов (ниже опишу)
* При первом неавторизованном запуске может вывалиться 401 ошибка, но ничего страшного (пока не разобрался как исправить)
* В качестве UI используется vuetify

Бэкенд: 

* Для удобства создал seeder-ы, поэтому при первом запуске миграции нужно сразу просидировать всю БД (БД файла в репозиториях нет)
* В сидах уже есть несколько пользователей со своими оценками и комментариями, можно зайти с их аккаунтов или зарегать свой и потом с него войти
* Медиа файлы (картинки) хранятся в storage, возможно при развертывании придется создать ссылку на него (php artisan storage:link)
* БД как несложно догадаться реляционное, связи расписывать не буду, лучше посмотреть сразу в проекте
* Есть костыль в виде slug-а в url игры и по хорошему там должен быть id, что бы избежать лишних запросов в модель игры (это станет сразу ясно как откроете контроллер комментариев или рейтинга, знаю что так делать нельзя), но так как проект маленький и это не сильно заметно, исправлять я это не стал. Возможно чуть позже сделаю кэширование запросов
* В .env для нормальной работы sanctum нужно указать (SANCTUM_STATEFUL_DOMAINS=localhost:3000, SESSION_DOMAIN=localhost, SESSION_DOMAIN=localhost)
* В config/cors добавить ('paths' => ['api/*', 'sanctum/csrf-cookie'])

В целом интуитивно разобраться тут можно, в силу небольшого масштаба. Над интерфейсом особо не потел, поэтому адаптива нет, наиболее комфортное расширение от 1200px.

Скриншоты (для понимания как должно быть):
<p align="center">
<img width="19%" src="https://sun9-9.userapi.com/impg/lcwfiE8PBvsUThZefpaVEwgu_LRvkVEAR2iodw/prn48tHOnB8.jpg?size=1206x897&quality=96&sign=c92c510024a956af5a4f20a84ecfa907&type=album">
<img width="19%" src="https://sun9-69.userapi.com/impg/PfW4cgaIsAHECWpFWm6whOpJXWiV66Sm-DgrRw/dNFdF-5M0p4.jpg?size=1209x897&quality=96&sign=39d3542fe53308973f1a1723cf2aa1bd&type=album">
<img width="19%" src="https://sun9-63.userapi.com/impg/pUvqW4fHWzldUsfu0Zb6Rw2LvZu5k0fWyEauyA/qAxtndgyVA4.jpg?size=1211x898&quality=96&sign=487444d5ec64cc5de327c006a6ee3890&type=album">
<img width="19%" src="https://sun9-58.userapi.com/impg/QdfIN01CoEacXYw9ZkjfuQlJljz0GnHvDU4z9Q/YW2kSUCPg2s.jpg?size=1209x900&quality=96&sign=efc7977200482b7273aa45f78ee1c024&type=album">
<img width="19%" src="https://sun9-18.userapi.com/impg/0KeuFH8PPaj5CX5TyPhtvbHmag7gx2ftb5FNKg/i5hBdh-eusI.jpg?size=1209x892&quality=96&sign=4fbc266458d4fff57b30f1a35d293b71&type=album">
</p>

<hr />

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
