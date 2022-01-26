function FindProxyForURL(url, host) {
  // Setup a SOCKS proxy on port 1999.
  proxy = "SOCKS5 127.0.0.1:1999; SOCKS 127.0.0.1:1999; DIRECT" 
  if (shExpMatch(host, "10.152.183.*") ||  // match IP address
      shExpMatch(host, "srvchildre*")) {  // match DNS name
    return proxy;
  }
  // Route everything else directly!
  return "DIRECT";
}