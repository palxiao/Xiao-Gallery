export default [
    {
        path: '/',
        name: 'main',
        redirect: '/',
        component: () => import('@/views/Ready.vue'),
        children: [{
            path: '/:albumId?/:bucket?',
            component: () => import(/* webpackChunkName: 'base' */ '@/views/Index.vue')
        }]
    }
]
