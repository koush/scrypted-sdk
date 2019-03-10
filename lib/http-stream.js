import { inherits } from 'util';
import { ReadableSocket } from './stream-socket';

function HttpResponse() {
    ReadableSocket.call(this, {});
}
inherits(HttpResponse, ReadableSocket);

HttpResponse.prototype._read = function (len) {
    this._reading = len;
    setImmediate(function() {
        this._data();
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
        response._socket = new ReadableSocket(response);
        __executeHttpStreamRequest(request.__request,
            function (e, socket) {
                if (e != null) {
                    var err = new Error(e.getMessage());
                    reject(err);
                    return;
                }
                socket.pause();
                response._socket = socket;
                resolve(response);
            }.bind(this),
            response._close.bind(response),
            response._error.bind(response),
            response._data.bind(response));
    });
}


exports.HttpClient = HttpClient;
exports.HttpRequest = HttpRequest;