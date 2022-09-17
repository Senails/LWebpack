const path = require('path');
const webpack = require('webpack');

/**@type {import('webpack').Configuration}*/




module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js",
        analitics: "./src/analitics.js",
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
    }

}