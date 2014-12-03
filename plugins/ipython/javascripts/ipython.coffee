window.atlasplugins = {} unless window.atlasplugins

class atlasplugins.IPythonRunner

  constructor: (el) ->

    @id = "ipython-" + window.ipython++
    @state = @STATE_CODE
    @$el = $(el)
    @code = @$el.html()
    @template = _.template("""<div class="ipython">
  <div class="control-area">
    <a href="#" class="run">Run</a>
  </div>
  <div class="display-area">
  </div>
</div>
""")

    @$newEl = $(@template(
      code: @code
    ))

    @$el.replaceWith(@$newEl)

    # This should be tweaked to handle multiple areas?
    IPython.tooltip = new IPython.Tooltip()
    kernel = new IPython.Kernel('/kernels')
    kernel._kernel_started({kernel_id: '1', ws_url: atlasplugins.ipythonServer})
    @cell = new IPython.CodeCell(kernel)
    
    @$newEl.find(".display-area").append(@cell.element)
    @cell.set_text(@code)
    @cell.select()

    @$newEl.find(".control-area .run").click((e) =>
      @cell.execute();
      e.preventDefault()
    )
  
$(->
  $('pre[data-executable="ipython"]').each((pre) -> new atlasplugins.IPythonRunner(this))
)
    