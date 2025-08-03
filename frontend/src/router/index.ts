import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  { path: '/', component: () => import('@/pages/DashboardPage.vue') },
  { path: '/categories', component: () => import('@/pages/CategoriesPage.vue') },
  { path: '/import', component: () => import('@/pages/ImportPage.vue') },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
