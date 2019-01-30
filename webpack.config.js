const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
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
        // "core-js/modules/es6.typed.uint8-array": "Uint8Array",
    },

    node: {
        // in your own webpack.config.js, you might want to change this to false
        // to reduce the webpack size. however, duktape's Buffer polyfill is
        // incomplete.
        Buffer: false,
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

    plugins: [
        new InjectPlugin(function() {
            return fs.readFileSync(path.resolve(__dirname, 'inject/buffer.js'));
        }),
    ],

    optimization: {
        // can not minimize since duktape only does line based breakpoints
        // so only minimize in production.
        minimize: false,
        // minimize: process.env.NODE_ENV == 'production',
        // minimizer: [
        //     new TerserPlugin({
        //         test: /\.js(\?.*)?$/i,
        //         sourceMap: true,
        //         terserOptions: {
        //             // something under compress is causing duktape to choke.
        //             compress: false,
        //         }
        //     }),
        // ],
    },

    devtool: 'source-map'
};
