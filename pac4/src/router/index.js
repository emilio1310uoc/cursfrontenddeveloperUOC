import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/TheHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokedex/:npk,:dl',
      name: 'pokedex',
      component: () => import('../views/ThePokemons.vue'),
      props: true
    },
    {
      path: '/detall/:elpokemon',
      name: 'detall',
      component: () => import('../views/ThePokeCardDetall.vue'),
      props: true
    },
    {
      path: '/game/:npk,:dl',
      name: 'game',
      component: () => import('../views/TheCardsGame.vue'),
      props: true
    }
  ],
  duplicateNavigationPolicy: 'reload' // other options: 'ignore' and 'reject'
})

export default router
