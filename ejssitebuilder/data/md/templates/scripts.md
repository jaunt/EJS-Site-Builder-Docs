---
title: Scripting Basics
order: 4
---

# Scripting Basics

EJS Site Builder lets you embed scripts right in your templates. This is inspired by, but a little different than what you see in vue.js single file templates.

There are two kinds of EJS Site Builder scripts. Generate scripts for generating your site, and runtime scripts for running it.

## Site Generation Scripts

When you want to create html pages based on data, you can write javascript which EJS Site Builder runs as it builds your site. These are called generate scripts.

#### Embedding in Templates

Generate scripts can be embedded in templates like so:

**template.ejs**

```html
---
generate: posts/*
---

<%= scriptData %>
<script generate>
  // The javascript part of this file
</script>
```

When EJS Site Builder processes the template above, it will strip out the generate script so that it won't get rendered to the final html file(s). It will instead run the script to build up data to pass to any variables or logic flow you have in your ejs template.

#### Pre and Post Generate Scripts

EJS Site Builder honours two special ejs files in the root of your input directory called **preGenerate.ejs** and **postGenerate.ejs**. The first is guaranteed to run before anything else, and the other runs after your site build is complete. The pre generation template is a great place to call and cache api responses, build up a table of contents, etc. The post generation template is a good place to summarize the results of your build, likely writing log information or to a json file which your web app or devop tools can injest.

Refer to the [pre generate](/templates/preGenerate/) and [post generate](/templates/postGenerate/) documentation for details.

## Web 'App' Scripts (run-time)

Consider your website once's it has been fully generated. It's quite often you'll want at least some run-time javascript to help with interactivity or whatever else you might need. This has nothing to do with build-time javascript which lives in your templates under <script generate></script> tags.

_Note: There are plenty of [lighthouse](https://developers.google.com/web/tools/lighthouse) page score zeaots out there who will say you must have no javascript to be cool. Feel free to have absolutely no javascript in your final webpage if you want, but for the rest of use, please continue..._

EJS Site Builder makes it quite easy to add javascript to your application while at the same time integrating nicely with modern and awesome tools like [vite](https://vitejs.dev/) and any javascript framework you can think of.

There are three ways to specify scripts.

#### Entry Scripts

First read the vite documentation for [multi-page apps](https://vitejs.dev/guide/build.html#multi-page-app)

The accepted method which is also used in webpack, is to have an "entry script" for each page.

EJS Site Builder allows you to add an entry script to a template like so:

```html
---
title: home
generate: /
---

<%= scriptData %>
<script entry>
  // this code will end up in your entry script
</script>
```

The above template is being rendered directly to root, because the generate path is '/'. This is a special case in which EJS Site Builder will copy the entry script you specify into a file called "main.js" alongside index.html in the root of your [output directory](/guide/setup/).

If you specify an entry script in a template that is being rendered to a page that is not at root, for example:

```html
---
title: home
generate: /about
---

<%= scriptData %>
<script entry>
  // This code will end up in your entry script
  // It should be run-time webapp code to make your site interactive
</script>
```

In the case above, your html and entry script will be written as:

```
└── about
    ├── index.html
    └── about.js
```

When using vite, this will all work out very nicely. When building for production, you can use the postGenerate script to generate the rollupOptions with the entry points that were created. See [vite integration](/integration/vite/) for an example.

#### Lib Scripts

If you're using something like [alpine.js](https://alpinejs.dev/), you might want to organize your code to build up reusable components. EJS Site Builder makes this easy with the lib script feature.

Consider a hypothetical sub-template for widget you are designing:

**/templates/components/button.ejs**

```html
<div>my button widget</div>
<script lib>
  // this code will end up in /templates/components/button.js
  // It should be run-time webapp code to make your button interactive
</script>
```

Notice there is no "generate" specified in the front matter since this is designed to be a re-useable component you would include from other templates.

Obviously we wouldn't want this code to be written multiple times a component includes it, so instead ejssitebuilder writes it to your output in parallel to the folder structure you had it in in your templates.

Of course if a template includes your button sub-template, you'd want to include the lib file in its entry script.

See [alpine.js integration](/integration/alpinejs/) for an example.
