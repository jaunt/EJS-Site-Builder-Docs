---
title: Post Generate Hook
order: 10
---

# Post Generate Hook

If you add a file called **postGenerate.ejs** to the root of your template folder, EJS Site Builder will call it when the build is complete or after it finishes updating when the filesystem is being monitored.

Whenever files a written during generation, EJS Site Builder keeps track of the details. This data is made available in your postGenerate.ejs script.

Your postGenerate.js script will have access to a javascript object called "output". The stucture is as follows:

```typescript
type FileWritten = {
  kind: string;
  source: string[]; // cause of modification
  created: string;
  modified: string;
};

type FilesWritten = {
  [key: string]: FileWritten;
};

// things you can return from a generator script:
type GeneratorResponse = {
  cache: CacheData;
  siteFiles: { [key: Path]: unknown };
  watchFiles: Path[];
  watchGlobs: string[];
  global: PageData; // only valid from pregenerat
};
```

This is a simple example of a post generate script which simply writes the entire output structure to disk as a json file. You're free to do whatever you want with the data.

## Example Post Generate Script

```javascript
<script generate>
  // func is called during the generate phase
  ({ log, inputs, cache, renderTemplate }) => {
    const filesWritten = inputs.global.toc || {};
    const oldFilesWritten = cache["oldFilesWritten"] || {};

    function shallowEqual(object1, object2) {
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (let key of keys1) {
        if (object1[key] !== object2[key]) {
          return false;
        }
      }
      return true;
    }

    if (!shallowEqual(filesWritten, oldFilesWritten)) {
      // save old toc for next time, shallow copied
      // to avoid getting updated by reference
      cache["oldFilesWritten"] = {
        data: filesWritten,
      };

      const pages = Object.keys(filesWritten).map((path) => {
        return {
          url: path,
          group: filesWritten[path].group,
          title: filesWritten[path].title,
          order: filesWritten[path].order,
        };
      });

      // sort pages by order
      pages.sort((a, b) => {
        return a.order - b.order;
      });

      // get date in YYYY-MM-DD format
      const buildTime = new Date().toISOString().split("T")[0];

      // render template can render any template in your project in your generate scripts, returning the
      // resulting html.  Here we're using it to write a file using siteFiles.
      // Notice we never call "generatePages" in this generate script.
      const html = renderTemplate("postGenerate", {
        buildTime: buildTime,
        pages: pages,
      });

      return {
        siteFiles: {
          "entrypoints.json": filesWritten, // we use this file to import into the vite config for setting rollup options.
          "toc.json": pages, // this is loaded in by our run-time javascript to have a dynamic left navigate column
          "sitemap.xml": html,
        },
        cache: cache,
      };
    }

    return {};
  };
</script>
```
