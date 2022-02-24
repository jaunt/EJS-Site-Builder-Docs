---
title: Caching
order: 14
---

# Caching API and computed data for quick rebuilds

It's likely you might be working on your site for hours at a time. If your site uses external APIs to pull data for page generation, or relies on the creation of intensive computed data in your [generate scripts](/docs/templates/generateScript/), you'll likely want to cache the data so that rebuilding the site is fast (until your cache expires or you clear it for a production build).

Generate scripts have access to "cache", which is a simple javascript object.

The cache keys are the names of the cache entries and must be unique to your project.
The cache values are the data that was cached.

The usage pattern in your generate scripts is recommended as follows:

1. Check if you had previously stored something in the cache.
2. Use the data in your generate script, and/or get any other data you need.
3. Store anything in the cache you might need for next time in case it needs to be updated.

When resolving output data, you can update the cache for the keys you want by specifying cache as:

```javascript
{
  data: data; // a JSON Stringifyable Object
  expires: expires; // optional: time of expiry in ms since the Unix Epoch.
}
```

Below is a hypothetical example where we cache an API response for 24 hours:

```html
---
generate: cards/*
---

<script generate>
  const apiUrl = "http://myApi/getJsonData";

  if (cache[apiUrl]) {
    // this means we had previously cached data an it's still valid
    // since we cached the entire page request list, we can just return it now
    resolve({
      data: cache[apiUrl].data,
    });
    return;
  }

  // our cache is empty, fetch the data.

  const axios = require("axios"); // assumes axios was addeded as a dependency in your project
  axios
    .get(apiUrl)
    .then((result) => {
      const pages = [];
      result.data.results.map((item) => {
        pages.push({
          path: item.name,
          data: {
            id: item.name,
            title: item.title,
          },
        });
      });

      // store in our cache and specify how long it lasts
      cache[apiUrl] = {
        data: pages,
        expires: new Date().getTime() + 60 * 60 * 1000 * 24, // cache for 24 hours from now
      };

      // ready to generate!
      resolve({
        data: data,
        cache: cache,
      });
    })
    .catch((error) => {
      reject(error);
    });
</script>
```
