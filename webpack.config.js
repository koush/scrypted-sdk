const path = require('path');
const fs = require('fs');
const InjectPlugin = require('webpack-inject-plugin').default;

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
                // unsure if this is correct... need to transpile node modules at times.
                // exclude: /(node_modules|bower_components)/,
                exclude: /(core-js)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "plugins": ["@babel/plugin-transform-modules-commonjs"],
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

    externals: {
        "core-js/modules/es6.typed.uint8-array": "Uint8Array",
    },

    node: {
        // the duktape buffer polyfill is somewhat incomplete and does not
        // support encodings.
        // you may want to change this to true, but this will increase the
        // webpack size, and net code may no longer unless the polyfill buffer
        // is converted back to a Duktape buffer.
        Buffer: false,
        __dirname: true,
    },

    resolve: {
        alias: {
            dgram: path.resolve(__dirname, 'polyfill/dgram'),
            os: path.resolve(__dirname, 'polyfill/os'),
            net: path.resolve(__dirname, 'polyfill/net'),
            tls: path.resolve(__dirname, 'polyfill/tls'),
            fs: path.resolve(__dirname, 'polyfill/fs'),
            mdns: path.resolve(__dirname, 'polyfill/mdns'),
            'safe-buffer': path.resolve(__dirname, 'polyfill/safe-buffer'),
        }
    },

    stats: {
        colors: true
    },

    plugins: [
        new InjectPlugin(function() {
            return fs.readFileSync(path.resolve(__dirname, 'inject/buffer.js'));
        }),
    ],

    optimization: {
        // can not minimize since duktape only does line based breakpoints
        // so only minimize in production.
        // UPDATE: this may not be true. unable to determine cause. could be
        // some textarea copy paste behavior that occurred while I was testing.
        // minimize: false,
        minimize: process.env.NODE_ENV == 'production',
    },

    devtool: 'source-map'
};
