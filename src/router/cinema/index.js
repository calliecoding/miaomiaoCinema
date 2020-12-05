export default {
    path : '/cinema',
    component : () => import('@/views/Cinema'),
    children : [
      //等待二级路由
    ]
}