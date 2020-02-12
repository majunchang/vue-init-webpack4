const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const os = require('os');
const baseWebpackConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const bundleReport = process.env.BUNDLEREPORT;

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        filename: 'js/[name].[hash:5].js',
        path: path.resolve(__dirname, '../dist')
    },
    // externals: ['vue', 'vue-router'],
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all', // initial、async和all
            minSize: 30000, // 形成一个新代码块最小的体积
            maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
            maxInitialRequests: 3, // 最大初始化请求数
            automaticNameDelimiter: '~', // 打包分割符
            name: true,
            cacheGroups: {
                vendor: {
                    // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
                    test: /node_modules\//,
                    name: '/vendor',
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HappyPack({
            //如何处理  用法和loader 的配置一样
            loaders: [
                {
                    loader: 'babel-loader?cacheDirectory=true'
                }
            ],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:5].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css/g, //注意不要写成 /\.css$/g
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }]
            },
            canPrint: true
        }),
        new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
            threshold: 10240
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: bundleReport ? 'server' : 'disabled',
            generateStatsFile: true,
            statsOptions: { source: false }
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../vendor/dll/manifest.json')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, '../vendor/dll/vendor.dll.js')
        })
    ]
});
