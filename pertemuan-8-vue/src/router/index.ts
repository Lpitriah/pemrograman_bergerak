import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CuacaPage from '../views/CuacaPage.vue';
import LuasPersegiPage from '../views/LuasPersegiPage.vue';
import CuacaBandungPage from '../views/CuacaBandungPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/luas-persegi',
    component: LuasPersegiPage
  },
  {
    path: '/cuaca',
    component: CuacaPage
  },
  {
    path: '/cuaca-bandung',
    component: CuacaBandungPage
  }


];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
