(function() {
  if (!window.atlasplugins) {
    window.atlasplugins = {};
  }

  window.p5 = 0;

  atlasplugins.P5 = (function() {
    P5.prototype.STATE_CODE = "code";

    P5.prototype.STATE_SKETCH = "sketch";

    function P5(el) {
      this.id = "processingjs-" + window.p5++;
      this.state = this.STATE_CODE;
      this.$el = $(el);
      this.code = this.$el.html();
      this.template = _.template("<div class=\"p5\">\n<div class=\"control-area\">\n  <a href=\"#\" class=\"switch\"><%= label %></a>\n</div>\n<div class=\"display-area\"> \n  <div class=\"editor\"><textarea><%= code %></textarea></div>\n  <iframe id=\"<%= id %>\" class=\"output\"></iframe>\n</div>\n</div>");
      this.$newEl = $(this.template({
        id: this.id,
        code: this.code,
        label: "Run"
      }));
      this.$el.replaceWith(this.$newEl);
      this.codemirror = CodeMirror.fromTextArea(this.$newEl.find(".editor textarea")[0], {
        lineNumbers: true,
        autofocus: false,
        mode: "text/x-java"
      });
      this.$newEl.find(".control-area .switch").click((function(_this) {
        return function(e) {
          var code, html, url;
          if (_this.state === _this.STATE_CODE) {
            _this.state = _this.STATE_SKETCH;
            _this.$newEl.find(".control-area .switch").text("Edit");
            _this.$newEl.find(".editor").hide();
            code = _this.codemirror.getValue();
            html = "";
            url = "http://orm-code-eval.herokuapp.com/eval?js_string=" + (encodeURIComponent(code)) + "&html_string=" + (encodeURIComponent(html)) + "&js_libs[]=https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.2.22/p5.min.js";
            _this.$newEl.find(".output").show().attr('src', url);
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

    return P5;

  })();

  $(function() {
    return $("pre[data-executable]").each(function(pre) {
      return new atlasplugins.P5(this);
    });
  });

}).call(this);
