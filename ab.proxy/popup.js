// popup.js
function startProxy() {
    var proxyServer = document.getElementById("proxyServerInput").value;
    var proxyPort = document.getElementById("proxyPortInput").value;
    var proxyUser = document.getElementById("proxyUserInput").value;
    var proxyPass = document.getElementById("proxyPassInput").value;
  
    // Send a message to the background script to update proxy settings
    chrome.runtime.sendMessage({
      action: "startProxy",
      settings: {
        value: {
          mode: "fixed_servers",
          rules: {
            singleProxy: {
              scheme: "http",
              host: proxyServer,
              port: parseInt(proxyPort, 10),
              username: proxyUser,
              password: proxyPass
            },
            bypassList: ["*.google.com"]
          }
        },
        scope: "regular"
      }
    });
  
    // Update proxy status
    updateProxyStatus();
  }
  
  function stopProxy() {
    // Send a message to the background script to stop the proxy
    chrome.runtime.sendMessage({
      action: "stopProxy"
    });
  
    // Update proxy status
    updateProxyStatus();
  }
  
  function updateProxyStatus() {
    // Query the current proxy settings
    chrome.proxy.settings.get({}, function(config) {
      var statusMessage = document.getElementById("statusMessage");
  
      if (config.value && config.value.mode === "fixed_servers") {
        statusMessage.textContent = "Connected to proxy";
  
        // Check if proxy requires authentication
        if (config.value.rules.singleProxy.username && config.value.rules.singleProxy.password) {
          statusMessage.textContent += " (Login Required)";
        } else {
          statusMessage.textContent += " (No Login Required)";
        }
      } else {
        statusMessage.textContent = "Not connected";
      }
    });
  }
  
  // Update proxy status when the popup is loaded
  document.addEventListener("DOMContentLoaded", function() {
    updateProxyStatus();
  });
  