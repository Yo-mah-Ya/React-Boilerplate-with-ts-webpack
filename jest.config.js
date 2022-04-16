/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    preset: "ts-jest",
    // transform: {
    //     "^.+\\.tsx?$": "babel-jest",
    //     "^.+\\.jsx?$": "babel-jest",
    // },
    testRegex: "test.ts$",
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/dist/",
        "<rootDir>/.vscode/",
        "<rootDir>/ci/",
        "<rootDir>/coverage/",
        "<rootDir>/public/",
    ],
    moduleFileExtensions: [
        "js",
        "mjs",
        "cjs",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node",
    ],
    moduleNameMapper: {
        "^.+\\.scss$": "identity-obj-proxy",
    },
    moduleDirectories: ["node_modules", "src"],
    verbose: true,
};
