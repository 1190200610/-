import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routes = [

    // {
    //     path: '/',
    //     name: 'Login',
    //     component: () => import('../views/Login'),
    // },
    {
        path: '/',
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
        component: () => import('../components/Index.vue')
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

    {
        path: '/scene',
        name: 'scene',
        component: () => import('../components/Scene.vue')
    },
    {
        path: '/InDBML',
        name: 'InDBML',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/InDBMLUse',
        name: 'InDBMLUse',
        component: () => import('../components/InDbML.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
