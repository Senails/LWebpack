const path = require('path');
const webpack = require('webpack');
const HTMLwebpack = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**@type {import('webpack').Configuration}*/




module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: {
        main: "./index.js",
        analitics: "./analitics.js",
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
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
                test: /.+\.(png|svg|gif|jpg)$/,
                use: ['file-loader']
            }
        ]
    }

}