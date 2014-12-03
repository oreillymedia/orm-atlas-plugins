Atlas Plugins
=================

This repository holds JS plugins to be used with O'Reilly Atlas. Each plugin has its own folder, some with test coverage. It is also expected that each plugin has a `README.md` file, to explain how the plugin is to be used, as well as file in the `examples` folder with actual usage examples.


Local Development
-----------------

Make sure you have `npm` installed. Then run:

- `npm install -g gulp`
- `npm install`

Writing a plugin
--------------------

The `p5` plugin is a good place to start. It has a single `.coffee` file and a single `.scss` file to start. Most plugin development is done by writing `.html` files in the `examples` folder, and checking them in your browser.

To run the example, run `gulp examples`. Then open `localhost:8002` in your browser.

All examples should have at least on example file in the `examples` folder.

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
