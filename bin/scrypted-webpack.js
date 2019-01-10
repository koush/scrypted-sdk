#! /usr/bin/env node
const path = require('path');
const process = require('process');
const fs = require('fs');
const spawn = require('child_process').spawn;

var entry;
for (var search of ['src/main.js', 'src/main.ts']) {
    var resolved = path.resolve(process.cwd(), search);
    if (fs.existsSync(resolved)) {
        entry = resolved;
        break;
    }
}

var out;
if (process.env.NODE_ENV == 'production')
    out = path.resolve(process.cwd(), 'dist');
else
    out = path.resolve(process.cwd(), 'out');

if (!entry) {
    console.error('unable to locate src/main.js or src/main.ts');
    return 1;
}

// Notice how your arguments are in an array of strings
var child = spawn(path.resolve(process.cwd(), 'node_modules/.bin/webpack-cli'), [
    '--config',
    path.resolve(__dirname, '..', 'webpack.config.js'),
    '--output-path',
    out,
    '--output-filename',
    'main.js',
    '--entry',
    entry,
]);

child.stdout.on('data', function (data) {
    process.stdout.write(data);
});

child.stderr.on('data', function (data) {
    process.stdout.write(data);
});

child.on('exit', function (data) {
});