/* globals require, __dirname, module */
var path = require("path"),
    webpack = require("webpack"),
    //ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "src"),
    devtool: "inline-source-map",
    entry: {
        app: ["./index.jsx"],
        vendor: ["core-js", "under-react"],
    },
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", "*"],
        modules: ["node_modules"],
    },
    module: {
        rules: [
            { test: /\.(html|txt)$/, use: "raw-loader" },
            {
                test: /\.(png|jpe?g|svg|gif|eot|ttf|woff|woff2)$/,
                use: ["file-loader?name=[path][name].[ext]&emitFile=true"],
            },
            {
                exclude: [/node_modules/],
                loader: "ts-loader",
                options: {
                    entryFileIsJs: true,
                },
                test: /\.([t|j]sx?)$/,
            },
        ],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public"),
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true,
            chunksSortMode: "dependency",
        }),
    ],
};
