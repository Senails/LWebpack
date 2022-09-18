const path = require('path');
const HTMLwebpack = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Terserwebpackplugin = require('terser-webpack-plugin');


/**@type {import('webpack').Configuration}*/


const isDev = process.env.NODE_ENV === "development";
const isprod = isDev ? false : true;


function optimization() {
    let config = {
        splitChunks: {
            chunks: "all",
        },
    }

    if (isprod) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new Terserwebpackplugin()
        ]
    }
    return config
}




console.log(isDev ? "development" : "production");
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: isDev ? "development" : "production",
    entry: {
        main: "./index.js",
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
    },
    resolve: {
        extensions: [".js", ".json"],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),

        }
    },
    optimization: optimization(),
    devServer: {
        open: true,
        hot: isDev,
        port: 9000,
    },
    plugins: [
        new HTMLwebpack({
            template: "./index.html",
            minify: {
                collapseWhitespace: isprod,
            }
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: './favicon.ico', to: './' },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [{
                test: /.+\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /.+\.(scss|sass)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /.+\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
        ]
    }

}