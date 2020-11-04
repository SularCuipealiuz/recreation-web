import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Header from "@/views/Header";
import Footer from "@/views/Footer";
import MemberCenter from "@/views/MemberCenter";
import McHeader from "@/views/McHeader";
import PasswordManage from "@/views/PasswordManage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      head: Header,
      body: Home,
      foot: Footer
    }
  },
  {
    path: "/MemberCenter",
    name: "MemberCenter",
    components: {
      body: MemberCenter,
      foot: Footer
    }
  },
  {
    path: "/PasswordManage",
    name: "PasswordManage",
    components: {
      head: McHeader,
      body: PasswordManage,
      foot: Footer
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
