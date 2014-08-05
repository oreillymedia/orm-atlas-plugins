Processing.js Plugin
--------------------

This plugin turns can turn Processing code examples into a runnable code sample, with a canvas and everything!

How to use
----------

First you need to include the plugin and its dependencies in either the `<head>` of your `layout.html` file, or the `javascripts` and `stylesheets` array of your `atlas.json` file.

```html
<link rel="stylesheet" type="text/css" href="https://d2uogd9jz9k9zm.cloudfront.net/codemirror-4.4.css">
<script type="text/javascript" src="https://d2uogd9jz9k9zm.cloudfront.net/codemirror-4.4.min.js"></script>
<script type="text/javascript" src="https://d2uogd9jz9k9zm.cloudfront.net/underscore-1.6.0.min.js"></script>
<script type="text/javascript" src="https://d2uogd9jz9k9zm.cloudfront.net/processing-1.4.8.min.js"></script>

<link rel="stylesheet" type="text/css" href="https://d2uogd9jz9k9zm.cloudfront.net/processingjs-0.0.1.css">
<script type="text/javascript" src="https://d2uogd9jz9k9zm.cloudfront.net/processingjs-0.0.1.min.js"></script>
```

To automatically convert a Processing example to a runnable widget, use the `data-executable` attribute on the `pre` element.

```html
<pre data-executable="true" data-code-language="processingjs">
void setup() {
  size(200,200);
  fill(255, 0, 0);
  rect(100, 100, 50, 50);
}
</pre>
```

You can also manually trigger a runnable code widget in JS:

```html
<pre data-code-language="processingjs" id="mycode">
void setup() {
  size(200,200);
  fill(255, 0, 0);
  rect(100, 100, 50, 50);
}
</pre>
<script type="text/javascript">
    var pjs = new atlasplugins.ProcessingJS($("#mycode")[0])
</script>
```