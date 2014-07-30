Processing.js Plugin
--------------------

This plugin turns can turn Processing code examples into a runnable code sample, with a canvas and everything!

How to use
----------

First you need to include the plugin and its dependencies in either the `<head>` of your `layout.html` file, or the `javascripts` array of your `atlas.json` file.

```html
<script type="text/javascript" src="https://d2uogd9jz9k9zm.cloudfront.net/libs/underscore-1.6.0.min.js"></script>
<script type="text/javascript" src="https://d2uogd9jz9k9zm.cloudfront.net/libs/processing-1.4.8.min.js"></script>
<script type="text/javascript" src="https://d2uogd9jz9k9zm.cloudfront.net/processingjs/processingjs-0.0.1.min.js"></script>
```

To automatically convert a Processing example to a runnable widget, use the `data-runnable` attribute.

```html
```

You can also manually trigger a runnable code widget in JS:

```js
```