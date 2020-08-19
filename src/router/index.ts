import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Login from '@/views/login/Login.vue'
import SignUp from '@/views/login/SignUp.vue'
import Dashboard from '@/views/Dashboard.vue'

import HelloWorld from '@/components/HelloWorld.vue'
import Testing from '@/components/Testing.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'hello_world',
        component: HelloWorld,
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
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/testing',
        name: 'testing',
        component: Testing,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
