const path = require('path');
const webpack = require('webpack');
const webpackdevserver = require('webpack-dev-server');
const HTMLwebpack = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**@type {import('webpack').Configuration}*/


function selectpath() {

}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
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
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    devServer: {
        open: true,
        // hot: true,
        port: 9000,
    },
    plugins: [
        new HTMLwebpack({
            template: "./index.html",
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [{
                test: /.+\.css$/,
                use: ['style-loader', 'css-loader']
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
            }
        ]
    }

}