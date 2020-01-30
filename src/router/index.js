import Vue from "vue";
import VueRouter from "vue-router";
import MoviesHome from "../components/MoviesHome.vue";
import MoviesFullList from "../components/MoviesFullList.vue";
import MovieDetail from "../components/MovieDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "movies-home",
    component: MoviesHome
  },
  {
    path: "/movie-listing",
    name: "movies-full-list",
    component: MoviesFullList
  },
  {
    path: "/movie-detail",
    name: "movie-detail",
    component: MovieDetail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
