export default {
    path: '/mine',
    component: () => import('@/views/Mine'),

    children: [
        {
            path: 'center',
            component: () => import('@/views/Mine/center'),
        },
        {
            path: 'login',
            component: () => import('@/components/Login'),
        },
        {
            path: 'register',
            component: () => import('@/components/Register'),
        },
        {
            path: 'findPassword',
            component: () => import('@/components/FindPassword'),
        },

        // //重定向
        {
            path: '/mine',
            redirect: 'center',
        },

    ]
}