window.atlasplugins = {} unless window.atlasplugins
console.error("Google Analytics Plugin: No Tracking Code found") unless window.atlasplugins.gaTrackingCode

((i, s, o, g, r, a, m) ->
  i["GoogleAnalyticsObject"] = r
  i[r] = i[r] or ->
    (i[r].q = i[r].q or []).push arguments
    return

  i[r].l = 1 * new Date()

  a = s.createElement(o)
  m = s.getElementsByTagName(o)[0]

  a.async = 1
  a.src = g
  m.parentNode.insertBefore a, m
  return
) window, document, "script", "//www.google-analytics.com/analytics.js", "ga"
ga "create", window.atlasplugins.gaTrackingCode, "auto"
ga "send", "pageview"
