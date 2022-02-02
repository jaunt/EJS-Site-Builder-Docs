---
title: Preparing Data For All Pages
order: 9
---

# Preparing Data For All Pages

Step one in Airfry's [workflow](/docs/intro/) is to give you the opportunity to create global data for all your templates.

In order to do so, you must create a file called "preGenerate.js" in your [templates directory](/docs/setup/#directories).

The script itself can be quite simple. It can use any javascript (as well as [using npm node.js modules](/docs/underTheHood/#npm) you add to your project). It behaves similiarly to a javascript promise, in that it can either resolve or reject. See [Airfry scripting basics](/docs/scripts/) for details.

Here's an example:

**preGenerate.js**

```javascript
// preGenerate.js is called before anything else
// so that we can build up any global data we want to pass to all
// generator functions.
//
// It must resolve asynchronously
// or reject on failure.
//
// preGenerate.js has access to
// cache: a javascript object scripts can use to cache any data that can be json.stringified
//
// Outputs:
//
// global: object which can be accessed from any generate script, including "filter" funtions.
//
// siteFiles: list of json serializable objects which will created as json files
//            for the purposes of loading in to the web site's runtime javascript code
const now = new Date("2015-03-25"); // today's date formatted however you want
const version = 1.4; // you could get this from git pretty easily

// you can define functions as well, which become available in all your templates
const toLowerCaseUseless = function (text) {
  return text.toLowerCase() + " this is useless";
};

resolve({
  siteFiles: {
    "/version.json": {
      createdDate: now,
      version: version,
    },
  },
  global: {
    date: now,
    toLowerCase: toLowerCaseUseless,
  },
});
```

## Inputs

#### cache

See [caching](/docs/performance/cache/) for details.

## Outputs

#### global

Must be an object with fields which can be accessed in your templates just as you do [front matter](/docs/templates/frontmatter/).

In the above example, writing 'data' in any template would show the formatted date as follows:

```html
This site was generated on the date: <%= date %>
```

Airfry [auto dependency tracking](/docs/performance/dependencyTracking/) will track to see which data you actually
use in your templates. If you make changes to preGenerate.md while Airfry is running, it will only re-generate
the pages that used the data.

Similarly, templates can call functions you specify.

#### siteFiles

This allows you to conveniently output non html files during the pre generate phase. The file name is the key, and the data will be strinfied from the key's value.
