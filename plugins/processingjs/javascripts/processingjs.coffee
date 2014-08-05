window.atlasplugins = {} unless window.atlasplugins
window.processingjsCounter = 0

class atlasplugins.ProcessingJS

  STATE_CODE: "code"
  STATE_SKETCH: "sketch"

  constructor: (el) ->

    @id = "processingjs-" + window.processingjsCounter++
    @state = @STATE_CODE
    @$el = $(el)
    @code = @$el.html()
    @processing = null

    @template = _.template("""<div class="processingjs">
  <div class="control-area">
    <a href="#" class="switch"><%= label %></a>
  </div>
  <div class="display-area"> 
    <div class="editor"><textarea><%= code %></textarea></div>
    <canvas id="<%= id %>" class="output"></canvas>
  </div>
</div>
""")

    @$newEl = $(@template(
      id: @id
      code: @code
      label: "Run"
    ))

    @$el.replaceWith(@$newEl)

    # enable codemirror on textarea
    @codemirror = CodeMirror.fromTextArea(@$newEl.find(".editor textarea")[0],
      lineNumbers: true,
      autofocus: false,
      mode: "text/x-java"
    )

    # enable switching back and forth
    @$newEl.find(".control-area .switch").click((e) =>

      if @state is @STATE_CODE
        @state = @STATE_SKETCH
        @$newEl.find(".control-area .switch").text("Edit")
        @$newEl.find(".editor").hide()
        @$newEl.find(".output").show()
        @processing.noLoop() if @processing
        @processing = new Processing(@id, @codemirror.getValue())
      else
        @$newEl.find(".control-area .switch").text("Run")
        @$newEl.find(".editor").show()
        @$newEl.find(".output").hide()
        @state = @STATE_CODE

      e.preventDefault()
    )

$(->
  $("pre[data-executable]").each((pre) -> new atlasplugins.ProcessingJS(this))
)
    