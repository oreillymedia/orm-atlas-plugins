Atlas Plugins
=================

This is a repository that holds JS plugins to be used in Atlas. Each plugin will have its own folder, with test coverage. It is also expected that each plugin has a `README.md` file, to explain how the plugin is to be used.

Writing a new plugin
--------------------

1. Create a new folder named after the plugin
2. Create a `package.json` file to specify the version number. We borrowed this from NPM.

Releasing a plugin
------------------

All deployed plugins live in the `orm-atlas-plugins` bucket on S3, which is connected to the `d2uogd9jz9k9zm.cloudfront.net` Cloudfront distribution. All plugins must live inside a folder named after the plugin, and have the following naming convention:

```
NAME-VERSION.min.js
```

DO WE MAKE A DEPLOY SCRIPT?
