Processing.js Plugin
--------------------

This plugin can turn Processing code examples into a runnable code sample, with a canvas and everything!

How to use
----------

Look in the `/examples` folder. 

Here's an example of how to add the plugin into atlas.json:

```json
"html": {
  "index": false,
  "toc": true,
  "syntaxhighlighting": false,
  "show_comments": false,
  "consolidate": false,
  "javascripts": [
     "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js",
     "https://cdnjs.cloudflare.com/ajax/libs/codemirror/4.4.0/codemirror.min.js",
     "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js",
     "https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.8/processing.min.js",
     "https://d2uogd9jz9k9zm.cloudfront.net/processingjs-0.0.2.min.js"
  ],
  "stylesheets": [
     "https://cdnjs.cloudflare.com/ajax/libs/codemirror/4.4.0/codemirror.min.css",
     "https://d2uogd9jz9k9zm.cloudfront.net/processingjs-0.0.2.css"
  ]
}

```