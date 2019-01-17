const bufferToString = Buffer.prototype.toString;
const bufferWrite = Buffer.prototype.write;

// Duktape Buffer.toString and Buffer.write do not support any encodings but utf8.
// here's quick support for hex.
// TODO: Need to also add base64 as that is frequently used.

Buffer.prototype.toString = function (encoding, start, end) {
    if (encoding != 'hex') {
        return bufferToString.apply(this, arguments);
    }

    if (!start) {
        start = 0;
    }
    if (!end) {
        end = this.length;
    }

    var ret = '';
    for (var i = start; i < end; i++) {
        ret += ('00' + this[i].toString(16)).slice(-2);
    }

    return ret;
}

Buffer.prototype.write = function(string) {
    var offset;
    var length;
    var encoding;
    var i = 1;
    if (typeof arguments[i] == 'string') {
        encoding = arguments[i++];
    }
    else {
        offset = arguments[i++];
        if (typeof arguments[i] == 'string') {
            encoding = arguments[i++];
        }
        else {
            length = arguments[i++];
            encoding = arguments[i++];
        }
    }

    if (encoding != 'hex') {
        return bufferToString.apply(this, arguments);
    }

    if (!offset) {
        offset = 0;
    }
    if (!length) {
        length = this.length - offset;
    }

    for (var i = 0; i < Math.min(length, string.length); i++) {
        var val = parseInt(string.substr(i * 2, 2), 16);
        this[offset + i] = val;
    }
}
