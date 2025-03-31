import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductView from "@/views/ProductView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
      redirect: "/about/company",
      children: [
        {
          path: "company",
          name: "about-company",
          component: () => import("@/views/about/CompanyView.vue")
        },
        {
          path: "team",
          name: "about-team",
          component: () => import("@/views/about/TeamView.vue")
        },
        {
          path: "certificates",
          name: "about-certificates",
          component: () => import("@/views/about/CertificatesView.vue")
        }
      ]
    },
    {
      path: "/design",
      name: "design",
      component: () => import("@/views/DesignView.vue"),
    },
    {
      path: "/product",
      name: "product",
      component: ProductView,
    },
    {
      path: "/equipment",
      name: "equipment",
      component: () => import("@/views/EquipmentView.vue"),
      redirect: "/equipment/show",
      children: [
        {
          path: "show",
          name: "equipment-show",
          component: () => import("@/views/EquipmentShowView.vue"),
        },
        {
          path: "list",
          name: "equipment-list",
          component: () => import("@/views/EquipmentListView.vue"),
        }
      ]
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/ContactView.vue"),
    },
  ],
});

export default router;
