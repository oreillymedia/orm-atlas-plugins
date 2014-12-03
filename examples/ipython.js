(function() {
  if (!window.atlasplugins) {
    window.atlasplugins = {};
  }

  atlasplugins.IPythonRunner = (function() {
    function IPythonRunner(el) {
      var kernel;
      this.id = "ipython-" + window.ipython++;
      this.state = this.STATE_CODE;
      this.$el = $(el);
      this.code = this.$el.html();
      this.template = _.template("<div class=\"ipython\">\n<div class=\"control-area\">\n  <a href=\"#\" class=\"run\">Run</a>\n</div>\n<div class=\"display-area\">\n</div>\n</div>");
      this.$newEl = $(this.template({
        code: this.code
      }));
      this.$el.replaceWith(this.$newEl);
      IPython.tooltip = new IPython.Tooltip();
      kernel = new IPython.Kernel('/kernels');
      kernel._kernel_started({
        kernel_id: '1',
        ws_url: atlasplugins.ipythonServer
      });
      this.cell = new IPython.CodeCell(kernel);
      this.$newEl.find(".display-area").append(this.cell.element);
      this.cell.set_text(this.code);
      this.cell.select();
      this.$newEl.find(".control-area .run").click((function(_this) {
        return function(e) {
          _this.cell.execute();
          return e.preventDefault();
        };
      })(this));
    }

    return IPythonRunner;

  })();

  $(function() {
    return $('pre[data-executable="ipython"]').each(function(pre) {
      return new atlasplugins.IPythonRunner(this);
    });
  });

}).call(this);
