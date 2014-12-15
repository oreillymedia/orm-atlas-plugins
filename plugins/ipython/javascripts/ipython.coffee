window.atlasplugins = {} unless window.atlasplugins
window.atlasplugins.ipythonServer = "jupyter-kernel.odewahn.com";

class atlasplugins.IPythonRunner

  SERVER: undefined
  TEMPLATE : _.template("""<div class="ipython">
  <div class="control-area">
    <a href="#" class="run">Run</a>
  </div>
  <div class="display-area">
  </div>
</div>
""")

  constructor: (el) ->

    # Render template instead of code example
    @$el = $(el)
    @code = @$el.html()
    @$newEl = $(@TEMPLATE(code: @code))

    @$el.replaceWith(@$newEl)
    @cell = new IPython.CodeCell(window.atlasplugins.ipkernel)
    
    @$newEl.find(".display-area").append(@cell.element)
    @cell.set_text(@code)

    # Click event
    @$newEl.find(".control-area .run").click((e) => 
      e.preventDefault()
      @clicked()
    )

  clicked: (e) ->
    # if we already have a live connection
    if @SERVER?
      @run()
    # if we don't have a live connection
    else
      # Do we have a server saved in cookie?
      server = @get_server()
      if server && server.url
        # Is it live?
        @check_server(=>
          # connect
          # run (delay?)
        )  
      # Create a new server
      else
        @create_server(=>
          @run()
        )
  
  # Will check a connection to a server. If good, it calls callback.
  # If connection is dead, it'll spawn a new server and call callback.
  check_server: (cb) ->
    console.log "Checking server connection"
    $.ajax(
      url: "http://#{atlasplugins.ipythonServer}:8000#{@get_server().url}/",
      dataType: "JSON"
      method: "GET"
    ).done((data) =>
      console.log "--> Good"
      @save_server(data.url)
      @connect_server()
      @run(1000)
    ).error((e1, e2, e3) =>
      console.log "--> Bad"
      @create_server(cb)
    )

  # Creates a new server and calls callback.
  create_server: (cb) ->
    console.log "Creating new server"
    $.ajax(
      url: "http://#{atlasplugins.ipythonServer}:8000/spawn",
      dataType: "JSON"
      method: "GET"
    ).done((data) =>
      console.log "--> Good"
      @save_server(data.url)
      @connect_server()
      @run(1000)
    ).error((e1, e2, e3) ->
      console.log "--> Failed"
    )

  # Saves a server in a cookie to preserve across pages
  save_server: (url) ->
    url = url.replace(/\/$/, "") # remove trailing slash
    @SERVER = url
    $.cookie('ipythonserver', {url:url})

  # Gets server from cookie
  get_server: ->
    $.cookie('ipythonserver')

  # Connects to existing kernel
  connect_server: ->
    url = "ws://#{atlasplugins.ipythonServer}:8000#{@SERVER}"
    atlasplugins.ipkernel._kernel_started({kernel_id: '1', ws_url: url})

  # runs the code example
  run: (delay=0) ->
    if delay > 0
      setTimeout(=>
        @cell.execute()
      , delay) 
    else
      @cell.execute()

$(->

  # allow saving JSON in cookies
  $.cookie.json = true;

  # initialize iPython kernel
  IPython.tooltip = new IPython.Tooltip()
  window.atlasplugins.ipkernel = new IPython.Kernel('/kernels')

  # Automatically initialize ipython for specificed code examples.
  $('pre[data-executable]').each((pre) -> new atlasplugins.IPythonRunner(this))

)
    