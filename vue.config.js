const {defineConfig} = require('@vue/cli-service')
const webpack = require("webpack");
module.exports = defineConfig({
    transpileDependencies: ['vuetify'], configureWebpack: {
        plugins: [
            // Work around for Buffer is undefined:
            // https://github.com/webpack/changelog-v5/issues/10
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ],
        resolve: {
            fallback: {
                "crypto": require.resolve("crypto-browserify"),
                "stream": require.resolve("stream-browserify"),
                "path": require.resolve("path-browserify"),
                "zlib": require.resolve("browserify-zlib"),
                "buffer": require.resolve("buffer")
            }
        }
    }
})
