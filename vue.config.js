module.exports = {
    publicPath:'/miaomiaocinema',
    //必须有devServer
    devServer: {
        proxy: {
            '/api' : {
                target : 'http://localhost:3000', //api开头的所有求，全部转到 'http://localhost:3000'
                ws: true,
                changeOrigin : true
            },
            '/ajax' : {
                target : 'https://m.maoyan.com', 
                ws: true,
                changeOrigin : true
            },
        }
    }
}