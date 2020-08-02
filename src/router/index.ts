import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "@/views/Login/Login.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Testing from "@/components/Testing.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/testing",
    name: "testing",
    component: Testing
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
