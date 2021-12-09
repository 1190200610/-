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
        path: '/upload',
        name: 'upload',
        component: () => import('../components/Upload.vue'),
    },

    {
        path: '/index',
        name: 'index',
        component: () => import('../components/Index'),
    },

    {
        path: '/collection',
        name: 'collection',
        component: () => import('../components/Collection.vue'),
    },

    {
        path: '/train',
        name: 'train',
        component: () => import('../components/Train.vue'),
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
