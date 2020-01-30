import Repository from "./Repository";
import variables from "../variables";

const getDiscoverMovies = "/discover/movie";
const getSearchedMovie = "/search/movie";
const getTopRatedMovies = "/movie/top_rated";
const getMovieDetails = "/movie/";

export default {
  getDiscoverMovies(count, sortValue) {
    return Repository.get(
      `${getDiscoverMovies}?api_key=${variables.apikey}&language=${variables.lang}&page=${count}&sort_by=${sortValue}`
    );
  },

  getTopRatedMovies(count) {
    return Repository.get(
      `${getTopRatedMovies}?api_key=${variables.apikey}&language=${variables.lang}&page=${count}`
    );
  },

  getSearchedMovie(keyword, count) {
    return Repository.get(
      `${getSearchedMovie}?api_key=${variables.apikey}&language=${variables.lang}&query=${keyword}&page=${count}`
    );
  },

  getMovieDetails(id) {
    return Repository.get(
      `${getMovieDetails}${id}?api_key=${variables.apikey}&language=${variables.lang}&append_to_response=videos,credits`
    );
  }
};
