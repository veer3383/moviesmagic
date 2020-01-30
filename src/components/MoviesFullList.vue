<template>
  <div class="movies-full-list">
    <div class="row">
      <div class="column">
        <h2>{{ title }}</h2>
      </div>
      <div class="column">
        <select
          v-if="title === 'Discover Movies'"
          @change="onSortChange($event)"
          class="sort-select"
        >
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="popularity.desc" selected
            >Popularity Descending</option
          >
          <option value="original_title.asc">Title (A-Z)</option>
          <option value="original_title.desc">Title (Z-A)</option>
          <option value="release_date.asc">Release Date Ascending</option>
          <option value="release_date.desc">Release Date Descending</option>
          <option value="vote_average.asc">Rating Ascending</option>
          <option value="vote_average.desc">Rating Descending</option>
        </select>
      </div>
    </div>
    <div class="row" v-for="(item, index) in movieList" :key="index">
      <div class="item" @click="loadDetailPage(item.id)">
        <div class="col">
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
        </div>
        <div class="col detail">
          <h2>{{ item.title }}</h2>
          <p>{{ item.overview }}</p>
        </div>
      </div>
    </div>
    <button
      class="load-all-button"
      v-if="scrollStop && !scrollDone"
      @click="loadmore"
    >
      Load More
    </button>
  </div>
</template>

<script>
import variables from "../variables";
import router from "../router";
import { RepositoryFactory } from "./../repositories/RepositoryFactory";
const PostsRepository = RepositoryFactory.get("movies");

export default {
  name: "movies-full-list",
  data() {
    return {
      movieList: [],
      searchQuery: "",
      category: "",
      imageBase: variables.imageBaseUrl,
      imageSize: variables.small,
      title: "",
      scrollLimit: 4,
      scrollStop: false,
      scrollDone: false,
      pageCount: 1,
      sortValue: "popularity.desc"
    };
  },
  mounted() {
    this.category = this.$route.query.category;
    this.searchQuery = this.$route.query.search;
    if (this.movieList.length == 0) {
      this.pageCount = 0;
      this.callapi();
    }
    this.scrollMonitor();
  },
  methods: {
    scrollMonitor() {
      let _this = this;
      window.scrollTo(0, 0);
      window.addEventListener(
        "scroll",
        () => {
          if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight
          ) {
            _this.callapi();
          }
        },
        false
      );
    },
    callapi() {
      if (this.pageCount < this.scrollLimit) {
        this.scrollStop = true;
        switch (this.category) {
          case "searchMovies":
            this.title = `Search Results for "${this.searchQuery}"`;
            this.callSearchMovies(this);
            break;
          case "popularMovies":
            this.title = `Discover Movies`;
            this.callDiscoverMovies(this);
            break;
          case "topRatedMovies":
            this.title = `Top Rated Movies`;
            this.callTopRatedMovies(this);
            break;
        }
      }
    },
    async callSearchMovies(_this) {
      const { data } = await PostsRepository.getSearchedMovie(
        _this.searchQuery,
        ++_this.pageCount
      );
      this.movieList = this.movieList.concat(data.results);
      this.isScrollDone(data.results);
    },
    async callDiscoverMovies(_this) {
      const { data } = await PostsRepository.getDiscoverMovies(
        ++_this.pageCount,
        this.sortValue
      );
      this.movieList = this.movieList.concat(data.results);
      this.isScrollDone(data.results);
    },
    async callTopRatedMovies(_this) {
      const { data } = await PostsRepository.getTopRatedMovies(
        ++_this.pageCount
      );
      this.movieList = this.movieList.concat(data.results);
      this.isScrollDone(data.results);
    },
    loadmore() {
      this.scrollStop = false;
      this.scrollLimit = this.scrollLimit + 2;
      this.callapi();
    },
    isScrollDone(results) {
      if (results.length == 0) {
        this.scrollDone = true;
      }
    },
    onSortChange(event) {
      this.movieList = [];
      this.pageCount = 0;
      this.sortValue = event.target.value;
      this.callapi();
    },
    loadDetailPage(id) {
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

* {
  box-sizing: border-box;
}
.movie-poster,
.fallback-poster {
  width: 100px;
}
h2,
p {
  font-size: 1.2rem;
  text-align: left;
  margin-left: 10px;
  color: $text-color;
}
p {
  font-size: 1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.item {
  border: 2px solid $red-button;
  display: flex;
  margin: 10px;
}
.col {
  float: left;
}
.column {
  float: left;
  width: 50%;
  padding: 10px;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
.sort-select {
  float: right;
  height: 50px;
  background-color: $red-button;
  font-size: 0.8rem;
  color: $text-color;
  font-weight: bolder;
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

@media screen and (min-width: 480px) {
  .item {
    margin-left: 20%;
    margin-right: 20%;
  }
  .movie-poster,
  .fallback-poster {
    width: 188px;
    height: -webkit-fill-available;
  }
  .col {
    height: 279px;
    background: $black;
  }
}
</style>
