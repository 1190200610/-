module.exports = {
    // pabulicPath:process.env.NODE_ENV === 'production' ? '' : '',
    devServer: {
        host: '0.0.0.0',
        port: '10005',
        // https:false,
        open: true,
        disableHostCheck: true,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: { //配置跨域
            '/api': {
                target: 'http://localhost:10000/',
                ws: true,
                changeOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''   //请求的时候使用这个api就可以
                }
            }
        }
    }
}