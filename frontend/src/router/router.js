import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Analyse from '../components/Analyse.vue'

const routerpaths = [
  {path:'/home', component:Home},
  {path:'/analyse',component:Analyse},
  {path:'/login',component:Login}
]

const router = createRouter({
  history: createWebHistory(),
  routes:routerpaths
})

export default router