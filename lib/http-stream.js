import { Readable } from 'stream';
import { inherits } from 'util';

function HttpResponse() {
    Readable.call(this, {});
    this._pending = Buffer.alloc(0);
}
inherits(HttpResponse, Readable);

HttpResponse.prototype._read = function (len) {
    this._reading = len;
    setImmediate(function() {
        this._socket.resume();
    }.bind(this))
}

function HttpRequest(method, url) {
    this.__request = __createHttpRequest(method, url);
}

HttpRequest.prototype.setRequestHeader = function (key, val) {
    this.__request.setHeader(key, val);
}

function HttpClient() {
}

HttpClient.prototype.execute = function (request) {
    return new Promise((resolve, reject) => {

        var response = new HttpResponse();
        __executeHttpStreamRequest(request.__request,
            function (e, result) {
                if (e != null) {
                    var err = new Error(e.getMessage());
                    reject(err);
                    return;
                }
                response._socket = result;
                response._socket.pause();
                resolve(response);
            }.bind(this),
            function () {
                // close
                response.emit('end')
                response.emit('close')
            }.bind(this),
            function () {
                // error
                response.emit('error', new Error(e.getMessage()));
            }.bind(this),
            function (data) {
                response._socket.pause();

                data = new Buffer(data);
                if (!response._reading) {
                    response._pending = Buffer.concat([response._pending, data]);
                    return;
                }
    
                var sub = data.slice(0, response._reading);
                var remaining = data.slice(response._reading);
                var more = response.push(sub);
                response._pending = remaining;
                if (more) {
                    response._socket.resume();
                }
            }.bind(this));
    });
}


exports.HttpClient = HttpClient;
exports.HttpRequest = HttpRequest;