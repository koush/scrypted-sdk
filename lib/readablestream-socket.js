import { inherits } from 'util';
import { Readable } from 'stream';

function ReadableSocket() {
    Readable.call(this, {});
    this._pending = Buffer.alloc(0);
}
inherits(ReadableSocket, Readable);

ReadableSocket.prototype._close = function(e, result) {
    this.emit('end');
    this.emit('close');
}

ReadableSocket.prototype._error = function(e) {
    this.emit('error', new Error(e.getMessage()));
}

ReadableSocket.prototype._data = function(data) {
    this._socket.pause();

    if (data) {
        data = new Buffer(data);
        data = this._pending = Buffer.concat([this._pending, data]);
    }
    else {
        data = this._pending;
    }

    if (!this._reading) {
        return;
    }

    var sub = data.slice(0, this._reading);
    var remaining = data.slice(this._reading);
    var more = this.push(sub);
    this._pending = remaining;
    if (more && !data.byteLength) {
        this._socket.resume();
    }   
}

exports.ReadableSocket = ReadableSocket;
