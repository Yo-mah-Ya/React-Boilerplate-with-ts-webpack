const paths = require("./paths");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getStyleLoadersWith =
    (isEnvDevelopment) => (cssOptions, preProcessor) => {
        const loaders = [
            isEnvDevelopment && "style-loader",
            !isEnvDevelopment && {
                loader: MiniCssExtractPlugin.loader,
                // css is located in `static/css`, use '../../' to locate index.html folder
                // in production `paths.publicUrlOrPath` can be a relative path
                // options: paths.publicUrlOrPath.startsWith(".")
                //     ? { publicPath: "../../" }
                //     : {},
            },
            {
                loader: "css-loader",
                options: cssOptions,
            },
            {
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebook/create-react-app/issues/2677
                        ident: "postcss",
                        config: false,
                        plugins: [
                            "postcss-flexbugs-fixes",
                            [
                                "postcss-preset-env",
                                {
                                    autoprefixer: {
                                        flexbox: "no-2009",
                                    },
                                    stage: 3,
                                },
                            ],
                            // Adds PostCSS Normalize as the reset css with default options,
                            // so that it honors browserslist config in package.json
                            // which in turn let's users customize the target behavior as per their needs.
                            "postcss-normalize",
                        ],
                    },
                    sourceMap: isEnvDevelopment,
                },
            },
        ].filter(Boolean);
        if (preProcessor) {
            loaders.push(
                {
                    loader: "resolve-url-loader",
                    options: {
                        sourceMap: isEnvDevelopment,
                        root: paths.appSrc,
                    },
                },
                {
                    loader: preProcessor,
                    options: {
                        sourceMap: true,
                    },
                }
            );
        }
        return loaders;
    };

/**
 *
 * @param { { isEnvDevelopment: boolean, imageInlineSizeLimit: number } } envConfig
 * @param {*} getStyleLoaders
 * @returns @type import('webpack').ModuleOptions
 */
const webpackModuleConfig = (
    { isEnvDevelopment, imageInlineSizeLimit },
    getStyleLoaders
) =>
    /**
     * @type import('webpack').ModuleOptions
     */
    ({
        strictExportPresence: true,
        rules: [
            // TODO: Merge this config once `image/avif` is in the mime-db
            // https://github.com/jshttp/mime-db
            {
                test: [/\.avif$/],
                type: "asset",
                mimetype: "image/avif",
                parser: {
                    dataUrlCondition: {
                        maxSize: imageInlineSizeLimit,
                    },
                },
            },
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: imageInlineSizeLimit,
                    },
                },
            },
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject <style> tags.
            // In production, we use MiniCSSExtractPlugin to extract that CSS
            // to a file, but in development "style" loader enables hot editing
            // of CSS.
            // By default we support CSS Modules with the extension .module.css
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: getStyleLoaders({
                    importLoaders: 1,
                    sourceMap: isEnvDevelopment,
                    modules: {
                        mode: "icss",
                    },
                }),
                // Don't consider CSS imports dead code even if the
                // containing package claims to have no side effects.
                // Remove this when webpack adds a warning or an error for this.
                // See https://github.com/webpack/webpack/issues/6571
                sideEffects: true,
            },
            // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
            // using the extension .module.css
            {
                test: /\.module\.css$/,
                use: getStyleLoaders({
                    importLoaders: 1,
                    sourceMap: isEnvDevelopment,
                    modules: {
                        mode: "local",
                        // getLocalIdent: getCSSModuleLocalIdent,
                    },
                }),
            },
            // Opt-in support for SASS (using .scss or .sass extensions).
            // By default we support SASS Modules with the
            // extensions .module.scss or .module.sass
            {
                test: /\.(scss|sass)$/,
                exclude: /\.module\.(scss|sass)$/,
                use: getStyleLoaders(
                    {
                        importLoaders: 3,
                        sourceMap: isEnvDevelopment,
                        modules: {
                            mode: "icss",
                        },
                    },
                    "sass-loader"
                ),
                // Don't consider CSS imports dead code even if the
                // containing package claims to have no side effects.
                // Remove this when webpack adds a warning or an error for this.
                // See https://github.com/webpack/webpack/issues/6571
                sideEffects: true,
            },
            // Adds support for CSS Modules, but using SASS
            // using the extension .module.scss or .module.sass
            {
                test: /\.module\.(scss|sass)$/,
                use: getStyleLoaders(
                    {
                        importLoaders: 3,
                        sourceMap: isEnvDevelopment,
                        modules: {
                            mode: "local",
                            // getLocalIdent: getCSSModuleLocalIdent,
                        },
                    },
                    "sass-loader"
                ),
            },
            // {
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: "babel-loader",
            //             options: {
            //                 presets: [
            //                     // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
            //                     "@babel/preset-env",
            //                     [
            //                         "@babel/preset-react",
            //                         { runtime: "automatic" },
            //                     ],
            //                 ],
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
        ],
    });

/**
 *
 * @param { { isEnvDevelopment: boolean, IMAGE_INLINE_SIZE_LIMIT: string | undefined } } envConfig
 * @returns import('webpack').ModuleOptions
 */
const webpackModuleConfigWith = (envConfig) => {
    const getStyleLoaders = getStyleLoadersWith(envConfig.isEnvDevelopment);

    return webpackModuleConfig(
        {
            ...envConfig,
            imageInlineSizeLimit: parseInt(
                envConfig?.IMAGE_INLINE_SIZE_LIMIT || "10000"
            ),
        },
        getStyleLoaders
    );
};
module.exports = { webpackModuleConfigWith };
