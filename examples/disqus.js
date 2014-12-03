(function() {
  if (!window.atlasplugins) {
    window.atlasplugins = {};
  }

  jQuery(document).ready(function() {
    return (function() {
      var dsq;
      dsq = document.createElement("script");
      dsq.type = "text/javascript";
      dsq.async = true;
      dsq.src = "//" + disqus_shortname + ".disqus.com/embed.js";
      return (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(dsq);
    })();
  });

}).call(this);
