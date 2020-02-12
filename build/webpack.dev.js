const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base');
const webpack = require('webpack');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function createNotifierCallback() {
    const notifier = require('node-notifier');

    return (severity, errors) => {
        if (severity !== 'error') return;

        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();
        console.log(error);

        notifier.notify({
            error,
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || ''
        });
    };
}

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        quiet: true,
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        port: 8080,
        hot: true,
        open: 'http://localhost:8080/',
        host: '0.0.0.0'
    },
    output: {
        filename: 'js/[name].[hash:5].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        })
    ]
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = devWebpackConfig.devServer.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [`Your application is running here: http://localhost:${port}`]
                    },
                    onErrors: createNotifierCallback()
                })
            );
            resolve(devWebpackConfig);
        }
    });
});
