---
title: Making Pages From Data
---

# Making Pages From Data

Writing [EJS templates](https://ejs.co/) is not hard. Nor is writing HTML. But in general it's great if you can separate content from layout and theming at least somewhat, especially as you start to get lots and lots of content.

For example, consider a blog. It's likely that you'd want to estabilsh a consistent look and feel, and then you'd start adding posts. At some point you might want to modernized your look and feel. It would be pretty awful to have to go through every single post to "update" the way they look. Better would be to have a template which renders your content, so that if you chance the template, all the posts would update.

Most static site generators offer interesting canned ways of doing this. For example maybe you specify a content folder and the tool scans and renders markdown files. Maybe it supports any kind of template by default, and it automatically scans all your folders looking for tags and tries to create a blog for you. **Aifry does none of this, by design.**

Instead, Airfry lets you add a generate scripts to templates.

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

Airfry is designed to be as simple and flexbible as possible. What this means is that you can use any javascript npm library you want to process your data files. Of course this means you need to be at least a little familiar with npm. The following example assumes you've added the npm module [markdown-it](https://github.com/markdown-it/markdown-it) to your project.

You don't need to worry too much about the details of this example. It is taken from the Airfry project that created the docs you are reading right now.

You can learn more about how it works on the [generate script page](/docs/output/generateScript/).

When you start Airfry you tell it where your data directory is. The default is **/airfry/data/**

For this example, let's assume you have all your posts in a folder under **/airfry/data/md/**

Note: Airfry passes an instance of [frontMatterParse](https://github.com/jxson/front-matter) to your generate scripts which you can use in case you want to use front matter in your data files. This is what's happening in the following example, but is entirely optional.

```html
<script generate>
  var md = require("markdown-it")();
  const fs = require("fs");
  let docs;

  if (!inputs.triggeredBy) {
    // Airfry will call your script at launch and when your template
    // file changes.  getDataFileNames is convenience utility supplied
    // by Airfry to get the absolute file names in folders relative
    // to the data directory you specified when starting Airfry
    // using the standard "glob" pattern matching.
    docs = getDataFileNames("md/**/*.md");
  } else {
    // Airfry will also call your script if one of the files you asked
    // for changes while Airfry is still running.  This lets you re-render
    // a single file, rather than rendering all data files again!
    docs = [inputs.triggeredBy];
  }

  const mapped = docs.map((filepath) => {
    const raw = fs.readFileSync(filepath, "utf8");
    const content = frontMatterParse(raw);
    const html = md.render(content.body);
    const title = content.attributes.title;
    // Use our data paths to specify output paths.
    // dataDir is supplied by Airfry and is the absolute path to our data dir
    // We also truncate the '.md' of path names.
    const relPath = filepath.split(dataDir + "/md/")[1].slice(0, -3);
    return {
      path: relPath,
      data: {
        title: title,
        html: html,
      },
    };
  });

  resolve({
    // the list of pages to generate through this template:
    generate: mapped,
    // Tell airfry which data files to watch.
    // If they change after the initial render, this generate script
    // will be called with "inputs.triggeredBy" set to the file that changed.
    watchGlobs: ["md/**/*.md"],
  });
</script>
```

**Note 1**: Templates can refer to generate scripts from other templates. This allows you to re-use your generate scripts with built in [dependency tracking.](/docs/performance/dependencyTracking/)

**Note 2**: Generate scripts are asynchronously called.

See the complete details on the [generate script page.](/docs/output/generateScript/)
