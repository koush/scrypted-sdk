const path = require('path');
const fs = require('fs');
const InjectPlugin = require('webpack-inject-plugin').default;
const webpack = require('webpack');

var out;
const cwd = process.cwd();

if (process.env.NODE_ENV == 'production') {
    out = path.resolve(cwd, 'dist');
}
else {
    out = path.resolve(cwd, 'out');
}

const isProduction = process.env.NODE_ENV == 'production';

module.exports = {
    mode: process.env.NODE_ENV || 'development',
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
                test: /\.(ts|js)x?$/,
                // unsure if this is correct... need to transpile node modules at times.
                // exclude: /(node_modules|bower_components)/,
                exclude: /(core-js)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "plugins": [
                            path.resolve(__dirname, "./transform/generator"),
                            "@babel/plugin-transform-typescript",
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-transform-modules-commonjs",
                            [
                                "@babel/plugin-transform-arrow-functions",
                                {
                                    spec: true,
                                },
                            ],
                        ],
                        "presets": [
                            [
                                "@babel/preset-env",
                                {
                                    "useBuiltIns": "usage",
                                    "corejs": "2",
                                    "exclude": ["transform-regenerator"],
                                },
                                "@babel/typescript",
                            ],
                        ]
                    }
                }
            },

            // {
            //     test: /\.tsx?$/,
            //     loader: 'ts-loader',
            //     exclude: /node_modules/,
            //     options: {
            //         configFile : path.join(__dirname, 'tsconfig.json'),
            //     },
            
            // }

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
            ByteBuffer: "bytebuffer",
            Long: "long",

            // browser provide plugin polyfills
            _websocket: path.resolve(__dirname, 'polyfill/websocket.js'),

            // node polyfills
            dgram: path.resolve(__dirname, 'polyfill/duktape/dgram'),
            cluster: path.resolve(__dirname, 'polyfill/cluster'),
            os: path.resolve(__dirname, 'polyfill/duktape/os'),
            net: path.resolve(__dirname, 'polyfill/duktape/net'),
            tls: path.resolve(__dirname, 'polyfill/duktape/tls'),
            fs: path.resolve(__dirname, 'polyfill/duktape/fs'),
            mdns: path.resolve(__dirname, 'polyfill/mdns'),
            buffer: path.resolve(__dirname, 'polyfill/duktape/buffer'),
            buffertools: path.resolve(__dirname, 'node_modules/browserify-buffertools'),
            'safe-buffer': path.resolve(__dirname, 'polyfill/duktape/safe-buffer'),

            'duktape-yield': path.resolve(__dirname, 'transform/duktape-yield'),
        },

        extensions: ['.tsx', '.ts', '.js']
    },

    stats: {
        colors: true
    },

    plugins: [
        new InjectPlugin(function () {
            return ''
            + fs.readFileSync(path.resolve(__dirname, 'inject/duktape/buffer.js'))
            + fs.readFileSync(path.resolve(__dirname, 'inject/duktape/xmlhttprequest.js'))
            + fs.readFileSync(path.resolve(__dirname, 'inject/duktape/inject.js'))
            ;
        }),
        new webpack.DefinePlugin({
            'process.env.SSDP_COV': false,
        }),
        new webpack.ProvidePlugin({
            WebSocket: '_websocket'
        }),
    ],

    optimization: {
        // can not minimize since duktape only does line based breakpoints
        // so only minimize in production.
        // UPDATE: this may not be true. unable to determine cause. could be
        // some textarea copy paste behavior that occurred while I was testing.
        // minimize: false,
        minimize: isProduction,
    },

    // don't bother doing source maps in production:
    // compressed code is on one line which can't be debugged by duktape anyways.
    // see optimization comment above.
    // this also reduces the package size.
    devtool: isProduction ? 'none' : 'source-map',
};
