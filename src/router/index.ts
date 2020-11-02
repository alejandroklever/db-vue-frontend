import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Login from '@/views/login/Login.vue'
import SignUp from '@/views/login/SignUp.vue'
import Dashboard from '@/views/Dashboard.vue'
import ListArticlesView from '@/views/ListArticlesView.vue'
import CreateArticleView from '@/views/CreateArticleView.vue'
import UserConfigurationView from '@/views/UserConfigurationView.vue'
import ArticlesToReviewView from '@/views/ArticlesToReviewView.vue'

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
    {
        path: '/articles/:authorId',
        name: 'list-articles',
        component: ListArticlesView,
    },
    {
        path: '/article/create',
        name: 'create-article',
        component: CreateArticleView,
    },
    {
        path: '/article/reviews/:refereeId',
        name: 'list-reviews',
        component: ArticlesToReviewView,
    },
    {
        path: '/user/configuration',
        name: 'user-configuration',
        component: UserConfigurationView,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
