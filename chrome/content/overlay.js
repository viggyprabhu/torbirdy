(function() {
  const Cc = Components.classes;
  const Ci = Components.interfaces;

  var prefs = Cc["@mozilla.org/preferences-service;1"]
                    .getService(Ci.nsIPrefBranch);
  var env = Cc["@mozilla.org/process/environment;1"]
                    .getService(Ci.nsIEnvironment);

  if (!(prefs.getBoolPref('extensions.torbirdy.startup_folder'))) {
    if (window.gFolderTreeView) {
      gFolderTreeView.selectFolder = function() { return; }
    }
  };

  window.TorBirdy = {
    onLoad: function() {
      var infoRun = "extensions.torbirdy.info_run";
      if (prefs.getBoolPref(infoRun)) {
        window.open("chrome://castironthunderbirdclub/content/firstruninfo.xul",
                    "FirstRunWindow",
                    "chrome, dialog, centerscreen, resizable=no");
        prefs.setBoolPref(infoRun, false);
      }

      // Set the time zone to UTC if the preference is true.
      if (prefs.getBoolPref("extensions.torbirdy.timezone")) {
        env.set('TZ', 'UTC');
      }

      // Check if we are running Whonix.
      var whonix = false;
      if (env.exists("WHONIX")) {
        whonix = true;
      }

      var myPanel = document.getElementById("torbirdy-my-panel");
      var strbundle = document.getElementById("torbirdy-strings-overlay");

      // If all other preferences have been set in `components/torbirdy.js'
      if (prefs.getBoolPref("extensions.torbirdy.protected")) {
        var type = prefs.getIntPref("extensions.torbirdy.proxy");
        myPanel.style.color = "green";

        // Tor.
        if (type === 0) {
          myPanel.label = strbundle.getString("torbirdy.enabled.tor");
        }
        // JonDo/Whonix.
        if (type === 1) {
          if (prefs.getIntPref("extensions.torbirdy.proxy.type") === 0) {
            myPanel.label = strbundle.getString("torbirdy.enabled.jondo");
          }
          if (prefs.getIntPref("extensions.torbirdy.proxy.type") === 1) {
            myPanel.label = strbundle.getString("torbirdy.enabled.whonix");
          }
        }
        // Custom.
        if (type === 2) {
          myPanel.label = strbundle.getString("torbirdy.enabled.custom");
        }
        // Whonix.
        if (whonix && prefs.getBoolPref("extensions.torbirdy.whonix_run")) {
          myPanel.label = strbundle.getString("torbirdy.enabled.whonix");
          org.torbirdy.prefs.setProxyWhonix();
        }
        // Transparent Torification.
        if (type === 3) {
          myPanel.label = strbundle.getString("torbirdy.enabled.torification");
          myPanel.style.color = "red";
        }
        prefs.setBoolPref("extensions.torbirdy.whonix_run", false);

        //Show warning to user if Transparent Torification is configured, refer Bug #11728
        if(type === 3)
        {
          window.open("chrome://castironthunderbirdclub/content/transparenttorificationwarning.xul",
                      "TransparentTorificationWarningWindow",
                      "chrome, dialog, centerscreen, resizable=no");
        }
      }
      else {
        myPanel.label = strbundle.getString("torbirdy.enabled.disabled");
        myPanel.style.color = "red";
      }
    }
  };

})();

window.addEventListener("load", function() { TorBirdy.onLoad(); }, false);
