function networkInterfaces() {
    var nis = __getNetworkInterfaces();

    var ret = {};
    for (var i = 0; i < nis.length; i++) {
        var ni = nis[i];
        var iface = [];
        ret[ni.getName()] = iface;
        var addrs = ni.getInterfaceAddresses();
        for (var j = 0; j < addrs.size(); j++) {
            var addr = addrs.get(j);
            iface.push({
                address: addr.getAddress().getHostAddress(),
            });
        }
    }
    return ret;
}

export {
    networkInterfaces
}