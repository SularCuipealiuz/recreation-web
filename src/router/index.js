import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Home from "../views/Home.vue";
import Header from "@/views/Header";
import Footer from "@/views/Footer";
import MemberCenter from "@/views/MemberCenter";
import McHeader from "@/views/McHeader";
import PasswordManage from "@/views/PasswordManage";
import SignUp from "@/views/SignUp";
import Login from "@/views/Login";
import Promo from "@/views/Promo";

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
    path: "/",
    name: "Promo",
    components: {
      head: Header,
      body: Promo,
      foot: Footer
    }
  },
  {
    path: "/SignIn",
    name: "SignIn",
    components: {
      body: Login
    }
  },
  {
    path: "/SignUp",
    name: "SignUp",
    components: {
      body: SignUp
    }
  },
  {
    path: "/MemberCenter",
    name: "MemberCenter",
    meta: {
      requireAuth: true
    },
    components: {
      body: MemberCenter,
      foot: Footer
    }
  },
  {
    path: "/PasswordManage",
    name: "PasswordManage",
    meta: {
      requireAuth: true
    },
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

router.beforeEach(function(to, from, next) {
  if (to.matched.some(res => res.meta.requireAuth)) {
    if (store.getters.getIsLogin !== true) {
      router.push({
        path: "/SignIn",
        query: { redirect: to.fullPath, goBack: from.fullPath }
      });
    } else {
      next();
    }

    // Redirect
  } else {
    next();
  }
});

export default router;
