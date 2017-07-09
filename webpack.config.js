/* globals require, __dirname, module */
var path = require("path"),
    webpack = require("webpack");

module.exports = {
    context: path.resolve(__dirname),
    devtool: "inline-source-map",
    entry: {
        "under-react": ["./index.js"],
        "under-react.min": ["./index.js"],
    },
    externals: ["corejs"],
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", "*"],
        modules: ["node_modules"],
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    entryFileIsJs: true,
                },
                test: /\.([t|j]sx?)$/,
            },
        ],
    },
    output: {
        filename: "[name].js",
        library: "under-react",
        libraryTarget: "umd",
        umdNamedDefine: true,
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourcemap: true,
            include: /\.min\.js$/,
        }),
    ],
};
