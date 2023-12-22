// background.js
chrome.runtime.onInstalled.addListener(function() {
    // Set up default proxy settings with authentication
    // 101.108.178.36	4145
    chrome.proxy.settings.set({
      value: {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: "SOCKS4",
            host: "101.108.178.36",
            port: 8080,
            // username: "your_username",
            // password: "your_password"
          },
          bypassList: ["*.whatismyipaddress.com"]
        }
      },
      scope: "regular"
    });
  });
  
  // Listen for changes in the extension popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "startProxy") {
      // Start proxy with the provided settings
      chrome.proxy.settings.set(request.settings, function() {
        console.log("Proxy started");
      });
    } else if (request.action === "stopProxy") {
      // Stop the proxy
      chrome.proxy.settings.clear({ scope: "regular" }, function() {
        console.log("Proxy stopped");
      });
    }
  });
  