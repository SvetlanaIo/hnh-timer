import PageTimers from "@/pages/timers/index.vue";
import NProgress from "nprogress";
import Vue from "vue";
import Router, { RouterOptions } from "vue-router";

Vue.use(Router);

const options: RouterOptions = {
  mode: "history",
  // linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "PageTimers",
      component: PageTimers,
      meta: {
        title: "Timers",
      },
    },
  ],
};

const router = new Router(options);

router.beforeResolve((to, _from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
