module.exports = {
    publicPath: process.env.NODE_ENV !== 'production' ? './' : '../server/public',
    css: {
        extract: process.env.NODE_ENV !== 'production' ? undefined : {
            filename: '[name].css',
            chunkFilename: '[id].css'
        },
        sourceMap: true
    },
    configureWebpack: {
        devtool: 'source-map',
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000
            }
        },
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: process.env.NODE_ENV === 'production'
                    ? 'https://cocktails-collections-sml.herokuapp.com/'
                    : 'http://localhost:3000'
            }
        }
    },
    productionSourceMap: false,
    transpileDependencies: [
        'element-plus'
    ]
}
