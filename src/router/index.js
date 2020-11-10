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
import PromoDetail from "@/views/PromoDetail";
import MessageCenter from "@/views/MessageCenter";

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
    path: "/promo/",
    name: "Promo",
    components: {
      head: McHeader,
      body: Promo,
      foot: Footer
    }
  },
  {
    path: "/promo/:id",
    components: {
      head: McHeader,
      body: PromoDetail
    }
  },
  {
    path: "/sign-in",
    name: "SignIn",
    components: {
      popModal: Login
    }
  },
  {
    path: "/sign-up",
    name: "SignUp",
    components: {
      popModal: SignUp
    }
  },
  {
    path: "/member-center",
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
    path: "/password-manage",
    name: "PasswordManage",
    meta: {
      requireAuth: true
    },
    components: {
      head: McHeader,
      body: PasswordManage
    }
  },
  {
    path: "/message-center",
    name: "MessageCenter",
    meta: {
      requireAuth: true
    },
    components: {
      head: McHeader,
      body: MessageCenter
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(function(to, from, next) {
  if (from.name === null && to.name !== "Home") {
    // router.push({
    //   path: "/"
    // });
    next("/");
  } else {
    if (to.matched.some(res => res.meta.requireAuth)) {
      // store.dispatch("checkLoginStatus").then(() => {
      //   if (store.getters.getIsLogin !== true) {
      //     router.push({
      //       path: "/sign-in",
      //       query: { redirect: to.fullPath, goBack: from.fullPath }
      //     });
      //   } else {
      //     next();
      //   }
      // });

      if (store.getters.getIsLogin !== true) {
        router.push({
          path: "/sign-in",
          query: { redirect: to.fullPath, goBack: from.fullPath }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;
