// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routerOptions = [
  { path: "/", component: "Dashboard" },
  { path: "/dashboard", component: "Dashboard" },
  { path: "/templateeditor", component: "TemplateEditor" },
  { path: "/templates", component: "Templates" },
  { path: "/archive", component: "Archive", meta: { requiresAuth: true } },
  { path: "/settings", component: "Settings", meta: { requiresAuth: true } },
];

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`../components/${route.component}.vue`)
  };
});

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
