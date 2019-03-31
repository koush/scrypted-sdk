var mediaManagerApply = function(target, prop, argumentsList) {
    var ret = mediaManager[prop].apply(mediaManager, argumentsList);
    var p = global['Promise'];
    if (!p || (prop != 'convertMediaObjectToUri' && prop != 'convertMediaObjectToBuffer')) {
        return ret;
    }
    // convert the promise to the globally available Promise.
    return new p((resolve, reject) => {
        ret.then(r => resolve(r))
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
var sdk = {
    log,
    deviceManager,
    scriptSettings,
    mediaManager: mediaManagerProxy,
}

module.exports = sdk;
module.exports.default = sdk;
