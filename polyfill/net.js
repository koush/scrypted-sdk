import { inherits } from 'util';
import { DuplexSocket } from '../lib/duplex-socket';

Buffer.alloc = function (len) {
    return new Buffer(len);
}

function Socket() {
    DuplexSocket.call(this, {});
    this.__type = "tcp";
}
inherits(Socket, DuplexSocket);

Socket.prototype.connect = function () {
    var options;
    var callback;

    if (typeof arguments[0] == 'number') {
        options.port = arguments[0];
        if (arguments.length == 2) {
            if (typeof arguments[1] == 'string') {
                options.host = arguments[1];
            }
            else {
                callback = arguments[1];
            }
        }
        else if (arguments.length == 3) {
            options.host = arguments[1];
            callback = arguments[2];
        }
    }
    else {
        options = arguments[0];
        if (arguments.length > 1) {
            callback = arguments[1];
        }
    }

    if (callback) {
        this.once('connect', callback);
    }

    __tcpConnect(options, this.__type,
        function (e, socket, writer) {
            // socket
            if (e != null) {
                this.emit('error', new Error(e.getMessage()));
                return;
            }
            // read may be called before socket has connected.
            if (!this._reading) {
                socket.pause();
            }
            this._socket = socket;
            this._writer = writer;
            this.once('_writable', function() {
                // write may be called before socket has connected.
                if (this._pendingWrite) {
                    var p = this._pendingWrite;
                    var pe = this._pendingEncoding;
                    var pcb = this._pendingCallback;
                    delete this._pendingWrite;
                    delete this._pendingEncoding;
                    delete this._pendingCallback;
                    this._write(p, pe, pcb);
                }
                this.emit('connect');
            }.bind(this));
        }.bind(this),
        this._close.bind(this),
        this._error.bind(this),
        this._data.bind(this),
        this._writable.bind(this));
}

Socket.prototype._read = function (len) {
    this._reading = len;
    // read may be called before socket has connected.
    if (!this._socket) {
        return;
    }
    setImmediate(function() {
        this._socket.resume();
    }.bind(this))
}

Socket.prototype._write = function (b, encoding, callback) {
    if (!Buffer.isBuffer(b)) {
        b = new Buffer(b);
    }
    // write may be called before socket has connected.
    if (!this._socket) {
        this._pendingWrite = b;
        this._pendingEncoding = encoding;
        this._pendingCallback = callback;
        return;
    }
    setImmediate(function () {
        this._writer.write(b);
        callback();

        if (this._finalCallback)
            this._finish();
    }.bind(this))
}

// will only ever be called if _final has been called.
Socket.prototype._finish = function () {
    var cb = this._finalCallback;
    delete this._finalCallback;

    this._socket.close();
    if (cb)
        cb();
}

Socket.prototype._final = function (cb) {
    this._finalCallback = cb;
    this._finish();
}

Socket.prototype._destroy = function (cb) {
    if (this._socket) {
        this._socket.close();
    }
}
Socket.prototype.setTimeout = function () {
}
Socket.prototype.setNoDelay = function () {
}
Socket.prototype.setKeepAlive = function () {
}
Socket.prototype.unref = function() {
}

function createConnection() {
    var socket = new Socket();
    socket.connect.apply(socket, arguments);
    return socket;
}
const connect = createConnection;

export {
    Socket,
    createConnection,
    connect,
}
