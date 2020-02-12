const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['vue', 'vue-router']
    },
    output: {
        path: path.join(__dirname, '../vendor/dll'),
        filename: '[name].dll.js',
        library: '[name]_libary'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../vendor/dll/manifest.json'),
            name: '[name]_libary'
        })
    ]
};
