(function() {
  if (!window.atlasplugins) {
    window.atlasplugins = {};
  }

  window.processingjsCounter = 0;

  atlasplugins.ProcessingJS = (function() {
    ProcessingJS.prototype.STATE_CODE = "code";

    ProcessingJS.prototype.STATE_SKETCH = "sketch";

    function ProcessingJS(el) {
      var default_settings;
      this.id = "processingjs-" + window.processingjsCounter++;
      this.state = this.STATE_CODE;
      this.$el = $(el);
      this.code = this.$el.html();
      this.processing = null;
      this.template = _.template("<div class=\"processingjs\">\n<div class=\"control-area\">\n  <a href=\"#\" class=\"switch\"><%= label %></a>\n</div>\n<div class=\"display-area\"> \n  <div class=\"editor\"><textarea><%= code %></textarea></div>\n  <canvas id=\"<%= id %>\" class=\"output\"></canvas>\n</div>\n</div>");
      this.$newEl = $(this.template({
        id: this.id,
        code: this.code,
        label: "Run"
      }));
      this.$el.replaceWith(this.$newEl);
      default_settings = {
        lineNumbers: true,
        autofocus: false,
        mode: "text/x-java"
      };
      if (atlasplugins.codeMirrorSettings) {
        default_settings = _.extend(default_settings, atlasplugins.codeMirrorSettings);
      }
      console.log(default_settings);
      this.codemirror = CodeMirror.fromTextArea(this.$newEl.find(".editor textarea")[0], default_settings);
      this.$newEl.find(".control-area .switch").click((function(_this) {
        return function(e) {
          if (_this.state === _this.STATE_CODE) {
            _this.state = _this.STATE_SKETCH;
            _this.$newEl.find(".control-area .switch").text("Edit");
            _this.$newEl.find(".editor").hide();
            _this.$newEl.find(".output").show();
            if (_this.processing) {
              _this.processing.noLoop();
            }
            _this.processing = new Processing(_this.id, _this.codemirror.getValue());
          } else {
            _this.$newEl.find(".control-area .switch").text("Run");
            _this.$newEl.find(".editor").show();
            _this.$newEl.find(".output").hide();
            _this.state = _this.STATE_CODE;
          }
          return e.preventDefault();
        };
      })(this));
    }

    return ProcessingJS;

  })();

  $(function() {
    return $("pre[data-executable]").each(function(pre) {
      return new atlasplugins.ProcessingJS(this);
    });
  });

}).call(this);
