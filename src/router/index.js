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
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },

    {
        path: '/test',
        name: 'Test',
        component: () => import('../views/Test.vue')
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

    {
        path: '/trans/:info',
        name: 'trans',
        component: () => import('../components/Trans.vue'),
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
