window.atlasplugins = {} unless window.atlasplugins
window.p5 = 0

class atlasplugins.P5

  STATE_CODE: "code"
  STATE_SKETCH: "sketch"

  constructor: (el) ->

    @id = "processingjs-" + window.p5++
    @state = @STATE_CODE
    @$el = $(el)
    @code = @$el.html()
    @template = _.template("""<div class="p5">
  <div class="control-area">
    <a href="#" class="switch"><%= label %></a>
  </div>
  <div class="display-area"> 
    <div class="editor"><textarea><%= code %></textarea></div>
    <iframe id="<%= id %>" class="output"></iframe>
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
        
        code = @codemirror.getValue()
        html = ""
        url = "http://orm-code-eval.herokuapp.com/eval?js_string=#{encodeURIComponent(code)}&html_string=#{encodeURIComponent(html)}&js_libs[]=https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.2.22/p5.min.js"
        @$newEl.find(".output").show().attr('src', url)
      else
        @$newEl.find(".control-area .switch").text("Run")
        @$newEl.find(".editor").show()
        @$newEl.find(".output").hide()
        @state = @STATE_CODE

      e.preventDefault()
    )

$(->
  $("pre[data-executable]").each((pre) -> new atlasplugins.P5(this))
)
    