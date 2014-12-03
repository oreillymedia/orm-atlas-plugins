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

Deploying
---------

If you made any changes, make sure that you bump the version number in the plugin's `package.json` file. To run a deploy, first create a `aws.json` file in the folder root:

```json
{
  "key": "AKIAI3Z7CUAFHG53DMJA",
  "secret": "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"
}
```

Then run `gulp publish`. This will update all plugins to newest versions. PLEASE don't publish if you're not sure what you're doing.

The examples end up here:
http://orm-atlas-plugins-examples.s3-website-us-east-1.amazonaws.com/

The CDN to get the actual plugins is here:
https://d2uogd9jz9k9zm.cloudfront.net
