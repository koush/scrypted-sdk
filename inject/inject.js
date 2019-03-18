const bufferToString = Buffer.prototype.toString;
const bufferWrite = Buffer.prototype.write;

// Duktape Buffer.toString and Buffer.write do not support any encodings but utf8.
// here's quick support for hex.
// TODO: Need to also add base64 as that is frequently used.

Buffer.alloc = function (len) {
    return new Buffer(len);
}
Buffer.allocUnsafe = Buffer.alloc;

Buffer.from = function (buf) {
    return new Buffer(buf);
}

Buffer.prototype.toString = function (encoding, start, end) {
    if (!encoding) {
        return bufferToString.apply(this, arguments);
    }
    return __bufferToString(this, encoding, start ? start : 0, end ? end : this.byteLength);
}

Object.defineProperty(Buffer.prototype, "length", {
    get: function () {
        return this.byteLength;
    },
    set: function () {
        throw new Error("length is readonly")
    }
});

Object.defineProperty(ArrayBuffer.prototype, "length", {
    get: function () {
        return this.byteLength;
    },
    set: function () {
        throw new Error("length is readonly")
    }
});

Buffer.prototype.write = function (string) {
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

    if (!encoding || encoding == 'utf8') {
        return bufferWrite.apply(this, arguments);
    }
    if (encoding != 'hex') {
        throw new Error('Buffer.toString("' + encoding + '") is not implemented in @scrypted/sdk.')
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

global.crypto = {
    getRandomValues: function (buf) {
        __getRandomValues(buf);
    }
}

global.location = {
    protocol: 'scrypted:',
}

global.XMLHttpRequest = function () {
    this.readyState = 0;
};

Object.defineProperty(XMLHttpRequest.prototype, "responseType", {
    get: function () {
        return this.__responseType || 'text';
    },
    set: function (val) {
        if (val == 'text' || val == 'arraybuffer' || val == 'json' || val == 'moz-chunked-arraybuffer')
            this.__responseType = val;
    }
});

XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
    this.readyState = 1;
    this.__request = __createHttpRequest(method, url);
    this._notifyReadyStateChange();
};

XMLHttpRequest.prototype.send = function (requestData) {
    if (requestData != null)
        this.__request.setBody(__newStringBody(new Buffer(requestData).toString()));

    var chunked = this.responseType == 'moz-chunked-arraybuffer';
    (chunked ? __executeChunkedHttpRequest : __executeHttpRequest)(this.__request, function (e, result, code, message, headers, responseURL) {
        if (e != null) {
            if (this.onerror)
                this.onerror(new Error(e));
            return;
        }

        this.status = code;
        this.statusText = message;
        this.responseURL = responseURL;

        this.responseHeaders = headers;
        this.readyState = 4;
        if (this.responseType == 'json') {
            try {
                this.response = JSON.parse(result);
            }
            catch (e) {
                this.onerror(e);
                return;
            }
        }
        else if (this.responseType == 'arraybuffer') {
            this.response = new Buffer(result);
        }
        else if (chunked) {
            this.response = new Buffer(result);
            this.readyState = 3;
        }
        else {
            this.responseText = result;
        }

        this._notifyReadyStateChange();
    }.bind(this));
};

XMLHttpRequest.prototype._notifyReadyStateChange = function () {
    if (this.onreadystatechange) {
        this.onreadystatechange();
    }
}

XMLHttpRequest.prototype.getAllResponseHeaders = function () {
    return this.responseHeaders;
}

XMLHttpRequest.prototype.setRequestHeader = function (key, val) {
    this.__request.setHeader(key, val);
}

// duktape does this incorrectly
Date.prototype.toUTCString = function () {
    return __toUTCString(this.getTime());
}

process.uptime = function() {
    return __processUptime() / 1000;
}

global.onunhandledrejection = function(e) {
    throw e.reason;
}
