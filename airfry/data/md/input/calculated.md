---
title: Calculated Template Variables
---

# Reserved Variables passed to your templates automatically.

These variables should not be used in your front matter, as they are automatically passed to your templates. You can however use them in your template in case you need to refer to them.

#### pagePath

The relative path that the page will be rendered to. This will be passed down to sub templates and wrappers and is sometimes useful in case you want to extract the title from the file path for example.

#### pageName

The file name. Sometimes you have data in your file system where you want to use the name of the file, instead of relying only on front matter data.

#### lastPath

This is the last part of the path. For example if an output file was src/input/**frontmatter**/index.html, lastPath would be **frontmatter**

#### global

This is structured data that you can provide to all templates from your [preGenerate Script](/docs/input/preGenerate/)
