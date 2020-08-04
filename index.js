var mediaManagerApply = function(target, prop, argumentsList) {
    var copy = [];
    if (argumentsList) {
        for (var i in argumentsList) {
            copy.push(NativeBuffer.from(argumentsList[i]));
        }
    }
    var ret = mediaManager[prop].apply(mediaManager, copy);
    var p = global['Promise'];
    if (!p || (!prop.startsWith('convert'))) {
        return ret;
    }
    // convert the promise to the globally available Promise.
    return new p((resolve, reject) => {
        // todo: dont use native buffer as a return value
        ret.then(r => NativeBuffer.toBuffer(resolve(r)))
        .catch(e => reject(e));
    });
};

var mediaManagerProxy = new Proxy(function(){}, {
    get: function(target, prop) {
        return function() {
            return mediaManagerApply(target, prop, arguments)
        }
    },
    apply: mediaManagerApply,
})

var sdk = require('./index.generated.js');
try {
    sdk = Object.assign(sdk, {
        log,
        scriptSettings,
    
        android,
        deviceManager,
        endpointManager,
        mediaManager: mediaManagerProxy,
        systemManager,
        zwaveManager,
    });
    }
catch (e) {
}

module.exports = sdk;
module.exports.default = sdk;
