if (!org) var org = {};
if (!org.torbirdy) org.torbirdy = {};

if (!org.torbirdy.transparenttorificationwarning) org.torbirdy.transparenttorificationwarning = new function() {
  var pub = {};

  pub.onLoad = function() {
   
  };

  pub.onPrefs = function() {
  	window.open("chrome://castironthunderbirdclub/content/preferences.xul",
                      "Preferences",
                      "chrome, dialog, centerscreen, resizable=no");
  };

  return pub;
}