const paths = require("./webpack/paths");
const webpack = require("webpack");

const assertGetEnvValueFrom = (key) => {
    if (typeof key !== "string")
        throw new Error(
            `Cannot get Environment Value. key: ${JSON.stringify(
                key
            )} is not string`
        );
    const value = process.env[key];
    if (value == undefined)
        throw new Error(
            `Cannot get Environment Value. value is undefined, key: ${key}`
        );
    return value;
};

const environments = ["CDN_ENDPOINT"].reduce((processEnv, envKey) => {
    processEnv[`process.env.${envKey}`] = JSON.stringify(
        assertGetEnvValueFrom(envKey)
    );
    return processEnv;
}, {});

/**
 * @type import('webpack').Configuration
 */
const common = {
    entry: paths.appIndexJs,
    infrastructureLogging: {
        level: "none",
    },
    plugins: [new webpack.DefinePlugin(environments)],
    resolve: {
        modules: ["node_modules"],
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json", "..."],
    },
    // Webpack noise constrained to errors and warnings
    stats: "errors-warnings",
    target: ["browserslist"],
};

module.exports = {
    common,
    environments,
};
