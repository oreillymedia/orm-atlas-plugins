window.atlasplugins = {} unless window.atlasplugins

class atlasplugins.ProcessingJS

  initialize: (el) ->
    @$el = $(el)
    @textarea = @$el.find("textarea")[0]
    @canvas = @$el.find("canvas")[0]
    @processing = new Processing(canvas, $(textarea).val())
    $(@textarea).before "<div class='processing-header'><h3 class='title'>Processing Console</h3><a href='#' class='processing-runit'>Run</a></div>"
    @$el.find("a.processing-runit").click (e) ->
      e.preventDefault()
      @processing = new Processing(canvas, $(textarea).val())
    