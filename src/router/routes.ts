import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/QanopeeLayout.vue'),
    children: [{ path: '', component: () => import('pages/SearchPractitionerPage.vue') }],
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: () => import('pages/ConnexionPage.vue')
  },
  {
    path: '/debug',
    component: () => import('pages/DebugPage.vue')
  },
  {
    path: '/practitioner',
    component: () => import('pages/SearchPractitionerPage.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
