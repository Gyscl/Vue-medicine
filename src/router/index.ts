import { createRouter, createWebHistory } from "vue-router";
import { ElMessage } from "element-plus";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import Layout from "../views/layout.vue";
import Home from "../views/home.vue";
import Detail from "../views/detail.vue";
import myOwnVue from "@/views/myOwn.vue";
import cartListVue from "@/views/cartList.vue";
import orderListVue from "@/views/orderList.vue";
import backEnd from "@/views/backend.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //路由器的工作模式
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/",
      name: "layout",
      component: Layout,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
        {
          path: "detail/:id",
          name: "detail",
          component: Detail,
        },
        {
          path: "myOwn",
          name: "myOwn",
          component: myOwnVue,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "orderList",
          name: "orderList",
          component: orderListVue,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "cartList",
          name: "cartList",
          component: cartListVue,
          meta: {
            requireAuth: true,
          },
        },
      ],
    },
    {
      path: "/dashboard",
      name: "backend",
      component: backEnd,
      children: [],
    },
  ],
});
//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.isAuth === "true") {
      next();
    } else {
      ElMessage({
        message: "请先登录！",
        type: "warning",
      });
    }
  } else {
    next();
  }
});

export default router;
