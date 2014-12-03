(function() {
  if (!window.atlasplugins) {
    window.atlasplugins = {};
  }

  if (!window.atlasplugins.gaTrackingCode) {
    console.error("Google Analytics Plugin: No Tracking Code found");
  }

  (function(i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    i[r] = i[r] || function() {
      (i[r].q = i[r].q || []).push(arguments);
    };
    i[r].l = 1 * new Date();
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");

  ga("create", window.atlasplugins.gaTrackingCode, "auto");

  ga("send", "pageview");

}).call(this);
