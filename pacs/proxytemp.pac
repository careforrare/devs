// Proxy PAC File
// - Used to redirect certain addresses to the server through the SOCKS ssh port (1280 for this file), i.e. 
//   tunnel traffic through server.
// - Useful for easily accessing webpages from services running on a server (Jupyter notebooks, TensorBoard, Spark UI, etc.)
//   that is otherwise locked down by a firewall.
// - To install on OS X/MacOS, go to "Settings->Network->Advanced->Proxies->Automatic Proxy Configuration"
//   and paste the local file url (`file:///absolute/path/to/proxy.pac`).
// - Alternatively, use `./reinstall_proxy.sh`.
// - SSH to the server with `ssh -D 19999 ....`.
// https://en.wikipedia.org/wiki/Proxy_auto-config
function FindProxyForURL(url, host) {
  // Setup a SOCKS proxy on port 19999.
  // proxy = "SOCKS5 127.0.0.1:19999; SOCKS 127.0.0.1:19999;"
  proxy = "SOCKS5 127.0.0.1:19999; SOCKS 127.0.0.1:19999; DIRECT" 
  // Log to `chrome://net-internals/#events` for debugging.
  // alert("url: " + url + ", host: " + host)

  // Setup proxy filters.
  // - Use `host` for IP addresses and domain names.
  // - Use `url` for more control over the entire URL (i.e. sub paths).
  // - Protip: Use the above debugging log to determine the `url` and `host` for
  //   a given page.
  // - Protip 2: If you add an entry for your server to `/etc/hosts` in the form of
  //   `IP_address domain_name_url alias`, the `host` can be matched to the `alias`.
  if (shExpMatch(host, "10.152.183.*") ||  // match IP address
      shExpMatch(host, "srvchildre*")) {  // match `srvchildre07`, `srvchildre24`, etc.
    // Log to `chrome://net-internals/#events` for debugging.
    // alert(host + " passed!")
    // Route through server.
    return proxy;
  }

  // Route everything else directly!
  return "DIRECT";
}
