Atlas Plugins
=================

This is a repository that holds JS plugins to be used in Atlas. Each plugin will have its own folder, with test coverage. It is also expected that each plugin has a `README.md` file, to explain how the plugin is to be used.


Writing a plugin
--------------------

1. Create a new folder named after the plugin inside of `/plugins`
2. Create a `package.json` file to specify the version number. We borrowed this from NPM, but we're only using the file to track the dependencies and version number.
4. Create a `README.md` file that describes how to use the plugin.
5. Write a bunch of coffeescript files.


Testing a plugin
----------------

The plugins repo is set up with automatic Jasmine test generation. Create a folder `spec` in your plugin folder, write some specs in coffeescript, and run the following command to compile them into JS:

```
gulp test
```

Gulp will continously watch the files for changes and regenerate them if needed.


Building a plugin
-----------------

1. Bump the version of the plugin after making changes.
1. Run the `gulp build` command to build all plugins into the `/build` folder. 2. Upload the resulting plugin file to the `orm-atlas-plugins` bucket on S3, and access the file on the Cloudfront CDN on `d2uogd9jz9k9zm.cloudfront.net`.

orm-code-eval
-------------

Because many of these plugins rely on executing code examples in a browser (which requires `eval` of code strings, this repo also has a small Sinatra application that takes a javascript string, an html string, and an array of JS libs, and returns an HTML page with these one it. The app is hosted on `orm-code-eval.herokuapp.com` thus bypassing any XSS vulnarabilites of executing user content.
