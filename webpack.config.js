const path = require('path');

var out;
const cwd = process.cwd();

if (process.env.NODE_ENV == 'production')
    out = path.resolve(cwd, 'dist');
else
    out = path.resolve(cwd, 'out');

module.exports = {
    output: {
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

    node: {
        // in your own webpack.config.js, you might want to change this to false
        // to reduce the webpack size. however, duktape's Buffer polyfill is
        // incomplete.
        Buffer: true,
    },

    resolve: {
        alias: {
            dgram: path.resolve(__dirname, 'polyfill/dgram'),
            os: path.resolve(__dirname, 'polyfill/os'),
        }
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
