<template>
  <div class="movie-horizontal-list">
    <div class="list-wrapper">
      <div
        class="card"
        v-for="(item, index) in movielist"
        :key="index"
        @click="loadDetail(item.id)"
      >
        <img
          class="movie-poster"
          v-if="item.poster_path !== null"
          :src="`${imageBase}${imageSize}${item.poster_path}`"
        />
        <img
          class="fallback-poster"
          v-else
          src="../assets/images/default-poster.jpg"
        />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import variables from "../variables";
import router from "../router";

export default {
  name: "movie-horizontal-list",
  props: {
    movielist: Array
  },
  data() {
    return {
      imageBase: variables.imageBaseUrl,
      imageSize: variables.small
    };
  },
  methods: {
    loadDetail(id) {
      router.push({ name: "movie-detail", query: { movieId: id } });
    }
  }
};
</script>

<style scoped lang="scss">
$red-button: rgb(150, 8, 8);
$text-color:rgb(255, 255, 255);
$black: rgb(0,0,0);
$gradient: 0 12px 16px 0 rgba(87, 64, 64, 0.89), 0 17px 50px 0 rgba(0, 0, 0, 0.19);

@media screen and (min-width: 480px) {
  .card {
    margin: 10px;
  }
}
.movie-poster {
  width: -webkit-fill-available;
  height: -webkit-fill-available;
}
.fallback-poster {
  width: inherit;
  height: -webkit-fill-available;
}

.list-wrapper {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  .card {
    flex: 0 0 auto;
  }
}
p {
  color: $text-color;
}
.card {
  margin: 7px;
  border: 2px solid $red-button;
  width: 188px;
  height: 279px;
  background: $black;
}
.card:hover {
  -ms-transform: scale(1.05);
  -webkit-transform: scale(0.05);
  transform: scale(1.05);
  box-shadow: $gradient;
}

.list-wrapper {
  height: 350px;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
