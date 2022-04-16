const path = require("path");
const paths = require("./webpack/paths");
const { webpackModuleConfigWith } = require("./webpack/module");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { common, environments } = require("./webpack.common");
const { merge } = require("webpack-merge");

/**
 * @type import('webpack').Configuration
 */
module.exports = merge(common, {
    // Stop compilation early in production
    bail: false,
    devServer: {
        static: {
            directory: paths.appPublic,
        },
        compress: true,
        port: 3000,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        },
        historyApiFallback: true,
        hot: true,
    },
    devtool: "cheap-module-source-map",
    mode: "development",
    module: webpackModuleConfigWith({
        ...environments,
        isEnvDevelopment: true,
    }),
    optimization: {
        minimize: false,
        minimizer: [
            `...`,
            new CssMinimizerPlugin({
                parallel: true,
            }),
        ],
    },
    output: {
        // The build folder.
        path: paths.appBuild,
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        // There will be one main bundle, and one file per asynchronous chunk.
        // In development, it does not produce real files.
        filename: "static/js/bundle.js",
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[name].[hash][ext]",
        // webpack uses `publicPath` to determine where the app is being served from.
        // It requires a trailing slash, or the file assets will get an incorrect path.
        // We inferred the "public path" (such as / or /my-project) from homepage.
        publicPath: paths.publicUrlOrPath,
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: (info) =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
        }),
    ],
});
