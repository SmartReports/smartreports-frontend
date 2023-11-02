// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routerOptions = [
  { path: "/", component: "Dashboard" },
  { path: "/Dashboard", component: "Dashboard" },
  { path: "/TemplateEditor", component: "TemplateEditor" },
  { path: "/Reports", component: "Reports" },
  { path: "/Archive", component: "Archive", meta: { requiresAuth: true } },
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
