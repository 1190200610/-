import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routes = [

    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login'),
    },

    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },

    {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('../components/UserInfo.vue'),
    },

    {
        path: '/notes',
        name: 'notes',
        component: () => import('../components/TradeInfo'),
    },

    {
        path: '/transfer',
        name: 'transfer',
        component: () => import('../components/Transfer.vue'),
    },

    {
        path: '/charge',
        name: 'charge',
        component: () => import('../components/Charge.vue'),
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
