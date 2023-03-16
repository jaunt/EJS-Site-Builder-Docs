---
title: Pre Generate Hook
order: 9
---

# Pre Generate Hook

Step one in EJS Site Builder's [workflow](/guide/intro/) is to give you the opportunity to create global data for all your templates. You can also use it to render a page.

In order to do so, you must create a file called "preGenerate.js" in your [templates directory](/guide/setup/#directories).

The script itself can be quite simple. It can use any javascript (as well as [using npm node.js modules](/performance/underTheHood/#npm) you add to your project). It behaves similiarly to a javascript promise, in that it can either resolve or reject. See [EJS Site Builder scripting basics](/scripts/) for details.

Here's an example of a script to create a site map, based on the project that created these docs, assuming all previous pages wrote to a toc object in global data:

**preGenerate.ejs**

```html
<script generate>
  async () => {
    const now = calcalateMyBuildDate();
    const version = await getGitTagVersion();

    const toLowerCase = function (text) {
      return text.toLowerCase();
    };

    return {
      siteFiles: {
        "/version.json": {
          createdDate: now,
          version: version,
        },
      },
      global: {
        date: now,
        toLowerCase: toLowerCase, // can even pass functions to global data
      },
    };
  };
</script>
```

## Outputs

```typescript
// things you can return from a generator script:
type GeneratorResponse = {
  cache: CacheData;
  siteFiles: { [key: Path]: unknown };
  watchFiles: Path[];
  watchGlobs: string[];
  global: PageData; // only valid from pregenerat
};
```

Note: EJS Site Builder [auto dependency tracking](/performance/dependencyTracking/) will track to see which
data you actually use in your templates. If you make changes to preGenerate.ejs
while EJS Site Builder is running, it will only re-generate the pages that used
any global data.
