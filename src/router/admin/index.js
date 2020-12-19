export default {
    path : '/admin',
    component :() => import('@/views/Admin'),
    children:[
        {
            path : 'users',
            component :() => import('@/views/Admin/users'),
        },
        {
            path : 'movie',
            component :() => import('@/views/Admin/movie'),
        },
        {
            path : 'cinema',
            component :() => import('@/views/Admin/cinema'),
        },
        {
            //重定向
            path : '/admin',
            redirect:'users'
        }
    ]
}