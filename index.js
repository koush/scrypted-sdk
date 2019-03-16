// throw new Error('import files within @scrypted/sdk/lib directly to minimize plugin bundle size.');

var sdk = {
    log: log,
    deviceManager: deviceManager,
    scriptSettings: scriptSettings,
}

module.exports = sdk;
module.exports.default = sdk;
