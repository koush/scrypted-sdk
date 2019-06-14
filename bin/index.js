const https = require('https');
const axios = require('axios').create({
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
    })
});
const process = require('process');
const path = require('path');
const fs = require('fs');

exports.deploy = function(debugHost, noRebind) {
    return new Promise((resolve, reject) => {
        var out;
        if (process.env.NODE_ENV == 'production')
            out = path.resolve(process.cwd(), 'dist');
        else
            out = path.resolve(process.cwd(), 'out');
    
        const outFilename = 'main.js';
        const main = path.resolve(out, outFilename);
        if (!fs.existsSync(main)) {
            console.error('npm run scrypted-webpack to build a webpack bundle for Scrypted.')
            reject(`Missing webpack bundle: ${main}`);
            return 3;
        }
    
        const deployUrl = `https://${debugHost}:9443/web/component/script/deploy?${noRebind ? 'no-rebind' : ''}`
        const setupUrl = `https://${debugHost}:9443/web/component/script/setup?${noRebind ? 'no-rebind' : ''}`
    
        const fileContents = fs.readFileSync(main).toString();
        console.log(`deploying to ${debugHost}`);
    
        var packageJson = path.resolve(process.cwd(), 'package.json');
        packageJson = JSON.parse(fs.readFileSync(packageJson));
        axios.post(setupUrl, packageJson,
        {
            timeout: 10000,
            maxRedirects: 0,
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            },
        })
        .then(() => {
            console.log(`configured ${debugHost}`);

            return axios.post(deployUrl, fileContents,
                {
                    timeout: 10000,
                    maxRedirects: 0,
                    validateStatus: function (status) {
                        return status >= 200 && status < 300;
                    },
                    headers: {"Content-Type": "text/plain"}
                }
            )
        })
        .then(() => {
            console.log(`deployed to ${debugHost}`);
            resolve();
        })
        .catch((err) => {
            console.error(err.message);
            reject('deploy failed');
        });
    });
}

exports.debug = function(debugHost) {
    return new Promise((resolve, reject) => {
        const outFilename = 'main.js';

        const debugUrl = `https://${debugHost}:9443/web/component/script/debug?filename=${outFilename}`
        console.log(`initiating debugger on ${debugHost}`);
    
        axios.post(debugUrl, {
            timeout: 10000,
            maxRedirects: 0,
            validateStatus: function (status) {
                return status >= 200 && status < 300; // default
            },
        })
        .then(response => {
            console.log(`debugger ready on ${debugHost}`);
            resolve();
        })
        .catch((err) => {
            console.error(err.message);
            reject('debug failed');
        });
    })
}

exports.getDefaultWebpackConfig = function() {
    return require(path.resolve(__dirname, '../webpack.config.js'));
}
