<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <img class="header" src="./assets/images/movie-club.png" />
        <h3>The Movie library</h3>
      </router-link>
    </div>
    <router-view />
    <img class="attribution" src="./assets/images/tmdb.svg" />
  </div>
</template>

<style lang="scss">
$main-gradient: linear-gradient(0deg,rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 1) 35%,rgba(236, 241, 242, 1) 100%);
$text-color:rgb(255, 255, 255);
$black: rgb(0,0,0);

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: $black;
}
html,
body {
  min-height: 100%;
  margin: 0;
  background-color: $black;
}
h3,
a {
  color: $text-color;
  text-decoration: none;
}
.attribution {
  margin: 10px;
  height: 50px;
}
.header {
  height: 90px;
}
#nav {
  padding: 30px;
  background-color: $black;
  background: $main-gradient;
}
</style>
