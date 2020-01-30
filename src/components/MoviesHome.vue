<template>
  <div class="movies-home">
    <div class="container">
      <div class="seach-input">
        <input
          type="text"
          v-model.lazy="search"
          v-on:keyup.enter="callSearchMovies"
          placeholder="Search for movies"
        />
        <i class="fa fa-search fa-lg fa-fw" aria-hidden="true"></i>
      </div>
      <br />
      <div class="search-movie-container">
        <h3 v-if="searchMoviesList.length > 0">
          {{ searchCount }} Search Results for "{{ search }}"
        </h3>
        <h3 v-if="search !== '' && searchMoviesList.length == 0">
          No Results found for "{{ search }}"
        </h3>
        <movie-horizontal-list
          v-if="searchMoviesList.length > 0"
          :movielist="searchMoviesList"
        ></movie-horizontal-list>
        <router-link
          :to="{
            name: 'movies-full-list',
            query: { category: 'searchMovies', search: this.search }
          }"
        >
          <button v-if="searchResults.length > 10" class="load-all-button">
            Show all {{ searchCount }} Movies
          </button>
        </router-link>
      </div>
      <div class="popular-movie-container">
        <h3>Popular movies</h3>
        <movie-horizontal-list
          :movielist="latestMoviesList"
        ></movie-horizontal-list>
        <router-link
          :to="{
            name: 'movies-full-list',
            query: { category: 'popularMovies' }
          }"
        >
          <button class="load-all-button">Show all Popular Movies</button>
        </router-link>
      </div>
      <div class="top-movie-container">
        <h3>Top Rated movies</h3>
        <movie-horizontal-list
          :movielist="topMoviesList"
        ></movie-horizontal-list>
        <router-link
          :to="{
            name: 'movies-full-list',
            query: { category: 'topRatedMovies' }
          }"
        >
          <button class="load-all-button">Show all Top Rated Movies</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from "./../repositories/RepositoryFactory";
const PostsRepository = RepositoryFactory.get("movies");

export default {
  name: "movies-home",
  components: {
    "movie-horizontal-list": () => import("./MovieHorizontalList.vue")
  },
  data() {
    return {
      latestMovies: [],
      topRatedMovies: [],
      searchResults: [],
      search: "",
      searchCount: 0
    };
  },
  created() {
    this.callDiscoverMovies();
    this.callTopRatedMovies();
  },
  methods: {
    async callDiscoverMovies() {
      const { data } = await PostsRepository.getDiscoverMovies(
        1,
        "popularity.desc"
      );
      this.latestMovies = data.results;
    },
    async callTopRatedMovies() {
      const { data } = await PostsRepository.getTopRatedMovies(1);
      this.topRatedMovies = data.results;
    },
    async callSearchMovies() {
      this.searchResults = [];
      const { data } = await PostsRepository.getSearchedMovie(this.search, 1);
      this.searchCount = data.total_results;
      this.searchResults = data.results;
    }
  },
  computed: {
    latestMoviesList() {
      return this.latestMovies.slice(0, 10);
    },
    topMoviesList() {
      return this.topRatedMovies.slice(0, 10);
    },
    searchMoviesList() {
      return this.searchResults.slice(0, 10);
    }
  }
};
</script>

<style scoped lang="scss">
$red-button: rgb(150, 8, 8);
$search-bg: rgb(170, 170, 170);
$text-color:rgb(255, 255, 255);
$gradient: 0 12px 16px 0 rgba(87, 64, 64, 0.89), 0 17px 50px 0 rgba(0, 0, 0, 0.19);

h3 {
  margin-left: 20px;
  text-align: left;
  color: $text-color;
}
a {
  text-decoration: none;
}
input[type="text"] {
  width: 100%;
  border-radius: 4px;
  margin: 8px 0;
  padding: 8px;
  box-sizing: border-box;
}
.seach-input input[type="text"] {
  padding-left: 40px;
}
.seach-input {
  position: relative;
  margin-left: 20px;
  margin-right: 20px;
}
.seach-input i {
  position: absolute;
  left: 0;
  top: 8px;
  padding: 9px 8px;
  color: $search-bg;
}
.load-all-button {
    background-color: $red-button;
    border: none;
    color: $text-color;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
  }
  .load-all-button:hover {
    box-shadow: $gradient;
  }
</style>
