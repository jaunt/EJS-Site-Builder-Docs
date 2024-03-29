---
title: Calculated Data
order: 7
---

# Calculated Data

EJS Site Builder passes data specific to each page it renders. These variables should not be used in your front matter, as they are automatically passed to your templates, but of course you can render them in your template if needed.

#### pagePath

The relative path that the page will be rendered to. This will be passed down to sub templates and wrappers and is sometimes useful in case you want to extract the title from the file path for example.

#### pageName

The file name. Sometimes you have data in your file system where you want to use the name of the file, instead of relying only on front matter data.

#### lastPath

This is the last part of the path. For example if an output file was src/templates/**mypage**/index.html, lastPath would be **mypage**.

For the root path, lastPath will be "main". See [vite integration](/integration/vite) for why this is useful.

This would also be the name of an entry script if you chose to generate one. This would allow you to include your generate script from your html if necessary like so:

```
  <script type="module" src="<%- pagePath %>/<%- lastPath %>.js"></script>
```
