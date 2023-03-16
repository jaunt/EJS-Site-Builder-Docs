---
title: Generate Scripts
order: 8
---

# Generate Scripts

If you want to render several pages using the same template, specify a generate script at the end of your template.

A generator script can be synchronous or asyncronous. It will be passed a collection of parameters and must return a collection of parameters:
Your script must be written

## Inputs

### require

Allows you to import node.js compatible npm modules that you have added to your project. **Use at your own risk.**

### generatePages

A function that you call one ore more times as your page data becomes ready to render. See [page generation requests](#pageGenerationRequests) for details. You can generate with an array of page requests or for a single page, one at a time. If you're rendering thousands of pages, it might be better to do it in chunks so that you don't use too much RAM, but you can also call this with all your pages at once.

### inputs

- **triggeredBy**: If the script is being called because an individual data file changed, this will be set to the path of the file so that you can proceed to render only that file.
- **frontMatter**: Allows you access to the template's front matter data.
- **global**: This is a key-value javascript object. Any key values you specify will be merged or overwritten into a global object which the postGenerate template will have access to. Generally speaking, your preGenerate template will write to global, possibly your pages, and your postGenerate template will use it. Your pages should not read from the global object since the order of page generation is undetermined.

### getDataFileNames

A convenience function supplied by EJS Site Builder to get the absolute file names in folders relative to the data directory you specified when starting EJS Site Builder using the standard "glob" pattern matching.

Pass in a glob string or an array of glob strings and all of the matching file paths will be returned as an array.

### cache

The current cache. See [caching](/performance/cache/) for details.

### log

Call to log info to the ejssitebuilder console. This can be helpful when you want to debug your scripts.

### frontMatterParse

EJS Site Builder passes an instance of [frontMatterParse](https://github.com/jxson/front-matter) to your generate scripts which you can use in case you want to use front matter in your data files. This is what's happening in the following example, but is entirely optional.

### dataDir

The absolute path for your data directory in case you need it for any reason.

### renderTemplate (template name, template data)

EJS Site Builder allows you to render a template from within your generate script. Say you created a generate script to render some other kind of templating language, like markdown for example, but you also wanted to render your native EJS Site Builder templates as [shortcodes](/guide/shortcodes/).

In that case, you could extract the data in your generate script and pass it to one of your EJS Site Builder templates. **renderTemplate** expects the name of your template as the first parameter, with relative paths, and a javascript object of key value pairs specifying the data to pass into the template. See examples on on the [shortcodes page](/guide/shortcodes/). Note that calls to this function will be dependency tracked so that changes to the templates you call will trigger your generate script to run again.

## Data to return (or pass to "resolve" if returning a promise)

- **cache**: A javascipt key-value object that you want to merge into the cache. See [caching](/performance/cache/) for details.
- **global**: A javascript key-value object that you want to merge into the temporary global data, passed to postGenerate.ejs
- **siteFiles**: If this object is specified, it creates output files with respect to your output directory. The keys are the file names and the values will be stringified with _JSON.stringify_ and written to the key specified path.
- **watchFiles**: request watching for changes to these files, EJS Site Builder will call this script with inputs.TriggeredBy set to the file path that change.
- **watchGlobs**: Tell EJS Site Builder to watch glob patterns and if they change, call this script with inputs.TriggerBy set to the path that changed.

## Page Generation Request Array

You can call the generate function as many times as you want before your generate script returns or resolves asynchronously. You can call it with a single page request, or an array of them. A page generation request is an object with the following properties:

- **path**: The sub path to generate the template, which will replace the '\*' in your generate script path.
- **data**: The key-value javascript object to supply to the template to be used as page variables.

Example:

```html
---
generate: posts/*
---
<%= description %>

<script generate>
generate([
    {
      path: "first",
      data: {
        description: "first post",
      }
    },
    {
      path: "second",
      data: {
        description: "second post",
      }
    },
])

resolve()

```

The above template will generate two posts:

```
└── output/posts/first
    └── index.html
└── output/posts/second
    └── index.html
```

### Reusing Generate Scripts

To re-use a generate script which already exists in your project, use **generate-use** as follows

```
<script generate-use:"templateName">
</script>
```

A common pattern is to create a template with only the generate script specified.

You can see an example of how this works in the docs for this site:

[docsMD.ejs](https://github.com/jaunt/EJS-Site-Builder-Docs/blob/main/ejssitebuilder/templates/generators/docsMD.ejs).

The above generate script is referenced from this template:
[pages.ejs](https://github.com/jaunt/EJS-Site-Builder-Docs/blob/main/ejssitebuilder/templates/pages.ejs)
