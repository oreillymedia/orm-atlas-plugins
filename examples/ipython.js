(function() {
  if (!window.atlasplugins) {
    window.atlasplugins = {};
  }

  window.atlasplugins.ipythonServer = "jupyter-kernel.odewahn.com";

  atlasplugins.IPythonRunner = (function() {
    IPythonRunner.prototype.SERVER = void 0;

    IPythonRunner.prototype.TEMPLATE = _.template("<div class=\"ipython\">\n<div class=\"control-area\">\n  <a href=\"#\" class=\"run\">Run</a>\n</div>\n<div class=\"display-area\">\n</div>\n</div>");

    function IPythonRunner(el) {
      this.$el = $(el);
      this.code = this.$el.html();
      this.$newEl = $(this.TEMPLATE({
        code: this.code
      }));
      this.$el.replaceWith(this.$newEl);
      this.cell = new IPython.CodeCell(window.atlasplugins.ipkernel);
      this.$newEl.find(".display-area").append(this.cell.element);
      this.cell.set_text(this.code);
      this.$newEl.find(".control-area .run").click((function(_this) {
        return function(e) {
          e.preventDefault();
          return _this.clicked();
        };
      })(this));
    }

    IPythonRunner.prototype.clicked = function(e) {
      var server;
      if (this.SERVER != null) {
        return this.run();
      } else {
        server = this.get_server();
        if (server && server.url) {
          return this.check_server((function(_this) {
            return function() {};
          })(this));
        } else {
          return this.create_server((function(_this) {
            return function() {
              return _this.run();
            };
          })(this));
        }
      }
    };

    IPythonRunner.prototype.check_server = function(cb) {
      console.log("Checking server connection");
      return $.ajax({
        url: "http://" + atlasplugins.ipythonServer + ":8000" + (this.get_server().url) + "/",
        dataType: "JSON",
        method: "GET"
      }).done((function(_this) {
        return function(data) {
          console.log("--> Good");
          _this.save_server(data.url);
          _this.connect_server();
          return _this.run(1000);
        };
      })(this)).error((function(_this) {
        return function(e1, e2, e3) {
          console.log("--> Bad");
          return _this.create_server(cb);
        };
      })(this));
    };

    IPythonRunner.prototype.create_server = function(cb) {
      console.log("Creating new server");
      return $.ajax({
        url: "http://" + atlasplugins.ipythonServer + ":8000/spawn",
        dataType: "JSON",
        method: "GET"
      }).done((function(_this) {
        return function(data) {
          console.log("--> Good");
          _this.save_server(data.url);
          _this.connect_server();
          return _this.run(1000);
        };
      })(this)).error(function(e1, e2, e3) {
        return console.log("--> Failed");
      });
    };

    IPythonRunner.prototype.save_server = function(url) {
      url = url.replace(/\/$/, "");
      this.SERVER = url;
      return $.cookie('ipythonserver', {
        url: url
      });
    };

    IPythonRunner.prototype.get_server = function() {
      return $.cookie('ipythonserver');
    };

    IPythonRunner.prototype.connect_server = function() {
      var url;
      url = "ws://" + atlasplugins.ipythonServer + ":8000" + this.SERVER;
      return atlasplugins.ipkernel._kernel_started({
        kernel_id: '1',
        ws_url: url
      });
    };

    IPythonRunner.prototype.run = function(delay) {
      if (delay == null) {
        delay = 0;
      }
      if (delay > 0) {
        return setTimeout((function(_this) {
          return function() {
            return _this.cell.execute();
          };
        })(this), delay);
      } else {
        return this.cell.execute();
      }
    };

    return IPythonRunner;

  })();

  $(function() {
    $.cookie.json = true;
    IPython.tooltip = new IPython.Tooltip();
    window.atlasplugins.ipkernel = new IPython.Kernel('/kernels');
    return $('pre[data-executable]').each(function(pre) {
      return new atlasplugins.IPythonRunner(this);
    });
  });

}).call(this);
