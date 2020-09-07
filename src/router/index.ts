import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Login from '@/views/login/Login.vue'
import SignUp from '@/views/login/SignUp.vue'
import Dashboard from '@/views/Dashboard.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: SignUp,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
