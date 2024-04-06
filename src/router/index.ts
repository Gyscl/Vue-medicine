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
        {
          path: "searchList",
          name: "searchList",
          component: () => import("@/views/searchList.vue"),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "messageBoard",
          name: "messageBoard",
          component: () => import("@/views/messageBoard.vue"),
          meta: {
            requireAuth: true,
          },
        },
      ],
    },
    {
      path: "/backend",
      name: "backend",
      component: backEnd,
      redirect: "/dashboard",
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          meta: {
            title: "系统首页",
            permiss: "1",
          },
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ "../views/dashboard.vue"
            ),
        },
        {
          path: "/medcineManage",
          name: "medcineManage",
          meta: {
            title: "药品管理",
            permiss: "2",
          },
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ "../views/medcineManage.vue"
            ),
        },
        {
          path: "/inventoryManage",
          name: "inventoryManage",
          meta: {
            title: "库存管理",
            permiss: "3",
          },
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ "../views/inventoryManage.vue"
            ),
        },
        {
          path: "/orderManage",
          name: "orderManage",
          meta: {
            title: "订单管理",
            permiss: "4",
          },
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ "../views/orderManage.vue"
            ),
        },
        {
          path: "/userManage",
          name: "userManage",
          meta: {
            title: "用户管理",
            permiss: "5",
          },
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ "../views/userManage.vue"
            ),
        },
      ],
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
