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
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

function cssloaders(extra) {
    let arr = [MiniCssExtractPlugin.loader, 'css-loader'];
    if (!extra) return arr;
    return [...arr, extra];
}

function babeloption(extra) {
    if (extra) return { presets: ['@babel/preset-env'] }
    return { presets: ['@babel/preset-env', extra] }
}




console.log(isDev ? "development" : "production");
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: isDev ? "development" : "production",
    entry: {
        main: "./index.jsx",
        analit: "./analitics.ts"
    },
    output: {
        filename: filename('.js'),
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
        // hot: isDev,
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
            filename: filename('.css'),
        }),
    ],
    module: {
        rules: [{
                test: /.+\.css$/,
                use: cssloaders(),
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
                use: cssloaders('sass-loader'),
            },
            {
                test: /.+\.less$/,
                use: cssloaders('less-loader'),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babeloption("@babel/preset-typescript")
                }
            },
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-typescript"],
                        plugins: []
                    }
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-react"],
                        plugins: ["@babel/plugin-syntax-jsx"]
                    }
                }
            },
        ]
    }

}