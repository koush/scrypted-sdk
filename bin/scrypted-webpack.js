#! /usr/bin/env node
const path = require('path');
const process = require('process');
const fs = require('fs');
const spawn = require('child_process').spawn;
const cwd = process.cwd();
const AdmZip = require('adm-zip');

var entry;
for (var search of ['src/main.js', 'src/main.ts']) {
    var resolved = path.resolve(cwd, search);
    if (fs.existsSync(resolved)) {
        entry = resolved;
        break;
    }
}

var webpackConfig;
var customWebpackConfig = path.resolve(cwd, 'webpack.config.js');
if (fs.existsSync(customWebpackConfig)) {
    webpackConfig = customWebpackConfig;
}
else {
    webpackConfig = path.resolve(__dirname, '..', 'webpack.config.js');
}

var out;
if (process.env.NODE_ENV == 'production')
    out = path.resolve(cwd, 'dist');
else
    out = path.resolve(cwd, 'out');

if (!entry) {
    console.error('unable to locate src/main.js or src/main.ts');
    return 1;
}

// Notice how your arguments are in an array of strings
var child = spawn(path.resolve(cwd, 'node_modules/.bin/webpack-cli'), [
    // "--json",
    '--config',
    webpackConfig,
    '--output-path',
    out,
    '--output-filename',
    'main.js',
    '--entry',
    "main=" + entry,
]);

child.stdout.on('data', function (data) {
    process.stdout.write(data);
});

child.stderr.on('data', function (data) {
    process.stdout.write(data);
});

child.on('exit', function (data) {
    if (data)
        throw new Error('webpack failed: ' + data);

    // create a zip that has a main.js in the root, and an fs folder containing a read only virtual file system.
    // todo: read write file system? seems like a potential sandbox and backup nightmare to do a real fs. scripts should
    // use localStorage, etc?
    var zip = new AdmZip();
    zip.addLocalFile(path.join(out, 'main.js'));
    var zipfs = path.join(cwd, 'fs');
    if (fs.existsSync(zipfs))
        zip.addLocalFolder(zipfs, 'fs');
    zip.writeZip(path.join(out, 'plugin.zip'));
});
