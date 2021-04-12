<template>
  <img id="logo" alt="logo" src="/images/logo.png" />
</template>

<style lang="scss" scoped>
#logo {
  height: 40px;
  width: auto;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
  &:hover {
    animation: turn 3.5s forwards 1s infinite;
  }
}
@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
