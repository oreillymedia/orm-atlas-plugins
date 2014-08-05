Processing.js Plugin
--------------------

This plugin can turn Processing code examples into a runnable code sample, with a canvas and everything!

How to use
----------

First, include these files in the `<head>` section of your HTML file.

```html
<script type="text/javascript" src="https://d2uogd9jz9k9zm.cloudfront.net/jquery-2.1.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://d2uogd9jz9k9zm.cloudfront.net/codemirror-4.4.css">
<script type="text/javascript" src="https://d2uogd9jz9k9zm.cloudfront.net/codemirror-4.4.min.js"></script>
<script type="text/javascript" src="https://d2uogd9jz9k9zm.cloudfront.net/underscore-1.6.0.min.js"></script>
<script type="text/javascript" src="https://d2uogd9jz9k9zm.cloudfront.net/processing-1.4.8.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://d2uogd9jz9k9zm.cloudfront.net/processingjs-0.0.2.css">
<script type="text/javascript" src="https://d2uogd9jz9k9zm.cloudfront.net/processingjs-0.0.2.min.js"></script>
```

Any `<pre data-executable="true">` will automatically be turned into a code runner. You can also manually trigger it via JS. See working examples in the `/examples` folder.