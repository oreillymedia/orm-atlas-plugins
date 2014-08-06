Google Analytics Plugin
--------------------

Use this plugin to insert Google Analytics on a website.

How to use
----------

Simply add a single variable with your tracking code and link to the library.

```html
<script type="text/javascript">
  if(!window.atlasplugins) window.atlasplugins = {}
  atlasplugins.gaTrackingCode = "UA-12345678-9";
</script>
<script type="text/javascript" src="https://d2uogd9jz9k9zm.cloudfront.net/googleanalytics-0.0.1.min.js"></script>
```

You can also use a dynamic variable from the `atlas.json` file like this:

```js
atlasplugins.gaTrackingCode = "{{myVariable}}}";
```

