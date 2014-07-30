window.atlasplugins = {} unless window.atlasplugins

class atlasplugins.ProcessingJS

  constructor: (el) ->
    @$el = $(el)
    @pre = @$el.find("textarea")
    @canvas = @$el.find("canvas")[0]
    @processing = new Processing(@canvas, @pre.val())
    @pre.before "<div class='processing-header'><h3 class='title'>Processing Console</h3><a href='#' class='processing-runit'>Run</a></div>"
    @$el.find("a.processing-runit").click (e) ->
      e.preventDefault()
      @processing = new Processing(canvas, @pre.val())
    