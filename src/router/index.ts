// Composables
import { createRouter, createWebHistory } from 'vue-router'


const routerOptions = [
  { path: "/", component: "Dashboard" },
  { path: "/dashboard", component: "Dashboard" },
  { path: "/templateeditor", component: "TemplateEditor" },
  { path: "/templates", component: "Templates" },
  { path: "/archive", component: "Archive" },
  { path: "/notification", component: "Notification" },
];

const DashesOptions = [
  { path: '/dash', component: () => import(`../components/Dashes/Dash.vue`)}
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`../components/${route.component}.vue`)
  };
});

routes.push(
  DashesOptions.map(route => {
    return {
      ...route,
    };
  })[0]
)


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
