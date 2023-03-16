---
title: Pages From Data
order: 5
---

# Pages From Data

Writing [EJS templates](https://ejs.co/) is not hard. Nor is writing HTML. But in general it's great if you can separate content from layout and theming at least somewhat, especially as you start to get lots and lots of content.

For example, consider a blog. It's likely that you'd want to estabilsh a consistent look and feel, and then you'd start adding posts. At some point you might want to modernized your look and feel. It would be pretty awful to have to go through every single post to "update" the way they look. Better would be to have a template which renders your content, so that if you change the template, all the posts would update.

Most site generators offer interesting canned ways of doing this. For example maybe you specify a content folder and the tool scans and renders markdown files. Maybe it supports any kind of template by default, and it automatically scans all your folders looking for tags and tries to create a blog for you.

EJS Site Builder does not offer any extra blog related features. Instead it provides an effecient mechanism for you to write the features you want using basic javascript.

### Generate Script Overview

Take the common blog example. Let's imagine you had three kinds of posts you wanted to make regularly:

- **Deep Thoughts**
- **Rant of the Day**
- **Pet Photo Of The Day**

Let's then assume that each of these post types was going to be more than just a bunch of text. For example, for Deep Thoughts, you decide you want a nice quote format to start, followed by some centered text, with a sunset in the background. For Rant of the day, you want a grumpy cat background and a different font. For Pet Photo, you want just a big photo and a small caption.

#### Step 1: Create Templates for Post Types

**deepthoughts.ejs**

```html
---
generate: posts/deepthoughts/*
---
<img class="myBackgroundClass"> src="<%= background %>">
	<div class="myQuoteStyle">
		<%= quote %>
	</div>
	<div class="myCenteredTextStyle">
		<%= deepthought %>
	</div>
</img>
```

**rant.ejs**

```html
---
generate: posts/rants/*
---
<img class="myBackgroundClass"> src="<%= background %>">
	<div class="myRantStyle">
		<%= rant %>
	</div>
</img>
```

**petphoto.ejs**

```html
---
generate: posts/petphotos/*
---
<img> src="<%= photo %>">
</img>
<div class="myCaptionStyle">
	<%= caption %>
</div>
```

#### Step 2: Create Generate Scripts for Posts

EJS Site Builder is designed to be as simple and flexbible as possible. What this means is that you can use any javascript npm library you want to process your data files. Of course this means you need to be at least a little familiar with npm. The following example assumes you've added the npm module [markdown-it](https://github.com/markdown-it/markdown-it) to your project.

\***\* WARNING: any time you develop software using external 3rd party code like those found in npm modules, you are putting yourself at risk! Do not download any code you are not confident with \*\***

You don't need to worry too much about the details of this example. It is taken from the EJS Site Builder project that created the docs you are reading right now. It's definitely an advanced example of what you can do with EJS Site Builder.

You can learn more about how it works on the [generate script page](/templates/generateScript/).

When you start EJS Site Builder you tell it where your data directory is. The default is **/ejssitebuilder/data/**

For this example, let's assume you have all your posts in a folder under **/ejssitebuilder/data/md/**

Note: EJS Site Builder passes an instance of [frontMatterParse](https://github.com/jxson/front-matter) to your generate scripts which you can use in case you want to use front matter in your data files. This is what's happening in the following example, but is entirely optional.

```html
<script generate>
  ({
    require,
    generatePages,
    inputs,
    getDataFileNames,
    log,
    frontMatterParse,
    dataDir,
    renderTemplate,
  }) => {
    var md = require("markdown-it")().use(require("markdown-it-highlightjs"));
    const path = require("path");

    let docs;
    const fs = require("fs");
    const docsDir = inputs.frontMatter.docsDir;

    log("beginning docsMD generate");

    if (!inputs.triggeredBy) {
      // we're being called during page generation
      // get absolute paths to data files
      docs = getDataFileNames(docsDir + "/**/*.md");
    } else {
      // we're being called because one of the md files was modifed during watch phase
      if (inputs.triggeredBy.reason != "Deleted") {
        docs = [inputs.triggeredBy.path];
      } else {
        // else ignore deleted data files.
        return;
      }
    }

    const markdownitfence = require("markdown-it-fence");

    function yourPlugin(md, options) {
      return markdownitfence(md, "ejssitebuilder", {
        marker: ":",
        render: (tokens, idx, options, env, self) => {
          const template = tokens[idx].info.trim().split(" ")[1];
          const data = JSON.parse(tokens[idx].content.trim());
          return renderTemplate(template, data);
        },
      });
    }
    md.use(yourPlugin);

    let mapped = docs.map((filepath) => {
      const raw = fs.readFileSync(filepath, "utf8");
      const content = frontMatterParse(raw);
      const html = md.render(content.body);
      const title = content.attributes.title;
      const order = content.attributes.order;
      // For this example, we'll use our data paths to specify output paths.
      // Data dir is the absolute path to our data dir
      // We also truncate the '.md' of path names.
      const relPath = filepath
        .split(dataDir + "/" + docsDir + "/")[1]
        .slice(0, -3);

      const group = relPath.split("/")[0];

      return {
        path: relPath,
        data: {
          group: group,
          title: title,
          html: html,
          order: order,
        },
      };
    });

    // for this example, we'll build a table of contents for each
    // page that gets generated.  we'll keep track of it in global
    // data so that in our postGenerate hook, we can create a site manifest
    // and in our run-time javascript, we can create an interactive navigation feature.
    let toc;
    try {
      toc = inputs.global.toc; // maybe other page generations have already started the toc
    } catch {
      toc = {};
    }

    if (inputs.triggeredBy) {
      const page = mapped[0];
      let update = {
        title: page.data.title,
        order: page.data.order,
        group: page.data.group,
      };
      toc[page.path] = update;
    } else {
      // a full update rebuilds the table of contents
      for (const item of mapped) {
        toc[item.path] = {
          title: item.data.title,
          order: item.data.order,
          group: item.data.group,
        };
      }
    }

    generatePages(mapped);

    return {
      // ejs site builder only watches templates for changes by default.
      // To watch other files, we can use watchGlobs:
      watchGlobs: [docsDir + "/**/*.md"],
      global: {
        toc: toc, // save the toc to global data
      },
    };
  };
</script>
```

### Reusing Generate Scripts

Templates can refer to generate scripts from other templates. This allows you to re-use your generate scripts with built in [dependency tracking.](/performance/dependencyTracking/)

See details on how to [re-use a generate script from another template in your project](/templates/generateScript)

**Note 2**: The above script is synchronous. If you want to use "await" in your scripts, specify them as follows:

```html
<script generate>
  async () => {
    const jsonFile = await someExternalApiCall();
    return { siteFiles: { ["data.json"]: jsonFile } };
  };
</script>
```

See the complete details on the [generate script page.](/templates/generateScript/)
