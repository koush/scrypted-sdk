const https = require('https');
const axios = require('axios').create({
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
    })
});
const process = require('process');
const path = require('path');
const fs = require('fs');

exports.deploy = function(debugHost) {
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
    
        const debugUrl = `https://${debugHost}:9443/web/component/script/deploy`
    
        const fileContents = fs.readFileSync(main).toString();
        console.log(`deploying to ${debugHost}`);
    
        axios.post(debugUrl, fileContents,
            {
                timeout: 10000,
                headers: {"Content-Type": "text/plain"}
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error('Error during deployment: ' + response.data)
            }
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
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error during deployment: ' + response.data)
            }
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
    return require(path.resolve(__dirname, 'webpack.config.js'));
}
