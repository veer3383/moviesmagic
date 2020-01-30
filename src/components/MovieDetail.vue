<template>
  <div class="movie-detail">
    <div class="backdrop-wrapper">
      <img
        class="backdrop-image"
        v-if="movieData.backdrop_path !== null"
        :src="`${imageBase}${imageSize}${movieData.backdrop_path}`"
      />
      <img
        class="empty-backdrop-image"
        v-else
        src="../assets/images/empty-backdrop.jpg"
      />
    </div>
    <div v-if="loading" class="overlay-content">
      <div class="row">
        <div class="item">
          <div class="col poster">
            <img
              class="movie-poster"
              v-if="movieData.poster_path !== null"
              :src="`${imageBase}${imageSize}${movieData.poster_path}`"
            />
            <img
              class="fallback-poster"
              v-else
              src="../assets/images/default-poster.jpg"
            />
          </div>
          <div class="col detail">
            <h2 class="movie-title">
              {{ movieData.title }} ({{
                movieData.release_date.substring(0, 4)
              }})
            </h2>

            <div class="section-two">
              <div class="rating-wrapper">
                {{ movieData.vote_average }}
              </div>
              <div v-if="videoLink !== ''" class="trailer-wrapper">
                <button @click="loadTrailer()" class="load-all-button">
                  Watch Trailer
                </button>
              </div>
            </div>

            <div class="section-three">
              <p class="section-heading">Genre</p>
              <ul>
                <li
                  class="genre-pill"
                  v-for="(item, index) in movieData.genres"
                  :key="index"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>

            <div class="section-four">
              <p class="section-heading">Overview</p>
              <p class="overview">{{ movieData.overview }}</p>
            </div>

            <div class="section-five">
              <p class="section-heading">Featured Crew</p>
              <ul>
                <li
                  class="crew-list"
                  v-for="(item, index) in movieData.credits.crew.slice(0, 5)"
                  :key="index"
                >
                  <div>
                    <span class="crew-name">
                      {{ item.name }}
                    </span>
                    <br />{{ item.job }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="playVideo" class="modal" :class="switchModalDisplay">
      <div class="modal-content">
        <span @click="closeTrailer()" class="close">&times;</span>
        <iframe
          class="youtube-frame"
          :src="`${videoLink}?autoplay=1`"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>
import variables from "../variables";
import { RepositoryFactory } from "./../repositories/RepositoryFactory";
const PostsRepository = RepositoryFactory.get("movies");

export default {
  name: "movie-detail",
  data() {
    return {
      imageBase: variables.imageBaseUrl,
      imageSize: variables.large,
      movieId: "",
      movieData: "",
      videoLink: "",
      loading: false,
      playVideo: false
    };
  },
  mounted() {
    this.movieId = this.$route.query.movieId;
    this.getMovieDetails();
  },
  methods: {
    async getMovieDetails() {
      let _this = this;
      const { data } = await PostsRepository.getMovieDetails(_this.movieId);
      this.movieData = data;
      this.loading = true;
      let videos = data.videos.results;
      if (videos.length > 0) {
        let videoSource = videos[0].site;
        let videoUrl = videos[0].key;
        if (videoSource === "YouTube") {
          this.videoLink = `https://www.youtube.com/embed/${videoUrl}`;
        }
      }
    },
    loadTrailer() {
      this.playVideo = true;
    },
    closeTrailer() {
      this.playVideo = false;
    }
  },
  computed: {
    switchModalDisplay: function() {
      return {
        showmodal: this.playVideo,
        hidemodal: !this.playVideo
      };
    }
  }
};
</script>

<style scoped lang="scss">
$red-button: rgb(150, 8, 8);
$text-color:rgb(255, 255, 255);
$green-rating: #057e0b;
$modal-border: rgb(136, 136, 136);
$black: rgb(0,0,0);
$pill-color: rgb(221,221,221);
$crew-jobs: rgba(255, 255, 255, 0.685);
$gradient: 0 12px 16px 0 rgba(87, 64, 64, 0.89), 0 17px 50px 0 rgba(0, 0, 0, 0.19);

.backdrop-wrapper {
  position: relative;
  text-align: center;
  color: $text-color;
}
.backdrop-image,
.empty-backdrop-image {
  opacity: 0.2;
  width: 100%;
}
.overlay-content {
  position: absolute;
  width: 100%;
  height: max-content;
  top: 25%;
}
.movie-poster, .fallback-poster {
  width: 300px;
  margin: 40px;
}
h2,
h4,
p {
  text-align: left;
  margin-left: 10px;
  color: $text-color;
}

.movie-title {
  margin-top: 40px;
  margin-bottom: 0px;
  font-size: 1.9rem;
}
.movie-release-date {
  color: $text-color;
}
p {
  font-size: 1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
@media (max-width: 1099px) and (min-width: 780px) {
  .movie-poster, .fallback-poster  {
    width: 400px;
  }
  li {
    display: table-cell !important;
  }
}

@media screen and (min-width: 1100px) {
  * {
    box-sizing: border-box;
  }
  .row {
    margin: 1%;
  }
  .row:after {
    content: "";
    display: table;
    clear: both;
  }
  .col {
    float: left;
  }
  .column {
    float: left;
    width: 50%;
    padding: 10px;
  }
  .item {
    display: flex;
  }
  ul {
    display: flex;
    padding: 0px;
  }
}

.section-heading {
  margin-left: 10px;
  font-size: 1.5rem;
  margin-bottom: 0px;
}

.overview {
  margin-bottom: 12px;
}
.genre-pill {
  background-color: $pill-color;
  border: none;
  color: $black;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
}
.crew-list {
  border: none;
  color: $crew-jobs;
  padding: 8px 10px;
  text-align: left;
  text-decoration: none;
  display: block;
  .crew-name {
    font-weight: bolder;
    color: $text-color;
  }
}
.rating-wrapper {
  width: 50px;
  margin: 8px;
  border-radius: 50%;
  text-align: center;
  font-size: 0.9rem;
  padding: 25px 0;
  line-height: 0;
  position: relative;
  background: $green-rating;
  color: $text-color;
}

ul {
  padding: 0px;
}
.section-two {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
}

.load-all-button {
  background-color: $red-button;
  border: none;
  color: $text-color;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
.load-all-button:hover {
  box-shadow: $gradient;
}
.showmodal {
  display: block;
}
.hidemodal {
  display: none;
}
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  top: 0;
  width: 100%;
}
.modal-content {
  background-color: $black;
  margin: auto;
  border: 1px solid $modal-border;
  width: 80%;
}
.close {
  cursor: pointer;
  color: $text-color;
  float: right;
  font-size: 25px;
  margin-right: 10px;
}
.youtube-frame {
  height: 350px;
  width: 100%;
}
</style>
