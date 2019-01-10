const path = require('path');
const fs = require('fs');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

var out;
if (process.env.NODE_ENV == 'production')
    out = path.resolve(__dirname, 'dist');
else
    out = path.resolve(__dirname, 'out');

module.exports = {
    output: {
        path: out,
        filename: 'main.js',
        devtoolModuleFilenameTemplate: function (info) {
            return path.relative(out, info.absoluteResourcePath);
        },

        // export everything to a var "window" which will be an alias for "exports" in Scrypted
        libraryTarget: "window",
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            [
                                "@babel/preset-env",
                                {
                                    "useBuiltIns": "usage",
                                },
                            ],
                        ]
                    }
                }
            },

            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }

        ]
    },

    stats: {
        colors: true
    },

    optimization: {
        // can not minimize since duktape only does line based breakpoints
        // so only minimize in production.
        minimize: process.env.NODE_ENV == 'production',
    },

    devtool: 'source-map'
};
