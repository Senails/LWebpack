const path = require('path');
const HTMLwebpack = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Terserwebpackplugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
const filename = (ext) => {


    return isDev ? `[name].${ext}` : `[name].[hash].${ext}`
};

function cssloaders(extra) {
    let arr = [MiniCssExtractPlugin.loader, 'css-loader'];
    if (!extra) return arr;
    return [...arr, extra];
}

function babeloption(extra) {
    if (extra) return { presets: ['@babel/preset-env'] }
    return { presets: ['@babel/preset-env', extra] }
}


function plugins() {
    let obj = [
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
            filename: "CSS/" + filename('.css'),
        }),
    ];

    if (isprod) obj.push(new BundleAnalyzerPlugin());



    return obj;
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
        filename: "JS/" + filename('js'),
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
    devtool: isDev ? "source-map" : undefined,
    devServer: {
        open: true,
        // hot: isDev,
        port: 9000,
    },
    plugins: plugins(),
    module: {
        rules: [{
                test: /.+\.css$/,
                use: cssloaders(),
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name].[ext]',
                },
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
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-typescript"],
                        plugins: ["@babel/plugin-syntax-jsx"]
                    }
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-react"],
                        plugins: ["@babel/plugin-syntax-jsx"]
                    }
                }]
            },
        ]
    }

}