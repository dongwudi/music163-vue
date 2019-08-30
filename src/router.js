import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      redirect: "/remd",
      children: [
        {
          path: "remd",
          name: "remd",
          component: () =>
            import(/* webpackChunkName: "remd" */ "./views/Homeremd.vue")
        },
        {
          path: "hot",
          name: "hot",
          component: () =>
            import(/* webpackChunkName: "hot" */ "./views/HomeHot.vue")
        },
        {
          path: "search",
          name: "search",
          component: () =>
            import(/* webpackChunkName: "search" */ "./views/HomeSearch.vue")
        }
      ]
    },
    {
      path: "/playlist",
      name: "playlist",
      component: () =>
        import(/* webpackChunkName: "playlist" */ "./views/Playlist.vue")
    },
    {
      path: "/song",
      name: "song",
      component: () => import(/* webpackChunkName: "song" */ "./views/Song.vue")
    },
    {
      path: "/artist",
      name: "artist",
      component: () =>
        import(/* webpackChunkName: "artist" */ "./views/Artist.vue")
    }
  ]
});

export default router;
