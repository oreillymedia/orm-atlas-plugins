_.each $(".processingjslive"), (liveelement) ->
  textarea = $(liveelement).find("textarea")[0]
  canvas = $(liveelement).find("canvas")[0]
  processing = new Processing(canvas, $(textarea).val())
  $(textarea).before "<div class='processing-header'><h3 class='title'>Processing Console</h3><a href='#' class='processing-runit'>Run</a></div>"
  $(liveelement).find("a.processing-runit").click ->
    processing = new Processing(canvas, $(textarea).val())
    false