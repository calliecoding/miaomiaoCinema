module.exports = {
    //必须有devServer
    devServer: {
        proxy: {
            '/ajax': {   //  /ajax开头的所有求，全部转到 'http://m.maoyan.com'
                target: 'https://m.maoyan.com/',  //请求地址
                ws: true,
                changeOrigin: true
            },
        }
    }
}