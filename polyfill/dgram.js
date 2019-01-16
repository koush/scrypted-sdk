import EventEmitter from 'eventemitter3';

class Udp extends EventEmitter {

    close() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    bind() {
        var port;
        var address;
        var cb;

        var type = typeof arguments[0];
        if (type == 'function') {
            cb = arguments[0];
            port = 0;
        }
        else if (type == 'number') {
            port = arguments[0];
            type = typeof arguments[1];
            if (type == 'function') {
                cb = arguments[1];
            }
            else if (type == 'string') {
                address = arguments[1];
                cb = arguments[2];
            }
            else {
                throw new Error('unexpected argument');
            }
        }
        else if (type == 'object') {
            var port = arguments[0].port || 0;
            var address = arguments[0].address;
            cb = arguments[1];
        }
        else {
            throw new Error('unexpected argument');
        }

        this.ensureSocket(address, port, cb);
    }

    setBroadcast(broadcast) {
        __datagramSetBroadcast(this.socket, broadcast);
    }

    send() {
        var i = 0;
        var message = arguments[i++];
        var offset = 0;
        var length = message.length;
        var port;
        var address;
        var cb;
        if (typeof arguments[i] == 'number') {
            offset = arguments[i++];
        }
        if (typeof arguments[i] == 'number') {
            length = arguments[i++];
        }
        port = arguments[i++];
        if (typeof arguments[i] == 'string') {
            address = arguments[i++]
        }
        if (i < arguments.length) {
            cb = arguments[i++];
        }

        return __datagramSend(this.socket, new Uint8Array(message), offset, length, port, address, cb);
    }

    address() {
        return null;
    }

    ensureSocket(address, port, cb) {
        if (this.socket) {
            cb();
            return;
        }

        __datagramCreate(address, port,
            function socketCallback(e, result) {
                if (e != null) {
                    this.emit('error', new Error(e.getMessage()));
                    return;
                }

                this.socket = result;
                this.address = result.getLocalAddress().getHostAddress();
                this.port = result.getLocalPort();
                cb();
            }.bind(this),
            function closeCallback() {
                this.emit('close')
            }.bind(this),
            function errorCallback(e) {
                this.emit('error', new Error(e.getMessage()));
            }.bind(this),
            function messageCallback(data, remoteAddress) {
                var buffer = new Buffer(data);
                var rinfo = {
                    address: remoteAddress.getHostString(),
                    family: 'IPv4',
                    port: remoteAddress.getPort(),
                    size: data.length,
                }
                this.emit('message', buffer, rinfo);
            }.bind(this));
    }

}

function createSocket(type, cb) {
    var ret = new Udp();
    if (cb) {
        ret.on('data', cb);
    }
    return ret;
}

export {
    createSocket
}